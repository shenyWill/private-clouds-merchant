<template>
  <div class="stream">
    <div class="stream__video-wrapper">
      <video
        id="player"
        class="stream__video"
        controls
        autoplay
        width="600"
        height="400">
        <!-- <source src="http://172.16.19.150:9580/live/84a3e6dfbb07f149/hls.m3u8"> -->
        <!-- <source src="http://172.16.19.150:9580/live/84a3e6dfbb07f149.flv"> -->
        <!-- <source src="rtmp://172.16.19.150:1935/live/84a3e6dfbb07f149"> -->
        <source src="rtsp://172.16.19.150:9554/live/84a3e6dfbb07f149">
      </video>
    </div>
    <div class="stream__capture"></div>
    <div class="stream__compare"></div>
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

<style lang="scss">
 .stream {
   position: relative;
   margin: 30px;
   border: 1px solid lightgray;
   text-align: left;

   .stream__video-wrapper {
     background-color: white;
     .stream__video {
       margin-top: 30px;
     }
   }
   .stream__capture {
     position: absolute;
     bottom: 0;
     background-color: white;
   }
 }
</style>
