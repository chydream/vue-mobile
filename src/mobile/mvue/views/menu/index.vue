<template>
    <div id="menu">
        <div class="nav_title">
            <img class="logo_index" src="./img/indexlogo.png" />
            <div class="nav_person">
                <img class="per_img" src="./img/chid.png" />
                <span>刘欣然</span>
                <img class="changest" src="./img/changest.png" />
            </div>
        </div>
        <div class="banner">
            <img src="./img/banner2.png" />
        </div>
        <div class="workbench workbenchim">
            <h2 class="workbenc_h2"><img src="./img/tit_left.png"/><div>基础惠享功能</div><img src="./img/tit_right.png"/></h2>
            <ul>
                <li v-for="(item,index) in baseData">
                    <a :href="item.url"><i><img :src="baseUrl+item.imgUrl"></i>
                        <p>{{item.name}}</p>
                    </a>
                </li>
                <!--<li>
                    <a href="#"><i><img src="./img/kcb.png"></i>
                        <p>课程表</p>
                    </a>
                </li>
                <li><label>9</label>
                    <a href="#"><i><img src="./img/jtzy.png"></i>
                        <p>家庭作业</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/xsqj.png"></i>
                        <p>学生请假</p>
                    </a>
                </li>-->

                <!--				<li v-on:click="clickShow('1')"><a><i><img src="./img/jcbd.png"></i><p>解除绑定</p></a></li>
-->
            </ul>
        </div>
        <div class="workbench workbenchim">
            <h2 class="workbenc_h2"><img src="./img/tit_left.png"/><div>VIP尊享功能</div><img src="./img/tit_right.png"/></h2>
            <ul>
                <li v-on:click="clickShow('1', item.url)" v-for="(item,index) in vipData">
                    <a href="javascript:void(0)"><i><img :src="baseUrl+item.imgUrl"></i>
                        <p>{{item.name}}</p>
                    </a>
                </li>
                <!--<li>
                    <a href="#"><i><img src="./img/ctb.png"></i>
                        <p>错题本</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/qhlx.png"></i>
                        <p>强化练习</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/ktlx.png"></i>
                        <p>课堂练习</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/ktlb.png"></i>
                        <p>课堂录播</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/mclz.png"></i>
                        <p>明厨亮灶</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/zhpj.png"></i>
                        <p>综合评价</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/yqjz.png"></i>
                        <p>邀请家长</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/xxzy.png"></i>
                        <p>学习资源</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/msyk.png"></i>
                        <p>名师优课</p>
                    </a>
                </li>-->

            </ul>
        </div>
        <div class="workbench workbenchim">
            <h2 class="workbenc_h2"><img src="./img/tit_left.png"/><div>亲情一卡通功能</div><img src="./img/tit_right.png"/></h2>
            <ul>
                <li v-for="(item,index) in cardData">
                    <a :href="item.url"><i><img :src="baseUrl+item.imgUrl"></i>
                        <p>{{item.name}}</p>
                    </a>
                </li>
                <!--<li>
                    <a href="#"><i><img src="./img/ssdw.png"></i>
                        <p>时时定位</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/ljzz.png"></i>
                        <p>路径追踪</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/dzwl.png"></i>
                        <p>电子围栏</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/yyjh.png"></i>
                        <p>语音监护</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/sbxx.png"></i>
                        <p>设备信息</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/sos.png"></i>
                        <p>SOS</p>
                    </a>
                </li>
                <li>
                    <a href="#"><i><img src="./img/sz.png"></i>
                        <p>设置</p>
                    </a>
                </li>-->
            </ul>
        </div>
        <div class="b-banner">
            <img src="./img/214.jpg" />
        </div>
        <div class="news">
            <h2>福宇校园资讯<span><a href="#">更多&gt;&gt;</a></span></h2>
            <ul>
                <li><img src="./img/23132.jpg" /><label>鸡蛋壳拉大加拉屎房间按莱克斯顿鸡蛋壳拉大拉屎房间按莱克斯顿</label></li>
                <li><img src="./img/23132.jpg" /><label>鸡蛋壳拉大加拉屎房间按莱克斯顿鸡蛋壳拉大拉屎房间按莱克斯顿</label></li>
                <li><img src="./img/23132.jpg" /><label>鸡蛋壳拉大加拉屎房间按莱克斯顿鸡蛋壳拉大拉屎房间按莱克斯顿</label></li>
            </ul>
        </div>
        <div style="height: 1.1rem;"></div>
        <!--下导航-->
        <div class="bootom_nav">
            <ul>
                <li class="selectgao">
                    <i class="shou"></i>
                    <h2>首页</h2>
                </li>
                <li>
                    <i class="vip"></i>
                    <h2>VIP</h2>
                </li>
                <li>
                    <i class="jifen"></i>
                    <h2>积分兑换</h2>
                </li>
                <li>
                    <i class="geren"></i>
                    <h2>个人中心</h2>
                </li>
            </ul>
        </div>
        <!--未开通此功能-->
        <div class="tan_gn" v-if="tanShow=='1'">
            <div class="tan_black"></div>
            <div class="gongneng">
                <img src="./img/jinggao.png" />
                <p>抱歉，您尚未开通此功能！</p>
                <h2>如需使用可点击 <label>立即开通</label><br /> 或点击屏幕下方VIP模块了解开通</h2>
                <div class="qued" v-on:click="clickShow('0')">确定</div>
            </div>
        </div>

        <!--解除绑定弹框-->
        <!--<div class="j-tan" v-if="tanShow=='1'">
        <img src="./img/w-ico.png" />
        <p>是否解除绑定？</p>
        <a v-on:click="clearOpenid">确定</a><a v-on:click="clickShow('0')">取消</a>
    </div>-->
    </div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
            tanShow:'2',
            baseData: [],
            vipData: [],
            cardData: [],
            baseUrl:'http://mappv2.xueerqin.net'
        }
    },
    created () {
        // this.getUrlList()
        // this.getReadData()
        this.getTokenByMoblie()
    },
    methods: {
        getUrlList () {
            this.$store.dispatch('menu/GetUrlList').then(res => {
                var data = JSON.parse(res).Data.parentVip
                // console.log(data)
                data.forEach((item,index) =>{
                    if(item.type == '1'){
                        this.baseData.push(item)
                    }
                    if(item.type == '2'){
                        this.vipData.push(item)
                    }
                    if(item.type == '3'){
                        this.cardData.push(item)
                    }
                })
            })
        },
        getReadData () {
            var params = {
                studentId:'984ff3cb0791493597288b523d89cead'
            }
            this.$store.dispatch('menu/GetReadData',params).then(res => {
                console.log(res)
            })
        },
        getTokenByMoblie () {
            this.$store.dispatch('menu/GetTokenByMoblie','').then(res => {
                console.log(res)
            })
        },
        clickShow (params,url) {
            // this.tanShow = params
            location.href = url
        }     
    }
}
</script>
<style>
    @import url('../../../../style/Menu.css');
</style>