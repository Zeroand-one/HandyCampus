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

let createTable = sql => {
  return query(sql, []);
};

createTable(orders);

// 获取表单总数量
exports.Table = ( value ) => {
  let _sql = `SELECT COUNT(id) as total FROM ${value}`;
  return query( _sql, value )
}

// *****************************我的****************************//

// 获取个人信息
exports.getPhoneUserInfo = ( value ) => {
  let _sql = `SELECT * FROM user1 where phone='${value}'  `;
  return query( _sql, value )
} 
