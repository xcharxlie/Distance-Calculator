import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase';

import "semantic-ui-css/semantic.min.css";



  var firebaseConfig = {
    apiKey: "AIzaSyBLv10Y3bpIJKxZHykJLeK9Gpn5VRxYO7g",
    authDomain: "majestic-trail-299219.firebaseapp.com",
    projectId: "majestic-trail-299219",
    storageBucket: "majestic-trail-299219.appspot.com",
    messagingSenderId: "589407114424",
    appId: "1:589407114424:web:b631995abb3b00855fd04d",
    measurementId: "G-2WV5C97S54"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

Vue.config.productionTip = false;




new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})


