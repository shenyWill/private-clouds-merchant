<template>
    <div class="witness-detail">
        <p class="witness-detail-img">
            <span class="img-info">
                <img :src="witnessUrl+witnessDetail.imageUrl1" alt="" :onerror="`src='${errorImage}'`">
                <span class="img-info-detail">抓拍头像</span>
            </span>
            <span class="img-info">
                <img :src="witnessUrl+witnessDetail.imageUrl2" alt="" :onerror="`src='${errorImage}'`">
                <span class="img-info-detail">身份证照片</span>
                <span class="img-info-confidence">{{witnessDetail.confidence.substring(0,2)}}%</span>
            </span>
        </p>
        <p class="witness-detail-areaName">{{witnessDetail.areaName}}</p>
        <p class="witness-detail-recognitionTime">{{witnessDetail.recognitionTime}}</p>
        <p :class="witnessDetail.recognitionType == 1 ? 'witness-detail-success': 'witness-detail-error'">
            <i :class="witnessDetail.recognitionType == 1 ? 'el-icon-success' : 'el-icon-error'">{{witnessDetail.recognitionType == 1 ? ' 比对成功' : ' 比对失败'}}</i>
        </p>
        <p class="witness-detail-info">
            <span class="witness-detail-info-key">姓　　名：</span>
            <span class="witness-detail-info-val">{{witnessDetail.personnelName}}</span>
        </p>
        <p class="witness-detail-info">
            <span class="witness-detail-info-key">性　　别：</span>
            <span class="witness-detail-info-val">{{witnessDetail.personnelSex}}</span>
        </p>
        <p class="witness-detail-info">
            <span class="witness-detail-info-key">名　　族：</span>
            <span class="witness-detail-info-val">{{witnessDetail.personnelNation}}</span>
        </p>
        <p class="witness-detail-info">
            <span class="witness-detail-info-key">设备名称：</span>
            <span class="witness-detail-info-val">{{witnessDetail.equipmentName}}</span>
        </p>
        <p class="witness-detail-info">
            <span class="witness-detail-info-key">出生年月：</span>
            <span class="witness-detail-info-val">{{witnessDetail.personnelBirthdate}}</span>
        </p>
        <p class="witness-detail-info">
            <span class="witness-detail-info-key">身份证号：</span>
            <span class="witness-detail-info-val">{{witnessDetail.personnelIdnum}}</span>
        </p>
        <p class="witness-detail-info">
            <span class="witness-detail-info-key">住　　址：</span>
            <span class="witness-detail-info-val">{{witnessDetail.personnelAddress}}</span>
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            errorImage: require('@/assets/image/avatar.png')
        };
    },
    props: ['witnessDetail', 'witnessUrl']
};
</script>

<style lang="scss">
.witness-detail {
    .img-info {
        width: 130px;
        height: 130px;
        overflow: hidden;
        display: inline-block;
        margin: 0 10px;
        position: relative;
        img {
            width: 130px;
            height: 130px;
            border-radius: 10px;
        }
    }
    .img-info-detail,.img-info-confidence {
        position: absolute;
        display: block;
        height: 30px;
        line-height: 30px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
    }
    .img-info-detail {
        bottom: 0;
        width: 100%;
        border-radius: 0 0 10px 10px;
    }
    .img-info-confidence {
        top: 0;
        right: 0;
        width: 60px;
        border-radius: 0 10px 0 0;
    }
    .witness-detail-areaName,.witness-detail-recognitionTime {
        font-weight: bold;
        font-size: 16px;
        color: #333;
        margin: 5px 0;
    }
    .witness-detail-info-key {
        font-size: 16px;
        color: #333333;
        font-weight: bold;
    }
    .witness-detail-success {
        color: #00cc33;
    }
    .witness-detail-error {
        color: #ff0000;
    }
    .witness-detail-info {
        text-align: left;
        padding-left: 70px;
    }
}
</style>
