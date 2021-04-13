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
  img VARCHAR(100)  NULL COMMENT '头像',
  PRIMARY KEY ( id )
);`;

// 前端账号表
let users = `create table if not exists users_a(
  user_id varchar(30) NOT NULL COMMENT '用户id', 
  user_name VARCHAR(30) NOT NULL COMMENT '用户名',
  name VARCHAR(30) NULL COMMENT '姓名',
  address VARCHAR(100)  NULL COMMENT '地址',
  password VARCHAR(30) NOT NULL COMMENT '密码',
  birthday date NULL COMMENT '出生日期',
  sex int(2) NULL COMMENT '性别',
  phone varchar(20) NOT NULL COMMENT '电话号码',
  user_type int(2) NOT NULL COMMENT '用户类型',
  studenid varchar(20) NULL COMMENT '学号',
  PRIMARY KEY ( user_id )
);`;


// 关于我们
let AboutInfo = `create table if not exists about_info(
  id INT NOT NULL AUTO_INCREMENT,
  about_email VARCHAR(100) NULL COMMENT '邮箱',
  about_QQ VARCHAR(100) NULL COMMENT 'QQ',
  about_wechat VARCHAR(100) NULL COMMENT '微信',
  about_phone VARCHAR(100) NULL COMMENT '电话' ,
  PRIMARY KEY ( id )
);`;


// 消息反馈表
let Messages = `create table if not exists messages(
  id INT NOT NULL AUTO_INCREMENT,
  user_id varchar(30) NOT NULL COMMENT '用户id', 
  message_email VARCHAR(100) NULL COMMENT '邮箱' ,
  message_qq VARCHAR(100) NULL COMMENT 'QQ' ,
  message_title VARCHAR(100) NOT NULL COMMENT '标题' ,
  message_body VARCHAR(300) NOT NULL COMMENT '内容' ,
  message_img VARCHAR(100) NULL COMMENT '图片' ,
  start_date datetime NOT NULL COMMENT '创建时间' ,
  read_state int NULL COMMENT '阅读状态' ,
  write_back VARCHAR(300) NULL COMMENT '回复' ,
  PRIMARY KEY ( id )
);`;

// 创建数据
// INSERT INTO users_a SET user_id='8474657',user_type='1',sex=0, user_name='5654bfb',birthday='2020-11-02',password='4sgf5',phone='27904',studenid='237465744';
// INSERT INTO users_a SET user_id='645863754',user_type='1',sex=0, user_name='agdfg',birthday='2020-11-02',password='4sgd5',phone='246978906',studenid='23674564';
// INSERT INTO users_a SET user_id='7488u563745',user_type='1',sex=0, user_name='agdfgar',birthday='2020-11-02',password='4sgbr5',phone='245674',studenid='2376454';
// INSERT INTO users_a SET user_id='563853756',user_type='1',sex=1, user_name='afgrbareb',birthday='2020-11-02',password='45gzr',phone='24657',studenid='247534';
// INSERT INTO users_a SET user_id='83568745',user_type='1',sex=1, user_name='baerbaer',birthday='2020-11-02',password='45hahearehb',phone='2745674',studenid='267484534';

// INSERT INTO messages SET user_id='432342534',message_qq='312674615',message_email='1gahg32lu@qq.com',message_title='标题1', message_body='内容',start_date='2020-10-02',read_state=1;

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

let createTable = sql => {
  return query(sql, []);
};
createTable(user);
createTable(users);
// createTable(Class);
createTable(Messages);
createTable(AboutInfo);

// 获取表单总数量
exports.Table = ( value ) => {
  let _sql = `SELECT COUNT(id) as total FROM ${value}`;
  return query( _sql, value )
}

// *****************************后台用户****************************//

// 后端账号注册
exports.userAdd = ( value ) => {
  let _sql = `INSERT INTO user_b SET name="${value.name}",pass="${value.pass}",email="${value.email}";`
  return query( _sql, value )
}

// 后台账号登录
exports.userName = ( value ) => {
  let _sql = `SELECT * FROM user_b WHERE name="${value}"`;
  return query( _sql, value )
}

// 后端账号登录
exports.userFind = ( value ) => {
  let _sql = `SELECT * FROM user_b WHERE name="${value.username}" AND pass="${value.password}" `;
  return query( _sql, value )
}

// // 后端账号修改
exports.UserUpdate = ( value ) => {
  let _sql = `UPDATE user_b SET name="${value.name}", pass="${value.password}", email="${value.email}", avator="${value.avator}" WHERE id="${value.id}" `;
  return query( _sql, value )
}


// *****************************前端用户****************************//

// 前端账号增加
exports.usersAdd = ( value ) => {
  let _sql = `INSERT INTO users_a SET user_id="${value.user_id}",user_type="${value.user_type}", user_name="${value.user_name}",phone="${value.phone}",address="${value.address}",studenid="${value.studenid}";`
  return query( _sql, value )
}

// 前端用户账号查询
exports.usersFind = ( value ) => {
  let _sql = `SELECT * FROM users_a where user_type=0`;
  return query( _sql, value )
} 

// 前端账号修改
exports.usersupdate = ( value ) => {
  let _sql = `UPDATE users_a SET user_id="${value.user_id}",user_type="${value.user_type}", user_name="${value.user_name}", name="${value.name}",address="${value.address}",phone="${value.phone}",sex="${value.sex}",studenid="${value.studenid}" WHERE user_id="${value.user_id}"`;
  return query( _sql, value )
}
// // 前端账号删除
exports.usersDelete = ( id ) => {
  let _sql = `DELETE FROM users_a WHERE user_id="${id}"`;
  return query( _sql, id )
}

// 前端用户账号搜索
exports.usersFindSearch = ( value ) => {
  let _sql = `SELECT * FROM users_a where  user_type=0 and ( user_id like '%${value}%' or name like '%${value}%'  or phone like '%${value}%'  or user_name like '%${value}%'   or address like '%${value}%'   or studenid like '%${value}%' ) `;
  return query( _sql, value )
} 

// *****************************前端骑手****************************//

// 骑手账号查询
exports.courierFind = ( value ) => {
  let _sql = `SELECT * FROM users_a where user_type=1`;
  return query( _sql, value )
} 

// 骑手账号搜索
exports.courierFindSearch = ( value ) => {
  let _sql = `SELECT * FROM users_a where  user_type=1 and ( user_id like '%${value}%' or name like '%${value}%'  or phone like '%${value}%'  or user_name like '%${value}%'   or address like '%${value}%'   or studenid like '%${value}%' ) `;
  return query( _sql, value )
} 

// 申请成为骑手查询列表
exports.courierAddFindList = ( value ) => {
  let _sql = `SELECT * FROM users_a where user_type=2`;
  return query( _sql, value )
} 

// 申请成为骑手账号查询
exports.courierAddFindId = ( value ) => {
  let _sql = `SELECT * FROM users_a where user_id="${value}"`;
  return query( _sql, value )
} 

// 管理成为骑手账号
exports.courierManageId = ( value ) => {
  let _sql = `UPDATE users_a SET user_type="${value.user_type}" where user_id="${value.id}"`;
  return query( _sql, value )
} 

// *****************************关于我们****************************//


// 关于我们查询
exports.AboutFind = ( value ) => {
  let _sql = `SELECT * FROM about_info`;
  return query( _sql, value )
}
// 关于我们增加
exports.AboutAdd = ( value ) => {
  let _sql = `INSERT INTO about_info SET about_email="${value.about_email}",about_QQ="${value.about_QQ}",about_wechat="${value.about_wechat}",about_phone="${value.about_phone}"`;
  return query( _sql, value )
}
// 关于我们修改
exports.AboutUpdate = ( value ) => {
  let _sql = `UPDATE about_info SET about_email="${value.about_email}",about_QQ="${value.about_QQ}",about_wechat="${value.about_wechat}",about_phone="${value.about_phone}" WHERE id="${value.id}"`;
  return query( _sql, value )
}

// *****************************反馈****************************//

// 查询全部反馈
exports.messagesFindAll = ( value ) => {
  let _sql = `SELECT * FROM messages`;
  return query( _sql, value )
}

// 查询未读反馈
exports.messagesFindRead = ( value ) => {
  let _sql = `SELECT * FROM messages WHERE read_state="${value}"`;
  return query( _sql, value )
}

// 根据id查看
exports.messagesFindId = ( value ) => {
  let _sql = `SELECT * FROM messages WHERE id="${value}";`;
  return query( _sql, value )
}

// 根据id修改查看状态
exports.messagesFindReadId = ( value ) => {
  let _sql = `UPDATE messages SET read_state=1 WHERE id="${value.id}";`;
  return query( _sql, value )
}

// 反馈回复
exports.messagesUpdate = ( value ) => {
  let _sql = `UPDATE messages SET write_back="${value.write_back}" WHERE id="${value.id}"`;
  return query( _sql, value )
}

// 反馈删除
exports.messagesDelete = ( value ) => {
  let _sql = `DELETE FROM messages WHERE id="${value.id}"`;
  return query( _sql, value )
}


// 反馈关键字搜索
exports.messagesFindSearch = ( value ) => {
  let _sql = `SELECT * FROM messages where  user_id like '%${value}%' or message_email like '%${value}%'  or message_qq like '%${value}%'  or message_title like '%${value}%'   or write_back like '%${value}%'   `;
  return query( _sql, value )
} 


// **********************************订单*********************************//

// 订单查询
exports.orderFind = ( value ) => {
  let _sql = `SELECT * FROM orders,orderAddres where orders.order_id=orderAddres.order_adr_id`;
  return query( _sql, value )
}


// 新增订单
exports.orderAdd = ( value ) => {
  let _sql = `INSERT INTO orders SET user_id="${value.user_id}",user_name="${value.user_name}",order_id="${value.order_id}",order_state="${value.order_state}",order_title="${value.order_title}",order_body="${value.order_body}",order_type="${value.order_type}",order_address="${value.order_address}",money="${value.money}",start_date="${value.start_date}";`
  return query( _sql, value )
}

// 修改订单图片
exports.orderImg = ( value ) => {
  let _sql = `UPDATE orders SET order_img="${value.order_img}" WHERE order_id="${value.order_id}";`
  return query( _sql, value )
}

// 后台修改订单
exports.vueOrderUpdate = ( value ) => {
  let _sql = 'UPDATE orders SET '
  Object.keys(value).forEach(function (key) {
    if (typeof value[key] == "number") {
      _sql = " " + _sql + key + "=" + value[key] + ", ";
    } else {
      if (value[key]) {
        _sql = " " + _sql + key + "='" + value[key] + "', ";
      } else {
        _sql =  _sql;
      }
    }
  });
  _sql = _sql.substring(0, _sql.length - 2);
  _sql=_sql+" WHERE order_id='"+value.order_id+"'"
  return query( _sql, value )
}

// 后台删除订单
exports.vueOrderDelete = ( id ) => {
  let _sql = `DELETE FROM orders WHERE order_id="${id}"`;
  return query( _sql, id )
}

// 订单开始时间搜索
exports.orderStartTimeSearch = ( value ) => {
  let _sql = `select * FROM orders where start_date >='${value.start_time}'  and start_date < '${value.end_time}'`;
  return query( _sql, value )
} 

// 订单关键字搜索
exports.orderKeySearch = ( value ) => {
  let _sql = `SELECT * FROM orders where user_id like '%${value}%' or name like '%${value}%' or order_title like '%${value}%' or order_id like '%${value}%' or user_name like '%${value}%' or order_body like '%${value}%' or order_address like '%${value}%' or courier_id like '%${value}%' or courier_name like '%${value}%' or user_estimate like '%${value}%' or courier_back like '%${value}%' `;
  return query( _sql, value )
} 


// **********************************常用地址簿*********************************//

// 常用地址簿查询
exports.adminOftenAddresFind = ( value ) => {
  let _sql = `SELECT * FROM oftenAddres`;
  return query( _sql, value )
} 


// 后台修改常用地址簿
exports.adminOftenAddresUpdate = ( value ) => {
  let _sql = `UPDATE oftenAddres SET address_username="${value.address_username}",address_iphone="${value.address_iphone}",address_name="${value.address_name}",address_det="${value.address_det}",user_id="${value.user_id}" WHERE nid="${value.nid}"`;
  return query( _sql, value )
}

// 后台删除常用地址簿
exports.adminOftenAddresDelete = ( value ) => {
  let _sql = `DELETE FROM oftenAddres WHERE nid="${value.nid}"`;
  return query( _sql, value )
}

// 常用地址簿关键字搜索
exports.adminOftenAddresKeySearch = ( value ) => {
  let _sql = `SELECT * FROM oftenAddres where user_id like '%${value}%' or address_username like '%${value}%' or address_iphone like '%${value}%' or address_name like '%${value}%' or address_det  `;
  return query( _sql, value )
} 


// **********************************主页推荐*********************************//
// 查看主页推荐图片
exports.indexBannerFind = ( value ) => {
  let _sql = `select * FROM index_banner ;`
  return query( _sql, value )
}

// 修改主页推荐图片
exports.indexBannerImg = ( value ) => {
  let _sql = `UPDATE index_banner SET img="${value.img}" WHERE id="1";`
  return query( _sql, value )
}



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