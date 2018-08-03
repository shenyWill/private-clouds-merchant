<template>
  <div class="stream">
    视频直播
    <video
      controls
      src=""
      width="600"
      height="400"
    >
    </video>
  </div>
</template>

<script>
 export default {
   // Video Streaming Component
   name: 'Stream',
   data () {
     return {
       player: null
     };
   },
   methods: {
   },
   mounted () {
   }
 };
</script>
