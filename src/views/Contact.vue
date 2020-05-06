<template>
  <div id="app">
    name:
    <input type="text" v-model="textname" @keyup.enter="addTodo" />
    <button @click="addTodo()">+</button>
    <br />
    <div v-for="(show, index) in todos" :key="index">
      <h1>{{ show.name }}</h1>
    </div>
    <!-- <img src="./assets/logo.png"> -->
    <h1>{{ number }}</h1>
    <br />
    <button @click="addNum()">+</button>
    <br />
    <router-link :to="{ name: 'test' }">
      <button class="submit-order">Checkout</button>
    </router-link>
    <!-- <button type="submit">submit</button> -->
  </div>
</template>

<script>
/* eslint-disable */
import store from "../store/store";
import Vuex from "vuex";
global.vuex = Vuex;
export default {
  store,
  name: "app",
  components: {},
  methods: {
    addTodo: function() {
      store.commit("addText", this.textname);
      console.log(store.state.todos);
    },
    addNum: function() {
      store.commit("addNum", 1);
    }
  },
  data() {
    return {
      textname: ""
    };
  },
  computed: {
    todos() {
      return store.state.todos;
    },
    number() {
      return store.state.number;
    }
  },
  mounted() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
