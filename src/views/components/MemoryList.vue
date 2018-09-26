<template>
    <div class="memory-list">
        <div class="memory-nav">
            <h2 class="memory-title">
                <span class="title-text">提示</span>
                <i class="el-icon-close title-icon" @click.stop="close"></i>
            </h2>
            <p class="memory-content">
                {{object.notifyMsg}}<span>。当存储空间低于50G时，将自动清除抓拍图片至200G的剩余空间。</span>
            </p>
            <span class="memory-btn" @click.stop="close">好 的</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['object'],
    methods: {
        close () {
            this.$emit('close');
        }
    }
};
</script>

<style lang="scss" scoped>
.memory-list {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-weight: bold;
    .memory-nav {
        width: 500px;
        height: 300px;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 20px;
    }
    .memory-title {
        height: 60px;
        text-align: left;
        line-height: 40px;
        font-size: 18px;
        margin: 0;
        box-sizing: border-box;
        padding: 10px 40px;
        border-bottom: 1px solid #e5e5e5;
    }
    .title-icon {
        float: right;
        line-height: 40px;
        font-size: 25px;
        color: #666666;
        cursor: pointer;
    }
    .memory-content {
        text-align: center;
        font-size: 16px;
        color: #333;
        margin: 50px 20px;
        line-height: 30px;
    }
    .memory-btn {
        display: inline-block;
        background-color: #008aff;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        text-align: center;
        border-radius: 10px;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>
