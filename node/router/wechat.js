var router = require('koa-router')();
// var apiModel = require('../lib/sql.js');
var apiModel = require('../lib/wechatsql.js');
var md5 = require('blueimp-md5');
var koaBody = require('koa-body');
let moment = require('moment')


// 订单查询
router.get('/vue/orderFind',async (ctx, next) => {
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