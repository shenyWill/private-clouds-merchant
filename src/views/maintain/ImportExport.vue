<template>
    <div class="import-export" v-loading="updateLoad">
        <h2 class="import-export-title">导入/导出设备参数</h2>
        <div class="import-card">
            <span class="import-card-title">导入</span>
            <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="uploadSectionFile"
                :on-change="handleChange">
                <span class="add-info">{{addInfo}}</span>
                <span class="add-btn">浏览</span>
            </el-upload>
            <span :class="addInfo ? 'submit-btn-active': 'submit-btn'" @click="upgrade">导入</span>
        </div>
        <div class="export-card">
            <span class="import-card-title">导出</span>
            <a href="https://code.jquery.com/jquery-3.3.1.min.js" download="" class="export-card-down">导出</a>
            <span class="export-card-explain">把设备参数导出到本地</span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            addInfo: '',
            file: '',
            updateLoad: false
        };
    },
    methods: {
        uploadSectionFile (param) {
            this.file = param.file;
        },
        handleChange (file, fileList) {
            this.addInfo = file.name;
        },
        upgrade () {
           if (!this.addInfo) return;
           var formFile = new FormData();
           formFile.append('file', this.file);
           this.updateLoad = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.import-export{
    overflow: hidden;
    text-align: left;
    text-indent: 41px;
    background-color: #fff;
    .import-export-title {
        height: 60px;
        line-height: 60px;
        margin: 0;
        padding: 0;
        font-size: 18px;
        text-align: left;
        border-bottom: 1px solid #dcdcdc;
    }
    .import-card,.export-card {
        height: 150px;
        border-radius: 10px;
        background-color: #eeeeee;
        width: 46%;
        float: left;
        margin: 40px 0px 40px 40px;
        overflow: hidden;
    }
    .import-card-title {
        display: block;
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .avatar-uploader {
        text-indent: 0;
        margin-left: 41px;
        overflow: hidden;
        float: left;
    }
    .add-info {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        text-indent: 50px;
        color: #008aff;
        width: 340px;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #dcdcdc;
        float: left;
    }
    .add-btn,.submit-btn,.submit-btn-active {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        width: 120px;
        text-align: center;
        border: 1px solid #008aff;
        border-radius: 5px;
        color: #008aff;
        float: left;
        margin-left: 8px;
    }
    .submit-btn-active {
        text-indent: 0;
        cursor: pointer;
    }
    .submit-btn {
        text-indent: 0;
        color: #fff;
        background-color: #dcdcdc;
        border-color: #dcdcdc;
    }
    .export-card-down{
        text-decoration: none;
        color: #fff;
        display: inline-block;
        font-size: 16px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        background-color: #008aff;
        margin-left: 40px;
        border-radius: 5px;
        text-indent: 0;
        &:visited {
            color: #fff;
        }
    }
    .export-card-explain {
        font-size: 18px;
        color: #666;
    }
}
</style>
