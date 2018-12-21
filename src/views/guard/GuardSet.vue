<template>
    <div class="guard-set">
        <div class="guard-set-title">门禁设置</div>
        <div class="guard-set-content">
            <p class="guard-set-time">
                <span class="guard-set-time-explain">门禁开放日期</span>
                <el-time-picker is-range v-model="timer" range-separator="至" arrow-control value-format="HH-mm"></el-time-picker>
                <span class="guard-set-time-fulltime">24小时全天</span>
                <el-switch v-model="allDay" active-color="#00bb22" inactive-color="#dcdfe6"></el-switch>
            </p>
            <p class="guard-set-week">
                <span class="guard-set-week-special">
                    如有个别调整，请点击<router-link to="/guard/holiday" class="special-router">年度假期设置</router-link>
                </span>
            </p>
            <p class="guard-set-submit">
                <span class="guard-set-btn" @click="setSubmit">确定</span>
            </p>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
export default {
    mounted () {
        this.responseAPI();
    },
    data () {
        return {
            timer: ['00-00', '23-59'],
            allDay: false
        };
    },
    methods: {
        async setSubmit () {
            let requestObj = {};
            if (this.allDay) {
                requestObj.startTime = '0000';
                requestObj.endTime = '2359';
            } else {
                requestObj.startTime = this.timer[0].replace('-', '');
                requestObj.endTime = this.timer[1].replace('-', '');
            }
            const response = await api.post(config.guard.updateTime, {...requestObj});
            if (Number(response.data.code) === 200) {
                await this.responseAPI();
                this.$message({type: 'success', message: response.data.msg});
            } else {
                this.$message({type: 'error', message: response.data.msg});
            }
        },
        async responseAPI () {
            const response = await api.post(config.guard.setList);
            if (Number(response.data.code) === 200) {
                response.data.startTime && this.$set(this.timer, 0, `${response.data.startTime.substring(0, 2)}-${response.data.startTime.substring(2)}`);
                response.data.endTime && this.$set(this.timer, 1, `${response.data.endTime.substring(0, 2)}-${response.data.endTime.substring(2)}`);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.guard-set {
    margin: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 3px 3px 2px 0 rgba(0, 0, 0, 0.2);
    text-align: left;
    font-weight: bold;
    .guard-set-title {
        height: 60px;
        padding-left: 30px;
        line-height: 60px;
        font-size: 18px;
        color: #333;
        border-bottom: 1px solid #dcdcdc;
    }
    .guard-set-time,.guard-set-week {
        font-size: 16px;
        padding-left: 40px;
        padding-bottom: 20px;
        height: 50px;
        line-height: 50px;
    }
    .guard-set-week {
        height: 100px;
        overflow: hidden;
    }
    .guard-set-week-explain {
        float: left;
        margin-right: 20px;
    }
    .guard-set-time-explain {
        margin-right: 15px;
    }
    .guard-set-time-fulltime {
        margin-left: 150px;
        margin-right: 15px;
    }
    .el-checkbox-group {
        float: left;
    }
    .el-checkbox-button {
        margin-right: 20px;
    }
    .guard-set-week-special {
        display: block;
        margin-top: 10px;
        margin-left: 115px;
    }
    .special-router {
        text-decoration: none;
        color: #008aff;
        &:visited {
            color: #008aff;
        }
    }
    .guard-set-submit {
        margin-top: 350px;
        padding-bottom: 100px;
        text-align: center;
    }
    .guard-set-btn{
        width: 120px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        background-color: #008aff;
        color: #fff;
        text-align: center;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
    }
}
</style>
<style lang="scss">
.guard-set{
.el-checkbox-button__inner {
    border-radius: 5px !important;
    border: 1px solid #409EFF !important;
    color: #409EFF;
    }
}
</style>
