<template>
    <div class="equipment-statistics-screen">
        <div class="equipment-statistics-title">
            <i class="iconfont icon-shebei-lan"></i>
            <span class="equipment-statistics-title-info">设备数</span>
            <span class="equipment-statistics-title-number">{{totalNum}}</span>
        </div>
        <div class="equipment-statistics-draw">
            <div id="equipment-map" class="equipment-map"></div>
        </div>
    </div>
</template>

<script>
import equipmentMap from './equipmentMap.js';
import api from '@/api';
import config from '@/config';
export default {
    data () {
        return {
            totalNum: 0
        };
    },
    async mounted () {
        const response = await api.post(config.record.equipNum, {});
        if (Number(response.data.code) === 200) {
            let dataArr = equipmentMap.option.series;
            response.data.data.forEach(item => {
                dataArr[item.equipmentType - 1].data[0] = item.total;
                this.totalNum += item.total;
            });
            this.$emit('drawMap', 'equipment-map', equipmentMap.option);
        }
    }
};
</script>

<style lang="scss" scoped>
.equipment-statistics-title {
    height: 80px;
    margin: 5px 40px;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
    position: relative;
    color: #000000;
    .icon-shebei-lan {
        position: absolute;
        top: 12px;
        font-size: 50px;
    }
    .equipment-statistics-title-info {
        position: absolute;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        left: 70px;
        top: 15px;
    }
    .equipment-statistics-title-number {
        position: absolute;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        left: 70px;
        top: 43px;
    }
}
.equipment-statistics-draw {
    height: 400px;
    width: 100%;
    margin-top: 30px;
}
.equipment-map {
    height: 400px;
    width: 100%;
}
</style>
