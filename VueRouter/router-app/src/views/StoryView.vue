<template>
  <div>
    <h1>DYTOWN</h1>
    <div v-for="hikaye in hikayeler" :key="hikaye.id">
        <router-link :to="{ path: `/Story/${hikaye.id}` }">{{ hikaye.name }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hikayeler: [
        { id: 1, name: "Dytown Giriş", sayfa: 15 },
        { id: 2, name: "Dytown Gelişme", sayfa: 35 },
        { id: 3, name: "Dytown Sonuç", sayfa: 60 }
      ]
    };
  }
};
</script>

<style>
/* Gerekli stiller buraya eklenebilir */
</style>
