const Vue =require("vue") 
const VueRouter =require("vue-router") 

Vue.use(VueRouter)

const routes = [
    {
      path: "/",
      name: "home",
      component: Home,
    },
  ];

  const router = new VueRouter({
    mode: "history",
    routes,
  });
  
module.exports = router;