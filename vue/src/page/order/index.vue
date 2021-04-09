<template>
  <div class="className">
    <div class="classBut">
      <el-button type="primary" @click="addRolesTab">新建订单</el-button>

      <el-date-picker
        v-model="datetimerange"
        type="datetimerange"
        @change="changeDatetimeRange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="搜索订单开始时间"
        end-placeholder="结束日期"
        align="center"
      >
      </el-date-picker>

      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        clearable
        @change="changeBlur"
      >
      </el-input>
    </div>
    <div class="classpage">
      <el-table :data="tableData" border stripe>
        <el-table-column
          type="index"
          label="序号"
          :index="(currentPage4 - 1) * PageSize + 1"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="user_id"
          width="150"
          label="用户id"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="user_name"
          width="100"
          label="用户名"
        ></el-table-column>
        <el-table-column
          prop="order_id"
          label="订单id"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="order_state"
          label="订单状态"
        ></el-table-column>
        <el-table-column
          prop="order_title"
          align="center"
          label="订单标题"
        ></el-table-column>
        <el-table-column
          prop="order_body"
          label="订单内容"
          width="200"
          align="center"
          height="10"
        >
          <template slot-scope="scope">
            <el-button type="info" @click="openOrderBody(scope.row)"
              >查看订单内容</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="图片" width="200">
          <!-- <template slot-scope="scope">
            <img :src="scope.row.order_img" alt="" class="intropic"
          /></template> -->
          <template slot-scope="scope">
            <el-button type="info" @click="openOrderImg(scope.row)"
              >查看订单图片</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          label="订单起始地址"
          width="200"
          align="center"
          height="10"
        >
          <template slot-scope="scope">
            <el-button type="info" @click="openOrderAddress(scope.row)"
              >查看订单地址薄</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="start_date"
          label="创建时间"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="open_date"
          label="发布时间"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="receive_date"
          label="接收时间"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="transfer_date"
          label="转让时间"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="end_date"
          label="结束时间"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="order_type"
          label="订单类型"
        ></el-table-column>
        <el-table-column
          prop="courier_id"
          label="骑手id"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="courier_name"
          label="骑手姓名"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="user_estimate"
          label="用户评价"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="info" @click="openUserEstimate(scope.row)">
              查看用户评价
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="courier_back"
          label="骑手反馈"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="info" @click="openCourierBack(scope.row)">
              查看骑手反馈
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" @click="editTable(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建订单 -->
    <el-dialog
      :title="dia_title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        style="width: 400px"
      >
        <el-form-item label="用户id" prop="user_id">
          <el-input v-model="ruleForm.user_id" :disabled="display"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="ruleForm.user_name" :disabled="display"></el-input>
        </el-form-item>
        <el-form-item label="姓名" v-if="distype" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="订单id" v-if="distype" prop="order_id">
          <el-input v-model="ruleForm.order_id"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" v-if="distype" prop="order_state">
          <el-select v-model="ruleForm.order_state" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单类型" prop="order_type">
          <el-select v-model="ruleForm.order_type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单标题" prop="order_title">
          <el-input v-model="ruleForm.order_title"></el-input>
        </el-form-item>
        <el-form-item label="订单内容" prop="order_body">
          <el-input
            type="textarea"
            :rows="3"
            v-model="ruleForm.order_body"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单地址" prop="order_address">
          <el-input v-model="ruleForm.order_address"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="ruleForm.money" :disabled="display"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" v-if="distype" prop="start_date">
          <el-date-picker
            v-model="ruleForm.start_date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布时间" v-if="distype" prop="open_date">
          <el-date-picker
            v-model="ruleForm.open_date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="接收时间" v-if="distype" prop="receive_date">
          <el-date-picker
            v-model="ruleForm.receive_date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="转让时间" v-if="distype" prop="transfer_date">
          <el-date-picker
            v-model="ruleForm.transfer_date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
          <!-- <el-input v-model="ruleForm.transfer_date"></el-input> -->
        </el-form-item>
        <el-form-item label="结束时间" v-if="distype" prop="end_date">
          <el-date-picker
            v-model="ruleForm.end_date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
          <!-- <el-input v-model="ruleForm.receive_date"></el-input> -->
        </el-form-item>
        <el-form-item label="骑手id" v-if="distype" prop="courier_id">
          <el-input v-model="ruleForm.courier_id"></el-input>
        </el-form-item>
        <el-form-item label="骑手名字" v-if="distype" prop="courier_name">
          <el-input v-model="ruleForm.courier_name"></el-input>
        </el-form-item>
        <el-form-item label="用户评价" v-if="distype" prop="user_estimate">
          <el-input
            type="textarea"
            :rows="3"
            v-model="ruleForm.user_estimate"
          ></el-input>
        </el-form-item>
        <el-form-item label="骑手反馈" v-if="distype" prop="courier_back">
          <el-input
            type="textarea"
            :rows="3"
            v-model="ruleForm.courier_back"
          ></el-input>
        </el-form-item>
        <el-form-item size="large" class="btn">
          <el-button type="primary" @click="onSubmit('ruleForm')">{{
            distype ? "确认修改" : "立即创建"
          }}</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看内容弹出框 -->
    <el-dialog
      :title="body_title"
      :visible.sync="bodyDialogVisible"
      :before-close="bodyHandleClose"
      width="50%"
    >
      <p>orderAddres</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bodyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bodyDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看地址弹框 -->
    <el-dialog
      title="查看订单地址薄弹框"
      :visible.sync="adrDialogVisible"
      :before-close="AddressHandleClose"
      width="50%"
    >
      <p>起始详细地址: {{ orderAddres.get_address_det }}</p>
      <p>起始地址名称: {{ orderAddres.get_address_name }}</p>
      <p>起始姓名: {{ orderAddres.get_address_username }}</p>
      <p>起始电话: {{ orderAddres.get_address_iphone }}</p>
      <p>终点详细地址: {{ orderAddres.set_address_det }}</p>
      <p>终点地址名称: {{ orderAddres.set_address_name }}</p>
      <p>终点姓名: {{ orderAddres.set_address_username }}</p>
      <p>终点电话: {{ orderAddres.set_address_iphone }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adrDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adrDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看图片弹框 -->
    <el-dialog
      title="查看图片弹框"
      :visible.sync="imgDialogVisible"
      :before-close="imgHandleClose"
      width="50%"
    >
      <el-upload
        :action="API_ROOT + '/uploadFile'"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgHandleClose">取 消</el-button>
        <el-button type="primary" @click="imgHandleClose">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="PicturedialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

    <!-- 翻页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataTotal"
    >
    </el-pagination>
  </div>
</template>
<script>
import randomNum from "../../utils/getRandomNum";
import getformat from "../../utils/getformat";
import moment from "moment";
import {
  orderFind,
  orderAdd,
  orderUpdate,
  orderImg,
  deleteImg,
  orderDelete,
  orderStartTimeSearch,
  orderKeySearch,
} from "../../api/orders";
export default {
  data() {
    return {
      tableData: [], // 显示的数据
      data: [], // 返回数据
      dia_title: "创建轮播图", //弹出框文字提示
      body_title: "查看订单内容", //弹出框文字提示
      dialogVisible: false, //添加弹出框
      bodyDialogVisible: false, // 查看内容
      adrDialogVisible: false, // 查看地址
      orderAddres: {}, // 查看地址数据
      bodyDialog: null, // 弹框内容
      dialogImageUrl: "",
      imgDialogVisible: false,
      PicturedialogVisible: false,
      API_ROOT: "", //接口前缀地址
      imgRuleForm: {}, //图片弹窗内容
      ruleForm: {}, //弹窗内容
      distype: false, // 是否修改弹框
      display: false, // 是否编辑
      dataTotal: 0, // 总数
      currentPage4: 1, // 当前页数
      PageSize: 5, // 当前个数
      searchInput: "",
      datetimerange: [], //时间范围
      // 默认时间范围
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // 转态对应组
      statusList: [
        {
          id: 0,
          text: "未发布",
        },
        {
          id: 1,
          text: "草稿箱",
        },
        {
          id: 2,
          text: "已发布",
        },
        {
          id: 3,
          text: "骑手已接收",
        },
        {
          id: 4,
          text: "转让",
        },
        {
          id: 5,
          text: "完成",
        },
      ],
      // 类型对应组
      typeList: [
        {
          id: 0,
          text: "取快递",
        },
        {
          id: 1,
          text: "取外卖",
        },
        {
          id: 2,
          text: "代买",
        },
        {
          id: 3,
          text: "代赠",
        },
        {
          id: 4,
          text: "其他",
        },
      ],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        img: [{ required: true, message: "请上传轮播图片", trigger: "blur" }],
      },
      // 图片列表
      fileList: [],
    };
  },
  mounted() {
    this.API_ROOT = process.env.API_ROOT;
  },
  created() {
    this.list();
  },
  methods: {
    // 数据列表
    list() {
      orderFind()
        .then((res) => {
          if (res.data.code == 200) {
            let list = res.data.data;
            list.forEach((item) => {
              // item.order_img = "http://127.0.0.1:3030/" + item.order_img;
              // 对返回的数据过滤
              if (item.start_date !== null) {
                let start_date = item.start_date;
                item.start_date = new Date(start_date).getformat(
                  "yyyy-MM-dd hh:mm:ss"
                );
              }
              if (item.open_date !== null) {
                let open_date = item.open_date;
                item.open_date = new Date(open_date).getformat(
                  "yyyy-MM-dd hh:mm:ss"
                );
              }
              if (item.receive_date !== null) {
                let receive_date = item.receive_date;
                item.receive_date = new Date(receive_date).getformat(
                  "yyyy-MM-dd hh:mm:ss"
                );
              }
              if (item.transfer_date !== null) {
                let transfer_date = item.transfer_date;
                item.transfer_date = new Date(transfer_date).getformat(
                  "yyyy-MM-dd hh:mm:ss"
                );
              }
              if (item.end_date !== null) {
                let end_date = item.end_date;
                item.end_date = new Date(end_date).getformat(
                  "yyyy-MM-dd hh:mm:ss"
                );
              }

              this.statusList.forEach((e) => {
                if (e.id == item.order_state) {
                  item.order_state = e.text;
                }
              });
              this.typeList.forEach((e) => {
                if (e.id == item.order_type) {
                  item.order_type = e.text;
                }
              });
            });
            console.log(list, "ta");
            this.data = list;
            this.tableData = this.data;
            this.dataTotal = this.tableData.length;
            this.tableData = this.tableData.slice(0, this.PageSize);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
        });
    },
    // 创建
    addRolesTab() {
      this.dia_title = "创建订单";
      this.dialogVisible = true;
      this.distype = false;
      this.display = false;
    },
    // 确认发布
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dia_title == "创建订单") {
            this.ruleForm.order_id =
              Date.parse(new Date()).toString() + randomNum(100, 999);
            this.ruleForm.start_date = new Date().getformat(
              "yyyy-MM-dd hh:mm:ss"
            );
            this.ruleForm.order_state = 0;
            console.log(this.ruleForm, "创建");
            orderAdd(this.ruleForm)
              .then((res) => {
                if (res.data.code == 200) {
                  console.log(res.data.message);
                  this.$message.success(res.data.message);
                  this.list();
                  this.dialogVisible = false;
                  this.ruleForm = {};
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            // 修改
            this.distype = true;
            let time1 = this.ruleForm.start_date;
            this.ruleForm.start_date = new Date(time1).getformat(
              "yyyy-MM-dd hh:mm:ss"
            );
            let value = this.ruleForm;

            this.statusList.forEach((e) => {
              if (e.text == value.order_state) {
                value.order_state = e.id;
              }
            });
            this.typeList.forEach((e) => {
              if (e.text == value.order_type) {
                value.order_type = e.id;
              }
            });

            console.log(value, "value");
            // let value = this.ruleForm;
            let _sql = "UPDATE orders SET ";
            Object.keys(value).forEach(function (key) {
              if (typeof value[key] == "number") {
                _sql = " " + _sql + key + "=" + value[key] + ", ";
              } else {
                if (value[key]) {
                  _sql = " " + _sql + key + "='" + value[key] + "', ";
                } else {
                  _sql = _sql;
                }
              }
            });
            _sql = _sql.substring(0, _sql.length - 2);
            _sql = _sql + ` WHERE order_id='${value.order_id}'`;
            console.log(_sql, "_sql");

            orderUpdate(this.ruleForm)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message.success("修改成功！");
                  this.ruleForm = {};
                  this.dialogVisible = false;
                  this.list();
                } else {
                  this.$message.error("修改失败！");
                }
              })
              .catch((err) => {
                this.$message.error("修改失败！");
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 弹出框关闭确认
    handleClose() {
      this.ruleForm = {};
      this.dialogVisible = false;
    },
    // 查看订单框打开
    openOrderBody(e) {
      this.bodyDialogVisible = true;
      this.body_title = "查看订单内容";
      // (this.ruleForm.order_body = e.order_body);
      this.bodyDialog = e.order_body;
    },
    // 查看框关闭
    bodyHandleClose() {
      this.bodyDialogVisible = false;
      this.bodyDialog = null;
    },
    // 查看订单地址框打开
    openOrderAddress(e) {
      this.adrDialogVisible = true;
      this.body_title = "查看订单地址";
      // (this.ruleForm.order_body = e.order_body);
      this.bodyDialog = e.order_body;
      this.orderAddres = {
        get_address_det: e.get_address_det,
        get_address_name: e.get_address_name,
        get_address_username: e.get_address_username,
        get_address_iphone: e.get_address_iphone,
        set_address_det: e.set_address_det,
        set_address_name: e.set_address_name,
        set_address_username: e.set_address_username,
        set_address_iphone: e.set_address_iphone,
      };
    },
    // 查看订单地址框关闭
    AddressHandleClose() {
      this.adrDialogVisible = false;
      this.bodyDialog = null;
    },
    // 查看用户反馈框打开
    openUserEstimate(e) {
      this.bodyDialogVisible = true;
      this.body_title = "查看用户反馈";
      if (e.user_estimate == null) {
        this.bodyDialog = "暂无";
      } else {
        this.bodyDialog = e.user_estimate;
      }
    },
    // 查看骑手反馈框打开
    openCourierBack(e) {
      this.bodyDialogVisible = true;
      this.body_title = "查看骑手反馈";
      if (e.courier_back == null) {
        this.bodyDialog = "暂无";
      } else {
        this.bodyDialog = e.courier_back;
      }
    },
    // 查看图片弹框
    openOrderImg(e) {
      this.imgDialogVisible = true;
      this.imgRuleForm.order_id = e.order_id;
      let file_list = [];
      if (e.order_img) {
        file_list = e.order_img.substring(1).split(",");
        let item = {};
        file_list.forEach((i) => {
          item = {};
          if (i != "") {
            item.uid = Date.parse(new Date()) + Math.random() * 10;
            item.name = i;
            item.url = this.API_ROOT + "/" + i;
          }
          this.fileList.push(item);
        });
      } else {
        this.fileList = [];
      }
    },
    // 关闭弹框查看图片弹框
    imgHandleClose() {
      this.fileList = [];
      // console.log(1);
      this.imgDialogVisible = false;
      // this.$message.info("您以取消上传");
      // clearFiles();
    },
    // 上传成功
    handleSuccess(res, file, fileList) {
      console.log(res, file, fileList);
      file.name = res.imgUrl;
      let fileListStr = "";
      fileList.forEach((item) => {
        fileListStr += "," + item.name;
      });
      let parmas = {
        order_id: this.imgRuleForm.order_id,
        order_img: fileListStr,
      };
      orderImg(parmas)
        .then((res) => {
          this.$message.success(res.data.message);
          this.list();
        })
        .catch((err) => {
          // this.$message.error("上传成功");
          this.list();
        });
    },
    // 删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let fileListStr = "";
      fileList.forEach((item) => {
        fileListStr += "," + item.name;
      });
      let parmas = {
        order_id: this.imgRuleForm.order_id,
        order_img: fileListStr,
      };
      orderImg(parmas)
        .then((res) => {
          this.$message.success(res.data.message);
          this.list();
        })
        .catch((err) => {
          // this.$message.error("已修改");
          this.list();
        });
      deleteImg({ filename: file.name })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    },
    // 放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.PicturedialogVisible = true;
    },
    // 编辑
    editTable(e) {
      this.ruleForm = e;
      // this.ruleForm.img = e.img;
      // this.ruleForm.link = e.link;
      this.dia_title = "编辑订单";
      this.dialogVisible = true;
      this.distype = true;
      this.display = true;
    },
    // 删除
    Delete(e) {
      this.$confirm("确认删除这个轮播图吗？")
        .then((_) => {
          console.log(e.order_id);
          orderDelete({ order_id: e.order_id })
            .then((res) => {
              console.log(res.data);
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                this.dialogVisible = false;
                this.list();
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((err) => {
              this.$message.error(res.data.message);
              console.log(err);
            });
        })
        .catch((_) => {});
    },
    // 图片上传成功后
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传中
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 搜索
    changeBlur(queryString, cb) {
      orderKeySearch({ key: this.searchInput }).then((res) => {
        if (res.data.code == 200) {
          let list = res.data.data;
          list.forEach((item) => {
            // item.order_img = "http://127.0.0.1:3030/" + item.order_img;
            // 对返回的数据过滤
            if (item.start_date !== null) {
              let start_date = item.start_date;
              item.start_date = moment(start_date).format(
                "yyyy-MM-dd hh:mm:ss"
              );
            }
            if (item.open_date !== null) {
              let open_date = item.open_date;
              item.open_date = moment(open_date).format("yyyy-MM-dd hh:mm:ss");
            }
            if (item.receive_date !== null) {
              let receive_date = item.receive_date;
              item.receive_date = moment(receive_date).format(
                "yyyy-MM-dd hh:mm:ss"
              );
            }
            if (item.transfer_date !== null) {
              let transfer_date = item.transfer_date;
              item.transfer_date = moment(transfer_date).format(
                "yyyy-MM-dd hh:mm:ss"
              );
            }
            if (item.end_date !== null) {
              let end_date = item.end_date;
              item.end_date = moment(end_date).format("yyyy-MM-dd hh:mm:ss");
            }

            this.statusList.forEach((e) => {
              if (e.id == item.order_state) {
                item.order_state = e.text;
              }
            });
            this.typeList.forEach((e) => {
              if (e.id == item.order_type) {
                item.order_type = e.text;
              }
            });
          });
          console.log(list, "ta");
          this.tableData = list;
          this.dataTotal = this.tableData.length;
          this.tableData = this.tableData.slice(0, this.PageSize);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 时间搜索
    changeDatetimeRange(e) {
      if (!e) {
        this.tableData = this.data;
        console.log(this.data, "d");
      } else {
        let params = {
          start_time: null,
          end_time: null,
        };
        console.log(e, "e");

        // params.start_time = moment(e[0]).format("yyyy-MM-dd hh:mm:ss");
        params.start_time = new Date(e[0]).getformat("yyyy-MM-dd hh:mm:ss");
        // params.end_time = moment(e[1]).format("yyyy-MM-dd hh:mm:ss");
        params.end_time = new Date(e[1]).getformat("yyyy-MM-dd hh:mm:ss");
        console.log(params);
        orderStartTimeSearch(params).then((res) => {
          if (res.data.code == 200) {
            let list = res.data.data;
            list.forEach((item) => {
              // item.order_img = "http://127.0.0.1:3030/" + item.order_img;
              // 对返回的数据过滤
              if (item.start_date !== null) {
                let start_date = item.start_date;
                item.start_date = moment(start_date).format(
                  "yyyy-MM-dd hh:mm:ss"
                );
              }
              if (item.open_date !== null) {
                let open_date = item.open_date;
                item.open_date = moment(open_date).format(
                  "yyyy-MM-dd hh:mm:ss"
                );
              }
              if (item.receive_date !== null) {
                let receive_date = item.receive_date;
                item.receive_date = moment(receive_date).format(
                  "yyyy-MM-dd hh:mm:ss"
                );
              }
              if (item.transfer_date !== null) {
                let transfer_date = item.transfer_date;
                item.transfer_date = moment(transfer_date).format(
                  "yyyy-MM-dd hh:mm:ss"
                );
              }
              if (item.end_date !== null) {
                let end_date = item.end_date;
                item.end_date = moment(end_date).format("yyyy-MM-dd hh:mm:ss");
              }

              this.statusList.forEach((e) => {
                if (e.id == item.order_state) {
                  item.order_state = e.text;
                }
              });
              this.typeList.forEach((e) => {
                if (e.id == item.order_type) {
                  item.order_type = e.text;
                }
              });
            });
            this.tableData = list;
            this.dataTotal = this.tableData.length;
            this.tableData = this.tableData.slice(0, this.PageSize);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 翻页
    handleCurrentChange(e) {
      let data = this.data;
      let pageprev = (e - 1) * this.PageSize;
      let pagenext = this.PageSize * e;
      this.currentPage4 = e;
      this.tableData = data.slice(pageprev, pagenext);
      // console.log(this.currentPage4, e, "1", this.PageSize);
    },
    // 页几个
    handleSizeChange(e) {
      let data = this.data;
      this.PageSize = e;
      this.currentPage4 = 1;
      let pageprev = (this.currentPage4 - 1) * e;
      let pagenext = this.currentPage4 * e;
      this.tableData = data.slice(pageprev, pagenext);
      // console.log(this.currentPage4, this.PageSize);
      // console.log(this.tableData, "ta");
      // this.list();
    },
  },
};
</script>
<style lang="scss"  scoped>
.classBut {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  .el-input--prefix {
    width: 30%;
  }
  .el-date-editor {
    width: 58%;
  }
}
.classpage {
  margin: 20px;
  .intropic {
    width: 200px;
    height: 150px;
  }
}
.el-textarea {
  width: 125%;
}
.el-pagination {
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
}
</style>
