let api = {};
// 验证注册昵称是否已被注册
api.RegName = (axios,data) => {return axios('/v1/admin/regname',data)}
// 登陆
api.login = (axios,data) => {return axios('/v1/admin/login',data)}
// 注册
api.register = (axios,data) => {return axios('/v1/admin/register',data)}

// 模块列表
api.ClassFind = (axios) => {return axios('/v1/admin/ClassFind')}
// 添加模块
api.ClassAdd = (axios,data) => {return axios('/v1/admin/ClassAdd',data)}
// 修改模块
api.ClassUpdateName = (axios,data) => {return axios('/v1/admin/ClassUpdateName',data)}
// 删除模块
api.ClassDelete = (axios,data) => {return axios('/v1/admin/ClassDelete',data)}

// 资讯添加
api.ArticleAdd = (axios,data) => {return axios('/v1/admin/ArticleAdd',data)}
// 资讯删除
api.ArticleDelete = (axios,id) => {return axios(`/v1/admin/ArticleDelete/${id}`)}
// 资讯修改
api.ArticleUpdate =  (axios,data) => {return axios(`/v1/admin/ArticleUpdate`,data)}
// 资讯列表
api.ArticleFind = (axios,data) => {return axios(`/v1/admin/ArticleFind${data}`)}
// 资讯详情
api.ArticleDetails = (axios,id) => {return axios(`/v1/admin/ArticleDetails/${id}`)}

// 关于我们查询
api.AboutFind = (axios) => {return axios('/v1/admin/AboutFind')}
// 关于我们添加
api.AboutAdd = (axios,data) => {return axios('/v1/admin/AboutAdd',data)}
// 关于我们更新
api.AboutUpdata = (axios,data) => {return axios('/v1/admin/AboutUpdata',data)}

export default api;
