<template>
    <div class="person-center">
        <div class="person-center-bg">
            <div class="edit-password person-center-btn" @click="editPassword('edit-password-form')" v-if="!user || Number(user.roleId) === 0">
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
                    <span class="info-value">{{user && (user.mobile || '暂无电话')}}</span>
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
        <el-dialog title="退出登录" :visible.sync="logoutVisible" class="logout-dialog">
            <span class="logout-info">你确定要退出该账号吗？</span>
            <div>
                <span class="cancel-logout" @click="logoutVisible = false">取消退出</span>
                <span class="sure-logout" @click="sureLogout">确认退出</span>
            </div>
        </el-dialog>

        <!-- 编辑密码弹出框 -->
        <el-dialog title="修改密码" :visible.sync="editPasswordVisible" class="edit-password-dialog">
            <el-form class="edit-password" ref="edit-password-form" :rules="rules" :model="editPasswordForm" label-width="100px">
                <el-form-item label="旧的密码" prop="oldPassword">
                    <el-input v-model="editPasswordForm.oldPassword" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item label="新的密码" prop="newPassword">
                    <el-input v-model="editPasswordForm.newPassword" placeholder="请输入新的密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="submitPassword">
                    <el-input v-model="editPasswordForm.submitPassword" placeholder="请再次确认密码"></el-input>
                </el-form-item>
                    <div class="edit-password-submit" @click="editPasswordSubmit('edit-password-form')">确认保存</div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/api';
import config from '@/config';
 import Socket from '@/api/Socket';
export default {
    data () {
        return {
            personImg: require('@/assets/image/avatar.png'),
            logoutVisible: false,
            editPasswordVisible: false,
            rules: {
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                submitPassword: [
                    {required: true, validator: this.checkSubmitPassword, trigger: 'blur'}
                ]
            },
            editPasswordForm: {}
        };
    },
    computed: {
        ...mapGetters([
        'user',
        'socketConnected'
        ])
    },
    methods: {
        ...mapActions([
       'login',
       'delAllViews',
       'disconnectSocket',
       'logout'
     ]),
     async sureLogout () {
        const response = await api.post(config.logoutAPI, {});
        if (Number(response.data.code) === 200) {
            this.delAllViews();
            if (this.socketConnected) {
            const socket = Socket.init(config.socketURL);
            socket.disconnect();
            }
            this.disconnectSocket();
            this.logout();
            this.$router.push('/login');
        } else {
            this.$message({ type: 'error', message: response.data.msg });
        }
     },
     // 修改密码弹窗
     editPassword (formName) {
        this.passwordClearValidate(formName);
        this.editPasswordVisible = true;
     },
     // 修改密码
     async editPasswordSubmit (formName) {
         this.$refs[formName].validate(async valid => {
             if (valid) {
                let obj = {};
                obj.userId = this.user.userId;
                obj.pwdOld = this.editPasswordForm.oldPassword;
                obj.pwdNew = this.editPasswordForm.newPassword;
                const response = await api.post(config.personCenter.editPwd, obj);
                if (Number(response.data.code) === 200) {
                    this.$message({
                        type: 'success',
                        message: '密码修改成功'
                    });
                    this.editPasswordVisible = false;
                } else {
                    this.$message({
                        type: 'error',
                        message: response.data.msg
                    });
                }
             }
         });
     },
     checkSubmitPassword (rule, value, callback) {
         if (value !== this.editPasswordForm.newPassword) {
             callback(new Error('确认密码必须和新密码一致！'));
         }
         callback();
     },
     passwordClearValidate (formName) {
        this.editPasswordForm = {};
        this.$refs[formName] && this.$refs[formName].clearValidate();
     }
    }
};
</script>

<style lang="scss" scoped>
$bgcolor: #008aff;
$ftcolor: #fff;
@mixin setBgColor($bgcolor){
    background-color: $bgcolor;
}
.person-center {
  // height: 800px;
  width: 1570px;
  margin: 50px;
  border-radius: 20px;
  @include setBgColor($ftcolor);
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
    @include setBgColor($bgcolor);
    text-align: center;
    color: $ftcolor;
    font-size: 14px;
    position: absolute;
    border-radius: 10px;
    top: 40px;
    cursor: pointer;
    &:hover {
      @include setBgColor(#0066ff);
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
      color: $bgcolor;
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
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .logout-dialog,.edit-password-dialog {
    text-align: left;
  }
  .logout-info {
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
      margin-top: 40px;
  }
  .cancel-logout,.sure-logout {
      display: inline-block;
      height: 40px;
      width: 120px;
      line-height: 40px;
      border-radius: 10px;
      margin: 50px 10px;
      cursor: pointer;
  }
  .sure-logout {
      @include setBgColor($ftcolor);
      color: #999999;
      border: 1px solid #999;
      &:hover {
          border-color: $bgcolor;
          color: $bgcolor;
      }
  }
  .cancel-logout {
      @include setBgColor($bgcolor);
      color: $ftcolor;
      border: 1px solid $bgcolor;
      &:hover {
        @include setBgColor(#0066ff);
      }
  }
  .edit-password-submit {
      width: 120px;
      height: 40px;
      line-height: 40px;
      @include setBgColor($bgcolor);
      color: $ftcolor;
      cursor: pointer;
      border-radius: 10px;
      &:hover {
        @include setBgColor(#0066ff);
      }
      margin: 0 auto;
  }
}
</style>

<style>
.person-center .el-dialog {
    border-radius: 20px;
    width: 500px;
    /* height: 300px; */
}
.person-center .el-dialog__header {
    font-weight: bold;
    height: 60px;
    box-sizing: border-box;
    padding: 0 40px;
    line-height: 60px;
    border-bottom: 1px solid #e5e5e5;
}
.person-center .el-dialog__body {
    text-align: center;
}
.person-center .el-form-item__label {
    font-weight: bold;
}
.person-center .el-input {
    text-align: left;
}
.person-center .el-input__inner {
    width: 270px;
    border-radius: 10px;
    background-color: #eee;
}
.person-center .el-form-item {
    margin-bottom: 35px;
}
</style>
