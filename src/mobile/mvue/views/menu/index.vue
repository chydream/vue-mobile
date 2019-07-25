<template>
    <div id="menu">
        <div class="nav_title">
            <img class="logo_index" src="./img/indexlogo.png" />
            <div class="nav_person" @click="showList">
                <img class="per_img" :src="itemData.Img" />
                <span>{{itemData.RealName}}</span>
                <img class="changest" src="./img/changest.png" />
            </div>
        </div>
        <div class="banner">
            <img src="./img/banner2.png" />
        </div>
        <div id="muserList" v-show="isShowList">
            <div class="windows" @click="showList()"></div> 
            <div class="person_list">
                <ul>
                    <li v-for="(item,index) in classData" :key="index" @click="showListItem(item)">
                        <img :src="item.Img" class="pern_img">
                        <span>{{item.RealName}}</span>
                        <label>{{item.GradeName}}{{item.ClassName}}</label>
                    </li>
                </ul> 
            </div>
        </div>
        <div class="workbench workbenchim">
            <h2 class="workbenc_h2"><img src="./img/tit_left.png"/><div>基础惠享功能</div><img src="./img/tit_right.png"/></h2>
            <ul>
                <li v-for="(item,index) in baseData" :key="index">
                    <label v-if="item.name=='通知公告'&&notice!=0">{{notice}}</label>
                    <label v-if="item.name=='家庭作业'&&task!=0">{{task}}</label>
                    <label v-if="item.name=='学生请假'&&leave!=0">{{leave}}</label>
                    <a :href="item.url"><i><img :src="baseUrl+item.imgUrl"></i>
                        <p>{{item.name}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="workbench workbenchim">
            <h2 class="workbenc_h2"><img src="./img/tit_left.png"/><div>VIP尊享功能</div><img src="./img/tit_right.png"/></h2>
            <ul>
                <li v-on:click="clickShow('1', item.url)" v-for="(item,index) in vipData" :key="index">
                    <a href="javascript:void(0)"><i><img :src="baseUrl+item.imgUrl"></i>
                        <p>{{item.name}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="workbench workbenchim">
            <h2 class="workbenc_h2"><img src="./img/tit_left.png"/><div>亲情一卡通功能</div><img src="./img/tit_right.png"/></h2>
            <ul>
                <li v-for="(item,index) in cardData" :key="index">
                    <a :href="item.url"><i><img :src="baseUrl+item.imgUrl"></i>
                        <p>{{item.name}}</p>
                    </a>
                </li>
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
            baseUrl:'http://mappv2.xueerqin.net',
            isShowList: false,
            readData: [],
            classData: [],
            itemData: {},
            notice: 0,
            task:0,
            leave: 0,
            cookiesObj:{}
        }
    },
    created () {
        var cookies = "Token=5e92ccaa; OpenId=; returnCode=window.location.href%3D%22http%3A%2F%2Ft-mappv2.xueerqin.net%2Fcommon%2Flogin.shtml%23page2%22; loginName=14100000001; roleCode=Parent; parentId=f888ad84b7564dbe98abc21528eaa835; realName=%E5%90%B4%E6%B3%BD%E6%88%90%E5%A7%A8%E5%A7%A8; loginUserId=f06bb0e73f284f1ba70b08cfb55874ce; img=null; studentId=984ff3cb0791493597288b523d89cead"
        this.cookiesObj = this.getCookiesObj(cookies)
        // console.log(this.cookiesObj)
        this.getUrlList(this.cookiesObj.classId,this.cookiesObj.gradeId,this.cookiesObj.schoolId,this.cookiesObj.realName)
        this.getReadData(this.cookiesObj.studentId,'')
        this.getTokenByMoblie()
    },
    methods: {
        getUrlList (classId,gradeId,schoolId,realName) {
            this.baseData = []
            this.vipData = []
            this.cardData = []
            var params = {
                classId:classId,
                gradeId:gradeId,
                schoolId:schoolId,
                realName:realName,
                img:this.cookiesObj.img,
                OpenId:this.cookiesObj.OpenId,
                Token:this.cookiesObj.Token,
                loginName:this.cookiesObj.loginName,
                loginUserId:this.cookiesObj.loginUserId,
                returnCode:this.cookiesObj.returnCode,
                roleCode:this.cookiesObj.roleCode,
                teacherId:this.cookiesObj.teacherId,
                studentId:this.cookiesObj.studentId,
            }
            this.$store.dispatch('menu/GetUrlList',params).then(res => {
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
        getReadData (studentId,classId) {
            var params = {
                classId: classId,
                studentId:studentId,
                typeId: 1
            }
            this.$store.dispatch('menu/GetReadData',params).then(res => {
                var data = JSON.parse(res).Data
                this.notice = data.UnReadCount
            })
            var params = {
                classId: classId,
                studentId:studentId,
                typeId: 2
            }
            this.$store.dispatch('menu/GetReadData',params).then(res => {
                var data = JSON.parse(res).Data
                this.task = data.UnReadCount
            })
            var params = {
                classId: classId,
                studentId:studentId,
                typeId: 3
            }
            this.$store.dispatch('menu/GetReadData',params).then(res => {
                var data = JSON.parse(res).Data
                this.leave = data.UnReadCount
            })
        },
        getTokenByMoblie () {
            var params = {
                roleCode: 'Parent'
            }
            this.$store.dispatch('menu/GetTokenByMoblie',params).then(res => {
                // console.log(res)
                var data = JSON.parse(res).Data.MChildList
                this.classData = data
                // console.log(this.classData)
                for(var i=0;i<this.classData.length;i++){
                    if(this.classData[i].SelfId == this.cookiesObj.studentId){
                        this.itemData = this.classData[i]
                    }
                }
            })
        },
        clickShow (params,url) {
            // this.tanShow = params
            location.href = url
        },
        showListItem (item) {
            // console.log(item)
            this.isShowList = !this.isShowList
            this.itemData = item
            //this.getUrlList(item.ClassId,item.GradeId,item.SchoolId,item.RealName)
            this.getReadData(item.SelfId,item.ClassId)
        },
        showList () {
            this.isShowList = !this.isShowList
        },
        getCookiesObj (cookies) {
            var arr = cookies.split(";")
            var obj = {}
            for(var i=0;i<arr.length;i++){
                var newArr = arr[i].split("=")
                obj[newArr[0].trim()]=newArr[1]
            }
            return obj
        }    
    }
}
</script>
<style>
    @import url('../../../../style/Menu.css');
</style>