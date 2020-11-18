<template>
  <div class="UE">
    <!--这个地方的大小是可以自己控制的-->
    <div id="editor" style="width:100%;height:350px;"></div>
  </div>
</template>
<script>
export default {
  name:'UE',
  props:{
    value:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    // 实例化editor编辑器
    this.editor = window.UE.getEditor("editor");
    //设置编辑器默认内容
    this.$nextTick(function f1() {
        // 保证 this.$el 已经插入文档
        this.editor.ready(function f2() {
            this.editor.addListener("contentChange", function () {
              const wordCount = this.editor.getContentLength(true)
              const content = this.editor.getContent()
              const plainTxt = this.editor.getPlainTxt()
              const htmlCont = this.editor.getAllHtml()
              // 编辑器内容有变动,通知父组件
              this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt ,htmlCont:htmlCont });
            }.bind(this))
            // // editor初始化后操作
            // this.$emit('ready', this.editor)
        }.bind(this))
      }.bind(this))
  },
  methods: {
    // 获取编辑器中的内容
    getUEContent () {
      this.$emit("editor", this.editor.getContent())
      return this.editor.getContent()
    },
    // 确保UE加载完成后，放入内容。
    getDefaultMsg(val){
      this.editor.ready(()=>{
        this.editor.setContent(val);
      });
    },
  },
  destroyed() {
    // 将editor进行销毁
    this.editor.destroy();
  }
}
</script>
