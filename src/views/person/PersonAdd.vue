<template>
    <div class="dialog-person-add">
        <el-form ref="add-person-form" :rules="rules" :model="addPersonForm" label-width="80px" label-position="top" size="small">
            <div class="person-add-upload">
                <el-upload class="avatar-uploader-first" action="" :auto-upload="false" :show-file-list="false" :on-change="handleFirstImageChange">
                    <img :src="firstImageUrl" class="avatar" v-if="firstImageUrl">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload class="avatar-uploader-second" action="" :auto-upload="false" :show-file-list="false" :on-change="handleSecondImageChange">
                    <img :src="secondImageUrl" class="avatar" v-if="secondImageUrl">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload class="avatar-uploader-third" action="" :auto-upload="false" :show-file-list="false" :on-change="handleThirdImageChange">
                    <img :src="thirdImageUrl" class="avatar" v-if="thirdImageUrl">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload class="avatar-uploader-fouth" action="" :auto-upload="false" :show-file-list="false" :on-change="handleFouthImageChange">
                    <img :src="fouthImageUrl" class="avatar" v-if="fouthImageUrl">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <el-form-item label="人员姓名" prop="name">
                <el-input v-model="addPersonForm.name"></el-input>
            </el-form-item>
            <el-form-item label="人员描述" prop="position">
                <el-input v-model="addPersonForm.position"></el-input>
            </el-form-item>
            <el-form-item label="人员类型" prop="ipStatus">
                <el-select v-model="addPersonForm.ipStatus" placeholder="请选择人员类型">
                    <el-option label="白名单" value="白名单"></el-option>
                    <el-option label="黑名单" value="黑名单"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="startDate">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="addPersonForm.startDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endDate">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="addPersonForm.endDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="识别设备" prop="equipment">
                <el-select v-model="addPersonForm.equipment" placeholder="请选择设备" multiple>
                    <el-option-group v-for="group in equipmentNav" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.equipmentList" :key="item.id" :label="item.label" :value="item.value"></el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <span class="status-switch">识别开关：</span>
                <el-switch name="l" v-model="addPersonForm.status" active-text="开" inactive-text="关"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-col :span="24" :offset="18">
                    <el-button type="primary" @click="onSubmit('add-person-form')">确认添加</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { img2Base64, base64Length } from '@/utils';
export default {
  data () {
    return {
      firstImageUrl: '',
      secondImageUrl: '',
      thirdImageUrl: '',
      fouthImageUrl: '',
      addPersonForm: {},
      equipmentNav: [
          {
              label: '东北',
              equipmentList: [{id: '1', value: '摄像机一', label: '摄像机一'}, {id: '2', value: '摄像机二', label: '摄像机二'}]
          },
          {
              label: '西南',
              equipmentList: [{id: '3', value: '摄像机三', label: '摄像机三'}, {id: '4', value: '摄像机四', label: '摄像机四'}]
          },
          {
              label: '华西',
              equipmentList: [{id: '5', value: '摄像机五', label: '摄像机五'}, {id: '6', value: '摄像机六', label: '摄像机六'}]
          }
      ],
      rules: {
          name: [
              { required: true, message: '请输入人员姓名', trigger: 'blur' },
              { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
          ],
          position: [
              { required: true, message: '请输入人员描述', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          ipStatus: [
              { required: true, message: '请选择人员类型', trigger: 'change' }
          ],
          startDate: [
              { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
          ],
          endDate: [
              { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
          ],
          equipment: [
              { required: true, message: '请选择至少一个识别设备', trigger: 'change' }
          ]
      }
    };
  },
  methods: {
    handleFirstImageChange (file) {
      const url = URL.createObjectURL(file.raw);
      let image = new Image();
      image.src = url;
      image.onload = () => {
        const data = img2Base64(image);
        if (base64Length(data)) {
          this.firstImageUrl = data;
          this.addPersonForm.image = data;
        }
      };
    },
    handleSecondImageChange (file) {
      const url = URL.createObjectURL(file.raw);
      let image = new Image();
      image.src = url;
      image.onload = () => {
        const data = img2Base64(image);
        if (base64Length(data)) {
          this.secondImageUrl = data;
        }
      };
    },
    handleThirdImageChange (file) {
      const url = URL.createObjectURL(file.raw);
      let image = new Image();
      image.src = url;
      image.onload = () => {
        const data = img2Base64(image);
        if (base64Length(data)) {
          this.thirdImageUrl = data;
        }
      };
    },
    handleFouthImageChange (file) {
      const url = URL.createObjectURL(file.raw);
      let image = new Image();
      image.src = url;
      image.onload = () => {
        const data = img2Base64(image);
        if (base64Length(data)) {
          this.fouthImageUrl = data;
        }
      };
    },
    onSubmit (formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                let obj = {...this.addPersonForm};
                this.$emit('addSumbit', obj);
            }
        });
    },
    personClearValidate (formName) {
        this.firstImageUrl = this.secondImageUrl = this.thirdImageUrl = this.fouthImageUrl = '';
        this.$refs[formName].clearValidate();
    },
    removePersonAddForm () {
        this.addPersonForm = {equipment: []};
    }
  }
};
</script>

<style lang="scss" scoped>
.person-add-upload {
    height: 130px;
    margin: 0 auto;
    width: 175px;
    overflow: hidden;
    .avatar-uploader-first {
        width: 130px;
        height: 130px;
        text-align: center;
        line-height: 130px;
        font-size: 60px;
        border-radius: 10px;
        background-color: #eeeeee;
        overflow: hidden;
        float: left;
        img {
            width: 130px;
            height: 130px;
        }
    }
    .avatar-uploader-second,.avatar-uploader-third,.avatar-uploader-fouth, {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        border-radius: 5px;
        background-color: #eeeeee;
        overflow: hidden;
        float: right;
        margin-bottom: 4px;
        img {
            width: 40px;
            height: 40px;
        }
    }

}
</style>

<style>
.person-add-upload .el-form-item {
    width: 130px;
    height: 130px;
    overflow: hidden;
    float: left;
}
</style>
