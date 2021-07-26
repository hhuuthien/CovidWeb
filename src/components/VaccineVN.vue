<template>
  <div id="vv_container">
    <p id="vv-title">Việt Nam</p>
    <div class="columns">
      <div class="column">
        <div class="card cv-1">
          <div class="card-content">
            <p class="card-title">Tổng số người đã tiêm</p>
            <p class="card-data">{{ people_num }}</p>
            <p class="card-subdata">({{ people_percent }}% dân số Việt Nam)</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv-2">
          <div class="card-content">
            <p class="card-title">Tổng số mũi đã tiêm</p>
            <p class="card-data">{{ vaccine }}</p>
            <p class="card-subdata">(tất cả các loại vaccine)</p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="card cv-1">
          <div class="card-content">
            <p class="card-title">Số người tiêm đủ liều</p>
            <p class="card-data">{{ people1 }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv-2">
          <div class="card-content">
            <p class="card-title">Số người tiêm chưa đủ liều</p>
            <p class="card-data">{{ people2 }}</p>
          </div>
        </div>
      </div>
    </div>

    <p id="info-titlee">Thống kê theo tỉnh/thành</p>
    <div class="table-container9">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Tỉnh/thành</th>
            <th>Số người tiêm 1 liều ↓</th>
            <th>Số người tiêm 2 liều</th>
          </tr>
        </thead>
        <tbody id="tbody9"></tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { ref } from "vue";
import { getMyTime } from "../js/func";

export default {
  name: "VaccineVN",
  setup(props, context) {
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

    const vn_pop = 97338583;
    const people_percent = ref(0);
    const people_num = ref(0);
    const vaccine = ref(0);
    const people1 = ref(0);
    const people2 = ref(0);

    firebase
      .database()
      .ref()
      .child("vaccine")
      .child("vietnam")
      .get()
      .then((snapshot) => {
        let data = snapshot.val();

        let todayString = getMyTime("/");

        let todayObject;
        data.forEach((day) => {
          if (day["Ngày"] === todayString) {
            todayObject = day;
            return;
          }
        });

        people_num.value = todayObject[
          "Tổng số người đã tiêm"
        ].toLocaleString();
        people_percent.value = (
          (todayObject["Tổng số người đã tiêm"] / vn_pop) *
          100
        ).toFixed(2);
        vaccine.value = todayObject["Tổng số mũi đã tiêm"].toLocaleString();
        people1.value = todayObject["Số người tiêm đủ mũi"].toLocaleString();
        people2.value = todayObject[
          "Số người tiêm chưa đủ mũi"
        ].toLocaleString();
      })
      .catch((error) => {
        console.error(error);
      });

    firebase
      .database()
      .ref()
      .child("vaccine")
      .child("province")
      .get()
      .then((snapshot) => {
        let data = snapshot.val();

        function c(a, b) {
          if (a["Số người tiêm liều 1"] > b["Số người tiêm liều 1"]) return -1;
          else if (a["Số người tiêm liều 1"] < b["Số người tiêm liều 1"])
            return 1;
          else return 0;
        }

        let data2 = data.sort(c);

        let string = "";
        data2.forEach((province) => {
          let pop = province["Tổng số dân"];
          let l1 = province["Số người tiêm liều 1"];
          let l1p = ((l1 / pop) * 100).toFixed(2) + "%";
          let l2, l2p;
          if (
            province["Số người tiêm liều 2"] === 0 ||
            province["Số người tiêm liều 2"] === ""
          ) {
            l2 = "";
            l2p = "";
          } else {
            l2 = province["Số người tiêm liều 2"];
            l2p = ((l2 / pop) * 100).toFixed(2) + "%";
          }

          string =
            string +
            "<tr><td>" +
            province.fK +
            "</td><td><strong>" +
            l1.toLocaleString() +
            `</strong><br><p class="sp">` +
            l1p +
            "</p></td><td><strong>" +
            l2.toLocaleString() +
            `</strong><br><p class="sp">` +
            l2p +
            "</p></td></tr>";
        });
        document.getElementById("tbody9").innerHTML = string;

        context.emit("loaded", "loaded");
      })
      .catch((error) => {
        console.error(error);
      });

    return {
      people_percent,
      people_num,
      vaccine,
      people1,
      people2,
    };
  },
};
</script>

<style>
#vv_container {
  padding: 24px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(182, 182, 182);
  border-radius: 10px;
}

#vv-title {
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0 0 10px 0;
}

.columns {
  margin: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-data {
  font-weight: bold;
  font-size: 1.4rem;
}

.card-subdata {
  font-size: 0.8rem;
}

.cv-1 {
  color: rgb(0, 10, 97);
  background-color: rgba(0, 14, 145, 0.1);
}

.cv-2 {
  color: rgb(0, 85, 33);
  background-color: rgba(0, 131, 50, 0.1);
}

.cv-1:hover {
  color: rgb(0, 10, 97);
  background-color: rgba(0, 14, 145, 0.3);
  transition: 0.7s;
}

.cv-2:hover {
  color: rgb(0, 85, 33);
  background-color: rgba(0, 131, 50, 0.3);
  transition: 0.7s;
}

.table-container9 {
  margin-top: 10px;
  max-height: 600px;
  overflow-y: scroll;
}

#info-titlee {
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0 0 10px 0;
  margin-top: 30px;
}

.sp {
  font-size: 0.7rem;
}
</style>
