<template>
    <div class="person-center">
        <div class="person-center-bg">
            <div class="edit-password person-center-btn">
                <i class="iconfont icon-lianjieURL-lan"> 修改密码</i>
            </div>
            <div class="out-login person-center-btn" @click="logoutVisible = true">
                <i class="iconfont icon-mima-lan"> 退出登录</i>
            </div>
        </div>
        <div class="person-center-icon">
            <img :src="personImg" alt="" class="person-center-image">
            <span class="person-center-name">{{user && user.name}}</span>
        </div>
        <div class="person-center-info">
            <div class="person-center-account">
                <i class="iconfont icon-qita-lan"></i>
                <p class="account-info">
                    <span class="info-key">账号</span>
                    <span class="info-value">{{user && user.username}}</span>
                </p>
            </div>
            <div class="person-center-phone">
                <i class="iconfont icon-guanyushebei-lan"></i>
                <p class="account-info">
                    <span class="info-key">电话</span>
                    <span class="info-value">{{user && user.mobile}}</span>
                </p>
            </div>
            <div class="person-center-organization">
                <i class="iconfont icon-baimingdan-lan1"></i>
                <p class="account-info">
                    <span class="info-key">组织</span>
                    <span class="info-value">{{user && user.deptName}}</span>
                </p>
            </div>
        </div>

        <!-- 退出弹出框 -->
        <el-dialog title="退出登录" :visible.sync="logoutVisible" width="25%" class="logout-dialog">

        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/api';
import config from '@/config';
export default {
    data () {
        return {
            personImg: require('@/assets/image/avatar.png'),
            logoutVisible: false
        };
    },
    computed: {
        ...mapGetters([
        'user'
        ])
    },
    methods: {
        ...mapActions([
       'login'
     ])
    },
    async created () {
        if (this.user === null) {
            const response = await api.post(config.personCenter.list, {});
            if (Number(response.data.code) === 200) {
                this.login(response.data.user);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.person-center{
    // height: 800px;
    width: 1570px;
    margin: 50px;
    border-radius: 20px;
    background-color: #fff;
    overflow: hidden;
    .person-center-bg {
        width: 100%;
        height: 500px;
        background-image: url(../../assets/image/person-center-bg.png);
        background-size: 100% 100%;
        position: relative;
    }
    .person-center-btn {
        width: 120px;
        height: 40px;
        line-height: 40px;
        background-color: #008aff;
        text-align: center;
        color: #fff;
        font-size: 14px;
        position: absolute;
        border-radius: 10px;
        top: 40px;
        cursor: pointer;
        &:hover{
            background-color: #0066ff;
        }
    }
    .edit-password {
        right: 182px;
    }
    .out-login {
        right: 42px;
    }
    .person-center-image {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        position: absolute;
        left: 0;
    }
    .person-center-icon {
        height: 150px;
        transform: translateY(-50%);
        margin-left: 100px;
        font-size: 24px;
        overflow: hidden;
        position: relative;
    }
    .person-center-name {
        position: absolute;
        left: 170px;
        bottom: 8px;
        font-weight: bold;
    }
    .person-center-info {
        height: 170px;
        box-sizing: border-box;
        margin: 0 100px;
        border-top: 1px solid #e5e5e5;
        padding: 40px 0;
        overflow: hidden;
        line-height: 90px;
        text-align: left;
        i {
            font-size: 60px;
            color: #008aff;
            float: left;
        }
        p {
            float: left;
            margin: 0;
            overflow: hidden;
            width: 60%;
            height: 100%;
            box-sizing: border-box;
            padding-top: 12px;
            padding-left: 20px;
            span {
                display: block;
                line-height: 34px;
            }
        }
    }
    .person-center-account {
        width: 250px;
        height: 100%;
        border-right: 1px solid #e5e5e5;
        float: left;
    }
    .person-center-phone {
        width: 450px;
        height: 100%;
        border-right: 1px solid #e5e5e5;
        float: left;
        padding-left: 40px;
    }
    .person-center-organization {
        width: 550px;
        height: 100%;
        float: left;
        padding-left: 40px;
    }
    .info-key {
        font-size: 20px;
        font-weight: bold;
    }
    .info-value {
        font-size: 26px;
        color: #666;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
    }
    .logout-dialog {
        text-align: left;
    }
}
</style>
