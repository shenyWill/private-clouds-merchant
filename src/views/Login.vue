<template>
  <div class="login">
    <div class="login__background">
      <img :src="background" class="login__background-image" draggable="false" />
    </div>

    <div class="login__title"></div>

    <div class="login__content">
      <el-form :model="form" ref="form" :rules="rules" class="login__form" label-width="100px">
        <el-form-item props="username" label="账号">
          <el-input
            class="login__form-name"
            clearable
            placeholder="请输入账号"
            type="text"
            auto-complete="off"
            v-model="form.username">
          </el-input>
        </el-form-item>
        <el-form-item props="password" label="密码">
          <el-input
            class="login__form-pwd"
            clearable
            placeholder="请输入密码"
            type="password"
            v-model="form.password"
            @keyup.enter.native="onSubmit">
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="disabled">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
 import api from '@/api';
 import config from '@/config';
 import { mapActions } from 'vuex';
 export default {
   // Login Component
   name: 'Login',
   data () {
     return {
       background: '',
       disabled: false,
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
   methods: {
     ...mapActions([
       'login'
     ]),
     request (url, data, cb) {
       return cb(url, data);
     },
     onSubmit () {
       this.$refs['form'].validate(async valid => {
         if (valid) {
           try {
             this.disabled = true;
             // Crypto
             const response = await this.request(config.loginAPI, this.form, api.post);
             this.disabled = false;
             if (response.data.resCode === '200') {
               this.login(response.data.data);
               this.$router.push('/index');
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
   }
 };
</script>

<style>
 .login {
   width: 600px;
   margin: 200px auto;
 }
 .login__content {
   padding: 50px;
   border: 1px solid black;
 }
</style>
