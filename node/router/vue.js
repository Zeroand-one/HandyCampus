var router = require('koa-router')();
var apiModel = require('../lib/sql.js');
var md5 = require('blueimp-md5');
var koaBody = require('koa-body');
let moment = require('moment')

// 查询账号是否已被注册过
router.get('/vue/regname', async (ctx, next) => {
  await apiModel
    .userName(ctx.query.username)
    .then(res => {
      if(res.length > 0){
        ctx.body = {
          code: 2002,
          message: '账号已被注册',
        };
      }else{
        ctx.body = {
          code: 200,
          message: '',
        };
      }
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '注册失败',
      };
    })
})
// 后台注册
router.post('/vue/register',koaBody(),async (ctx, next) => {
  // 二次加密
  // let md5Pass = md5(md5(ctx.request.body.password))
  // data = [
  //   ctx.request.body.username,
  //   md5Pass,
  //   '/static/img/user01.jpg',
  //   ctx.request.body.email,
  //   moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  //   moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  //   0
  // ]
  await apiModel
    .userAdd(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        message: '注册成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '注册失败',
      };
    });
})
// 登录
router.get('/vue/login', async (ctx, next) => {
  // 二次加密
  // ctx.query.password = md5(md5(ctx.query.password))
  await apiModel
    .userFind(ctx.query)
    .then(res => {
      if(res.length > 0){
        let dataString = JSON.stringify(res);
        let data = JSON.parse(dataString);
        ctx.session.token = ctx.query
        let token = new Buffer(JSON.stringify(ctx.query)).toString('base64');
        ctx.body = {
          token:token,
          name:data[0],
          code: 200,
          message: '登录成功',
        };
      }else{
        ctx.body = {
          code: 500,
          message: '登录失败,账户或密码错误',
        };
      }
      
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '登录失败',
      };
    });
})
// 修改信息
router.post('/vue/UserUpdate',koaBody(),async (ctx, next) => {
  let password = ctx.session.token.password
  let data = ctx.request.body
  // 二次加密
  // if(password !== data.password){
  //   data.password = md5(md5(ctx.request.body.password))
  // }
  data.newtime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
  console.log(data)
  await apiModel
    .UserUpdate(data)
    .then(res => {
      ctx.session.token.password = ctx.request.body.password
      ctx.body = {
        code: 200,
        message: '修改成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '修改失败'
      };
    });
})
// 退出登录
router.get('/vue/loginOut', async (ctx, next) => {
  ctx.session = {}
  ctx.body = {
    code: 200,
    message: '成功退出！',
  };
})

// 首页
router.get('/vue/index',async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: '成功'
  }
})

// 前端用户添加
router.post('/vue/usersadd',koaBody(),async (ctx, next) => {
  // 二次加密
  // let md5Pass = md5(md5(ctx.request.body.password))
  // data = [
  //   ctx.request.body.name,
  //   md5Pass,
  //   moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  //   moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  // ]
  let data = ctx.request.body
  await apiModel
    .usersAdd(data)
    .then(res => {
      ctx.body = {
        code: 200,
        message: '账户添加成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '账户添加失败',
      };
    });
})
// 前端用户查询
router.get('/vue/usersFind',async (ctx, next) => {
  await apiModel
    .usersFind()
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 后台骑手查询
router.get('/vue/courierFind',async (ctx, next) => {
  await apiModel
    .courierFind()
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 前端用户修改
router.post('/vue/usersupdate',koaBody(),async (ctx, next) => {
  // ctx.request.body.password = md5(md5(ctx.request.body.password))
  // ctx.request.body.newtime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  await apiModel
    .usersupdate(ctx.request.body)
    .then(res => {
      console.log(res)
      ctx.body = {
        code: 200,
        message:"成功修改",
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 前端用户删除
router.post('/vue/usersDelete',koaBody(),async (ctx, next) => {
  await apiModel
    .usersDelete(ctx.request.body.id)
    .then(res => {
      ctx.body = {
        code: 200,
        message:"成功删除",
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})

// 模块查询
router.get('/vue/ClassFind',async (ctx, next) => {
  await apiModel
    .ClassFind()
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 模块添加
router.post('/vue/ClassAdd',koaBody(),async (ctx, next) => {
  ctx.request.body.number = 0;
  ctx.request.body.time = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  ctx.request.body.newtime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  await apiModel
    .ClassAdd(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data: '添加成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '添加失败',
      };
    });
})
// 修改模块名称
router.post('/vue/ClassUpdateName',koaBody(),async (ctx, next) => {
  ctx.request.body.newtime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss a');
  await apiModel
    .ClassUpdateName(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data: '修改成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '添加失败',
      };
    });
})
// 删除列表
router.post('/vue/ClassDelete',koaBody(),async (ctx, next) => {
  await apiModel
    .ClassDelete(ctx.request.body.id)
    .then(res => {
      ctx.body = {
        code: 200,
        data:"成功修改",
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})


// 资讯内容添加
router.post('/vue/ArticleAdd',koaBody(),async (ctx, next) => {
  ctx.request.body.time = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
  ctx.request.body.newtime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  await apiModel 
    .ArticleAdd(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        message: '资讯添加成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '资讯添加失败',
      };
    });
  let number = await apiModel.ArticleClass(ctx.request.body.class)
  let data ={
    id: ctx.request.body.class,
    number: number.length
  }
  await apiModel.ClassNumber(data)
})
// 资讯删除
router.delete('/vue/ArticleDelete/:id',async (ctx, next) => {
  await apiModel
    .ArticleDelete(ctx.params.id)
    .then(res => {
      ctx.body = {
        code: 200,
        data:"成功删除",
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 资讯修改
router.post('/vue/ArticleUpdate',koaBody(),async (ctx, next) => {
  ctx.request.body.newtime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  await apiModel
    .ArticleUpdate(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data:"修改成功",
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 资讯列表
router.get('/vue/ArticleFind',async (ctx, next) => {
  // 表单总数
  let total = await apiModel.Table('article')
  await apiModel
    .ArticleFind(ctx.query)
    .then(res => {
      ctx.body = {
        total:total[0].total,
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 资讯详情
router.get('/vue/ArticleDetails/:id',async (ctx, next) => {
  await apiModel
    .ArticleDetails(ctx.params.id)
    .then(res => {
      ctx.body = {
        data:res[0],
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})

// 关于我们查询
router.get('/vue/AboutFind',async (ctx, next) => {
  await apiModel
    .AboutFind()
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 关于我们添加
router.post('/vue/AboutAdd',koaBody(),async (ctx, next) => {
  await apiModel
    .AboutAdd(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data: '添加成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '添加失败',
      };
    });
})
// 关于我们修改
router.post('/vue/AboutUpdata',koaBody(),async (ctx, next) => {
  await apiModel
    .AboutUpdate(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data: '修改成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '添加失败',
      };
    });
})


// 前端数据处理
// 轮播图
router.get('/wechat/Banner',async (ctx, next) => {
  await apiModel
    .Banner()
    .then(res => {
      ctx.body = {
        code: 200,
        data: res,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 列表数据
router.post('/wechat/List',koaBody(),async (ctx, next) => {
  await apiModel
    .ArticleFind(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data: res,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 模糊查询
router.post('/wechat/IndexQuery',koaBody(),async (ctx, next) => {
  await apiModel
    .query(ctx.request.body.Search)
    .then(res => {
      ctx.body = {
        code: 200,
        data: res,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '添加失败',
      };
    });
})
// 资讯详情
router.get('/wechat/ArticleDetails/:id',async (ctx, next) => {
  await apiModel
    .ArticleDetails(ctx.params.id)
    .then(res => {
      ctx.body = {
        data:res[0],
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 模块查询
router.get('/wechat/ClassFind',async (ctx, next) => {
  await apiModel
    .ClassFind()
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 关于我们查询
router.get('/wechat/About',async (ctx, next) => {
  await apiModel
    .AboutFind()
    .then(res => {
      ctx.body = {
        data:res[0],
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})
// 列表数据
router.post('/wechat/NavList',koaBody(),async (ctx, next) => {
  await apiModel
    .NavArticle(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data: res,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})



module.exports = router;