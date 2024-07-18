<template>
<div>
  <Form />
  <Title/>
  <h3>Dımb</h3>
  </div>
</template>

<script>
import Title from "./components/PageTitle.vue"
import Form from "./components/PageForm.vue"
export default {
  name: 'App',
  components:{
    Title,
    Form
  }
  
}
</script>

<style scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
