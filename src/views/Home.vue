<template>
  <div class="page">
    <!-- LOADING VIEW -->
    <div v-if='status === 0'>
      <div class="container">
        <content-loader :width=500 :height=900>
          <rect x="16" y="10" rx="8" ry="8" width="80" height="20" />
          <rect x="112" y="10" rx="8" ry="8" width="100" height="20" />
          <rect x="228" y="10" rx="8" ry="8" width="60" height="20" />
          <rect x="304" y="10" rx="8" ry="8" width="120" height="20" />
          <rect x="16" y="80" rx="8" ry="8" width="100" height="40" />
          <template v-for="i in 5">
            <rect x="16" :y="150+(150*(i-1))" rx="8" ry="8" width="100" height="100" :key="i*8+0" />
            <rect x="132" :y="150+(150*(i-1))" rx="8" ry="8" width="220" height="20" :key="i*8+1" />
            <rect x="132" :y="180+(150*(i-1))" rx="8" ry="8" width="140" height="20" :key="i*8+2" />
            <rect x="132" :y="230+(150*(i-1))" rx="8" ry="8" width="80" height="20" :key="i*8+3" />
            <rect x="340" :y="230+(150*(i-1))" rx="8" ry="8" width="80" height="20" :key="i*8+4" />
          </template>
        </content-loader>
      </div>
    </div>

    <!-- CONTENT VIEW -->
    <div v-else-if='status === 200'>
      <!-- HEADER -->
      <nav v-if="categories.length > 1" class='header is-fixed-top'>
        <div class="container">
          <div class="navbar scroll-horizontal">
            <scrollactive active-class="active" class="nav-menu" :highlightFirstItem='true' :exact='true' :modifyUrl='false' :offset="80" :scrollOffset="30">
              <template v-for="(category, i) in categories" >
                <a :href="'#' + whiteSpace(category.name)" :key='i' class="scrollactive-item">
                  {{ category.name }}
                  </a>
              </template>
            </scrollactive>
          </div>
        </div>
      </nav>

      <!-- CONTENT -->
      <div class="container menu">
        <section class="section" v-for="(category, x) in categories" :key='x' :id="whiteSpace(category.name)">
          <div class="columns columns-item-title column">
            <template v-if="x == 0">
              <h1 class='text-align-left title' :class="{ active: categories.length > 1}">All Menu</h1>
            </template>
            <template v-else>
              <h2 class='text-align-left category'>{{category.name}}</h2>
            </template>
          </div>
          <div class="columns columns-item-content is-mobile" v-for='(item, y) in category.menus' :key='item.id' :class="{ disabled: item.enable === 0}">
            <div class="menu-img" v-show="is_visible_image">
              <template v-if="trimSpace(item.image_url) !== ''"><img class='image is-96x96 img-item' :src='item.image_url'/></template>
              <template v-else><img class='image is-96x96 img-item' :src='"@/assets/images/placeholder_image.png"'/></template>
            </div>
            <div class="column menu-detail" valign="top">
              <h2 class="menu-name">{{ item.name }}</h2>
              <section class="menu-buyer">
                <div class="menu-buyer-price">
                  <h3>฿{{ item.price }}</h3>
                </div>
                <div class="stepper menu-buyer-quantity">
                  <button class="btn-circle" type="button" v-on:click='decrease(x,y)' :disabled='counter[x][y] == 0 || item.enable === 0'>
                    <i class="fas fa-minus fa-lg"></i>
                  </button>
                  <div class="st-number">{{ counter[x][y] }}</div>
                  <button class="btn-circle" type="button" v-on:click='increase(x,y)' :disabled='item.enable === 0'>
                    <i class="fas fa-plus fa-lg"></i>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </section>
        <div class="footer-space"/>
      </div>

      <!-- FOOTER -->
      <!--
      <footer class='footer'>
        <div class="container">
          <div class="columns">
            <div class="summary">
              <div class='summary-total'>฿{{ total.toFixed(2) }}</div>
              <button class='submit-order'  v-on:click='send_message()' :disabled='total === 0'>Submit Order</button>
            </div>
          </div>
        </div>
      </footer>
      -->
      <footer class="footer">
        <div class="content has-text-centered">
          <div class="summary container">
            <div class='summary-total'>฿{{ total.toFixed(2) }}</div>
            <router-link :to="{ name: 'address' }">
              <button class="submit-order" v-on:click='saveData()' :disabled="total === 0">Checkout</button>
            </router-link>
            <!-- <button class='submit-order'  v-on:click='send_message()' :disabled='total === 0'>Submit Order</button> -->
          </div>
        </div>
      </footer>
    </div>

    <!-- NOT FOUND VIEW -->
    <div v-else>
      <page-not-found></page-not-found>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { sendMessage } from '../assets/js/sendMessage.js'
const API_URL = 'https://asia-east2-order-with-local.cloudfunctions.net/shop/'
import store from "../store/store";
import Vuex from "vuex";
global.vuex = Vuex;

export default {
  store,
  data () {
    return {
      counter: [],
      total: 0,
      status: 0,
      shop_name: '',
      is_visible_image: true,
      categories: '',
      payment: '',
      delivery_fee: ''
    }
  },
  created () {
    this.$http.get(API_URL + this.$route.query.shop)
      .then(response => {
        this.status = response.data.status.code
        if (response.data.status.code === 200) {
          this.shop_name = response.data.data.shop.name
          document.title = this.shop_name
          this.categories = response.data.data.categories
          this.payment = response.data.data.payment ? response.data.data.payment : []
          this.delivery_fee = response.data.data.delivery_fee ? response.data.data.delivery_fee : []
          this.categories.forEach(category => {
            var l = []
            category.menus.forEach(menu => {
              l.push(0)
            })
            this.counter.push(l)
          })
        } else {
          this.shop_name = '404 - The Shop can\'t be found'
          document.title = this.shop_name
        }
      }, () => {
        this.status = 500
        this.shop_name = '500 - Internal Server Error'
        document.title = this.shop_name
      })
  },
  methods: {
    trimSpace: function (str) {
      if (str) {
        return str.toLowerCase().trim()
      }
      return str
    },
    whiteSpace: function (str) {
      if (str) {
        return str.toLowerCase().trim().split(' ').join('-')
      }
      return str
    },
    addTodo: function() {
      store.commit("addText", this.textname);
      console.log(store.state.todos);
    },
    addNum: function() {
      store.commit("addNum", 1);
    },
    saveData: function () {
      // store.commit("addName", [
      //   this.categories, 
      //   this.counter, 
      //   this.shop_name, 
      //   this.payment, 
      //   this.delivery_fee
      // ])
      store.commit('setCategories', this.categories)
      store.commit('setCounter', this.counter)
      store.commit('setShopName', this.shop_name)
      store.commit('setPayment', this.payment)
      store.commit('setDeliveryFee', this.delivery_fee)
    },
    increase: function (x, y) {
      if (this.categories[x].menus[y].enable !== '0') {
        this.total = 0
        this.counter[x][y] += 1
        for (let x = 0; x < this.counter.length; x++) {
          for (let y = 0; y < this.counter[x].length; y++) {
            this.total += this.categories[x].menus[y].price * this.counter[x][y]
          }
        }
      }
    },
    decrease: function (x, y) {
      if (this.counter[x][y] > 0) {
        this.total = 0
        this.counter[x][y] -= 1
        for (let x = 0; x < this.counter.length; x++) {
          for (let y = 0; y < this.counter[x].length; y++) {
            this.total += this.categories[x].menus[y].price * this.counter[x][y]
          }
        }
      }
    },
    send_message: function () {
      // Variable
      var fee = 0
      this.delivery_fee.sort(this.compareValues('total', 'desc'))
      for (var i = 0; i < this.delivery_fee.length; ++i) {
        const range = this.delivery_fee[i]
        if (this.total >= range.total) {
          fee = range.fee
          break
        }
      }

      sendMessage(this.liff, this.counter, this.total, this.categories, this.shop_name, fee)
    },
    compareValues: function (key, order = 'asc') {
      return function innerSort (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0
        }

        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        )
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/home.css';

/* MEDIA QUERY */
@media only screen and (max-width: 600px) {
  .navbar {
    padding-left: 16px;
    padding-right: 16px;
  }
  .summary {
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* SAFE AREA MOBILE */
@supports (padding-top: constant(safe-area-inset-top)) {
  .selector {
    --safe-area-inset-top: constant(safe-area-inset-top);
    height: calc(100% + var(--safe-area-inset-top));
  }
}
@supports (padding-top: env(safe-area-inset-top)) {
  .selector {
    --safe-area-inset-top: env(safe-area-inset-top);
    height: calc(100% + var(--safe-area-inset-top));
  }
}
</style>
