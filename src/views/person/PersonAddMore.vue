<template>
    <div class="person-more-add" v-loading="addMorePersonLoad">
        <p class="more-add-info">
            1.给jpg格式图片命名，
            <br/>&nbsp;&nbsp;&nbsp;命名规则“姓名” + “-” + “人员描述”， 如下图：
        </p>
        <h3>张三 - 研发人员</h3>
        <p class="more-add-careful">2.把图片打包成ZIP格式的压缩包</p>
        <p class="more-add-upload">
            <span class="more-add-upload-info">3.上传压缩包：</span>
            <el-upload
            class="avatar-uploader-person"
            action=""
            :show-file-list="false"
            accept=".zip"
            :http-request="uploadSectionFile"
            :on-change="handlePersonMoreChange">
            <span>{{personMoreAddInfo}}</span>
            <i class="el-icon-arrow-right"></i>
          </el-upload>
          <i class="el-icon-circle-check" v-if="uploadChange"></i>
          <span class="check-success" v-if="uploadChange">上传成功</span>
        </p>
        <p class="more-add-device">
            <span class="more-add-device-info">4.识 别 设 备：</span>
            <el-select v-model="addMorePersonForm.equipmentList" multiple placeholder="请选择要识别的设备" size="mini">
                <el-option v-for="item in deviceList" :key="item.equipmentId" :value="item.equipmentId" :label="item.equipmentName"></el-option>
            </el-select>
        </p>
        <div class="add-submit" @click="addSubmit">确认入库</div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import api from '@/api';
import config from '@/config';
// import JSZip from 'jszip';
export default {
    data () {
        return {
            personMoreAddInfo: '请选择上传路径',
            uploadChange: false, // 是否上传了压缩包到客户端
            addMorePersonForm: {file: {}, equipmentList: []},
            addMorePersonLoad: false
        };
    },
    methods: {
        ...mapActions([
        'setPersonTranstion',
        'setTempBatchNo'
        ]),
        handlePersonMoreChange (file, fileList) {
            this.personMoreAddInfo = file.name;
            this.uploadChange = true;
        },
        uploadSectionFile (param) {
            // console.log(param)
            this.addMorePersonForm.file = param.file;
            // const newZip = new JSZip();
            // newZip.loadAsync(param.file).then(file => {
                // console.log(file);
                // newZip.file('testTXT.txt').async('string').then(content => {
                //     console.log(content);
                // });
            // });
        },
        async addSubmit () {
            if (this.personMoreAddInfo === '请选择上传路径') {
                this.$message({
                    type: 'error',
                    message: '请上传压缩文件！'
                });
                return;
            }
            if (!this.addMorePersonForm.equipmentList.length) {
                this.$message({
                    type: 'error',
                    message: '请选择至少一台识别设备！'
                });
                return;
            }
            this.addMorePersonLoad = true;
            var formFile = new FormData();
            formFile.append('file', this.addMorePersonForm.file);
            formFile.append('equipmentList', this.addMorePersonForm.equipmentList);
            formFile.append('libraryId', this.databaseID);
            const responseAPI = await api.post(config.person.addMorePerson, formFile, {'headers': {'Content-Type': 'multipart/form-data'}});
            if (Number(responseAPI.data.code) === 200) {
                this.setTempBatchNo(responseAPI.data.data.tempBatchNo);
                this.setPersonTranstion(true);
            } else {
                this.$message({
                    type: 'error',
                    message: responseAPI.data.msg
                });
            }
            this.addMorePersonLoad = false;
            this.$emit('closeAddMorePerson');
        },
        clear () {
           this.personMoreAddInfo = '请选择上传路径';
           this.uploadChange = false;
           this.addMorePersonForm = {file: {}, equipmentList: []};
        }
    },
    props: ['deviceList', 'databaseID']
};
</script>

<style lang="scss" scoped>
.person-more-add {
        font-size: 16px;
        color: #333;
    .more-add-info,.more-add-careful {
        line-height: 30px;
    }
    h3 {
        text-align: center;
        font-size: 24px;
    }
    .more-add-upload {
        height: 39px;
        margin-bottom: 20px;
        line-height: 37px;
        overflow: hidden;
        position: relative;
    }
    .more-add-upload-info {
        float: left;
        height: 37px;
    }
    .avatar-uploader-person {
        float: left;
        height: 37px;
        border: 1px solid #dcdcdc;
        border-radius: 10px;
        width: 230px;
        box-sizing: border-box;
        line-height: 37px;
        background-color: #eee;
        text-indent: 13px;
        color: #999;
        position: relative;
        .el-icon-arrow-right {
            position: absolute;
            right: 10px;
            top: 10px;
            font-weight: bold;
        }
    }
    .el-icon-circle-check {
        font-size: 25px;
        margin-left: 5px;
        color: #1bbb57;
        position: absolute;
        top: 5px;
    }
    .check-success {
        color: #1bbb57;
        line-height: 35px;
        position: absolute;
        margin-left: 30px;
    }
    .add-submit {
        width: 120px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        background-color: #008aff;
        margin: 60px auto 40px auto;
        border-radius: 15px;
        text-align: center;
        cursor: pointer;
    }
}
</style>

<style lang="scss">
.person-more-add {
    .el-input__inner {
        overflow: hidden;
        border: 1px solid #dcdcdc;
        border-radius: 10px;
        width: 230px;
        box-sizing: border-box;
        line-height: 30px;
        background-color: #eee;
        text-indent: 10px;
        color: #999;
        position: relative;
    }
}
</style>
