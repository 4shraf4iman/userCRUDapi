<template>
    <div id="app">
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">UserCRUD</a>
</nav>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
   
  }
  
  h1 {
    font-size: 2em;
  }
  </style>
  