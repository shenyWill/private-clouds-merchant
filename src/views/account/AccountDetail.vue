<template>
    <div class="account-detail">
        <img :src="userImg" alt="">
        <p class="account-detail-name">{{accountDetailObj.name}}</p>
        <p class="account-detail-info">
            <span class="detail-info-key">组织:</span>
            <span class="detail-info-val">{{accountDetailObj.deptName}}</span>
        </p>
        <p class="account-detail-info">
            <span class="detail-info-key">账号:</span>
            <span class="detail-info-val">{{accountDetailObj.username}}</span>
        </p>
        <p class="account-detail-info">
            <span class="detail-info-key">密码:</span>
            <span class="detail-info-val">{{accountDetailObj.realPassword}}</span>
        </p>
        <p class="account-detail-info">
            <span class="detail-info-key">权限:</span>
            <span class="detail-info-val">
                <span class="equipment-name" v-for="item in accountDetailObj.equipmentArrList" :key="item.id">{{item.equipmentName}}、</span>
            </span>
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userImg: require('@/assets/image/avatar.png')
        };
    },
    props: ['accountDetailObj']
};
</script>

<style lang="scss" scoped>
.account-detail {
    overflow: hidden;
    img {
        width: 130px;
        height: 130px;
        border-radius: 10px;
    }
    .account-detail-name {
        font-size: 24px;
        color: #333;
        font-weight: bold;
        margin: 10px auto 40px auto;
    }
    .account-detail-info {
        text-align: left;
        margin-left: 120px;
        margin-right: 80px;
        overflow: hidden;
        position: relative;
        padding-left: 45px;
    }
    .detail-info-key {
        font-weight: bold;
        font-size: 16px;
        position: absolute;
        left: 0;
    }
    .detail-info-equipment {
       transform: translateX(30px);
    }
}
</style>
