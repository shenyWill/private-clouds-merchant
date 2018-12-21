<template>
    <div class="system-upgrade">
        <h2 class="system-title">系统版本升级</h2>
        <p class="version-explain">
            <span class="version-explain-detail">
                设备名称：<input type="text" v-model="sysVersion.deviceName" @blur="changeDeviceName">
            </span>
            <span class="version-explain-detail">
                设备编号：<input type="text" v-model="sysVersion.deviceNumber" @blur="changeDeviceNumber">
            </span>
            <span  class="version-explain-detail">设备型号：{{sysVersion.deviceModelNumber}}</span>
            <span  class="version-explain-detail">设备序列号：{{sysVersion.deviceSerialNumber}}</span>
            <span  class="version-explain-detail">Web版本：{{sysVersion.webVersion}}</span>
            <span  class="version-explain-detail">主控版本：{{sysVersion.javaVersion}}</span>
            <span  class="version-explain-detail">Plugin版本：{{sysVersion.pluginVersion}}</span>
            <span  class="version-explain-detail">流媒体版本：{{sysVersion.mediaVersion}}</span>
            <span  class="version-explain-detail">算法程序版本：{{sysVersion.goVersion}}</span>
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
        <div :class="['loading-click', updateLoad ? 'active' : '']" v-loading="updateLoad"></div>
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
            sysVersion: {},
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
        async upgrade () {
           if (!this.addInfo) return;
           var formFile = new FormData();
           formFile.append('file', this.file);
           this.updateLoad = true;
           await api.post(config.maintain.sysUpdate, formFile, {'headers': {'Content-Type': 'multipart/form-data'}});
        },
        async changeDeviceName () {
            const response = await api.post(config.maintain.editDevice, {paicloudDeviceId: this.sysVersion.paicloudDeviceId, deviceName: this.sysVersion.deviceName});
            if (Number(response.data.code) === 200) {
                this.$message({
                    type: 'success',
                    message: response.data.msg
                });
            } else {
                this.$message({
                    type: 'error',
                    message: response.data.msg
                });
            }
        },
        async changeDeviceNumber () {
            const response = await api.post(config.maintain.editDevice, {paicloudDeviceId: this.sysVersion.paicloudDeviceId, deviceNumber: this.sysVersion.deviceNumber});
            if (Number(response.data.code) === 200) {
                this.$message({
                    type: 'success',
                    message: response.data.msg
                });
            } else {
                this.$message({
                    type: 'error',
                    message: response.data.msg
                });
            }
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
            padding-right: 20px;
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
        cursor: pointer;
    }
    .submit-btn {
        text-indent: 0;
        color: #fff;
        background-color: #dcdcdc;
        border-color: #dcdcdc;
    }
    .system-explain {
        font-size: 16px;
        width: 100%;
        color: #666666;
        margin-bottom: 50px;
    }
    .version-explain-detail {
        width: 250px;
        display: inline-block;
        overflow: hidden;
        height: 38px;
        text-align: left;
        text-indent: 0;
        line-height: 38px;
        padding-bottom: 25px;
        text-overflow:ellipsis;
        white-space: nowrap;
        input {
            height: 29px;
            width: 150px;
            background-color: #eee;
            padding: 0;
            border: 1px solid #dcdcdc;
            text-indent: 10px;
            border-radius: 4px;
        }
        &:nth-of-type(3),&:nth-of-type(7) {
            width: 280px;
            padding-right: 130px;
        }
        &:nth-of-type(4) {
            width: 500px;
            padding-right: 0;
        }
        &:nth-of-type(5) {
            padding-left: 40px;
        }
        &:nth-of-type(8) {
            padding-right: 0;
        }
    }
    .loading-click {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        height: 100%;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.2);
        display: none;
        &.active {
            display: block;
        }
    }
}
</style>
