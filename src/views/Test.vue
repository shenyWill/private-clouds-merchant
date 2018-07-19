<template>
  <div>
    <video id="video" :src="url" autoplay="autoplay" controls="controls" v-if="url"></video>
    <input id="file" type="file" name="file" accept="video/*" capture @change="onchange()" />
  </div>
</template>

<script>
 export default {
   name: 'Test',
   data () {
     return {
       video: null,
       url: null
     };
   },
   methods: {
     onchange () {
       var $file = document.getElementById('file');
       var file = $file.files[0];
       this.url = URL.createObjectURL(file);
       this.video.src = this.url;
       this.video.load();
       if (this.video.readyState > 0) {
         alert(this.video.duration);
       }
     }
   },
   mounted () {
     this.video = document.getElementById('video');
   }
 };
</script>
