<template>
    <div class="maintain">
        <el-row :gutter="12">
            <el-col :span="8">
                <div class="equip-card">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-CPU1"></use>
                    </svg>
                    <span class="equip-card-desc">CPU使用率</span>
                    <span class="equip-card-val">{{cpuRatio}}</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="equip-card">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-neicun1"></use>
                    </svg>
                    <span class="equip-card-desc">内存使用率</span>
                    <span class="equip-card-val">{{memoryRatio}}</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="equip-card">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cipan1"></use>
                    </svg>
                    <span class="equip-card-desc">磁盘剩余空间</span>
                    <span class="equip-card-val">{{freeDiskSize}}</span>
                </div>
            </el-col>
        </el-row>

        <!-- 系统版本设计 -->
        <div class="system">
            <SystemUpgrade></SystemUpgrade>
        </div>

        <!-- 算法模型升级 -->
        <div class="algorithm">
            <Algorithm></Algorithm>
        </div>

        <!-- 导入导出设备参数 -->
        <div class="importExport">
            <ImportExport></ImportExport>
        </div>
        <!-- 网络配置 -->
        <div class="internet">
            <InternetConfig></InternetConfig>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import SystemUpgrade from './SystemUpgrade';
import Algorithm from './Algorithm';
import ImportExport from './ImportExport';
import InternetConfig from './InternetConfig';
export default {
    data () {
        return {
            cpuRatio: '0%',
            memoryRatio: '0%',
            freeDiskSize: '0GB'
        };
    },
    async mounted () {
        const response = await api.post(config.maintain.list, {});
        if (Number(response.data.code) === 200) {
            this.cpuRatio = response.data.data.cpuRatio;
            this.memoryRatio = response.data.data.memoryRatio;
            this.freeDiskSize = response.data.data.freeDiskSize;
        }
    },
    components: {
        SystemUpgrade,
        Algorithm,
        ImportExport,
        InternetConfig
    }
};
</script>

<style lang="scss" scoped>
.icon {
 width: 1em; height: 1em;
 vertical-align: -0.15em;
 fill: currentColor;
 overflow: hidden;
 }
.maintain {
    margin: 50px;
    overflow: hidden;
    position: relative;
    .equip-card {
        height: 120px;
        font-weight: bold;
        position: relative;
        margin-top: 5px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1);
        .icon {
            font-size: 70px;
            position: absolute;
            top: 25px;
            left: 50px;
        }
    }
    .equip-card-desc {
        position: absolute;
        left: 164px;
        top: 26px;
        font-size: 16px;
        color: #333;
    }
    .equip-card-val {
        position: absolute;
        left: 164px;
        top: 57px;
        font-size: 36px;
        color: #008aff;
    }
    .system,.algorithm,.importExport,.internet {
        margin-top: 20px;
        width: 100%;
        // height: 300px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        overflow: hidden;
    }
}
</style>
