<template>
  <div>
    <div class="className">
      <div class="classBut">
        <router-link class="add" to="/case/add">创建案例</router-link>
      </div>
      <div class="classpage">
        <el-table :data="tableData" border stripe>
          <el-table-column prop="id" label="序号" width="60"></el-table-column>
          <el-table-column label="封面">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt="" class="intropic"></template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="200"></el-table-column>
          <el-table-column prop="name" label="分类" width="150"></el-table-column>
          <el-table-column prop="time" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="newtime" label="修改时间" width="200"></el-table-column>
          <el-table-column prop="username" label="创建人" width="200"></el-table-column>
          <el-table-column prop="onclick" label="浏览量" width="100"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                type="success"
                @click="editTable(scope.row,1)">预览</el-button>
              <el-button
                type="primary"
                @click="editTable(scope.row,0)">编辑</el-button>
              <el-button
                type="danger"
                @click="Delete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageing">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size='PageSize'
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData:[],       //列表
      total:null,         //数据总数
      PageSize:10,        //每页数据数
      currentPage: 1 
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    // 列表信息
    list(){
      this.$api.ArticleFind(this.$get,`?pagesize=${this.PageSize}&page=${this.currentPage}`)
        .then(res => {
          if(res.code == 200){
            this.tableData = res.data
            this.total = res.total
            this.tableData.forEach(item => {
              item.time = this.$moment(item.time).format('YYYY-MM-DD HH:mm:ss')
              item.newtime = this.$moment(item.time).format('YYYY-MM-DD HH:mm:ss')
            })
          }else{
            this.$message.error(res.message)
          }
        })
    },
    // 修改，查看
    editTable(data,bool){
      this.$router.push({path:'/case/add',query:{id:data.id,bool}})
    },
    // 删除
    Delete(res){
      this.$api.ArticleDelete(this.$deletes,res.id)
        .then(res => {
          if(res.code == 200){
            this.$message.success({message:res.data});
            this.list()
            this.CloseDialog = false
          }else{
            this.$message.error({message:res.message});
            this.list()
            this.CloseDialog = false
          }
        })
    },
    // 页面浏览数
    handleSizeChange(val){
      this.PageSize = val
      this.list()
    },
    // 当前分页
    handleCurrentChange(val){
      this.currentPage = val
      this.list()
    }
  },
}
</script>
