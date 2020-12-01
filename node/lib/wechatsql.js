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
  money mediumtext NULL  COMMENT '金额',
  start_date date NOT NULL COMMENT '创建时间',
  open_date date NULL COMMENT '发布时间',
  receive_date date NULL COMMENT '接收时间',
  transfer_date date NULL COMMENT '转让时间',
  end_date date NULL COMMENT '结束时间',
  order_type int(2) NOT NULL COMMENT '订单类型',
  courier_id varchar(30)  NULL COMMENT '骑手id',
  courier_name VARCHAR(30)  NULL COMMENT '骑手名字',
  user_estimate varchar(400) NULL COMMENT '用户评价',
  courier_back varchar(400) NULL COMMENT '骑手反馈',
  PRIMARY KEY ( user_id )
);`;



let createTable = sql => {
  return query(sql, []);
};

createTable(orders);

// 获取表单总数量
exports.Table = ( value ) => {
  let _sql = `SELECT COUNT(id) as total FROM ${value}`;
  return query( _sql, value )
}

// 查询
exports.orderFind = ( value ) => {
  let _sql = `SELECT * FROM orders`;
  return query( _sql, value )
} 

// 新增订单
exports.orderAdd = ( value ) => {
  let _sql = `INSERT INTO orders SET user_id="${value.user_id}",user_name="${value.user_name}",name="${value.name}",order_id="${value.order_id}",order_state="${value.order_state}",order_title="${value.order_title}",order_body="${value.order_body}",order_address="${value.order_address}",money="${value.money}",start_date="${value.start_date}",open_date="${value.open_date}",receive_date="${value.receive_data}",order_type="${value.order_type}",courier_id="${value.courier_id}",courier_name="${value.courier_name}";`
  return query( _sql, value )
}

// 修改订单
exports.orderImg = ( value ) => {
  let _sql = `UPDATE orders SET order_img="${value.order_img}" WHERE order_id="${value.order_id}";`
  return query( _sql, value )
}
// INSERT INTO orders SET user_id="41432423",user_name="霍比特人和",name="热",order_id="42534534",order_state="1",order_title="bfs",order_body="弄死他人社厅",order_address="火热额",money="44",order_type="1",courier_id="4153432",courier_name="哈哈巴尔";











