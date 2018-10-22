<template>
    <div class="account-operate">
        <img :src="userImg" alt="">
        <el-form class="operate-account" ref="operate-account-form" :rules="rules" :model="accountObj">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="accountObj.name" placeholder="请输入人员姓名"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="username">
                <el-input v-model="accountObj.username" placeholder="请输入对应账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="realPassword">
                <el-input v-model="accountObj.realPassword" placeholder="请输入对应密码"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
                <el-input v-model="accountObj.mobile" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="equipmentId">
                <el-select v-model="accountObj.equipmentId" placeholder="请选择设备" multiple size="small">
                    <el-option :label="item.equipmentName" :value="item.equipmentId" v-for="item in user.equipmentList" :key="item.equipmentId">
                    </el-option>
                </el-select>
            </el-form-item>
            <div class="edit-password-submit" @click="operateAccountSubmit('operate-account-form')">确认保存</div>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['accountObj'],
  data () {
    return {
      userImg: require('@/assets/image/avatar.png'),
      rules: {
        name: [
          { required: true, message: '请输入人员姓名', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入对应账号', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        realPassword: [
          { required: true, message: '请输入对应密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        // mobile: [
        //   { required: true, validator: this.checkMobile, trigger: 'blur' }
        // ],
        equipmentId: [
          { required: true, validator: this.checkEquipmentId, trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    operateAccountSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.$emit('accountOperate', this.accountObj);
        }
      });
    },
    // 检查电话
    checkMobile (rule, value, callback) {
      if (!/^[0-9]{11}$/.test(value)) {
        callback(new Error('请输入正确的电话号码'));
      }
      callback();
    },
    checkEquipmentId (rule, value, callback) {
        if (value.length === 0) {
            callback(new Error('请选择设备'));
        }
        callback();
    },
    // 清除验证信息
    passwordClearValidate (formName) {
      this.$refs[formName] && this.$refs[formName].clearValidate();
    }
  },
  mounted () {
  }
};
</script>

<style lang="scss">
.account-operate {
  img {
    width: 130px;
    height: 130px;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  .operate-account {
      width: 300px;
      margin: 0 auto;
  }
  .el-form-item__content {
      margin-left: 60px;
  }
  .el-form-item__label {
      font-weight: bold;
  }
  .el-input__inner {
      background-color: #eeeeee;
      border-radius: 10px;
      color: #666;
  }
  .el-form-item {
      margin-bottom: 30px;
  }
  .edit-password-submit {
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #008aff;
      color: #fff;
      border-radius: 10px;
      margin: 30px auto;
      cursor: pointer;
      &:hover {
          background-color: #0066ff;
      }
  }
}
</style>
