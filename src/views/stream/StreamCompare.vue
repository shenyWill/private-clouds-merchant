<template>
  <div :class="['stream-compare', item.libraryTypeName=='黑名单' ? 'readColor' : '']">
    {{item}}
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
  }
};
</script>

<style lang="scss">
 .stream-compare {
   position: relative;
   padding-bottom: 35px;
   border-top: 1px solid #00ffff;
   overflow: hidden;
   padding-top: 20px;
   &:first-child {
     border: 0;
     padding-top: 0;
   }
 }
</style>
