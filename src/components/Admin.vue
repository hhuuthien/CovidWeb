<template>
  <div id="admin-main">
    <button class="button" v-on:click="confirm()">
      Get data
    </button>
    <p id="status1"></p>
    <p id="status2"></p>
    <p id="status3"></p>
    <p id="status4"></p>
    <p id="status5"></p>
    <p id="status6"></p>
    <p id="status7"></p>

    <!-- Ngày hôm qua nếu chuyển tháng: đã fix, chờ 1/8 check lại -->
    <!-- Thông tin vaccine -->
    <!-- Client is offline -->
    <!-- My own 404 page -->
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase/app";
import "firebase/database";
import csv2json from "csvjson-csv2json";
//import { hashString, hash } from "../js/func.js";

export default {
  name: "Admin",
  setup() {
    var firebaseConfig = {
      apiKey: "AIzaSyAdNpXA6W8PpSGKbsWXZB4t5gBTXKpeMho",
      authDomain: "covid-inf.firebaseapp.com",
      databaseURL: "https://covid-inf-default-rtdb.firebaseio.com",
      projectId: "covid-inf",
      storageBucket: "covid-inf.appspot.com",
      messagingSenderId: "189610331880",
      appId: "1:189610331880:web:e9eba067c39fc38ff6435d",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    const confirm = () => {
      // let pw = prompt("Nhập mật khẩu:", "");
      // if (pw == null || pw == "") {
      //   window.alert("Vui lòng nhập mật khẩu");
      // } else {
      //   if (hash(pw) === hashString()) {
      //     get();
      //   } else {
      //     window.alert("Sai mật khẩu");
      //   }
      // }
      get2();
    };

    const get1 = () => {
      const options = {
        method: "GET",
        url: "https://gw.vnexpress.net/cr/?name=world_coronavirus",
      };

      axios
        .request(options)
        .then(function(res) {
          //upload
          firebase
            .database()
            .ref("world/")
            .set(res.data)
            .then(function() {
              document.getElementById("status1").innerHTML = "Function 1 done";
            })
            .catch(function(error) {
              document.getElementById("status1").innerHTML = error.toString();
            });
        })
        .catch(function(error) {
          document.getElementById("status1").innerHTML = error.toString();
        });
    };

    const get2 = () => {
      const options = {
        method: "GET",
        url:
          "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_day",
      };

      axios
        .request(options)
        .then(function(res) {
          //csv --> json
          const myjson = csv2json(res.data.toString(), {
            parseNumbers: true,
            parseJSON: true,
          });

          let array = new Array();
          myjson.forEach((element) => {
            let data = {
              day: element["NGÀY"],
              inCountry: element["CỘNG ĐỒNG"],
              fund: element["QUỸ VACCINE (tỷ VNĐ)"],
              blockade: element.blockade,
              city: element.city_by_day,
              community: element.community,
              import: element.imported,
              newCase: element.new_cases,
              newActive: element.new_active,
              newDeath: element.new_deaths,
              newRecover: element.new_recovered,
              totalActive: element.total_active,
              totalCase: element.total_cases_2020,
              totalDeath: element.total_deaths_2020,
              totalRecover: element.total_recovered_2020,
              icu: element.ICU,
              ecmo: element.ECMO,
            };
            array.push(data);
          });

          //csv --> json (transpose)
          // const myjson2 = csv2json(valid, {
          //   parseNumbers: true,
          //   parseJSON: true,
          //   transpose: true,
          // });

          firebase
            .database()
            .ref("api/")
            .set({
              vietnamSummary: array,
            })
            .then(function() {
              document.getElementById("status2").innerHTML = "Function 2 done";
            })
            .catch(function(error) {
              document.getElementById("status2").innerHTML = error.toString();
            });
        })
        .catch(function(error) {
          document.getElementById("status2").innerHTML = error.toString();
        });
    };

    const get3 = () => {
      const options = {
        method: "GET",
        url:
          "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_total",
      };

      axios
        .request(options)
        .then(function(res) {
          //remove invalid letter
          let valid = res.data
            .toString()
            .replace(`Châu","","","",""`, `Châu","A","B","C","D"`);

          //csv --> json
          const myjson = csv2json(valid, {
            parseNumbers: true,
            parseJSON: true,
          });

          //upload
          firebase
            .database()
            .ref("vietnam_total_location/total")
            .set({
              json: myjson,
            })
            .then(function() {
              document.getElementById("status3").innerHTML = "Function 3 done";
            })
            .catch(function(error) {
              document.getElementById("status3").innerHTML = error.toString();
            });
        })
        .catch(function(error) {
          document.getElementById("status3").innerHTML = error.toString();
        });
    };

    const get4 = () => {
      const options = {
        method: "GET",
        url:
          "https://vnexpress.net/microservice/sheet/type/covid19_2021_by_location",
      };

      axios
        .request(options)
        .then(function(res) {
          //remove invalid letter
          let valid = res.data
            .toString()
            .replace(`Châu","","","","",""`, `Châu","A","B","C","D","E"`);

          //csv --> json
          const myjson = csv2json(valid, {
            parseNumbers: true,
            parseJSON: true,
          });

          //upload
          firebase
            .database()
            .ref("vietnam_total_location/location")
            .set({
              json: myjson,
            })
            .then(function() {
              document.getElementById("status4").innerHTML = "Function 4 done";
            })
            .catch(function(error) {
              document.getElementById("status4").innerHTML = error.toString();
            });
        })
        .catch(function(error) {
          document.getElementById("status4").innerHTML = error.toString();
        });
    };

    const get5 = () => {
      const options = {
        method: "GET",
        url:
          "https://vnexpress.net/microservice/sheet/type/vaccine_world_covid_19",
      };

      axios
        .request(options)
        .then(function(res) {
          //upload
          firebase
            .database()
            .ref("vaccine/world")
            .set(res.data)
            .then(function() {
              document.getElementById("status5").innerHTML = "Function 5 done";
            })
            .catch(function(error) {
              document.getElementById("status5").innerHTML = error.toString();
            });
        })
        .catch(function(error) {
          document.getElementById("status5").innerHTML = error.toString();
        });
    };

    const get6 = () => {
      const options = {
        method: "GET",
        url:
          "https://vnexpress.net/microservice/sheet/type/vaccine_data_vietnam",
      };

      axios
        .request(options)
        .then(function(res) {
          //remove invalid letter
          let valid = res.data
            .toString()
            .replace(
              `Check","","","","","","","","","","","","","","","","","","","","","","","","",""`,
              `Check"`
            );

          //csv --> json
          const myjson = csv2json(valid, {
            parseNumbers: true,
            parseJSON: true,
          });

          //upload
          firebase
            .database()
            .ref("vaccine/vietnam")
            .set(myjson)
            .then(function() {
              document.getElementById("status6").innerHTML = "Function 6 done";
            })
            .catch(function(error) {
              document.getElementById("status6").innerHTML = error.toString();
            });
        })
        .catch(function(error) {
          document.getElementById("status6").innerHTML = error.toString();
        });
    };

    const get7 = () => {
      const options = {
        method: "GET",
        url:
          "https://vnexpress.net/microservice/sheet/type/vaccine_data_vietnam_city",
      };

      axios
        .request(options)
        .then(function(res) {
          //remove invalid letter
          let valid = res.data
            .toString()
            .replace(
              `Crawl","","","","","","","","","","","","","","","",""`,
              `Crawl"`
            );

          //csv --> json
          const myjson = csv2json(valid, {
            parseNumbers: true,
            parseJSON: true,
          });

          firebase
            .database()
            .ref("vaccine/province")
            .set(myjson)
            .then(function() {
              document.getElementById("status7").innerHTML = "Function 7 done";
            })
            .catch(function(error) {
              document.getElementById("status7").innerHTML = error.toString();
            });
        })
        .catch(function(error) {
          document.getElementById("status7").innerHTML = error.toString();
        });
    };

    const get = () => {
      // get1();
      // get2();
      // get3();
      // get4();
      // get5();
      // get6();
      // get7();
    };

    return { get1, get2, get3, get4, get5, get6, get7, get, confirm };
  },
};
</script>

<style scoped>
#admin-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  margin: 100px 0 30px 0;
}

p {
  margin: 10px 50px 0 50px;
}
</style>
