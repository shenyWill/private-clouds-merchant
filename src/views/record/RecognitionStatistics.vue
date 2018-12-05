<template>
    <div class="recognition-statistics-screen">
        <div class="recognition-statistics-title">
            <i class="iconfont icon-renyuanguanli-lan"></i>
            <span class="recognition-statistics-title-info">识别数</span>
            <span class="recognition-statistics-title-number">2343224</span>
        </div>
        <div class="recognition-statistics-draw">
            <div id="recognition-map" class="recognition-map"></div>
        </div>
    </div>
</template>

<script>
import recognitionMap from './recognitionMap.js';
import api from '@/api';
import config from '@/config';
import { numToPercent } from '@/utils';
export default {
    async mounted () {
        const response = await api.post(config.record.libraryNum, {});
        if (Number(response.data.code) === 200) {
            let dataArr = recognitionMap.option.series;
            let total = 0;
            response.data.data.forEach(item => (total += item.totalSuccess));
            response.data.data.forEach(item => {
                dataArr[item.libraryTypeId - 1].data[0].value = total - item.totalSuccess;
                dataArr[item.libraryTypeId - 1].data[1].value = item.totalSuccess;
                dataArr[item.libraryTypeId - 1].data[1].totle = numToPercent(item.totalSuccess / total);
            });
            this.$emit('drawMap', 'recognition-map', recognitionMap.option);
        }
    }
};
</script>

<style lang="scss" scoped>
.recognition-statistics-title {
    height: 80px;
    margin: 5px 40px;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
    position: relative;
    color: #000;
    .iconfont {
        position: absolute;
        top: 12px;
        font-size: 50px;
    }
    .recognition-statistics-title-info {
        position: absolute;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        left: 70px;
        top: 15px;
    }
    .recognition-statistics-title-number {
        position: absolute;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        left: 70px;
        top: 43px;
    }
}
.recognition-statistics-draw {
    margin-top: 100px;
    height: 400px;
    width: 100%;
}
.recognition-map {
    height: 400px;
    width: 100%;
}
</style>
