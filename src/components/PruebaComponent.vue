<template>
    <div>
      <h1>Esta es una página de prueba</h1>
      <p>Bienvenido a tu nueva página de prueba en Vue.js!</p>
      <ButtonTry></ButtonTry>
    </div>
</template>
  
<script>
  import ButtonTry from './ButtonTry.vue';
  
  export default {
    name: 'pruebaComponent',
    components:{
      ButtonTry
    }
  }
</script>
  
<style scoped>
  /* Estilos específicos de esta vista */
</style>
  