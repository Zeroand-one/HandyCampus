var router = require('koa-router')();
var apiModel = require('../lib/admin_sql.js');
var md5 = require('blueimp-md5');
var koaBody = require('koa-body');
let moment = require('moment')

// ******************后台用户*****************//

// 查询账号是否已被注册过
router.get('/v1/admin/regname', async (ctx, next) => {
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
router.post('/v1/admin/register',koaBody(),async (ctx, next) => {
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
router.get('/v1/admin/login', async (ctx, next) => {
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
router.post('/v1/admin/UserUpdate',koaBody(),async (ctx, next) => {
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
router.get('/v1/admin/loginOut', async (ctx, next) => {
  ctx.session = {}
  ctx.body = {
    code: 200,
    message: '成功退出！',
  };
})

// 首页
router.get('/v1/admin/index',async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: '成功'
  }
})

// *****************************前端用户****************************//

// 前端用户添加
router.post('/v1/admin/usersadd',koaBody(),async (ctx, next) => {
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
router.get('/v1/admin/usersFind',async (ctx, next) => {
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
// 前端用户搜索
router.get('/v1/admin/usersFindSearch',async (ctx, next) => {
  await apiModel
    .usersFindSearch(ctx.query.key)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '服务器失联',
      };
    });
})
// 前端用户修改
router.post('/v1/admin/usersupdate',koaBody(),async (ctx, next) => {
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
router.post('/v1/admin/usersDelete',koaBody(),async (ctx, next) => {
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


// *****************************前端骑手****************************//

// 骑手查询
router.get('/v1/admin/courierFind',async (ctx, next) => {
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


// 骑手账号搜索
router.get('/v1/admin/courierFindSearch',async (ctx, next) => {
  await apiModel
    .courierFindSearch(ctx.query.key)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '服务器失联',
      };
    });
})

// *****************************关于我们****************************//

// 关于我们查询
router.get('/v1/admin/AboutFind',async (ctx, next) => {
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
        data:res,
        message: '服务器失联',
      };
    });
})

// 关于我们添加
router.post('/v1/admin/AboutAdd',koaBody(),async (ctx, next) => {
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
router.post('/v1/admin/AboutUpdata',koaBody(),async (ctx, next) => {
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


// *******************************订单******************************//

// 订单查询
router.get('/v1/admin/orderFind',async (ctx, next) => {
  await apiModel
    .orderFind()
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

// 订单传图
router.post('/v1/admin/orderImg',koaBody(),async (ctx, next) => {
  let data = ctx.request.body
  await apiModel
    .orderImg(data)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
        message: '上传成功!'
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})

// 新增订单
router.post('/v1/admin/orderAdd',koaBody(),async (ctx, next) => {
  let data = ctx.request.body
  await apiModel
    .orderAdd(data)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
        message: '新建成功!'
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})

// 后台修改订单
router.post('/v1/admin/orderUpdate',koaBody(),async (ctx, next) => {
  let data = ctx.request.body
  await apiModel
    .vueOrderUpdate(data)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
        message: '新建成功!'
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})

// 后台删除订单
router.post('/v1/admin/orderDelete',koaBody(),async (ctx, next) => {
  // let data = ctx.request.body.order_id
  await apiModel
    .vueOrderDelete(ctx.request.body.order_id)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
        message: '删除成功!'
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})

// 订单开始时间搜索
router.post('/v1/admin/orderStartTimeSearch',koaBody(),async (ctx, next) => {
  await apiModel
    .orderStartTimeSearch(ctx.request.body)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
        message: '搜索成功!'
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '服务器失联',
      };
    });
})

// 订单关键字搜索
router.get('/v1/admin/orderKeySearch',koaBody(),async (ctx, next) => {
  await apiModel
    .orderKeySearch(ctx.query.key)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
        message: '搜索成功!'
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '服务器失联',
      };
    });
})


// *****************************反馈****************************//

// 查询全部反馈
router.get('/v1/admin/messagesFindAll',async (ctx, next) => {
  await apiModel
    .messagesFindAll()
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '服务器失联',
      };
    });
})

// 查询已未读反馈
router.get('/v1/admin/messagesFindRead',async (ctx, next) => {
  await apiModel
    .messagesFindRead(ctx.query.read_state)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '服务器失联',
      };
    });
})

// 根据id查询反馈
router.get('/v1/admin/messagesFindId',async (ctx, next) => {
  await apiModel
    .messagesFindId(ctx.query.id)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '服务器失联',
      };
    });
})

// 根据id修改查看状态
router.post('/v1/admin/messagesFindReadId',koaBody(),async (ctx, next) => {
  await apiModel
    .messagesFindReadId(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data: '修改查看状态成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '修改查看状态失败',
      };
    });
})

// 反馈回复
router.post('/v1/admin/messagesUpdate',koaBody(),async (ctx, next) => {
  await apiModel
    .messagesUpdate(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data: '回复成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '回复失败',
      };
    });
})

// 反馈删除
router.post('/v1/admin/messagesDelete',koaBody(),async (ctx, next) => {
  await apiModel
    .messagesDelete(ctx.request.body)
    .then(res => {
      ctx.body = {
        code: 200,
        data: '删除成功',
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '删除失败',
      };
    });
})


// 反馈搜索
router.get('/v1/admin/messagesFindSearch',async (ctx, next) => {
  await apiModel
    .messagesFindSearch(ctx.query.key)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        data:res,
        message: '服务器失联',
      };
    });
})


// 模块查询
router.get('/v1/admin/ClassFind',async (ctx, next) => {
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
router.post('/v1/admin/ClassAdd',koaBody(),async (ctx, next) => {
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
router.post('/v1/admin/ClassUpdateName',koaBody(),async (ctx, next) => {
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
router.post('/v1/admin/ClassDelete',koaBody(),async (ctx, next) => {
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
router.post('/v1/admin/ArticleAdd',koaBody(),async (ctx, next) => {
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
router.delete('/v1/admin/ArticleDelete/:id',async (ctx, next) => {
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
router.post('/v1/admin/ArticleUpdate',koaBody(),async (ctx, next) => {
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
router.get('/v1/admin/ArticleFind',async (ctx, next) => {
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
router.get('/v1/admin/ArticleDetails/:id',async (ctx, next) => {
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


// 前端数据处理
// 轮播图
router.get('/v1/admin/Banner',async (ctx, next) => {
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
router.post('/v1/admin/List',koaBody(),async (ctx, next) => {
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
router.post('/v1/admin/IndexQuery',koaBody(),async (ctx, next) => {
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
router.get('/v1/admin/ArticleDetails/:id',async (ctx, next) => {
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
router.get('/v1/admin/ClassFind',async (ctx, next) => {
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
router.get('/v1/admin/About',async (ctx, next) => {
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
router.post('/v1/admin/NavList',koaBody(),async (ctx, next) => {
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