<template>
    <form>
      <input type="text" v-model="text"/>
      <p>{{ text }}</p>
      <select v-model="framework">
        <option value="Semih Kılıçsoy">Beşiktaş</option>
        <option value="Mauro İcardi">Galatasaray</option>
        <option value="Edin Dzeko">Fenerbahçe</option>
      </select>
      <p>{{ framework }}</p>
      <hr>
      <input type="checkbox" id="checkbox1" v-model="checked">
      <label for="checkbox1">Onay</label>
      <p>Sonuc:{{ checked ? "Onaylıyorum" : "Onaylamıyorum" }}</p>
      <hr>
      <h4>Öğrenciler</h4>
      <input type="text" v-model="student" @keyup.alt="addStudent">
      <div v-for="student in students" :key="student">
        <span @click="deleteStudent(student)">{{ student }}</span>
      </div>
    </form>
  </template>
  
  <script>
  export default {
   data(){
      return{
          text:"dyto6wn34",
          framework: "Bir takım seçiniz",
          checked:false,
          student:"",
          students:[]
      }
   },
   methods:{
    addStudent(e){
      if(e.key=="," && this.student) {
        if(!this.students.includes(this.student)){
          this.students.push(this.student)
        }
        this.student=""
      }
    },
    deleteStudent(student){
      this.students=this.students.filter(item=>{
        return student !== item 
      })
    }
   }
  }
  </script>
  
  <style>
  
  </style>