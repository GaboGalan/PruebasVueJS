<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <PruebaComponent></PruebaComponent> -->
  <!-- <RouterView></RouterView> -->
  <div id="app">
    <router-link to="/">
      <button class="my-button">Home</button>
    </router-link>
    <router-link to="/prueba">
      <button class="my-button">Prueba</button>
    </router-link>
    
    <router-view></router-view>
  </div>
</template>

<script>
 

export default {
  name: 'App'
} 
/* import PruebaComponent from './components/PruebaComponent.vue';
export default{
  name: 'App',
  components:{
    PruebaComponent
  }
}
 */
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* En tu archivo CSS */
.my-button {
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 10px;
  /* Otros estilos */
}

</style>
