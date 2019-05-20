<template>
    <div class="calendar">
        <h3>张三，签到情况：</h3>
        <div id="demo">
            <!-- <calendar @change="onChange" :show.sync="show" :mode="mode"/> -->
            <inlineCalendar :mode='mode' :dayClick='dayClick' @switch='switchFun' :show.sync='show'/>
        </div>
        <div class="table-wrap">
            <table class="base-table cal-table">
                <tr>
                    <td>2月19日</td>
                    <td>加班/公出/忘打卡流程  忘打卡 1次</td>
                    <td><span class="success">审批通过</span></td>
                </tr>
                <tr>
                    <td>2月19日</td>
                    <td>加班/公出/忘打卡流程  忘打卡 1次</td>
                    <td><span class="doing">审批中</span></td>
                </tr>
                <tr class="warning">
                    <td>2月19日</td>
                    <td>加班/公出/忘打卡流程  忘打卡 1次</td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'mCalendar',
    data () {
        return {
            mode: 'single',
            show: false
        }
    },
    created () {
        this.setTitle('签到日历');
    },
    methods: {
        onChange(date) {
            console.log(date.format('YY-MM-DD'));
        },
        switchFun({year,month}){
            console.log(year,month)
        },
        dayClick:(date)=>{
            console.log(date.format('YYYY-MM-DD'))
            // const confirm = window.confirm(`已选日期：${date.format('YYYY-MM-DD')}，是否选择此日期？`);
            return true;
        }
    }
}
</script>
<style lang="less">
.calendar{
    padding: 10px;
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
        width: 45%;
    }
    .cal-table tr td:nth-child(3){
        width: 25%;
        text-align: right;
    }
    .m-calendar .m-months-container .m-months-wrapper .m-months .m-row:before{
        background-color:transparent;
    }
}
</style>



