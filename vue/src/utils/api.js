let api = {};
// 验证注册昵称是否已被注册
api.RegName = (axios,data) => {return axios('/vue/regname',data)}
// 登陆、注册
api.login = (axios,data) => {return axios('/vue/login',data)}

// 模块列表
api.ClassFind = (axios) => {return axios('/vue/ClassFind')}
// 添加模块
api.ClassAdd = (axios,data) => {return axios('/vue/ClassAdd',data)}
// 修改模块
api.ClassUpdateName = (axios,data) => {return axios('/vue/ClassUpdateName',data)}
// 删除模块
api.ClassDelete = (axios,data) => {return axios('/vue/ClassDelete',data)}

// 资讯添加
api.ArticleAdd = (axios,data) => {return axios('/vue/ArticleAdd',data)}
// 资讯删除
api.ArticleDelete = (axios,id) => {return axios(`/vue/ArticleDelete/${id}`)}
// 资讯修改
api.ArticleUpdate =  (axios,data) => {return axios(`/vue/ArticleUpdate`,data)}
// 资讯列表
api.ArticleFind = (axios,data) => {return axios(`/vue/ArticleFind${data}`)}
// 资讯详情
api.ArticleDetails = (axios,id) => {return axios(`/vue/ArticleDetails/${id}`)}

// 关于我们查询
api.AboutFind = (axios) => {return axios('/vue/AboutFind')}
// 关于我们添加
api.AboutAdd = (axios,data) => {return axios('/vue/AboutAdd',data)}
// 关于我们更新
api.AboutUpdata = (axios,data) => {return axios('/vue/AboutUpdata',data)}

export default api;
