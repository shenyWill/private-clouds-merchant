<template>
    <div class="equipment-statistics-screen">
        <div class="equipment-statistics-title">
            <i class="iconfont icon-shebei-lan"></i>
            <span class="equipment-statistics-title-info">设备数</span>
            <span class="equipment-statistics-title-number">100</span>
        </div>
        <div class="equipment-statistics-draw">
            <div id="equipment-map" class="equipment-map"></div>
        </div>
    </div>
</template>

<script>
import equipmentMap from './equipmentMap.js';
export default {
    mounted () {
        this.$emit('drawMap', 'equipment-map', equipmentMap.option);
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
