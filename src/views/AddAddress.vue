<template>
  <div class="page">
    <div>
      <!-- CONTENT -->
      <div class="container menu" style="padding-top: 5%">
        <div>
          <h1>เพิ่มที่อยู่</h1>
          <br />
          <div>
            <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                @click="center=m.position"
              ></gmap-marker>
            </gmap-map>
          </div>
          <br />
          <span>
            <p style="text-align:left">
              ชื่อ-นามสกุล
              <br />
            </p>
          </span>
          <textarea
            class="textarea"
            v-model="sname"
            placeholder="สิ่งที่คุณต้องการเพิ่มเติม"
            rows="1"
          ></textarea>
          <br />
          <span>
            <p style="text-align:left">
              เบอร์โทรศัพท์
              <br />
            </p>
          </span>
          <textarea
            class="textarea"
            v-model="message"
            placeholder="สิ่งที่คุณต้องการเพิ่มเติม"
            rows="1"
          ></textarea>
          <br />
          <span>
            <p style="text-align:left">
              ที่อยู่
              <br />
            </p>
          </span>
          <textarea
            class="textarea"
            v-model="addr"
            placeholder="สิ่งที่คุณต้องการเพิ่มเติม"
            rows="2"
          ></textarea>
          <br />
        </div>
        <div class="footer-space" />
      </div>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="content has-text-centered">
          <div class="summary container">
            <router-link :to="{ name: 'summary' }">
              <button class="submit-order">Submit Address</button>
            </router-link>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      sname: '',
      addr: '',
      message: ''
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>



<style>
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