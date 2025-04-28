<template>
  <div>
    <nav class="navbar">  
      <div>
        <router-link to="/home">
         <div class="logo" router-link to="/home">My Dictionary</div>
        </router-link>
      </div>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/dictionary">Dictionary</a></li>
        <li><a href="/about">Game</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  height: 75px;
  font-size:1.1rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: #333;
  padding: 10px 20px;
  color: white;
  position:fixed;
  top: 0;
  left :0;
  width: 100%;
  z-index: 1000;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 1em;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #00bcd4;
}
</style>