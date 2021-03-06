var router = require('koa-router')();
var koaBody = require('koa-body');
const multer=require('koa-multer')
// 适配ueditor百度编辑器
const ueditor = require('koa2-ueditor');
const fs = require('fs')
const format = require('date-format');

 

//文件上传配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    if(req.url=='/uploadFile/Banner'){
      cb(null, 'upload/banner/')
    }else if(req.url=='/uploadFile/feedback'){
      cb(null, 'upload/feedback/')
    }{
      cb(null, 'upload/')
    }
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    let newdate=format('yyyy-MM-dd-hh-mm-ss-SSS', new Date())
    cb(null,newdate+Math.ceil(Math.random()*100) + "." + fileFormat[fileFormat.length - 1]);
  }
})

//加载配置
var upload = multer({ storage: storage });

router.post('/uploadFile',upload.single('file'),async(ctx,next)=>{
  ctx.body = {
    imgUrl: ctx.req.file.filename//返回文件名
    // imgUrl: 'http://127.0.0.1:3030/'+ctx.req.file.filename//返回文件名
  }
})

// banner图接口
router.post('/uploadFile/Banner',upload.single('file'),async(ctx,next)=>{
  ctx.body = {
    imgUrl: ctx.req.file.filename
  }
})

// feedback图接口
router.post('/uploadFile/feedback',upload.single('file'),async(ctx,next)=>{
  ctx.body = {
    imgUrl: ctx.req.file.filename
  }
})

// 删除图片接口
router.post('/deleteImg',koaBody(),async(ctx,next)=>{
  let file = ctx.request.body.filename
  fs.unlinkSync('./upload/'+file)
  ctx.body={
    msg: '删除文件成功！'
  }
})

// 删除图片接口
router.post('/deleteImg/Banner',koaBody(),async(ctx,next)=>{
  let file = ctx.request.body.filename
  fs.unlinkSync('./upload/banner/'+file)
  ctx.body={
    msg: '删除文件成功！'
  }
})

// 配置编辑器上传图片接口
router.all('/editorUpload', 
  ueditor(['upload', {
    // 上传图片的格式
    "imageAllowFiles": [".png", ".jpg", ".jpeg"],
    // 最后保存的文件路径
    "imagePathFormat": "/ueditor/{yyyy}{mm}{dd}/{filename}" 
  }]
));

module.exports = router;
