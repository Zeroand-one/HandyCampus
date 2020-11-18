var mysql = require('mysql');
var config = require('../config/default.js');

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
});

// 数据库操作封装
let query = ( sql, values ) => {
  return new Promise(( resolve, reject ) => {
    // 连接数据库
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err )
      } else {
        // mysql语言操作
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            console.log(err)
            reject( err )
          } else {
            resolve( rows )
          }
          //结束链接
          connection.release()
        })
      }
    })
  })
}

// 后端账号表
let user = `create table if not exists user_b(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL COMMENT '用户名',
  pass VARCHAR(100) NOT NULL COMMENT '密码',
  email VARCHAR(100) NOT NULL COMMENT '邮箱',
  PRIMARY KEY ( id )
);`;

// 前端账号表
let users = `create table if not exists users_a(
  user_id varchar(30) NOT NULL COMMENT '用户id', 
  user_name VARCHAR(30) NOT NULL COMMENT '用户名',
  name VARCHAR(30) NOT NULL COMMENT '姓名',
  password VARCHAR(30) NOT NULL COMMENT '密码',
  birthday date NULL COMMENT '出生日期',
  sex int(2) NULL COMMENT '性别',
  phone varchar(20) NOT NULL COMMENT '电话号码',
  user_type int(2) NOT NULL COMMENT '用户类型',
  studenid varchar(20) NULL COMMENT '学号',
  PRIMARY KEY ( user_id )
);`;

// // 模块表
// let Class = `create table if not exists class(
//   id INT NOT NULL AUTO_INCREMENT,
//   name VARCHAR(100) NOT NULL COMMENT '名称',
//   time DATETIME NOT NULL COMMENT '创建时间',
//   newtime DATETIME NOT NULL COMMENT '修改时间',
//   username INT(40) NOT NULL COMMENT '创建人',
//   number VARCHAR(100) NOT NULL COMMENT '文章量',
//   PRIMARY KEY ( id )
// );`;

// // 案例表
// let Article = `create table if not exists article(
//   id INT NOT NULL AUTO_INCREMENT,
//   title VARCHAR(100) NOT NULL COMMENT '标题',
//   img VARCHAR(225) NOT NULL COMMENT '图片',
//   class INT(40) NOT NULL COMMENT '类别',
//   onclick INT(100) NOT NULL COMMENT '浏览量',
//   value VARCHAR(225) COMMENT '内容',
//   time DATETIME NOT NULL COMMENT '创建时间',
//   newtime DATETIME NOT NULL COMMENT '修改时间',
//   username INT(40) NOT NULL COMMENT '创建人',
//   PRIMARY KEY ( id )
// );`;

// // 关于我们
// let About = `create table if not exists about(
//   id INT NOT NULL AUTO_INCREMENT,
//   email VARCHAR(100) NOT NULL COMMENT '邮箱' DEFAULT '',
//   QQ VARCHAR(225) NOT NULL COMMENT 'QQ' DEFAULT '',
//   wechat VARCHAR(225) NOT NULL COMMENT '微信' DEFAULT '',
//   PRIMARY KEY ( id )
// );`;

let createTable = sql => {
  return query(sql, []);
};
createTable(user);
createTable(users);
// createTable(Class);
// createTable(Article);
// createTable(About);

// 获取表单总数量
exports.Table = ( value ) => {
  let _sql = `SELECT COUNT(id) as total FROM ${value}`;
  return query( _sql, value )
}

// // 后台用户
// // 后端账号注册
// exports.userAdd = ( value ) => {
//   let _sql = "INSERT INTO user SET name=?,pass=?,avator=?,email=?,time=?,newtime=?,vip=?;"
//   return query( _sql, value )
// }
// // 后端账号登录
// exports.userName = ( value ) => {
//   let _sql = `SELECT * FROM user WHERE name="${value}"`;
//   return query( _sql, value )
// }
// 后端账号登录
exports.userFind = ( value ) => {
  let _sql = `SELECT * FROM user_b WHERE name="${value.username}" AND pass="${value.password}" `;
  return query( _sql, value )
}
// // 后端账号修改
exports.UserUpdate = ( value ) => {
  let _sql = `UPDATE user_b SET name="${value.name}", pass="${value.password}", email="${value.email}" WHERE id="${value.id}" `;
  return query( _sql, value )
}

// 前端账号增加
exports.usersAdd = ( value ) => {
  let _sql = `INSERT INTO users_a SET user_id="${value.user_id}",user_type="${value.user_type}", user_name="${value.user_name}",password="${value.password}",phone="${value.phone}",studenid="${value.studenid}";`
  return query( _sql, value )
}
// 前端用户账号查询
exports.usersFind = ( value ) => {
  let _sql = `SELECT * FROM users_a where user_type=0`;
  return query( _sql, value )
} 
// 骑手账号查询
exports.courierFind = ( value ) => {
  let _sql = `SELECT * FROM users_a where user_type=1`;
  return query( _sql, value )
} 
// // 前端账号修改
exports.usersupdate = ( value ) => {
  let _sql = `UPDATE users_a SET password="${value.password}", newtime="${value.newtime}" WHERE user_id="${value.id}"`;
  return query( _sql, value )
}
// // 前端账号删除
// exports.usersDelete = ( id ) => {
//   let _sql = `DELETE FROM users WHERE id="${id}"`;
//   return query( _sql, id )
// }

// 模块列表查询
exports.ClassFind = ( value ) => {
  let _sql = `SELECT 
    *
  FROM 
    class LEFT JOIN user_b 
  `;
  return query( _sql, value )
}
// 模块增加
exports.ClassAdd = ( value ) => {
  let _sql = `INSERT INTO class SET name="${value.name}",time="${value.time}",newtime="${value.newtime}",username="${value.usernameId}",number="${value.number}"`;
  return query( _sql, value )
}
// // 模块修改
// exports.ClassUpdateName = ( value ) => {
//   let _sql = `UPDATE class SET name="${value.name}", newtime="${value.newtime}" WHERE id="${value.id}"`;
//   return query( _sql, value )
// }
// // 模块文章量修改
// exports.ClassNumber = ( value ) => {
//   let _sql = `UPDATE class SET number="${value.number}" WHERE id="${value.id}"`;
//   return query( _sql, value )
// }
// // 模块删除
// exports.ClassDelete = ( id ) => {
//   let _sql = `DELETE FROM class WHERE id="${id}"`;
//   return query( _sql, id )
// }

// // 资讯文章数量
// exports.ArticleClass = ( id ) => {
//   let _sql = `SELECT * FROM article WHERE class=${id}`;
//   return query( _sql, id )
// }
// // 资讯内容增加
// exports.ArticleAdd = ( value ) => {
//   let _sql = `INSERT INTO article SET 
//     title='${value.title}',
//     img='${value.img}',
//     class='${value.class}',
//     OnClick='${value.OnClick}',
//     value='${value.value}',
//     time='${value.time}',
//     username='${value.username}',
//     newtime='${value.newtime}'`
//   return query( _sql, value )
// }
// // 资讯删除
// exports.ArticleDelete = ( id ) => {
//   let _sql = `DELETE FROM article WHERE id="${id}"`;
//   return query( _sql, id )
// } 
// // 资讯修改
// exports.ArticleUpdate = ( value ) => {
//   let _sql = `UPDATE 
//     article 
//   SET 
//     title='${value.title}',
//     img='${value.img}',
//     class='${value.class}',
//     OnClick='${value.onclick}',
//     value='${value.value}',
//     newtime='${value.newtime}'
//   WHERE 
//     id="${value.id}"`;
//   return query( _sql, value )
// }
// // 资讯列表查询
// exports.ArticleFind = ( value ) => {
//   let _sql = `SELECT
//     article.id,
//     article.title,
//     article.img,
//     article.onclick,
//     article.value,
//     article.time,
//     article.newtime,
//     class.name,
//     user.name as username,
//     class.id as classid
//   FROM 
//     article 
//   LEFT JOIN class on article.class = class.id
//   LEFT JOIN user on article.username = user.id
//   order by id desc limit ${(value.page-1)*value.pagesize},${value.page*value.pagesize};`;
//   return query( _sql, value )
// }
// // 资讯详情
// exports.ArticleDetails = ( id ) => {
//   let _sql = `SELECT * FROM article WHERE id=${id}`;
//   return query( _sql, id )
// }

// // 关于我们查询
// exports.AboutFind = ( value ) => {
//   let _sql = `SELECT * FROM about`;
//   return query( _sql, value )
// }
// // 关于我们增加
// exports.AboutAdd = ( value ) => {
//   let _sql = `INSERT INTO about SET email="${value.email}",QQ="${value.QQ}",wechat="${value.wechat}"`;
//   return query( _sql, value )
// }
// // 关于我们修改
// exports.AboutUpdate = ( value ) => {
//   let _sql = `UPDATE about SET email="${value.email}", QQ="${value.QQ}", wechat="${value.wechat}" WHERE id="${value.id}"`;
//   return query( _sql, value )
// }

// // 前端数据处理
// // 轮播图
// exports.Banner = ( value ) => {
//   let _sql = `SELECT * from article  ORDER BY onclick DESC LIMIT 5`;
//   return query( _sql, value )
// }
// // 模糊查询
// exports.query = ( value ) => {
//   let _sql = `SELECT
//     article.id,
//     article.title,
//     article.img,
//     article.onclick,
//     article.value,
//     article.time,
//     article.newtime,
//     class.name,
//     user.name as username,
//   FROM 
//     article 
//   LEFT JOIN class on article.class = class.id
//   LEFT JOIN user on article.username = user.id
//   where CONCAT(IFNULL(title,''),IFNULL(value,'')) like '%${value}%'`;
//   return query( _sql, value )
// }
// // 资讯列表查询
// exports.NavArticle = ( value ) => {
//   let _sql = `SELECT
//     article.id,
//     article.title,
//     article.img,
//     article.onclick,
//     article.value,
//     article.time,
//     article.newtime,
//     class.name,
//     user.name as username
//   FROM 
//     article 
//   LEFT JOIN class on article.class = class.id
//   LEFT JOIN user on article.username = user.id
//   WHERE class = ${value.id}
//   order by id desc limit ${(value.page-1)*value.pagesize},${value.page*value.pagesize};`;
//   return query( _sql, value )
// }