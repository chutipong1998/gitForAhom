<template>
  <div>
    <!-- LOADING VIEW -->
    <!-- <div v-if='status === 0'>
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
    </div>-->

    <!-- CONTENT VIEW -->
    <div>
      <!-- CONTENT -->
      <div class="container menu" style="padding-top: 5%">
        <h1 class="text-align-left title">Order Summary</h1>
        <table>
          <!-- <template v-for="(indexCategory) in Array(counter.length).keys()" >
            <div v-for="(indexItem) in Array(counter[indexCategory].length).keys()"
            :key="categories[indexCategory].name + categories[indexCategory].menus[indexItem] + indexItem">
              <tr v-if="counter[indexCategory][indexItem]>0">
              <th valign="top" width='100%'>
              <h2 class="menu-name">{{ categories[indexCategory].menus[indexItem].name }}</h2>
              <section class="menu-buyer">
                <div class="menu-buyer-price">
                  <h3>฿{{ categories[indexCategory].menus[indexItem].price }}</h3>
                </div>
                <div class="stepper menu-buyer-quantity">
                  <button
                    class="btn-circle"
                    type="button"
                    v-on:click="decrease(indexCategory,indexItem)"
                    :disabled="counter[indexCategory][indexItem] == 1"
                  >
                    <i class="fas fa-minus fa-lg"></i>
                  </button>
                  <div class="number">{{ counter[indexCategory][indexItem] }}</div>
                  <button
                    class="btn-circle"
                    type="button"
                    v-on:click="increase(indexCategory,indexItem)"
                  >
                    <i class="fas fa-plus fa-lg"></i>
                  </button>
                </div>
                <div
                  class="stepper menu-buyer-quantity"
                >
                  <button
                    class="btn-circle"
                    type="button"
                    v-on:click="deleteMenu(indexCategory,indexItem)"
                  >
                    <i class="fas fa-trash fa-lg"></i>
                  </button>
                </div>
              </section>
            </th>
            </tr>
            </div>
          </template> -->
          <template v-for="(indexCategory) in Array(counter.length).keys()">
            <div v-for="(indexItem) in Array(counter[indexCategory].length).keys()"
            :key="categories[indexCategory].name + categories[indexCategory].menus[indexItem] + indexItem">
            <tr v-if="counter[indexCategory][indexItem] > 0">
            <!-- <th v-show="is_visible_image" class="menu-img">
                <template v-if="item.image_url.trim() !== ''"><img class='img-item' :src='item.image_url'/></template>
                <template v-else><img class='img-item' :src='"@/assets/images/placeholder_image.png"'/></template>
            </th>-->
            <th class="menu-detail" valign="top" width="100%">
              <h2 class="menu-name">{{ categories[indexCategory].menus[indexItem].name }}</h2>
              <section class="menu-buyer">
                <div class="menu-buyer-price">
                  <h3>฿{{ categories[indexCategory].menus[indexItem].price }}</h3>
                </div>
                <div class="stepper menu-buyer-quantity">
                  <button
                    class="btn-circle"
                    type="button"
                    v-on:click="decrease(indexCategory,indexItem)"
                    :disabled="counter[indexCategory][indexItem] == 1"
                  >
                    <i class="fas fa-minus fa-lg"></i>
                  </button>
                  <div class="number">{{ counter[indexCategory][indexItem] }}</div>
                  <button class="btn-circle" type="button" v-on:click="increase(indexCategory,indexItem)">
                    <i class="fas fa-plus fa-lg"></i>
                  </button>
                </div>
                <div class="stepper menu-buyer-quantity" style="padding-left: 30%">
                  <button class="btn-circle" type="button" v-on:click="deleteMenu(indexCategory,indexItem)">
                    <i class="fas fa-trash fa-lg"></i>
                  </button>
                </div>
              </section>
            </th>
          </tr>
          </div>
        </template>
          <!-- <tr v-if="counter[indexCategory][indexItem] > 0"> -->
            <!-- <th v-show="is_visible_image" class="menu-img">
                <template v-if="item.image_url.trim() !== ''"><img class='img-item' :src='item.image_url'/></template>
                <template v-else><img class='img-item' :src='"@/assets/images/placeholder_image.png"'/></template>
            </th>-->
            <!-- <th class="menu-detail" valign="top" width="100%">
              <h2 class="menu-name">{{ item.name }}</h2>
              <section class="menu-buyer">
                <div class="menu-buyer-price">
                  <h3>฿{{ item.price }}</h3>
                </div>
                <div class="stepper menu-buyer-quantity">
                  <button
                    class="btn-circle"
                    type="button"
                    v-on:click="decrease(index)"
                    :disabled="item.amount == 0"
                  >
                    <i class="fas fa-minus fa-lg"></i>
                  </button>
                  <div class="number">{{ item.amount }}</div>
                  <button class="btn-circle" type="button" v-on:click="increase(index)">
                    <i class="fas fa-plus fa-lg"></i>
                  </button>
                </div>
                <div class="stepper menu-buyer-quantity" style="padding-left: 30%">
                  <button class="btn-circle" type="button" v-on:click="deleteMenu(index)">
                    <i class="fas fa-trash fa-lg"></i>
                  </button>
                </div>
              </section>
            </th>
          </tr> -->
        </table>
        <br>
        <span>
          <p style="text-align:left">
            หมายเหตุ
            <br />
          </p>
          <p style="text-align:left">คุณสามารถใส่ข้อมูลเพิ่มเติมได้ที่นี่</p>
        </span>
        <textarea
          class="textarea"
          v-model="note"
          placeholder="สิ่งที่คุณต้องการเพิ่มเติม"
          rows="5"
        ></textarea>
        <div style="text-align: left;">
          <button class="btn" type="button" v-on:click="goBack()">
            <i class="fas fa-chevron-left fa-lg"></i> back
          </button>
        </div>
        <div class="footer-space"></div>
      </div>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="container">
          <div class="summary">
            <div class="summary-total">฿{{ total.toFixed(2) }}</div>
            <button
              class="submit-order"
              v-on:click="send_message()"
              :disabled="total === 0"
            >Submit Order</button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import { SendMessages } from '../assets/js/sendMessage'
export default {
  data() {
    return {
      note: '',
      counter : '',
      total: 0,
      categories: '',
      payment: '',
      delivery_fee: ''
    };
  },
  created() {
    this.counter = store.state.counter
    this.categories = store.state.categories
    this.payment = store.state.payment
    this.delivery_fee = store.state.delivery_fee
    console.log(store.state);
    this.total = 0
    for (let x = 0; x < this.counter.length; x++) {
      for (let y = 0; y < this.counter[x].length; y++) {
        this.total += this.categories[x].menus[y].price * this.counter[x][y]
      }
    }
    
    // console.log(this.data);
    // for (let x = 0; x < this.data.summary.length; x++) {
    //   this.total += this.data.summary[x].price * this.data.summary[x].amount;
    // }
  },
  methods: {
    whiteSpace: function(str) {
      return str
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-");
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
        store.commit('setCounter', this.counter)
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
        store.commit('setCounter', this.counter)
      }
    },
    deleteMenu: function(x,y) {
      this.counter[x][y] = 0
      this.$forceUpdate();
      this.total = 0
      for (let x = 0; x < this.counter.length; x++) {
        for (let y = 0; y < this.counter[x].length; y++) {
          this.total += this.categories[x].menus[y].price * this.counter[x][y]
        }
      }
      store.commit('setCounter', this.counter)
    },
    showMsg: function() {
      console.log(this.message);
    },
    goBack: function() {
      history.go(-1);
    },
    send_message: function () {
      // Variable
      var shipping = this.delivery_fee === [] ? 0 : ''
      this.delivery_fee.forEach(level => {
        if (level.condition.trim() === '>') {
          if (shipping === '') {
            shipping = Number.MAX_VALUE
          }
          if (this.total >= level.total) {
            if (level.fee < shipping) {
              shipping = Number(level.fee.trim())
            }
          }
        } else {
          if (this.total < level.total) {
            if (shipping === '') {
              shipping = 0
            }
            if (level.fee > shipping) {
              shipping = Number(level.fee.trim())
            }
          }
        }
      })
      shipping = shipping === '' ? 0 : shipping
      // sendMessage(this.liff, this.counter, this.total, this.categories, this.shop_name, shipping, this.payment, this.note)
    }
  }
};
</script>

<style scoped>
.btn {
  background: white;
  border: none;
}
textarea {
  resize: none;
  width: 100%;
}
</style>

<style scoped>
@import "../assets/css/home.css";

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
  .textarea {
    padding: 1%;
    border-radius: 10px;
    resize: none;
    width: 98%;
    resize: none;
    /* width: 100%; */
  }
  .btn {
    background: white;
    border: none;
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
