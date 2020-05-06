/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  counter: '',
  shop_name: '',
  categories: '',
  payment: '',
  delivery_fee: ''
};

const mutations = {
  setCounter: (state, counter) => {
    state.counter = counter
  },
  setShopName: (state, shopName) => {
    state.shop_name = shopName
  },
  setCategories: (state, categories) => {
    state.categories = categories
  },
  setPayment: (state, payment) => {
    state.payment = payment
  },
  setDeliveryFee: (state, deliveryFee) => {
    state.delivery_fee = deliveryFee
  }
};

const getters = {
  todos: state => state.todos,
  number: state => state.number
};

const actions = {
  addTodo: (state, name) => {
    store.commit("addText", name);
  },
  addNumber: (state, num) => {
    store.commit("addNum", num);
  }
};

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
});

global.store = store;
export default store;
