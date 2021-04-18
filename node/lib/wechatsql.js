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
  address_det VARCHAR(300) NOT NULL COMMENT '详细地址',
  address_name VARCHAR(30) NOT NULL COMMENT '地址名称',
  address_username VARCHAR(30) NOT NULL COMMENT '姓名',
  address_iphone VARCHAR(30) NOT NULL COMMENT '电话',
  PRIMARY KEY ( user_id )
);`;
// 订单地址表
let orderAddres = `create table if not exists orderAddres(
  order_adr_id varchar(30) NOT NULL COMMENT '订单id', 
  get_address_det VARCHAR(300) NOT NULL COMMENT '起始详细地址',
  get_address_name VARCHAR(30) NOT NULL COMMENT '起始地址名称',
  get_address_username VARCHAR(30) NOT NULL COMMENT '起始姓名',
  get_address_iphone VARCHAR(30) NOT NULL COMMENT '起始电话', 
  set_address_det VARCHAR(300) NOT NULL COMMENT '终详细地址',
  set_address_name VARCHAR(30) NOT NULL COMMENT '终地址名称',
  set_address_username VARCHAR(30) NOT NULL COMMENT '终姓名',
  set_address_iphone VARCHAR(30) NOT NULL COMMENT '终电话',
  PRIMARY KEY ( order_adr_id )
);`;
// INSERT INTO oftenAddres SET address_username="twre",address_iphone="43512341",address_name="还不如特别",address_det="法国人务必确认",user_id="234123412351324";

// SELECT * FROM users_a,oftenAddres WHERE users_a.user_id=oftenAddres.user_id and users_a.user_id='22345234';

let createTable = sql => {
  return query(sql, []);
};

createTable(orders);
createTable(oftenAddres);
createTable(orderAddres);

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
  let _sql = `SELECT * FROM users_a where user_id="${value}"`;
  return query( _sql, value )
} 

// 用户修改
exports.userAuthUpdata = ( value ) => {
  let _sql = `UPDATE users_a SET user_name="${value.user_name}",birthday="${value.birthday}", name="${value.name}",address="${value.address}",phone="${value.phone}",sex="${value.sex}",studenid="${value.studenid}" WHERE user_id="${value.user_id}"`;
  return query( _sql, value )
}

// 关于我们查询
exports.AboutFind = ( value ) => {
  let _sql = `SELECT * FROM about_info`;
  return query( _sql, value )
}

// ******************************courier骑手管理***************************//

// 申请成为骑手
exports.userCourierAdd = ( value ) => {
  let _sql = `UPDATE users_a SET user_name="${value.user_name}",birthday="${value.birthday}", name="${value.name}",address="${value.address}",phone="${value.phone}",sex="${value.sex}",studenid="${value.studenid}",user_type="${value.user_type}",request_date="${value.request_date}" WHERE user_id="${value.user_id}"`;
  return query( _sql, value )
}

// 查看已发布订单列表
exports.orderOpenListFind = ( value ) => {
  let _sql = `select * FROM orders  WHERE order_state=2 or order_state=4  order by start_date desc;`
  return query( _sql, value )
}

// 接受订单
exports.courierAddOrder = ( value ) => {
  let _sql = `UPDATE orders SET receive_date="${value.receive_date}",courier_name="${value.courier_name}",courier_id="${value.courier_id}",order_state=3 WHERE order_id="${value.order_id}"`;
  return query( _sql, value )
}

// 骑手查询全部订单
exports.courierFindAllOrder = ( value ) => {
  let _sql = `select * FROM orders  WHERE courier_id="${value.courier_id}" order by start_date desc`;
  return query( _sql, value )
}

// ******************************常用地址表***************************//

// 用户常用地址表列表查询
exports.oftenAddresFindId = ( value ) => {
  let _sql = `SELECT * FROM oftenAddres WHERE user_id ="${value}";`;
  return query( _sql, value )
}

// 用户常用地址表信息查询
exports.oftenAddresFindInfoId = ( value ) => {
  let _sql = `SELECT * FROM oftenAddres WHERE nid ="${value.nid}";`;
  console.log(_sql)
  return query( _sql, value )
}

// 常用地址表添加
exports.oftenAddresAdd = ( value ) => {
  let _sql = `INSERT INTO oftenAddres SET address_username="${value.address_username}",address_iphone="${value.address_iphone}",address_name="${value.address_name}",address_det="${value.address_det}",user_id="${value.user_id}";`
  return query( _sql, value )
}

// 常用地址表加用户查询
exports.oftenAddresFind = ( value ) => {
  let _sql = `SELECT * FROM users_a,oftenAddres WHERE users_a.user_id=oftenAddres.user_id AND users_a.user_id="${value}";`;
  return query( _sql, value )
}

// // 常用地址表修改
exports.oftenAddresUpdate = ( value ) => {
  let _sql = `UPDATE oftenAddres SET  address_username="${value.address_username}",address_iphone="${value.address_iphone}",address_name="${value.address_name}",address_det="${value.address_det}" WHERE nid="${value.nid}" `;
  return query( _sql, value )
}


// **********************************主页推荐*********************************//
// 查看主页推荐图片
exports.indexBannerFind = ( value ) => {
  let _sql = `select * FROM index_banner ;`
  return query( _sql, value )
}


// **********************************订单地址表*********************************//
// 查看订单地址表
exports.orderAddresFind = ( value ) => {
  let _sql = `select * FROM orderAddres  WHERE order_adr_id="${value}" ;`
  return query( _sql, value )
}


// **********************************订单表*********************************//

// 新增订单
exports.orderAdd = ( value ) => {
  let _sql = `INSERT INTO orders SET user_id="${value.user_id}",name="${value.name}",order_id="${value.order_id}",order_state="${value.order_state}",order_body="${value.order_body}",order_address="${value.order_address}",order_weight="${value.order_weight}",goods_type="${value.goods_type}",order_type="${value.order_type}",money="${value.money}",start_date="${value.start_date}";`
  return query( _sql, value )
}


// 新增订单地址
exports.orderAddAddres = ( value ) => {
  let _sql = `INSERT INTO orderAddres SET get_address_det="${value.get_address_det}",get_address_name="${value.get_address_name}",get_address_username="${value.get_address_username}",get_address_iphone="${value.get_address_iphone}",set_address_det="${value.set_address_det}",set_address_name="${value.set_address_name}",set_address_username="${value.set_address_username}",set_address_iphone="${value.set_address_iphone}",order_adr_id="${value.order_adr_id}";`
  return query( _sql, value )
}


// 订单图片
exports.orderImg = ( value ) => {
  let _sql = `UPDATE orders SET order_img="${value.order_img}" WHERE order_id="${value.order_id}";`
  return query( _sql, value )
}

// 查看用户订单列表
exports.orderListFind = ( value ) => {
  let _sql = `select * FROM orders  WHERE user_id="${value}"  order by start_date desc;`
  return query( _sql, value )
}

// 按条件查看用户订单列表
exports.orderListTypeFind = ( value ) => {
  let _sql = ''
  if (value.type==2){
    _sql = `select * FROM orders  WHERE user_id="${value.id}" and ( order_state=0 or order_state=1);`
  }else if (value.type==3){
    _sql = `select * FROM orders  WHERE user_id="${value.id}" and (order_state=2 or order_state=3 or order_state=4 );`
  }
  return query( _sql, value )
}

// 查看用户订单详情
exports.orderInfoFind = ( value ) => {
  let _sql = `SELECT * FROM orders,orderaddres WHERE orders.order_id=orderaddres.order_adr_id and orders.order_id="${value}" ;`
  return query( _sql, value )
}

// 用户支付订单
exports.orderPay = ( value ) => {
  let _sql = `UPDATE orders SET open_date="${value.open_date}", order_state="${value.order_state}" WHERE order_id="${value.order_id}";`
  return query( _sql, value )
}

// 用户评价
exports.orderClientEstimate = ( value ) => {
  let _sql = `UPDATE orders SET user_estimate="${value.user_estimate}", estimate_star="${value.estimate_star}" WHERE order_id="${value.order_id}";`
  return query( _sql, value )
}

// 骑手点击完成
exports.orderFinish = ( value ) => {
  let _sql = `UPDATE orders SET end_date="${value.end_date}", order_state="${value.order_state}" WHERE order_id="${value.order_id}";`
  return query( _sql, value )
}

// 骑手反馈
exports.orderCourierBack = ( value ) => {
  let _sql = `UPDATE orders SET courier_back="${value.courier_back}" WHERE order_id="${value.order_id}";`
  return query( _sql, value )
}

// **********************************意见反馈*********************************//

// 提交意见反馈
exports.feedbackAdd = ( value ) => {
  let _sql = `INSERT INTO messages SET user_id="${value.user_id}",message_body="${value.message_body}",start_date="${value.start_date}",message_img="${value.message_img}",message_email="${value.message_email}",message_qq="${value.message_qq}",message_title="${value.message_title}";`
  return query( _sql, value )
}
