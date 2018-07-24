<template>
  <div class="test-example">
    {{ count }}
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
 export default {
   name: 'TestExample',
   data () {
     return {
       count: 0
     };
   },
   methods: {
     increment () {
       this.count++;
     }
   },
   mounted () {
   }
 };
</script>
