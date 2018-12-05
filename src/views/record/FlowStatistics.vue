<template>
    <div class="flow-statistics-screen">
        <div class="flow-statistics-title">
            <i class="iconfont icon-renyuanguanli-lan"></i>
            <span class="flow-statistics-title-info">流量</span>
            <span class="flow-statistics-title-number">2343224</span>
        </div>
        <div class="flow-statistics-draw">
            <div id="flow-map" class="flow-map"></div>
        </div>
    </div>
</template>

<script>
import flowMap from './flowNumMap.js';
export default {
    mounted () {
        this.$emit('drawMap', 'flow-map', flowMap.option);
    }
};
</script>

<style lang="scss" scoped>
.flow-statistics-title {
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
    .flow-statistics-title-info {
        position: absolute;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        left: 70px;
        top: 15px;
    }
    .flow-statistics-title-number {
        position: absolute;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        left: 70px;
        top: 43px;
    }
}
.flow-statistics-draw {
    margin-top: 20px;
    height: 400px;
    width: 100%;
}
.flow-map {
    height: 400px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
}
</style>
