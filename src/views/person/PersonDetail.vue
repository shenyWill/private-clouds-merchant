<template>
    <div class="people-detail">
        <div class="people-detail-image">
            <img :src="personDetail.url + (personDetail.personnelImgList && personDetail.personnelImgList[0] && personDetail.personnelImgList[0].imageUrl)" alt="">
            <img :src="personDetail.url + (personDetail.personnelImgList && personDetail.personnelImgList[0] && personDetail.personnelImgList[0].imageUrl)" alt="">
            <img :src="personDetail.url + (personDetail.personnelImgList && personDetail.personnelImgList[1] && personDetail.personnelImgList[1].imageUrl)" alt="">
            <img :src="personDetail.url + (personDetail.personnelImgList && personDetail.personnelImgList[2] && personDetail.personnelImgList[2].imageUrl)" alt="">
        </div>
        <p class="people-detail-introduce">
            <span class="people-detail-name">{{ personDetail.personnelName }}</span>
            <span class="people-detail-position">{{ personDetail.personnelDescribe }}</span>
        </p>
        <el-tag size="medium" :type="personDetail.libraryTypeName=='白名单' ? 'success' : 'danger'">{{ personDetail.libraryTypeName }}</el-tag>
        <div class="people-detail-content">
            <p class="people-detail-company">
                <span class="people-detail-content-key">组　　织：</span>
                <span class="people-detail-content-value">{{ personDetail.groupName }}</span>
            </p>
             <p class="people-detail-library">
                <span class="people-detail-content-key">所在库　：</span>
                <span class="people-detail-content-value">{{ personDetail.libraryName }}</span>
            </p>
            <p class="people-detail-status">
                <span class="people-detail-content-key">识别开关：</span>
                <span class="people-detail-content-value">{{ personDetail.disSwitch == '0' ? '关' : '开' }}</span>
            </p>
            <p class="people-detail-time">
                <span class="people-detail-content-key">开始时间：</span>
                <span class="people-detail-content-value">{{ personDetail.disStartTime }}</span>
            </p>
            <p class="people-detail-time">
                <span class="people-detail-content-key">结束时间：</span>
                <span class="people-detail-content-value">{{ personDetail.disEndTime }}</span>
            </p>
            <p class="people-detail-equipment">
                <span class="people-detail-content-key">识别设备：</span>
                <span class="people-detail-content-equipment">
                    <span v-for="(item,index) in personDetail.equipmentList" :key="index">
                        {{item.equipmentName}},
                    </span>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['personDetail']
};
</script>

<style lang="scss" scoped>
.people-detail-image {
    width: 269px;
    height: 205px;
    overflow: hidden;
    margin: 0 auto;
    img {
        width: 65px;
        height: 65px;
        float: right;
        margin-top: 3px;
        border-radius: 5px;
    }
    img:first-child {
        width: 200px;
        height: 200px;
        float: left;
        border-radius: 8px;
    }
}
.people-detail-introduce {
    color: #333;
    font-weight: bold
}
.people-detail-name {
    font-size: 24px;
    display: inline-block;
    padding-right: 10px;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 23px;
        background: #333;
        right: -3px;
        top: 7px;
    }
}
.people-detail-position {
    font-size: 16px;
    padding-left: 10px;
    font-weight: bold;
}
.people-detail-content {
    width: 269px;
    overflow: hidden;
    margin: 0 auto;
    text-align: left;
    p:not(.people-detail-equipment) {
        width: 269px;
        height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.people-detail-content-key {
    font-size: 18px;
    font-weight: bold;
}
.people-detail-equipment {
    position: relative;
    .people-detail-content-key {
        position: absolute;
    }
}
.people-detail-content-equipment {
    margin-left: 97px;
    display: inline-block;
    line-height: 30px;
}
.people-detail {
    text-align: center;
}
</style>
