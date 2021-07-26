<template>
  <div id="covid_main">
    <div class="columns">
      <div class="column">
        <div class="card cv cv-total">
          <div class="card-content">
            <p class="card-title">Tổng số ca mắc</p>
            <p class="card-data">{{ total }}</p>
            <p class="card-subdata">+ {{ newtotal }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv cv-recover">
          <div class="card-content">
            <p class="card-title">Số ca khỏi</p>
            <p class="card-data">{{ recover }}</p>
            <p class="card-subdata">+ {{ newrecover }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv cv-death">
          <div class="card-content">
            <p class="card-title">Số ca tử vong</p>
            <p class="card-data">{{ death }}</p>
            <p class="card-subdata">+ {{ newdeath }}</p>
          </div>
        </div>
      </div>
    </div>

    <p id="summary_info"></p>
    <p id="summary_info2"></p>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase/app";
import "firebase/database";
import { getMyTime, getMyTime2 } from "../js/func";

export default {
  name: "VietnamSummary",
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
      firebase.app(); // if already initialized, use that one
    }

    const total = ref(0);
    const newtotal = ref(0);
    const recover = ref(0);
    const newrecover = ref(0);
    const death = ref(0);
    const newdeath = ref(0);

    const dbRef = firebase.database().ref();
    dbRef
      .child("vietnam")
      .child("json")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          let array = snapshot.val();

          let dayText = "";
          let real_today = new Date();
          let fake_today = getMyTime2();

          if (fake_today.getDate() === real_today.getDate()) {
            dayText = "Hôm nay";
          } else {
            dayText = "Hôm qua";
          }

          let todayString = getMyTime("in");

          let todayElement = {};
          array.forEach((element) => {
            if (element["NGÀY"] === todayString) {
              todayElement = element;
              return;
            }
          });

          total.value = (todayElement.total_cases_2020 + 56).toLocaleString();
          recover.value = (
            todayElement.total_recovered_2020 + 4
          ).toLocaleString();
          death.value = todayElement.total_deaths_2020.toLocaleString();
          newtotal.value = todayElement.new_cases.toLocaleString();
          newdeath.value = todayElement.new_deaths.toLocaleString();
          newrecover.value = todayElement.new_recovered.toLocaleString();

          document.getElementById(
            "summary_info"
          ).innerHTML = `${dayText} <strong>${todayString.replace(
            "in",
            "/"
          )}</strong>, Việt Nam ghi nhận thêm <strong>${todayElement.new_cases.toLocaleString()}</strong> ca nhiễm mới, trong đó <strong>${todayElement[
            "CỘNG ĐỒNG"
          ].toLocaleString()}</strong> ca trong nước ghi nhận tại <strong>${
            todayElement.city_by_day
          }</strong> tỉnh thành (<strong>${todayElement.community.toLocaleString()}</strong> ca trong cộng đồng, <strong>${todayElement.blockade.toLocaleString()}</strong> ca ở khu cách ly hoặc khu đã được phong tỏa), <strong>${todayElement.imported.toLocaleString()}</strong> ca nhập cảnh.`;
          document.getElementById(
            "summary_info2"
          ).innerHTML = `Cùng ngày, Bộ Y tế công bố <strong>${todayElement.new_recovered.toLocaleString()}</strong> người khỏi bệnh và <strong>${
            todayElement.new_deaths
          }</strong> người tử vong.`;
        } else {
          console.error("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return {
      total,
      newtotal,
      recover,
      newrecover,
      death,
      newdeath,
    };
  },
};
</script>

<style scoped>
#covid_main {
  width: 90%;
  margin: auto;
}

.columns {
  margin: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cv-total {
  color: rgb(0, 11, 112);
  background-color: rgba(0, 11, 112, 0.1);
}

.cv-total:hover {
  color: rgb(0, 11, 112);
  background-color: rgba(0, 11, 112, 0.3);
  transition: 0.7s;
}

.cv-recover {
  color: rgb(0, 109, 42);
  background-color: rgb(0, 109, 42, 0.1);
}

.cv-recover:hover {
  color: rgb(0, 109, 42);
  background-color: rgb(0, 109, 42, 0.3);
  transition: 0.7s;
}

.cv-death {
  color: rgb(131, 0, 0);
  background-color: rgb(131, 0, 0, 0.1);
}

.cv-death:hover {
  color: rgb(131, 0, 0);
  background-color: rgb(131, 0, 0, 0.3);
  transition: 0.7s;
}

.card-data {
  font-weight: bold;
  font-size: 1.4rem;
}

.card-subdata {
  font-size: 0.8rem;
}

#summary_info {
  padding: 15px;
}

#summary_info2 {
  padding: 0px 15px 15px 15px;
}
</style>
