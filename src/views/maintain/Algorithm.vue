<template>
    <div class="algorithm-upgrade">
        <h2 class="algorithm-title">算法模型升级</h2>
        <p class="version-explain">
            <span>当前模型版本：{{aiVersion.currentModelVersion}}</span>
            <span>最新模型版本：{{aiVersion.updateModelVersion}}</span>
        </p>
        <div class="algorithm-upload">
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
        <p class="algorithm-explain">说明: 升级可能需要点时间，选择在不使用设备的情况下更新，请不要关闭电源耐心等待。</p>
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
            aiVersion: {},
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
    },
    async mounted () {
        const response = await api.post(config.maintain.aiVersion, {});
        if (Number(response.data.code) === 200) {
            this.aiVersion = {...response.data.data};
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
    .algorithm-explain {
        font-size: 16px;
        width: 100%;
        color: #666666;
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
