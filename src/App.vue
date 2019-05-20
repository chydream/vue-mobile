<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('./style/reset.css');
html,body{
  width: 100%;
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar  {  
  width: 0;   /* 滚动条宽度 */
  height: 0;  /* 滚动条高度 */
}
::-webkit-input-placeholder { /* WebKit browsers */
    color:#999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#999;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#999;
}
</style>
