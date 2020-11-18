// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const path = require('path');
const mysql = require('mysql');
// 数据库信息
const config = require('./config/default.js');
// 登录验证
const SessionToken = require('./config/token.js')
// 开放静态资源
const staticCache = require('koa-static');
// 数据压缩
const compress = require('koa-compress');
// 缓存在数据库里面进行进行操作
const MysqlStore = require('koa-mysql-session');
// 创建session缓存
const session = require('koa-session-minimal');
// CORS是一个W3C标准，全称是"跨域资源共享"
const cors = require('koa-cors');
// 日志中间件
const logger = require("koa-logger");
// 路由中间件
const router = require('koa-router');
const route = new router();
// 创建一个Koa对象表示web app本身:
const app = new Koa();

const sessionMysqlConfig = {        //数据库信息
  user: config.database.USER,
  password: config.database.PASSWORD,
  host: config.database.HOST,
  database: config.database.DATABASE,
  // touchAfter:30
  // touchAfter:24*3600*1000
};

let cookie = {        // 存放sessionId的cookie配置
  maxAge: 3600*24*1000*30, // cookie有效时长(ms)
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: true, // 是否只用于http请求中获取
  overwrite: true,  // 是否允许重写
}

app.use(logger());    //请求打印
app.use(cors({credentials: true}));      //跨域资源共享


app.use(              //session缓存设置
  session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig),
    cookie: cookie,
  }),
);
// 数据压缩
app.use(compress({ threshold: 2048 }));
// 登录验证
app.use(SessionToken())
// 静态资源开放
app.use(
  staticCache(
    path.join(__dirname, './upload'),
  ),
);  

// 图片上传
app.use(require('./router/uploadFile.js').routes()).use(route.allowedMethods());

app.use(require('./router/vue.js').routes()).use(route.allowedMethods());
app.use(require('./router/wechat.js').routes()).use(route.allowedMethods());
// 连接数据库
let connection = mysql.createConnection(sessionMysqlConfig)
connection.connect((err, result) => {
  if (err) {
    console.log("链接失败，数据库服务器未打开")
  }else{
    // 在端口3000监听:
    let server = app.listen(3030, '127.0.0.1', function (req, res) {
      let host = server.address().address;
      let port = server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
    });
  }
});
