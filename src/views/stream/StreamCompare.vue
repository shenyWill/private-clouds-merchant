<template>
  <div class="stream-compare">
    <span class="stream-compare__image-wrapper">
      <span
        v-if="item.libraryTypeName === '黑名单'"
        class="stream-compare__image-type background-red stream-compare__image-score-red">
        {{ item.libraryTypeName }}
      </span>
      <span v-else class="stream-compare__image-type">{{ item.libraryTypeName }}</span>
      <img
        v-if="item.libraryTypeName === '黑名单'"
        :src="item.url + item.imageUrl2"
        class="stream-compare__image border-red" />
      <img v-else :src="item.url + item.imageUrl2" class="stream-compare__image" />
    </span>
    <span class="stream-compare__image-wrapper">
      <span
        v-if="item.libraryTypeName === '黑名单'"
        class="stream-compare__image-score background-red stream-compare__image-score-red">
        {{ parseInt(item.confidence) }}%
      </span>
      <span v-else class="stream-compare__image-score">{{ parseInt(item.confidence) }}%</span>
      <img
        v-if="item.libraryTypeName === '黑名单'"
        :src="item.url + item.imageUrl1"
        class="stream-compare__image border-red" />
      <img v-else :src="item.url + item.imageUrl1" class="stream-compare__image" />
    </span>
    <div class="stream-compare__content">
      <div class="stream-compare__device">{{ item.equipmentName }}</div>
      <div class="stream-compare__person">
        <span class="stream-compare__name">{{ item.personnelName }}</span>
        <span> | </span>
        <span class="strem-compare__desc">{{ item.describe }}</span>
      </div>
      <div class="stream-compare__time">识别时间:{{ item.recognitionTime.split(' ')[1] }}</div>
      <div class="stream-compare__tag">
        <el-tag
          class="stream-compare__tag-red"
          v-if="item.libraryTypeName === '黑名单'"
          @click.native="showPersonDetail(item.personnelId)">
          人员信息
        </el-tag>
        <el-tag v-else @click.native="showPersonDetail(item.personnelId)">人员信息</el-tag>
        <el-tag
          class="stream-compare__tag-red"
          v-if="item.libraryTypeName === '黑名单'"
          @click.native="showRecognitionDetail(item.personnelId, true)">
          识别记录
        </el-tag>
        <el-tag v-else @click.native="showRecognitionDetail(item.personnelId, true)">识别记录</el-tag>
      </div>
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
  }
};
</script>

<style lang="scss">
 .stream-compare {
   position: relative;
   padding-bottom: 8px;
   border-top: 1px solid lightgray;
   overflow: hidden;
   .stream-compare__image-wrapper {
     margin-top: 20px;
     position: relative;
     display: inline-block;
     width: 108px;
     height: 108px;
     margin-left: 20px;
     .stream-compare__image {
       display: inline-block;
       width: 108px;
       height: 108px;
       border-radius: 10px;
     }
     .stream-compare__image-type {
       position: absolute;
       padding: 5px;
       min-width: 40px;
       top: 0;
       right: 0;
       font-size: 14px;
       color: white;
       text-align: right;
       border-radius: 0 10px 0 10px;
       background-color: rgba(74, 73, 72, 0.5);
     }
     .stream-compare__image-score {
       position: absolute;
       padding: 5px;
       min-width: 40px;
       top: 0;
       right: 0;
       font-size: 14px;
       color: white;
       text-align: right;
       border-radius: 0 10px 0 10px;
       background-color: rgba(74, 73, 72, 0.5);
     }
     .stream-compare__image-score-red {
       right: -3px;
     }
     .background-red {
       background-color: #ff0000;
       opacity: 0.8;
     }
     .border-red {
       border: 2px solid #ff0000;
     }
   }
   .stream-compare__content {
     position: absolute;
     top: 20px;
     left: 280px;
     display: inline-block;
     font-size: 14px;
     .stream-compare__device {
       font-weight: bold;
       margin-bottom: 5px;
     }
     .stream-compare__person {
       margin-bottom: 8px;
       .stream-compare__name {
         font-weight: bold;
       }
     }
     .stream-compare__tag .el-tag {
       background-color: #008aff;
       color: white;
       &:hover {
         cursor: pointer;
       }
     }
     .stream-compare__tag .stream-compare__tag-red {
       background-color: #ff0000;
       border: none;
     }
     .stream-compare__time {
       margin-bottom: 5px;
       .el-tag {
         &:hover {
           cursor: pointer;
         }
       }
     }
   }
 }
</style>
