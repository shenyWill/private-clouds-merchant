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
export default {
    mounted () {
        this.$emit('drawMap', 'recognition-map', recognitionMap.option);
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
