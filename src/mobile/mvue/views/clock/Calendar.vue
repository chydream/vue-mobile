<template>
    <div class="calendar-new">
        <!-- <h3>{{userData.realname}}，签到情况：</h3> -->
        <div id="demo" class="cal-demo">
            <inline-calendar
                    :highlight-weekend='false'
                    @on-select-single-date="selectDateFun"
                    @on-change="selectChange"
                    @on-view-change='selectMonth'
                    ref="calendar">         
            </inline-calendar>
        </div>
        <div class="table-wrap">
            <table class="base-table cal-table">
                <tr v-for="(item,index) in resultData" :key="index">
                    <template >
                        <td>{{item.countDate}}</td>
                        <td :class="{warning:item.name=='忘打卡'||item.noSignCount>0,doing:item.name.indexOf('迟到')>=0||item.name.indexOf('早退')>=0}">{{item.name}}  {{ setNoSignCount(item.noSignCount)}}</td>
                        <td><span class="success">{{item.status}}</span></td>
                    </template>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import $ from 'jquery'
import { InlineCalendar } from 'vux'
export default {
    name: 'mCalendar',
    components: {
        InlineCalendar
    },
    data () {
        return {
            signResultListOri:[],//原始日历数据
            signResultList:[], // 日历数据
            userFlowData:[], // 流程数据
            enterpriseCalendarData:[], // 企业数据
            abnormalData:[], // 异常数据
            selectData:[], // 选中日期
            selectStatus:false, // 选中日期状态
            objData:[],
            dataWarning:[],
            dataError:[]
        }
    },
    computed:{
        ...mapGetters(['userData']),
        resultData(){
            this.dataWarning = []
            this.dataError = []
            if(this.selectStatus){
                return this.selectData
            }else{
                var newData = this.userFlowData.concat(this.enterpriseCalendarData).concat(this.abnormalData)
                function compare(property){
                    return function(a,b){
                        var value1=a[property]
                        var value2=b[property]
                        return value2-value1
                    }
                }
                newData.sort(compare('startTime'))
                newData.forEach((item,index) => {
                    if(item.name=='忘打卡'||item.noSignCount>0){
                        var dateStr = item.startTimeDate.split(' ')[0]
                        this.dataWarning.push(dateStr)
                        $('td[data-date='+dateStr+']').addClass('data-warning')
                    }
                    if(item.name.indexOf('迟到')>=0||item.name.indexOf('早退')>=0){
                        var dateStr = item.startTimeDate.split(' ')[0]
                        this.dataError.push(dateStr)
                        $('td[data-date='+dateStr+']').addClass('data-error')
                    }
                });
                return newData
            }
        }
    },
    created () {
        var date = new Date();
        var month = date.getMonth()+1
            month = month<10?('0'+month):month
        var dateCurrent = date.getFullYear()+''+month
        this.setTitle('签到日历');
        // 查询签到日历数据
        // this.querySignResultList(dateCurrent); 
        // 获取当月相关流程数据
        // this.queryUserFlowDataByMonth(dateCurrent);
        // 查询企业日历配置
        // this.queryEnterpriseCalendarConfig(dateCurrent);
    },
    methods: {
        // 查询签到日历数据
        querySignResultList (yearMonth) {
            var params = {
                yearMonth:yearMonth
            }
            this.$store.dispatch('clock/QuerySignResultList',params).then((res)=>{
                // console.log(res)
                if(res.success){
                    this.signResultListOri = res.data;
                    this.signResultList = res.data.map((item)=>{
                        return {
                            countDate:this.setDate(item.countDate),
                            name:this.setSign(item.goToWorkSignType,item.goToWorkLateMin,item.restStartTime,item.restStartSignType,item.restEndSignType,item.goOffWorkSignType,item.goOffWorkLeaveEarlyMin),
                            noSignCount:item.noSignCount,
                            status:'',
                            flag:'0',
                            startTime:(new Date(item.countDate)).getDate(),
                            startTimeDate:item.countDate
                        }
                    });
                    res.data.forEach((item,index) => {
                        if(item.isNormal==0&&item.noSignCount>0){
                            var item = {
                                countDate:this.setDate(item.countDate),
                                name:this.setSign(item.goToWorkSignType,item.goToWorkLateMin,item.restStartTime,item.restStartSignType,item.restEndSignType,item.goOffWorkSignType,item.goOffWorkLeaveEarlyMin),
                                noSignCount:item.noSignCount,
                                status:'',
                                flag:'0',
                                startTime:(new Date(item.countDate)).getDate(),
                                startTimeDate:item.countDate
                            }
                            this.abnormalData.push(item)
                        }
                        if(item.isNormal==2){
                            var item = {
                                countDate:this.setDate(item.countDate),
                                name:this.setSign(item.goToWorkSignType,item.goToWorkLateMin,item.restStartTime,item.restStartSignType,item.restEndSignType,item.goOffWorkSignType,item.goOffWorkLeaveEarlyMin),
                                noSignCount:item.noSignCount,
                                status:'',
                                flag:'0',
                                startTime:(new Date(item.countDate)).getDate(),
                                startTimeDate:item.countDate
                            }
                            this.abnormalData.push(item)
                        }
                    });
                }else{
                    console.log(res.message)
                }
            })
        },
        //修改日期
        setDate (date){
            var dateNow = new Date(date);
            function setNum(num){
                if(num<10){
                    return '0'+num
                }else{
                    return num;
                }
            }
            if(date.length>10){
                return setNum(dateNow.getMonth()+1) + '月' + setNum(dateNow.getDate())+'日'+' '
                        +setNum(dateNow.getHours())+':'+setNum(dateNow.getMinutes());
            }else{
                return setNum(dateNow.getMonth()+1) + '月' + setNum(dateNow.getDate())+'日'
            }
            // return date.slice(5,16).replace('-','月')
        },
        /**
         * isWorkDay  是否工作日 0-否 1-是   
         * isNoNeedSign  是否免打卡
         * isAttendance  是否出勤 0-否 1-是
         * isNormal  是否正常考勤（0-异常 1-正常 2-存在迟到早退）
         */
        setStatus(isWorkDay,isNoNeedSign,isAttendance,isNormal){
            //是否工作日
            if(isWorkDay==0){
                return 'green'
            }else{
                //是否免打卡
                if(isNoNeedSign==1){
                    return 'green'
                }else{
                    //是否出勤
                    if(isAttendance==0){
                        return 'red'
                    }else{
                        //是否正常考勤（0
                        if(isNormal==1){
                            return 'green'
                        }else if(isNormal==2){
                            return 'yellow'
                        }else if(isNormal==0){
                            return 'red'
                        }
                    }
                }
            }
        },
        //未打卡次数
        setNoSignCount(noSignCount){
            return parseInt(noSignCount)>0?('忘打卡'+ noSignCount+'次'):''
        },
        //签到情况 1-请假 2-公出 3-出差 4-未签到  5-签到 6-迟到 早退
        setSign(goToWorkSignType,goToWorkLateMin,restStartTime,restStartSignType,restEndSignType,goOffWorkSignType,goOffWorkLeaveEarlyMin){
            function getSign(status,offStatus){
                if(status==1){
                    return '请假';
                }
                if(status==2){
                    return '公出';
                }
                if(status==3){
                    return '出差';
                }
                if(status==4){
                    return '未签到';
                }
                if(status==5){
                    return '签到';
                }
                if(status==6){
                    if(offStatus==0){
                        return '迟到'+goToWorkLateMin;
                    }else if(offStatus==1){
                         return '早退';
                    }else if(offStatus==2){
                         return '早退'+goOffWorkLeaveEarlyMin;
                    }  
                }
            }
            var goToWork = getSign(goToWorkSignType,0);
            var restStart =''
            if(restStartTime){
                restStart = getSign(restStartSignType,1);
            }else{
                restStart = getSign(restEndSignType,1);
            }
            var goOffWork = getSign(goOffWorkSignType,2);
            return goToWork+'/'+restStart+'/'+goOffWork;
        },
        // 获取当月相关流程数据
        queryUserFlowDataByMonth (yearMonth) {
            var params = {
                yearMonth:yearMonth
            }
            this.$store.dispatch('clock/QueryUserFlowDataByMonth',params).then((res)=>{
                // console.log(res.data.leaveInfoList)
                if(res.success){
                    //加班、公出、忘打卡流程数据
                    var workApprovalInfoList=res.data.workApprovalInfoList.map((item)=>{
                        var workType = '';
                        if(item.workType==1){
                            workType = '加班'
                        }else if(item.workType==2){
                            workType = '公出'
                        }else if(item.workType==3){
                            workType = '忘打卡'
                        }
                        return {
                            countDate:this.setDate(item.startTime)+'~'+this.setDate(item.endTime),
                            flag:'2',
                            name:workType,
                            status:'审批通过',
                            noSignCount:item.forgetSignCount,
                            startTime:(new Date(item.startTime)).getDate(),
                            startTimeDate:item.startTime    
                        }
                    })
                    //请假流程数据
                    var leaveInfoList = res.data.leaveInfoList.map((item)=>{
                        var leaveType = '';
                        if(item.leaveType==1){
                            leaveType = '事假'
                        }else if(item.leaveType==2){
                            leaveType = '病假'
                        }else if(item.leaveType==3){
                            leaveType = '年假'
                        }else if(item.leaveType==4){
                            leaveType = '探亲假'
                        }else if(item.leaveType==5){
                            leaveType = '婚嫁'
                        }else if(item.leaveType==6){
                            leaveType = '产假或陪产假'
                        }else if(item.leaveType==7){
                            leaveType = '丧假'
                        }else if(item.leaveType==8){
                            leaveType = '调休'
                        }
                        return {
                            countDate:this.setDate(item.startTime)+'~'+this.setDate(item.endTime),
                            flag:'2',
                            name:leaveType,
                            status:'审批通过',
                            noSignCount:0,
                            startTime:(new Date(item.startTime)).getDate(),
                            startTimeDate:item.startTime     
                        }
                    })
                    //出差审批时间
                    var businessTripInfoList = res.data.businessTripInfoList.map((item)=>{
                        return {
                            countDate:this.setDate(item.planStartBusinessTripDate)+'~'+this.setDate(item.planEndBusinessTripDate),
                            flag:'2',
                            name:'出差  '+item.origPlace+'-'+item.destPlace,
                            status:'审批通过',
                            noSignCount:0,
                            startTime:(new Date(item.planStartBusinessTripDate)).getDate(),
                            startTimeDate:item.planStartBusinessTripDate      
                        }
                    })
                    this.userFlowData = workApprovalInfoList.concat(leaveInfoList).concat(businessTripInfoList);
                }else{
                    console.log(res.message);
                }
            })
        },
        // 查询企业日历配置
        queryEnterpriseCalendarConfig (yearMonth) {
            var params = {
                yearMonth:yearMonth
            }
            this.$store.dispatch('clock/QueryEnterpriseCalendarConfig',params).then((res)=>{
                if(res.success){
                    var result = res.data.map((item)=>{
                        return {
                            countDate:this.setDate(item.START_DATE)+'~'+this.setDate(item.END_DATE),
                            name:item.CALENDAR_DESC,
                            flag:'1',
                            noSignCount:'',
                            status:'',
                            startTime:(new Date(item.START_DATE)).getDate(),
                            startTimeDate:item.START_DATE                                   
                        }
                    })
                    this.enterpriseCalendarData = result;
                }else{
                    console.log(res.message);
                }
            })
        },
        // 获取索引
        getArrIndex(arr,value){
            for(var i=0;i<arr.length;i++){
                if(arr[i].countDate==value){
                    return i;
                }
            }
        },
        //选中日期
        selectDateFun(date){
            this.selectStatus = !this.selectStatus;
            if(!this.selectStatus){
                $('td[data-date='+date+']').removeClass('current');
            }else{
                $('td[data-date='+date+']').addClass('current');
            }
        },
        //日期变更事件
        selectChange(date){
            // console.log(this.dataWarning)
            this.dataWarning.forEach((item)=>{
                $('td[data-date='+item+']').addClass('data-warning')
            })
            this.dataError.forEach((item)=>{
                $('td[data-date='+item+']').addClass('data-error')
            })
            setTimeout(() => {
                $('td[data-date='+'2019-04-17'+']').addClass('data-warning')
            }, 100);
            
            var now = new Date(date);
            var day = now.getDay();
            var dateNow = this.setDate(date);
            var i=-1;
            this.signResultList.forEach((item,index)=>{
                if(item.countDate==dateNow){
                    i=index;
                }
            })
            if(i==-1){
                this.selectData = [];
            }else{
                 this.selectData = [this.signResultList[i]];
                 if(day==0||day==6){
                    if(this.signResultListOri[i].isAttendance==0){
                        this.selectData[0].name = '周末放假';
                    }  
                }
            }          
            this.selectStatus = true;
        },
        //月份变更事件
        selectMonth(data, index){
            this.selectStatus = false;
            this.abnormalData = [];
            $('td').removeClass('data-warning');
            $('td').removeClass('data-error');
            var month = data.month<10?('0'+data.month):data.month;
            var dateCurrent = data.year +''+month;
            // 查询签到日历数据
            this.querySignResultList(dateCurrent); 
            // 获取当月相关流程数据
            this.queryUserFlowDataByMonth(dateCurrent);
            // 查询企业日历配置
            this.queryEnterpriseCalendarConfig(dateCurrent);
        }
    }
}
</script>
<style lang="less">
.calendar-new{
    .cal-demo{
        position: fixed;
        left: 0;
        top: 41px;
        width: 100%;
        // background: #fff;
        z-index: 10;
    }
    padding: 296px 0px 10px;
    h3{
        font-size: 17px;
        color: #282828;
        font-weight: normal;
        margin-bottom: 6px;
    }
    .table-wrap{
        margin-top:15px; 
    }
    .cal-table tr td:nth-child(1){
        width: 30%;
        position: relative;
    }
    .cal-table tr td:nth-child(1)::after{
        content: '';
        width: 0px;
        height: 64%;
        border-right: 1px dashed #dfdfdf;
        position:absolute;
        right: 8px;
        top: 18%;
    }
    .cal-table tr td:nth-child(2){
        width: 43%;
    }
    .cal-table tr td:nth-child(3){
        width: 27%;
        text-align: right;
    }
    .calendar-header,thead{
        background: #f7f7f8;
    }
    .inline-calendar td{
        padding: 7px 0;
        font-size: 15px;
    }
    .is-week-0,.is-week-6{
        color: #c0c0c0;
    }
}
</style>



