<template>
    <div class="dialog-person-add" v-loading.fullscreen.lock="fullscreenLoading">
      <el-form
        class="dialog-person-form"
        v-show="showForm"
        ref="add-person-form"
        :rules="rules"
        :model="addPersonForm"
        label-width="100px"
        size="small">
        <div class="person-add-upload">
          <img class="avatar-uploader-show avatar" :src="showImageUrl">
          <el-upload
            class="avatar-uploader-first"
            action=""
            :auto-upload="false"
            :show-file-list="true"
            :on-change="handleFirstImageChange">
            <img
              :src="image1"
              class="avatar"
              v-if="image1"
              @click.stop="showImage(image1)"
              @dblclick.self="inputFile($event)">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader-second"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleSecondImageChange">
            <img
              :src="image2"
              class="avatar"
              v-if="image2"
              @click.stop="showImage(image2)"
              @dblclick.self="inputFile($event)">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader-third"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleThirdImageChange">
            <img
              :src="image3"
              class="avatar"
              v-if="image3"
              @click.stop="showImage(image3)"
              @dblclick.self="inputFile($event)">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-form-item label="人员姓名" prop="personnelName">
          <el-input v-model="addPersonForm.personnelName"></el-input>
        </el-form-item>
        <el-form-item label="人员描述" prop="describe">
          <el-input v-model="addPersonForm.describe"></el-input>
        </el-form-item>
        <el-form-item label="选择库" prop="libraryId" v-if="addOrEdit==1">
          <el-select v-model="addPersonForm.libraryId" placeholder="请选择库">
            <el-option
              :label="item.libraryName"
              :value="item.libraryId"
              v-for="item in personTypeList"
              :key="item.libraryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="disStartTime" v-if="addPersonForm.disSwitch">
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择日期"
            v-model="addPersonForm.disStartTime"
            style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="disEndTime" v-if="addPersonForm.disSwitch">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm"
            v-model="addPersonForm.disEndTime"
            style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="识别设备" prop="equipmentList">
          <el-select v-model="addPersonForm.equipmentList" placeholder="请选择设备" multiple>
            <!-- <el-option-group v-for="group in deviceList" :key="group.areaId" :label="group.areaName">
                 <el-option v-for="item in group.equipmentList" :key="item.id" :label="item.label" :value="item.value"></el-option>
                 </el-option-group> -->
            <el-option v-for="item in deviceList" :key="item.equipmentId" :label="item.equipmentName" :value="item.equipmentId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="识别开关" prop="disSwitch">
          <el-switch
            name="l"
            v-model="addPersonForm.disSwitch"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button
            class="dialog-confirm-button"
            type="primary"
            @click="onSubmit('add-person-form')">
            {{ addOrEdit == 0 ? '确认添加' : '确认修改' }}
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 多张人脸选择框 -->
      <div class="more-face" v-show="!showForm">
        <div class="main-image">
          <img :src="mainImg" alt="">
        </div>
        <div class="image-list" v-for="(value, key) in moreFaceObj" :key="key">
          <img
            :src="'data:image/png;base64,' + value"
            alt=""
            @click="checkImageUrl = value"
            :class="{'checked-image': value==checkImageUrl}">
          <i class="el-icon-success" v-if="value==checkImageUrl"></i>
        </div>
        <p class="btn-content">
          <el-button type="info" @click="showForm=true">取消选择</el-button>
          <el-button type="primary" @click="checkImage">选择图片</el-button>
        </p>
      </div>
    </div>
</template>

<script>
 import { img2Base64, base64Length, parseTime, isImage } from '@/utils';
 import api from '@/api';
 import config from '@/config';
 export default {
   data () {
     return {
       isSubmit: false, // hacks/sign for el-select validation
       showImageUrl: require('@/assets/image/avatar.png'),
       addFormDefaultImage: require('@/assets/image/avatar.png'),
       image1: '',
       image2: '',
       image3: '',
       fullscreenLoading: false,
       showForm: true, // 展示增加框还是图片选择框
       moreFaceObj: {}, // 多张人脸对象
       mainImg: '', // 主图
       checkImageUrl: '', // 选择的图片url
       moreFacePosition: '', // 选择多张图片是在第几个框
       personType: {}, // 人员类型
       addPersonForm: {
         disSwitch: true
       },
       imagePersonnelId: '', // 修改图片所需人员ID
       imageList: [], // 修改人员三张图片集合
       rules: {
         personnelName: [
           { required: true, message: '请输入人员姓名', trigger: 'blur' },
           { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
         ],
         describe: [
           { required: true, message: '请输入人员描述', trigger: 'blur' },
           { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
         ],
         libraryId: [
           { required: true, message: '请选择人员类型', trigger: 'change' }
         ],
         disStartTime: [
           { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
         ],
         disEndTime: [
           { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
         ],
         equipmentList: [
           { required: true, validator: this.checkEquipmentList, trigger: 'change' }
         ]
       }
     };
   },
   props: ['personTypeList', 'deviceList', 'addOrEdit', 'editObj'],
   methods: {
     checkEquipmentList (rule, value, callback) {
       // hacks for el-form/el-select no reason validation when first show
       // need to be fixed in next version
       if (this.isSubmit && value.length === 0) {
         callback(new Error('请选择识别设备'));
       }
       callback();
     },
     async handleImageChange (file, fileList, val) {
       this.fullscreenLoading = true;
       const url = URL.createObjectURL(file.raw);
       let image = new Image();
       image.src = url;
       image.onload = async () => {
         const data = img2Base64(image, file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase());
         if (base64Length(data)) {
           var response = await api.post(config.person.checkImage, {
             image: data.split(',')[1]
           });
           if (Number(response.data.code) !== 200) {
             this.$message({
               type: 'error',
               message: response.data.msg
             });
             this.fullscreenLoading = false;
           }
           // image has one face
           if (Number(response.data.data.faceNum) === 1) {
            //  if (Number(this.addOrEdit) === 1) {
            //    await this.editImage(data, val);
            //  } else {
               this[val] = this.addPersonForm[val] = this.showImageUrl = data;
            //  }
           }
           // image has more than one face
           if (Number(response.data.data.faceNum) > 1) {
             this.mainImg = data;
             this.moreFaceObj = { ...response.data.data };
             delete this.moreFaceObj.faceNum;
             this.showForm = false;
             this.moreFacePosition = val;
           }
         }
         this.fullscreenLoading = false;
       };
     },
     // 编辑时修改图片
    //  async editImage (imgUrl, imgIndex) {
    //    const index = Number(imgIndex.substring(5)) - 1;
    //    let images = ['', '', '']; // edit person three images
    //    this.imageList.forEach((item, index) => {
    //      if (item && item !== '') images[index] = item;
    //    });
    //    images[index] = imgUrl;
    //    let data = {
    //      personnelId: this.imagePersonnelId,
    //      imageList: images
    //    };
    //    let imageResponse = await api.post(config.person.updateImage, data);
    //    if (imageResponse.data.code === 200) {
    //      this[imgIndex] = this.addPersonForm[imgIndex] = this.showImageUrl = imgUrl;
    //      this.imageList[index] = imgUrl;
    //      this.$message({
    //        type: 'success',
    //        message: imageResponse.data.msg
    //      });
    //    } else {
    //      this.$message({
    //        type: 'error',
    //        message: imageResponse.data.msg
    //      });
    //    }
    //  },
     checkIsImage (name) {
       if (!isImage(name)) return false;
       return true;
     },
     handleFirstImageChange (file, fileList) {
       if (!this.checkIsImage(file.name)) {
         this.$message({type: 'error', message: '请上传正确格式的照片'});
         return;
       }
       this.handleImageChange(file, fileList, 'image1');
     },
     handleSecondImageChange (file, fileList) {
       if (!this.checkIsImage(file.name)) {
         this.$message({type: 'error', message: '请上传正确格式的照片'});
         return;
       }
       this.handleImageChange(file, fileList, 'image2');
     },
     handleThirdImageChange (file, fileList) {
       if (!this.checkIsImage(file.name)) {
         this.$message({type: 'error', message: '请上传正确格式的照片'});
         return;
       }
       this.handleImageChange(file, fileList, 'image3');
     },
     showImage (imgUrl) {
       this.showImageUrl = imgUrl;
     },
     inputFile ($event) {
       $event.target.parentNode.children[2].click();
     },
     onSubmit (formName) {
       if (this.image1 === '' && this.image2 === '' && this.image3 === '') {
         this.$message({type: 'error', message: '请上传人员头像'});
         return false;
       }
       this.isSubmit = true;
       this.$refs[formName].validate(valid => {
         if (valid) {
           const startTime = new Date(this.addPersonForm.disStartTime).getTime();
           const endTime = new Date(this.addPersonForm.disEndTime).getTime();
           if (this.addPersonForm.disSwitch && startTime > endTime) {
             this.$message({type: 'error', message: '起始时间不能大于结束时间'});
             return false;
           }
           let obj = { ...this.addPersonForm };
           obj.disStartTime && (obj.disStartTime = parseTime(obj.disStartTime));
           obj.disEndTime && (obj.disEndTime = parseTime(obj.disEndTime));
           if (obj.disSwitch) {
             // disSwitch 1: on 2: off
             obj.disSwitch = 1;
           } else {
             obj.disSwitch = 2;
           }
           this.isSubmit = false;
           obj.imageList = [obj.image1 || '', obj.image2 || '', obj.image3 || ''];
           delete obj.image1;
           delete obj.image2;
           delete obj.image3;
           this.$emit('addSumbit', obj);
         }
       });
     },
     personClearValidate (formName) {
       this.image1 = this.image2 = this.image3 = '';
       this.showImageUrl = this.addFormDefaultImage;
       this.faceImgData = {};
       this.showForm = true;
       this.$refs[formName].clearValidate();
     },
     removePersonAddForm () {
       this.addPersonForm = { equipmentList: [], disSwitch: true };
     },
     // 选择图片
     async checkImage () {
      //  if (this.addOrEdit === 1) {
      //    if (this.checkImageUrl) {
      //     await this.editImage(('data:image/png;base64,' + this.checkImageUrl), this.moreFacePosition);
      //    }
      //  } else {
         if (this.checkImageUrl) {
          this.showImageUrl = this[this.moreFacePosition] = this.addPersonForm[this.moreFacePosition] = 'data:image/png;base64,' + this.checkImageUrl;
         }
      //  }
       this.showForm = true;
     }
   },
   mounted () {
     // this.$refs['add-person-form'].clearValidate();
     // this.$refs['add-person-form'].resetFields();
   },
   watch: {
     editObj: {
       handler: function (newVal, oldVal) {
         if (this.addOrEdit === 1) {
           let equipmentList = [];
           let disSwitch;
           this.imageList = [];
           this.imagePersonnelId = newVal.personnelId;
           newVal.personnelEquipmentList.forEach(item => equipmentList.push(item.equipmentId));
           if (Number(newVal.disSwitch) === 1) {
             disSwitch = true;
           } else {
             disSwitch = false;
           }
           if (newVal.personnelImgList.length > 0) {
             newVal.personnelImgList.forEach((item, index) => {
               this.$set(this.addPersonForm, `image${index + 1}`, item);
               item && (this[`image${index + 1}`] = newVal.url + item);
               this.imageList.push(item);
             });
             if (newVal.personnelImgList[0]) {
               this.showImageUrl = newVal.url + newVal.personnelImgList[0];
             } else if (newVal.personnelImgList[1]) {
               this.showImageUrl = newVal.url + newVal.personnelImgList[1];
             } else {
               this.showImageUrl = newVal.url + newVal.personnelImgList[2];
             }
           };
           let startTime = newVal.disStartTime ? new Date(newVal.disStartTime.replace(new RegExp(/-/gm), '/')) : new Date();
           let endTime = newVal.disEndTime ? new Date(newVal.disEndTime.replace(new RegExp(/-/gm), '/')) : new Date();
           this.$set(this.addPersonForm, 'describe', newVal.personnelDescribe);
           this.$set(this.addPersonForm, 'disEndTime', endTime);
           this.$set(this.addPersonForm, 'disStartTime', startTime);
           this.$set(this.addPersonForm, 'disSwitch', newVal.disSwitch);
           this.$set(this.addPersonForm, 'equipmentList', equipmentList);
           this.$set(this.addPersonForm, 'libraryId', newVal.libraryId);
           this.$set(this.addPersonForm, 'disSwitch', disSwitch);
           this.$set(this.addPersonForm, 'personnelName', newVal.personnelName);
           this.$set(this.addPersonForm, 'personnelId', newVal.personnelId);
         }
       },
       deep: true,
       immediate: true
     }
   }
 };
</script>

<style lang="scss" scoped>
.person-add-upload {
  height: 130px;
  margin: 0 auto 20px;
  width: 175px;
  overflow: hidden;
  .avatar-uploader-show {
    display: block;
    width: 130px;
    height: 130px;
    text-align: center;
    line-height: 130px;
    font-size: 60px;
    border-radius: 10px;
    background-color: #eeeeee;
    overflow: hidden;
    float: left;
  }
  .avatar-uploader-second,
  .avatar-uploader-third,
  .avatar-uploader-first {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    // font-size: 16px;
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
.more-face {
    overflow: hidden;
    width: 500px;
}
.main-image {
    height: 130px;
    overflow: hidden;
    width: 130px;
    margin-bottom: 30px;
    margin-left: 160px;
    img {
        width: 130px;
        height: 130px;
        border-radius: 10px;
    }
}
.image-list {
    height: 123px;
    width: 123px;
    overflow: hidden;
    float: left;
    margin: 12px;
    box-sizing: border-box;
    position: relative;
    img  {
        width: 118px;
        height: 118px;
        border-radius: 10px;
    }
    .el-icon-success {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
        color: #008aff;
    }
}
.btn-content {
    display: block;
    width: 100%;
    overflow: hidden;
    padding-left: 100px;
}
.checked-image {
    border: 2px solid #008aff;
}
</style>

<style lang="scss">
 .person-add-upload {
   margin-bottom: 20px;
 }
 .person-add-upload .el-form-item {
   /* width: 130px;
      height: 130px;
      overflow: hidden;
      float: left; */
 }
 .dialog-person-form {
   position: relative;
   padding-bottom:20px;
   .dialog-confirm-button {
     position: absolute;
     right: 150px;
   }
 }
 .dialog-person-add {
   .el-input__inner {
     width: 250px;
   }
 }
</style>
