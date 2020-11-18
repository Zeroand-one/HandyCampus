module.exports = (options) => async (ctx, next) => {
  try {
    // 获取 token
    const AxiosToken = ctx.header.authorization
    if (AxiosToken) {
      try {
        // 验证 token，并获取用户相关信息
        
        let session = new Buffer(JSON.stringify(ctx.session.token)).toString('base64')
        if(AxiosToken !== session){
          ctx.body = {
            code: 20022,
            message: '登录过期',
          };
          return false
        }
      } catch (err) {
        console.log(err)
      }
    }
    // 进入下一个中间件
    await next()
  } catch (err) {
    console.log(err)
  }
}