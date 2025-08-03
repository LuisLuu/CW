<template>
  <div id="app">

    <div class="ui inverted segment navbar">

        <div class="ui center aligned container">
            <div class="ui large secondary inverted pointing menu compact">
                <router-link to="/words" exact class="item">
                    <i class="comment outline icon"></i> Words
                </router-link>
                <router-link to="/words/new" class="item">
                    <i class="plus circle icon"></i> New
                </router-link>
                <router-link to="/test" class="item">
                    <i class="graduation cap icon"></i> Test
                </router-link>
                 <div class="ui text container">
                    <flash-message class="myFlash"></flash-message>
                    <div class="ui one column grid">
                        <div class="column"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="ui container">
        <div class="ui one column grid">
            <div class="column">
                <router-view></router-view>
            </div>
        </div>
</div>

<img src="./assets/logo.png" alt="Mascot Logo" class="mascot-logo">

  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>
#app > div.navbar {
    margin-bottom: 1.5em;
}
.mascot-logo {
  position: fixed;   /* This is the key! It fixes the element to the screen */
  bottom: 20px;      /* Distance from the bottom */
  left: 20px;        /* Distance from the left */
  max-width: 125px;  /* Adjust size as needed */
  height: auto;
  z-index: 1000;     /* Ensures it stays on top of other content */
}
.myFlash {
    width: 250px;
    margin: 10px;
    position: absolute;
    top: 50;
    right: 0;
}

input {
    width: 300px;
}
div.label {
    width: 120px;
}
div.input {
    margin-bottom: 10px;
}
button.ui.button {
    margin-top: 15px;
    display: block;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
