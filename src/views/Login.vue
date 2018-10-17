<template>
  <div class="login">
    <div class="login__title"></div>

    <div class="login__content">
      <div class="login__content-logo">
        <img :src="logo" alt="logo" />
      </div>
      <div class="login__content-title">{{ title }}</div>
      <el-form :model="form" ref="form" :rules="rules" class="login__form">
        <el-form-item prop="username">
          <el-input
            class="login__form-name"
            clearable
            placeholder="请输入账号"
            type="text"
            auto-complete="off"
            @keyup.enter.native="onSubmit"
            v-model="form.username">
            <i slot="prefix" class="iconfont icon-qita-lan"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="login__form-pwd"
            clearable
            placeholder="请输入密码"
            type="password"
            v-model="form.password"
            @keyup.enter.native="onSubmit">
            <i slot="prefix" class="iconfont icon-mima-lan"></i>
          </el-input>
        </el-form-item>
        <el-button class="login__form-button" type="primary" @click="onSubmit" :disabled="disabled">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
 import api from '@/api';
 import Qs from 'qs';
 import config from '@/config';
 import Socket from '@/api/Socket';
 import { mapActions, mapGetters } from 'vuex';
 export default {
   // Login Component
   name: 'Login',
   data () {
     return {
       background: require('@/assets/image/background.png'),
       logo: require('@/assets/image/logo.png'),
       disabled: false,
       title: '◈ 智能分析系统用户登录 ◈',
       form: {
         username: '',
         password: ''
       },
       rules: {
         username: [
           { required: true, message: '请输入用户名', trigger: 'blur' }
         ],
         password: [
           { required: true, message: '请输入密码', trigger: 'blur' }
         ]
       }
     };
   },
   computed: {
     ...mapGetters([
       'socketConnected'
     ])
   },
   methods: {
     ...mapActions([
       'login',
       'disconnectSocket'
     ]),
     request (url, data, cb) {
       const config = {
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         }
       };
       return cb(url, Qs.stringify(data), config);
     },
     // disconnect socket if connected
     adminDisconnectSocket () {
       if (this.socketConnected) {
         const socket = Socket.init(config.socketURL);
         socket.disconnect();
         this.disconnectSocket();
       }
     },
     // submit login form
     onSubmit () {
       this.$refs['form'].validate(async valid => {
         if (valid) {
           try {
             this.disabled = true;
             const response = await this.request(config.loginAPI, this.form, api.post);
             this.disabled = false;
             if (Number(response.data.code) === 200) {
               this.login(response.data.user);
               this.$router.push('/stream/index');
             } else {
               this.$message({ type: 'error', message: response.data.msg });
             }
           } catch (error) {
             this.disabled = false;
           }
         } else {
           this.disabled = false;
           return false;
         }
       });
     }
   },
   mounted () {
     this.adminDisconnectSocket();
   }
 };
</script>

<style lang="scss">
 $contentWidth: 460px;
 $formWidth: 340px;
 .login {
   position: absolute;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   overflow: hidden;
   border: none;
   background-image: url(../assets/image/background.png);
   background-size: 100% 100%;
 }
 .login__content {
   position: absolute;
   margin: auto;
   top: 0;
   bottom: 0;
   right: 150px;
   height: 650px;
   width: $contentWidth;
   background-color: white;
   border-radius: 30px;
   .login__content-logo img {
     margin: 80px auto 50px;
     width: $formWidth;
     height: auto;
   }
 }
 .login__content-title {
   margin: 30px auto 60px;
   font-size: 24px;
   font-weight: bold;
   color: #333333;
 }
 .login__form {
   width: $formWidth;
   margin: 60px auto 0;
   &.el-form-item {
     margin-bottom: 62px;
   }
 }
 .login__form-button {
   margin-top: 80px;
   font-size: 24px;
   width: $formWidth;
   border-radius: 10px;
 }
</style>
