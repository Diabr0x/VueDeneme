
<template>
 <div>
  <nav>
    <router-link :to="{name:'home'}">Home</router-link> 
    <router-link :to="{name:'about'}">About</router-link>
    <router-link :to="{name:'Story'}">Story</router-link>
  </nav>
  
<a class="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
  <span @click="anasayfa">Anasayfa</span>
   <span @click="geri">Geri</span>
   <span @click="ileri">İleri</span>
  </a>
   <router-view/>
   </div>
</template>

<script>
export default {
 methods: {
  anasayfa(){
    this.$router.push({name:'home'})
  },
  geri(){
  this.$router.go(-1)
  },
  ileri(){
  this.$router.go(+1)
  }

 }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
span,a{
  color:blueviolet;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  padding:20px;
}
div{
  background-color:aliceblue;
}
</style>

