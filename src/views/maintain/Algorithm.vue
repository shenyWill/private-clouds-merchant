<template>
    <div class="algorithm-upgrade">
        <h2 class="algorithm-title">算法模型升级</h2>
        <p class="version-explain">
            <span>当前模型版本：2.3.1</span>
            <span>最新模型版本：5.7.2</span>
        </p>
        <div class="algorithm-upload">
            <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="uploadSectionFile"
                :on-change="handleChange">
                <span class="add-info">{{addInfo}}</span>
                <span class="add-btn">预览</span>
            </el-upload>
            <span class="submit-btn" @click="upgrade">升级</span>
        </div>
        <p class="algorithm-explain">说明: 升级可能需要点时间，选择在不使用设备的情况下更新，请不要关闭电源耐心等待。</p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            addInfo: '',
            file: ''
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
           var formFile = new FormData();
           formFile.append('file', this.file);
        }
    }
};
</script>

<style lang="scss" scoped>
.algorithm-upgrade {
    overflow: hidden;
    text-align: left;
    text-indent: 41px;
    .algorithm-title {
        height: 60px;
        line-height: 60px;
        margin: 0;
        padding: 0;
        font-size: 18px;
        text-align: left;
        border-bottom: 1px solid #dcdcdc;
    }
    .version-explain {
        font-size: 16px;
        margin: 46px auto;
        span {
            padding-right: 124px;
        }
    }
    .algorithm-upload {
        overflow: hidden;
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
        width: 600px;
        background-color: #eeeeee;
        border-radius: 5px;
        border: 1px solid #dcdcdc;
        float: left;
    }
    .add-btn,.submit-btn {
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
    .submit-btn {
        text-indent: 0;
        color: #fff;
        background-color: #dcdcdc;
        border-color: #dcdcdc;
        cursor: pointer;
    }
    .algorithm-explain {
        font-size: 16px;
        width: 100%;
        color: #666666;
    }
}
</style>
