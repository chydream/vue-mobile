<template>
    <div class="clock">
        <div class="c-header">
            <div class="c-avatar"><img src="./img/avatar.png"></div>
            <div class="c-content">
                <h2>{{userData.realname}}</h2>
                <p>
                    <!-- 本月没有异常考勤记录 -->
                    今天已签到{{signData.length}}次
                </p>
            </div>
            <div class="c-date">
                <p>{{currentDate}}</p>
                <p>{{currentWeek}}</p>
            </div>
        </div>
        <div class="c-body">
            <ul class="list-history" v-for="(item,index) in signData" :key="index">
                <li><span>考勤打卡&gt;</span></li>
                <li>
                    <p>
                        {{item.signTime}}
                        <em v-if="item.signSuccess=='打卡成功'" class="s-success">{{item.signSuccess}}</em>
                        <em v-else class='s-success warning'>{{item.signSuccess}}</em>
                    </p>
                    <p><i class="micon-p"></i><em>{{item.signPlace}}</em></p>
                </li>
            </ul>
        </div>
        <div class="c-footer">
            <a href="javascript:void(0)" class="c-button" @click='scanSignIn'>签到</a>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:'calendar',
    data () {
        return {
            signData: [], // 签到数据
            currentDate:'', // 日期
            currentWeek:'', // 星期
            signatureInfo:{} //签名信息
        }
    },
    created () {
        this.setTitle('扫码签到');
        this.getTodaySignList();//获取当日签到列表
        this.getCurrentDate();//获取当前日期星期
        this.wxInit();//微信js-api初始化
    },
    computed: {
        ...mapGetters(['userData'])
    },
    methods:{
        //获取当日签到列表
        getTodaySignList () {
            this.$store.dispatch('clock/GetTodaySignList').then((res)=>{
                if(res.success){
                    this.signData = res.data.signRecordList.map(item=>{
                        var signSuccess = '打卡成功';
                        if(item.isAvailable == 0||item.signType==0){
                            signSuccess = '打卡失败';
                        }
                        return {
                            signTime:item.signTime.substring(5),
                            signPlace:item.signPlace,
                            isAvailable:item.isAvailable,
                            signType:item.signType,
                            signSuccess:signSuccess
                        }
                    })
                }else{
                    console.log(res.message)
                }
            })
        },
        //获取当前日期星期
        getCurrentDate () {
            var date = new Date();
            function formatNum(num){
                if(num<10){
                    return '0'+num;
                }else{
                    return num;
                }
            }
            var current = date.getFullYear() + '-' + formatNum(date.getMonth()+1) + '-' + formatNum(date.getDate()) + ' ' + formatNum(date.getHours()) + ':' +formatNum(date.getMinutes());
            this.currentDate = current;
            var day = date.getDay();
            var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            this.currentWeek = week[day];
        },
        // 获取微信签名参数
        getSignature (callBack) {
            var params = {
                url:location.href.split('#')[0]
            }
            this.$store.dispatch('clock/GetSignature',params).then((res)=>{
                if(res.success){
                    // console.log(res)
                    this.signatureInfo = res.data;
                    callBack()
                }else{
                    console.log(res.message)
                }
            })
        },
        wxInit () {
            var _this = this;
            this.getSignature(function(){
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: _this.signatureInfo.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: _this.signatureInfo.timestamp, // 必填，生成签名的时间戳
                    nonceStr: _this.signatureInfo.nonceStr, // 必填，生成签名的随机串
                    signature: _this.signatureInfo.signature,// 必填，签名，见附录1
                    jsApiList: ['scanQRCode', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function(){
                    var signType = "1"; //1-正常考勤 2-公出 3-忘打卡 4-加班 5-请假 6-出差 9-其它
                    //微信直接扫码
                    var url = window.location.href
                    var urlParams = _this.getQueryString(url)
                    if(urlParams){
                        if(urlParams.isAvailableCode!=undefined&&urlParams.isAvailableCode){
                            _this.doSign('1');
                        }
                    }
                    _this.$on('scan', function (params) {
                        //扫码成功请求签到接口
                        _this.doSign(signType);
                    })
                })
            })
        },
        //扫码签到
        scanSignIn(){
            this.$emit('scan','')
        },
        //执行签到
        doSign: function(signType){
            var _this = this;
            _this.$vux.loading.show({
                text: '打卡中'
            })
            //获取地理位置
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    _this.lnglats = longitude + "," + latitude;
                    //微信获取到的坐标转换成高德地图坐标
                    var gps = [res.longitude, res.latitude ];
                    AMap.convertFrom(gps, 'gps', function (status, result) {
                        if (result.info === 'ok') {
                            _this.lnglats = result.locations;
                            var locations = _this.lnglats + ""
                            _this.getDosignApi(signType,locations);//签到
                        }
                    });
                },
                cancel: function (res) {
                    _this.$vux.loading.hide()
                    openMessage("用户拒绝授权获取地理位置");
                },
                error: function (res) {
                    _this.$vux.loading.hide()
                    openMessage("定位失败");
                }
            });
        },
        //签到接口
        getDosignApi(signType,locations){
            var params = {
                signType:signType,
                locations:locations
            }
            this.$store.dispatch('clock/Dosign',params).then((res)=>{
                // alert(JSON.stringify(res))
                this.$vux.loading.hide()
                if(res.success){
                    this.showToast("打卡成功",'success')
                    //刷新打卡列表
                    this.getTodaySignList();
                }else{
                    this.showToast(res.message,'cancel')
                }
            })
        },
        //查询字符串参数
        getQueryString(url){
            var index1=url.indexOf("?");
            if(index1>0){
                var qs=url.substring(index1+1);
                var args={};
                var items=qs.split("&");
                var len=items.length;
                var i= 0,item=null,name=null,value=null;
                for(i=0;i<len;i++){
                    item=items[i].split("=");
                    name=decodeURIComponent(item[0]);
                    value=decodeURIComponent(item[1]);
                    if(name.length){
                        args[name]=value;
                    }
                }
                return args;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.clock{
    .c-header{
        padding: 10px;
        overflow: hidden;
        position: relative;
        border:1px solid #f2f2f2;
    }
    .c-avatar{
        width: 45px;
        height: 45px;
        float: left;
    }
    .c-avatar img{
        max-width: 100%;
        max-height: 100%;
    }
    .c-content{
        margin-left: 60px;
        margin-right: 100px;
    }
    .c-date{
        position:absolute;
        right: 10px;
        top: 10px;
        text-align: right;
    }
    .c-content h2{
        color: #282828;
        font-size: 17px;
        font-weight: 500;
    }
    .c-content p{
        font-size: 13px;
        color: #53c322;
        line-height: 24px;
    }
    .c-date p{
        font-size: 13px;
        color: #656565;
        line-height: 22px;
    }
    .c-body{
        padding: 15px 0 170px;
    }
    .list-history{
        overflow: hidden;
        position: relative;
    }
    .list-history::after{
        content: '';
        height: 100%;
        width: 1px;
        background: #dfdfdf;
        position: absolute;
        left: 35%;
        top: 0px;
    }
    .list-history:nth-child(1):after{
        top: 5px;
    }
    .list-history:nth-child(1) li:nth-child(1)::after{
        background: #2185d0;
        z-index: 2;
    }
    .list-history li{
        display: inline-block;
        height: 40px;
        float: left;
        position: relative;
        margin-bottom: 15px;
    }
    .list-history li:nth-child(1){
        width: 35%;
        text-align: right;
    }
    .list-history li:nth-child(1)::after{
        content: '';
        width:10px;
        height: 10px;
        background: #dfdfdf;
        border-radius: 50%;
        position:absolute;
        right: -5px;
        top: 5px;
    }
    .list-history li:nth-child(1) span{
        margin-right: 20px;
        font-size: 15px;
        color: #2185d0;
    }
    .list-history li:nth-child(2){
        width: 60%;
    }
    .list-history li:nth-child(2) p{
        text-indent: 25px;
        font-size: 15px;
        color: #282828;
        line-height: 22px;
    }
    .list-history li:nth-child(2) em{
        font-size: 12px;
        color: #989898;
    }
    .list-history li:nth-child(2) em.s-success{
        font-size: 12px;
        color: #282828;
        margin-left: 14px;
    }
    .micon-p{
        width: 12px;
        height: 12px;
        display:inline-block;
        background: url(./img/pos.png) no-repeat 0 0;
        background-size: cover;
        vertical-align: middle;
        margin-bottom: -1px;
        margin-right: 6px;
    }
    .c-footer{
        height: 165px;
        border-top: 1px solid #f5f5f5;
        text-align: center;
        position:fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
    }
    .c-button{
        width: 108px;
        height: 108px;
        background: #2185d0;
        border-radius: 50%;
        color: #fff;
        font-size: 20px;
        display:inline-block;
        line-height: 108px;
        margin-top:22px;
        border: 5px solid #d3e7f6;
    }
    .c-button:active,.c-button:visited{
        background: #6faddc;
        color: #ddd;
    }
}
</style>