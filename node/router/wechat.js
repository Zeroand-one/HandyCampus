var router = require('koa-router')();
// var apiModel = require('../lib/sql.js');
var apiModel = require('../lib/wechatsql.js');
var md5 = require('blueimp-md5');
var koaBody = require('koa-body');
let moment = require('moment')
let querystring = require('querystring')
const koa2Req = require('koa2-request'); // 请求库
const config = require('../config/default.js');

// ******************************用户管理***************************//

// 获取openID
let appId = config.appId,
AppSecret = config.AppSecret;
const APP_URL = 'https://api.weixin.qq.com/sns/jscode2session'
router.post('/v1/api/wechat/user/getSessionKeyOpenid',koaBody(),async (ctx, next) => {
	let  {code}  = ctx.request.body; // 在post中获取jscode
	// 发送到微信服务器获取OpenId
	let qres = await koa2Req({
    url: `${APP_URL}?appid=${appId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`
  })
	let body = JSON.parse(qres.body); // 解析
	ctx.body = {
    data: body,
    msg: "500"
  } // OpenId最好仅在服务端使用，不建议发送到客户端
})

// 注册用户
router.post('/v1/api/wechat/user/userAuth',koaBody(),async (ctx, next) => {
  await apiModel
    .userAuth(ctx.request.body)
    .then(res => {
      console.log(res)
      ctx.body = {
        code: 200,
        data: "注册成功",
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})

// 注册用户查询
router.get('/v1/api/wechat/user/userAuthFind',async (ctx, next) => {
  await apiModel
    .userAuthFind(ctx.query.id)
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

// ******************************常用地址表***************************//

// 常用地址表查询
router.get('/v1/api/wechat/oftenAddresFind',async (ctx, next) => {
  await apiModel
    .oftenAddresFind(ctx.query.id)
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
// *****************************我的****************************//

// 获取个人信息
router.post('/wx/user/info',koaBody(),async (ctx, next) => {
  let data = ctx.request.body
  await apiModel
    .getPhoneUserInfo(data)
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


// *****************************主页推荐****************************//

// 主页推荐轮播图查询
router.get('/v1/api/wechat/index/indexBannerFind',async (ctx, next) => {
  await apiModel
    .indexBannerFind()
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


// *****************************订单表****************************//


// 新增订单
router.post('/v1/api/wechat/order/orderAdd',koaBody(),async (ctx, next) => {
  let data = ctx.request.body
  await apiModel
    .orderAdd(data)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
        message: '新建订单成功!'
      };
    })
    .catch(res => {
      ctx.body = {
        code: 500,
        message: '服务器失联',
      };
    });
})

// 新增订单地址
router.post('/v1/api/wechat/order/orderAddAddres',koaBody(),async (ctx, next) => {
  let data = ctx.request.body
  await apiModel
    .orderAddAddres(data)
    .then(res => {
      ctx.body = {
        data:res,
        code: 200,
        message: '新建订单地址成功!'
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
router.post('/v1/api/wechat/order/orderImg',koaBody(),async (ctx, next) => {
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

// 订单地址表查询
router.get('/v1/api/wechat/order/orderAddresFind',async (ctx, next) => {
  await apiModel
    .orderAddresFind(ctx.query.id)
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






// *******************************************************主页推荐******************************************************//

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