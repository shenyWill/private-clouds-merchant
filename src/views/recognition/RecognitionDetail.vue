<template>
    <div class="recognition-detail">
        <div class="recognition-nav" v-for="obj in recognitionDetail" :key="obj.date">
            <h3>{{obj.date}}</h3>
            <ul>
                <li v-for="item in obj.list" :key="item.id" class="recognition-list">
                    <img :src="item.image" alt="" class="recognition-list-image">
                    <p class="recognition-list-equipmentName">{{ item.equipmentName }}</p>
                    <p class="recognition-list-content">
                        <span class="recognition-list-type">{{ item.type }}</span>
                        <span class="recognition-list-time">{{ item.time }}</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ['recognitionDetail']
};
</script>

<style lang="scss" scoped>
.recognition-detail {
    margin-left: 8px;
    ul {
        overflow: hidden;
        width: 100%;
        margin: 0;
        padding: 0;
    }
}
.recognition-list {
    list-style: none;
    width: 120px;
    height: 180px;
    float: left;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
    img {
        width: 120px;
        height: 120px;
        border-radius: 8px;
    }
    .recognition-list-equipmentName,.recognition-list-content {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #666;
        width: 100%;
        overflow: hidden;
        margin: 5px 0;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
