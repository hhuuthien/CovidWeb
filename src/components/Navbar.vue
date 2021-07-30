<template>
  <div id="navbar">
    <!-- pc -->
    <div id="navbar-pc">
      <div id="nflex">
        <router-link to="/admin/get"
          ><img
            src="../assets/coronavirus.png"
            alt="Logo"
            style="cursor:pointer"
        /></router-link>
        <p id="nflex-title">COVID-19</p>
      </div>
      <ul>
        <li>
          <router-link to="/"><strong>Việt Nam</strong></router-link>
        </li>
        <li>
          <router-link to="/world"><strong>Thế giới</strong></router-link>
        </li>
        <li>
          <router-link to="/vaccine"><strong>Vaccine</strong></router-link>
        </li>
        <li>
          <router-link to="/vaccineInfo"
            ><strong>Thông tin vaccine</strong></router-link
          >
        </li>
      </ul>
    </div>

    <!-- mb -->
    <div id="navbar-mb">
      <div id="nflex">
        <img src="../assets/coronavirus.png" alt="Logo" />
        <p id="nflex-title">COVID-19</p>
      </div>
      <label for="check" id="label-menu">
        <i class="material-icons" id="menu-btn">menu</i>
      </label>
    </div>

    <!-- check-->
    <input type="checkbox" name="" id="check" hidden />

    <!-- overlay -->
    <label for="check" id="overlay"></label>

    <!-- side bar-->
    <div id="sidebar">
      <label for="check">
        <i class="material-icons" id="close-btn">close</i>
      </label>
      <ul>
        <li v-on:click="myFunction">
          <router-link to="/"><strong>Việt Nam</strong></router-link>
        </li>
        <li v-on:click="myFunction">
          <router-link to="/world"><strong>Thế giới</strong></router-link>
        </li>
        <li v-on:click="myFunction">
          <router-link to="/vaccine"><strong>Vaccine</strong></router-link>
        </li>
        <li v-on:click="myFunction">
          <router-link to="/vaccineInfo"
            ><strong>Thông tin vaccine</strong></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  setup() {
    const myFunction = () => {
      document.getElementById("check").click();
    };

    return {
      myFunction,
    };
  },
};
</script>

<style scoped>
#navbar-pc,
#navbar-mb {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 8px;
  border-radius: 10px;
  padding: 0 20px;
  border-radius: 10px;
  background: rgb(228, 228, 228);
  background: linear-gradient(
    90deg,
    rgba(228, 228, 228, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  height: 70px;
}

#navbar-pc img,
#navbar-mb img {
  height: 70px;
  padding: 15px;
}

#navbar-pc ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  list-style-type: none;
  text-decoration: none;
  height: 70px;
}

#navbar-pc ul li {
  border-radius: 10px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
}

#navbar-pc ul li a {
  color: #000;
}

#navbar-pc ul li:hover {
  background-color: rgba(0, 11, 112, 0.1);
  cursor: pointer;
  transition: 0.5s ease;
}

#sidebar {
  background: rgb(228, 228, 228);
  background: linear-gradient(
    270deg,
    rgba(228, 228, 228, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  margin: 8px;
  border-radius: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 320px;
  max-width: 100%;
  z-index: 999;
  transform: translateX(100%);
  transition: all ease 0.3s;
  opacity: 0;
}

#close-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

#close-btn:hover {
  cursor: pointer;
  color: blue;
  transition: 0.5s ease;
}

#menu-btn {
  cursor: pointer;
}

#menu-btn:hover {
  cursor: pointer;
  color: blue;
  transition: 0.5s ease;
}

#sidebar ul {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  list-style-type: none;
  text-decoration: none;
  margin-top: 60px;
}

#sidebar ul li {
  width: 300px;
  padding: 15px 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

#sidebar ul li a {
  color: #000;
}

#sidebar ul li:hover {
  background-color: rgba(0, 11, 112, 0.1);
  cursor: pointer;
  transition: 0.5s ease;
}

@media (min-width: 701px) {
  #navbar-pc {
    display: flex;
  }

  #navbar-mb {
    display: none;
  }
}

@media (max-width: 700px) {
  #navbar-mb {
    display: flex;
  }

  #navbar-pc {
    display: none;
  }
}

#check:checked ~ #sidebar {
  transform: translateX(0%);
  opacity: 1;
}

#overlay {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  cursor: pointer;
  z-index: 998;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#check:checked ~ #overlay {
  display: block;
  animation: fadeIn ease 0.3s;
}

#nflex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 70px;
}

#nflex a {
  height: 70px;
}

#nflex-title {
  font-size: 1.2rem;
  font-weight: bold;
}

#label-menu {
  height: 24px;
}
</style>
