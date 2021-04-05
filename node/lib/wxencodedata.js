// let WXBizDataCrypt = require('./WXBizDataCrypt'); // 解密文件
// const koa2Req = require('koa2-request'); // 请求库

// const wxOpenid={
//   getOpenid(code){// 单文件上传
//     let appId = 'wx1d437aba0edeef5b',
//     AppSecret = '2a02a47decad24738fd119f078c79707';
//     let { code, encryptedData, iv} = ctx.request.body; // 获取code, encryptedData, iv
    
//     const qres = await koa2Req({
//       url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`
//     })
    
//     let body = JSON.parse(qres.body); 
//     let { session_key } = body; // 获取 session_key
    
    
//     // 把加密数据里的空格换成+号，因为在传输过程中，服务器会把+号替换为空格。
//     encryptedData = encryptedData.replace(/ /g,'+')
//     iv = iv.replace(/ /g,'+');
    
//     var pc = new WXBizDataCrypt(appId, body.session_key);  // 生成解密钥匙
//     var encodedata = pc.decryptData(res.encryptedData,res.iv); //  获取解密数据
    
//     // ctx.state.body = encodedata // 输出解密后的数据
//     return (ctx.body,encodedata)
//   },
// }

// module.exports=wxOpenid;