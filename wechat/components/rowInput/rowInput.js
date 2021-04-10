// components/rowInput/rowInput.js
Component({
  // 参数	          类型	      示例
  // password	      Boolean   （是否是密码类型）	password
  // placeholder	  String    （提示词）	请输入
  // name	          String    （form表单中name值）	name
  // maxlength	    Number    （最大输入长度 默认140）	10
  // disabled	      disabled  （是否禁用）	disabled
  // must	          Boolean   （是否必填）	true
  // unit	          String    （单位）	kg
  // jiantou	      Boolean   （是否显示箭头）	true
  // value	        String    （input框中value值）	LGAG4DX39F3013734
  // row-class      String      line
  properties: {
    title: { //左侧标题
      type: String,
      value: ""
    },
    type: {//输入文本类型
      type: String,
      value: "text"
    },
    placeholder: { //输入框提示词
      type: String,
      value: "请输入"
    },
    value: { //输入框默认值
      type: String,
      value: ""
    },
    maxlength: { //输入框最大长度
      type: Number,
      value: 140
    },
    password: { //输入框是否是密码类型
      type: Boolean,
      value: false
    },
    name: { //输入框在form表单中的name
      type: String,
      value: ""
    },
    unit: {
      type: String,
      value: ""
    },
    must: { //是否必填
      type: Boolean,
      value: false
    },

    jiantou: { //右箭头
      type: Boolean,
      value: false
    },

    disabled: { //是否禁用
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
        if (newVal == true) {
          this.setData({
            placeholder: "无"
          })
        }
      }
    }
  },
  externalClasses: ['row-class'],
  behaviors: ['wx://form-field'],
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 输入框内容变化回调
     */
    _textInput: function(e) {
      this.setData({
        value: e.detail.value
      })
    },
  }
})
