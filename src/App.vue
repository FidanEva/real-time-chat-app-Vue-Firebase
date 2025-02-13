<template>
  <main>
    <router-view />
  </main>
</template>

<style>
body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.logo{
  font-size: calc(1.25625rem + .075vw);
  margin: 0;
}
header {
  background-color: #f3f3f3;
  padding: 10px 20px;
  border-bottom: 1px solid #f0eff5 !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav a, nav button {
  margin: 10px;
  text-decoration: none;
  color: #333;
}
</style>