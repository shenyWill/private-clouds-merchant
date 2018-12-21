<template>
    <div class="internet-config">
        <h2 class="internet-config-title">网络配置（TCP/IP）</h2>
         <div class="config-ipv">
             <p class="ipv-paragraph">
                 <span>网卡类型</span>
                 <input type="text" v-model="ipvObj.ipvType">
             </p>
             <p class="ipv-check">
                 <el-checkbox v-model="ipvcheck">自动获取</el-checkbox>
             </p>
             <p class="ipv-addr">
                 <span>设置IPv4地址</span>
                 <input type="text" v-model="ipvObj.addr">
                 <span class="test-btn">测试</span>
             </p>
             <p class="ipv-"></p>
         </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            ipvObj: {},
            ipvcheck: false
        };
    }
};
</script>

<style lang="scss" scoped>
.internet-config{
    overflow: hidden;
    text-align: left;
    text-indent: 41px;
    background-color: #fff;
    .internet-config-title {
        height: 60px;
        line-height: 60px;
        margin: 0;
        padding: 0;
        font-size: 18px;
        text-align: left;
        border-bottom: 1px solid #dcdcdc;
    }
    .config-ipv {
        height: 500px;
        width: 500px;
    }
}
</style>
