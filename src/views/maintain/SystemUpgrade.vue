<template>
    <div class="system-upgrade">
        <h2 class="system-title">系统版本升级</h2>
        <p class="version-explain">
            <span class="version-explain-detail">
                设备名称：<input type="text">
            </span>
            <span  class="version-explain-detail">主控版本：3.3.7</span>
            <span  class="version-explain-detail">编码版本：2.7.8</span>
            <span  class="version-explain-detail">Web版本：2.3.8</span>
            <span  class="version-explain-detail">Plugin版本：2.2.0</span>
        </p>
        <div class="system-upload">
            <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="uploadSectionFile"
                :on-change="handleChange">
                <span class="add-info">{{addInfo}}</span>
                <span class="add-btn">浏览</span>
            </el-upload>
            <span :class="addInfo ? 'submit-btn-active': 'submit-btn'" @click="upgrade">升级</span>
        </div>
        <p class="system-explain">说明: 升级过程需要1-10分钟，请不要关闭电源，完成升级后将自动重启。</p>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
export default {
    data () {
        return {
            addInfo: '',
            file: '',
            sysVersion: {}
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
    },
    async mounted () {
        const response = await api.post(config.maintain.sysVersion, {});
        if (Number(response.data.code) === 200) {
            this.sysVersion = {...response.data.data};
        }
    }
};
</script>

<style lang="scss" scoped>
.system-upgrade {
    overflow: hidden;
    text-align: left;
    text-indent: 41px;
    .system-title {
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
    .system-upload {
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
    }
    .submit-btn {
        text-indent: 0;
        color: #fff;
        background-color: #dcdcdc;
        border-color: #dcdcdc;
        cursor: pointer;
    }
    .system-explain {
        font-size: 16px;
        width: 100%;
        color: #666666;
        margin-bottom: 50px;
    }
}
</style>
