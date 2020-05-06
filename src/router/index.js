/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/views/Home";
import PageNotFound from "@/views/PageNotFound";
import Summary from "@/views/Summary";
import Address from "@/views/AddAddress";
import Contact from "@/views/Contact";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "*",
      name: "PageNotFound",
      component: PageNotFound
    },
    {
      path: "/summary",
      name: "summary",
      component: Summary
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/address",
      name: "address",
      component: Address
    }
  ]
});
