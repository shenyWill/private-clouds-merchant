<template>
    <div class="holiday">
        <div class="holiday-title">假期设置</div>
        <div class="holiday-content">
            <span class="holiday-content-explain">请选择年份</span>
            <el-select v-model="calendarYear" placeholder="请选择年份" @change="changeYear">
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2019" value="2019"></el-option>
                <el-option label="2020" value="2020"></el-option>
                <el-option label="2021" value="2021"></el-option>
            </el-select>
            <el-radio-group v-model="checkNum" @change="checkMethod" class="check-method">
                <el-radio :label="1">永不放假</el-radio>
                <el-radio :label="2">恢复默认</el-radio>
                <el-radio :label="3">周末放假</el-radio>
            </el-radio-group>
            <div class="holiday-calendar">
            <div class="calendar-month" v-for="month in calendarMonth" :key="month">
                <div class="calendar-month-title">{{month}}月</div>
                <div class="calendar-month-list tip">日</div>
                <div class="calendar-month-list tip">一</div>
                <div class="calendar-month-list tip">二</div>
                <div class="calendar-month-list tip">三</div>
                <div class="calendar-month-list tip">四</div>
                <div class="calendar-month-list tip">五</div>
                <div class="calendar-month-list tip">六</div>
                <div :class="['calendar-month-list', dateArr.includes(`${calendarYear}-${month > 9 ? month : `${'0'+month}`}-${day > 9 ? day : `${'0'+day}`}`) ? 'active' : '']" v-for="day in dayArr[month-1]" :key="day" @click="checkDay(month, day)">{{day >= 1 ? day : '　'}}</div>
            </div>
        </div>
            <span class="holiday-content-common">
                如无个别调整，请点击<router-link to="/guard/set" class="common-router">年度假期设置</router-link>
            </span>
        </div>
        <p class="guard-holiday-submit">
            <span class="guard-holiday-btn" @click="holidaySubmit">确定</span>
        </p>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { getWeekArr } from '@/utils';
export default {
    data () {
        return {
            weekArr: [],
            dateArr: [],
            apiDateArr: [],
            calendarMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            calendarYear: 2018,
            dayArr: [[], [], [], [], [], [], [], [], [], [], [], []],
            checkNum: 2
        };
    },
    methods: {
        async responseAPI (data = {}) {
            const response = await api.post(config.guard.holidayList, data);
            if (Number(response.data.code) === 200) {
                this.apiDateArr = [...response.data.dateArr];
                this.dateArr = [...response.data.dateArr];
                this.checkNum = 2;
            }
        },
        async holidaySubmit () {
            const response = await api.post(config.guard.updateHoliday, {dateArr: [...this.dateArr], year: this.calendarYear});
            if (Number(response.data.code) === 200) {
                this.$message({type: 'success', message: response.data.msg});
                this.responseAPI({year: this.calendarYear});
            } else {
                this.$message({type: 'error', message: response.data.msg});
            }
        },
        checkDay (month, day) {
            if (day < 1) return;
            const nowDay = `${this.calendarYear}-${month > 9 ? month : `${'0' + month}`}-${day > 9 ? day : `${'0' + day}`}`;
            if (this.dateArr.includes(nowDay)) {
                this.dateArr.splice(this.dateArr.indexOf(nowDay), 1);
            } else {
                this.dateArr.push(nowDay);
            }
        },
        async changeYear () {
            this.responseAPI({year: this.calendarYear});
        },
        updateYear (val) {
            this.dayArr = [[], [], [], [], [], [], [], [], [], [], [], []];
            for (let month = 1; month < 13; month++) {
            let dayLength = new Date(val, month, 0).getDate();
            let firstDay = new Date(val, month - 1, 1).getDay();
            for (let day = 1; day <= firstDay; day++) {
                this.dayArr[month - 1].push(Math.random());
            }
            for (let day = 1; day <= dayLength; day++) {
                this.dayArr[month - 1].push(day);
            }
        }
        },
        checkMethod () {
            if (this.checkNum === 1) {
                this.dateArr = [];
            }
            if (this.checkNum === 2) {
                this.dateArr = [...this.apiDateArr];
            }
            if (this.checkNum === 3) {
                this.dateArr = getWeekArr(this.calendarYear);
            }
        }
    },
    async mounted () {
        await this.responseAPI({year: 2018});
        this.updateYear(this.calendarYear);
    },
    watch: {
        calendarYear (val) {
            this.updateYear(val);
        }
    }
};
</script>

<style lang="scss" scoped>
.holiday {
    margin: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 3px 3px 2px 0 rgba(0, 0, 0, 0.2);
    text-align: left;
    font-weight: bold;
    .holiday-title {
        height: 60px;
        padding-left: 30px;
        line-height: 60px;
        font-size: 18px;
        color: #333;
        border-bottom: 1px solid #dcdcdc;
    }
    .holiday-content {
        margin-left: 30px;
        font-size: 16px;
        color: #000;
        margin-top: 40px;
        padding-bottom: 50px;
    }
    .holiday-content-explain {
        margin-right: 20px;
    }
    .holiday-content-common{
        margin-top: 30px;
        display: inline-block;
    }
    .common-router {
        text-decoration: none;
        color: #008aff;
        &:visited {
            color: #008aff;
        }
    }
    .guard-holiday-submit {
        margin-top: 50px;
        padding-bottom: 100px;
        text-align: center;
    }
    .guard-holiday-btn{
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
    .calendar-month {
        width: 315px;
        height: 260px;
        font-size: 12px;
        float: left;
        margin: 20px;
    }
    .calendar-month-title {
        text-align: center;
        height: 35px;
        line-height: 35px;
        font-size: 18px;
        font-weight: bold;
    }
    .calendar-month-list {
        float: left;
        display: block;
        width: 45px;
        text-align: center;
        height: 35px;
        line-height: 35px;
        cursor: pointer;
        color: #333;
        &.active {
            color: #008aff;
        }
        &.tip {
            color: #000;
        }
    }
    .holiday-calendar {
        overflow: hidden;
    }
    .check-method {
        margin-left: 80px;
        display: inline-block;
    }
}
</style>
