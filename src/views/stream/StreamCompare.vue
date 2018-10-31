<template>
  <div :class="['stream-compare', item.libraryTypeName=='黑名单' ? 'readColor' : '']">
    <div class="stream-compare-image">
      <img :src="item.url + item.imageUrl2" alt="">
      <div class="img-bg"></div>
    </div>
    <div class="stream-compare-image">
      <img :src="item.url + item.imageUrl1" alt="">
      <div class="img-bg"></div>
    </div>
    <div class="stream-compare-info">
      <p class="stream-compare-equipmentName">{{item.equipmentName}}</p>
      <p class="stream-compare-namedescribe">
        <span class="stream-compare-name">{{item.personnelName}}</span><span class="stream-compare-describe">{{item.describe}}</span>
      </p>
      <p class="stream-compare-confidence">相 似 度：{{item.confidence.substring(0,2)}}%</p>
      <p class="stream-compare-confidence">人员类型：{{item.libraryTypeName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StreamCompare',
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      errorImage: require('@/assets/image/timg.jpg')
    };
  },
  methods: {
    // 查看详情
    showPersonDetail (id) {
      this.$emit('showPersonDetail', id);
    },
    showRecognitionDetail (personnelId, tag) {
      this.$emit('showRecognitionDetail', personnelId, tag);
    }
  },
  mounted () {
  }
};
</script>

<style lang="scss">
 .stream-compare {
   position: relative;
   padding-bottom: 40px;
   border-top: 1px solid #00ffff;
   overflow: hidden;
   padding-top: 40px;
   &:first-child {
     border: 0;
     padding-top: 0;
   }
   img {
     width: 125px;
     height: 125px;
   }
   .stream-compare-image {
     width: 125px;
     height: 125px;
     position: relative;
     overflow: hidden;
     float: left;
     margin-right: 15px;
   }
   .img-bg {
     position: absolute;
     top: 0;
     left: 0;
     width: 125px;
     height: 125px;
     background-image: url(../../assets/image/img-bg.png);
     background-size: 100% 100%;
   }
   .stream-compare-info {
     width: 300px;
     height: 125px;
     position: relative;
     float: left;
     overflow: hidden;
     color: #00ffff;
     font-size: 16px;
   }
   .stream-compare-equipmentName {
     font-size: 18px;
     margin-top: 0;
   }
   .stream-compare-namedescribe {
     margin: 5px 0;
   }
   .stream-compare-name {
     border-right: 2px solid #00ffff;
     margin-right: 10px;
     padding-right: 10px;
   }
   .stream-compare-confidence {
     margin: 9px 0;
   }
 }
</style>
