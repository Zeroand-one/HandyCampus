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



// 订单表
let orders = `create table if not exists orders(
  user_id varchar(30) NOT NULL COMMENT '用户id', 
  user_name VARCHAR(30) NOT NULL COMMENT '用户名',
  name VARCHAR(30) NOT NULL COMMENT '姓名',
  order_id VARCHAR(30) NOT NULL COMMENT '订单id',		
  order_state INT(2) NOT NULL COMMENT '订单状态',
  order_title VARCHAR(40) NOT NULL COMMENT '订单标题',
  order_body VARCHAR(500) NOT NULL COMMENT '订单内容',
  order_address VARCHAR(100) NOT NULL COMMENT '订单地址',
  order_img varchar(10) NULL  COMMENT '内容图片',
  money varchar(10) NULL  COMMENT '金额',
  start_date datetime NOT NULL COMMENT '创建时间',
  open_date datetime NULL COMMENT '发布时间',
  receive_date datetime NULL COMMENT '接收时间',
  transfer_date datetime NULL COMMENT '转让时间',
  end_date date NULL COMMENT '结束时间',
  order_type int(2) NOT NULL COMMENT '订单类型',
  courier_id varchar(30)  NULL COMMENT '骑手id',
  courier_name VARCHAR(30)  NULL COMMENT '骑手名字',
  user_estimate varchar(400) NULL COMMENT '用户评价',
  courier_back varchar(400) NULL COMMENT '骑手反馈',
  PRIMARY KEY ( user_id )
);`;

// INSERT INTO orders SET user_id="41432423",user_name="我很帅",name="李四",order_id="412335132412",order_state="1",order_title="找东西",order_body="我很帅我很帅我很帅我很帅我很帅我很帅我很帅",order_address="25栋303",money="11",order_type="2",courier_id="132421351",courier_name="天才";

// 常用地址表
let oftenAddres = `create table if not exists oftenAddres(
  user_id varchar(30) NOT NULL COMMENT '用户id', 
  address_det VARCHAR(30) NOT NULL COMMENT '详细地址',
  address_name VARCHAR(30) NOT NULL COMMENT '地址名称',
  address_username VARCHAR(30) NOT NULL COMMENT '姓名',
  address_iphone VARCHAR(30) NOT NULL COMMENT '电话',
  PRIMARY KEY ( user_id )
);`;
// INSERT INTO oftenAddres SET address_username="twre",address_iphone="43512341",address_name="还不如特别",address_det="法国人务必确认",user_id="234123412351324";

// SELECT * FROM users_a,oftenAddres WHERE users_a.user_id=oftenAddres.user_id and users_a.user_id='22345234';

let createTable = sql => {
  return query(sql, []);
};

createTable(orders);
createTable(oftenAddres);

// 获取表单总数量
exports.Table = ( value ) => {
  let _sql = `SELECT COUNT(id) as total FROM ${value}`;
  return query( _sql, value )
}

// ******************************用户表***************************//

// 注册用户
exports.userAuth = ( value ) => {
  let _sql = `INSERT INTO users_a SET user_id="${value.user_id}",user_type="${value.user_type}", user_name="${value.user_name}",phone="${value.phone}",address="${value.address}",sex="${value.sex}";`
  return query( _sql, value )
}

// 用户查询
exports.userAuthFind = ( value ) => {
  let _sql = `SELECT * FROM users_a where user_id=${value}`;
  return query( _sql, value )
} 

// // 用户修改
exports.userAuthUpdata = ( value ) => {
  let _sql = `UPDATE users_a SET user_id="${value.user_id}",user_type="${value.user_type}", user_name="${value.user_name}", name="${value.name}",address="${value.address}",phone="${value.phone}",sex="${value.sex}",studenid="${value.studenid}" WHERE user_id="${value.user_id}"`;
  return query( _sql, value )
}


// ******************************常用地址表***************************//

// 常用地址表添加
exports.oftenAddresAdd = ( value ) => {
  let _sql = `INSERT INTO oftenAddres SET address_username="${value.address_username}",address_iphone="${value.address_det}",address_name="${value.address_det}",address_det="${value.address_det}",user_id="${value.user_id}";`
  return query( _sql, value )
}

// 常用地址表查询
exports.oftenAddresFind = ( value ) => {
  let _sql = `SELECT * FROM users_a,oftenAddres WHERE users_a.user_id=oftenAddres.user_id AND users_a.user_id="${value}";`;
  return query( _sql, value )
}

// // 常用地址表修改
exports.UserUpdate = ( value ) => {
  let _sql = `UPDATE oftenAddres SET name="${value.name}", pass="${value.password}", email="${value.email}", avator="${value.avator}" WHERE id="${value.id}" `;
  return query( _sql, value )
}
