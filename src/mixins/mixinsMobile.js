const mixinsFun = {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    setTitle (title) {
      this.$store.commit('mobileCommon/SET_TITLE', title)
    },
    showToast (text, type) {
      this.$vux.toast.show({
        text: text,
        type: type == undefined ? 'text' : type
      })
    },
    showConfirm (title, content, callback) {
      this.$vux.confirm.show({
        title: title,
        content: content,
        onCancel () {
        },
        onConfirm () {
          callback()
        }
      })
    },
    goUrl(path){
      this.$router.push(path)
    }
  }
}
const mixinsMobile = {
  install: function (Vue, options) {
    Vue.mixin(mixinsFun)
  }
}

export default mixinsMobile
