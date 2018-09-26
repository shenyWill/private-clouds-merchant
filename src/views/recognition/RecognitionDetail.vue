<template>
  <div class="recognition-detail">
    <div class="recognition-nav" v-for="(obj,key) in recognitionDetail" :key="obj.id">
      <h3>{{parseTime(key)}}</h3>
      <ul>
        <li v-for="item in obj" :key="item.id" class="recognition-list">
          <img :src="recognitionDetailUrl + item.imageUrl1" alt="" class="recognition-list-image">
          <span class="recognition-score">{{ parseInt(item.confidence) }}%</span>
          <p class="recognition-list-equipmentName">{{ item.equipmentName }}</p>
          <p class="recognition-list-content">
            <span :title="item.recognitionTime" class="recognition-list-type">{{ item.groupName }}</span>
            <span :title="item.recognitionTime" class="recognition-list-time">{{ item.recognitionTime.split(' ')[1] }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'RecognitionDetail',
   data () {
     return {
       day: {
         '1': '一',
         '2': '二',
         '3': '三',
         '4': '四',
         '5': '五',
         '6': '六',
         '0': '日'
       }
     };
   },
   props: ['recognitionDetail', 'recognitionDetailUrl'],
   methods: {
     parseTime (time) {
       if (!this.withinAWeek(time)) {
         return time;
       } else {
         const now = new Date();
         const date = new Date(time);
         const month = date.getMonth();
         const year = date.getFullYear();
         const day = date.getDate();
         if (now.getFullYear() === year && now.getMonth() === month && now.getDate() === day) {
           return '今天';
         }
         return '周' + this.day[date.getDay()];
       }
     },
     withinAWeek (time) {
       const date = new Date(time).getTime();
       const now = new Date().getTime();
       return Math.abs(now - date) < 7 * 24 * 3600 * 1000;
     }
   }
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
   position: relative;
   list-style: none;
   width: 120px;
   height: 180px;
   float: left;
   overflow: hidden;
   margin-right: 10px;
   margin-bottom: 10px;
   &:nth-child(4n) {
     margin-right: 0;
   }
   img {
     width: 120px;
     height: 120px;
     border-radius: 8px;
   }
   .recognition-score {
     position: absolute;
     padding: 5px;
     min-width: 40px;
     top: 0;
     right: 0;
     font-size: 14px;
     color: white;
     text-align: right;
     border-radius: 0 0 0 10px;
     background-color: rgba(74, 73, 72, 0.5);
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
