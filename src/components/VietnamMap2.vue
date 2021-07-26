<template>
  <div id="big-container">
    <div id="map-container-m2">
      <p id="info-title-map-m2">Thống kê theo thời gian</p>
      <div class="select is-rounded is-info is-normal">
        <select id="selectType" v-on:change="selectType">
          <option selected>Số ca nhiễm mới mỗi ngày</option>
          <option>Tổng số ca nhiễm</option>
          <option>Số ca khỏi bệnh mới mỗi ngày</option>
          <option>Tổng số ca khỏi bệnh</option>
          <option>Số ca tử vong mới mỗi ngày</option>
          <option>Tổng số ca tử vong</option>
        </select>
      </div>
      <div class="select is-rounded is-info is-normal">
        <select id="selectTypeTime" v-on:change="selectType">
          <option selected>7 ngày qua</option>
          <option>30 ngày qua</option>
          <option>Từ đầu năm 2020</option>
        </select>
      </div>
      <div id="chart-m2"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import {
  object_To_Array_2_For_VietnamMap2,
  drawChart,
  getMyTime2,
} from "../js/func.js";

export default {
  name: "VietnamMap2",
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

    let dataGlobal;

    const dbRef = firebase.database().ref();
    dbRef
      .child("vietnam")
      .child("json2")
      .get()
      .then((snapshot) => {
        dataGlobal = snapshot.val();

        let object;
        snapshot.val().forEach((element) => {
          if (element["NGÀY"] === "new_cases") {
            object = element;
          }
        });

        let array = object_To_Array_2_For_VietnamMap2(object).sort((a, b) =>
          a.myVal.localeCompare(b.myVal)
        );

        let today = getMyTime2();
        let todayVal = (
          (today.getMonth() + 1) * 31 +
          today.getDate()
        ).toString();

        let arrayToChart = new Array();
        let arrayDay = new Array();
        array.forEach((element) => {
          if (element.myVal <= todayVal) {
            arrayToChart.push(element.val);
            arrayDay.push(element.day);
          }
        });

        drawChart(
          "chart-m2",
          "Số ca nhiễm mới mỗi ngày",
          arrayToChart.slice(arrayToChart.length - 7),
          arrayDay.slice(arrayDay.length - 7),
          "#000d81"
        );
      })
      .catch((error) => {
        console.error(error);
      });

    const selectType = () => {
      let type = document.getElementById("selectType").selectedIndex;
      let type2 = document.getElementById("selectTypeTime").selectedIndex;

      let textType;
      let seriesName;
      let extraValue;
      let color;
      switch (type) {
        case 0:
          textType = "new_cases";
          seriesName = "Số ca nhiễm mới mỗi ngày";
          extraValue = 0;
          color = "#000d81";
          break;
        case 1:
          textType = "total_cases_2020";
          seriesName = "Tổng số ca nhiễm (từ đầu năm 2020)";
          extraValue = 56;
          color = "#000d81";
          break;
        case 2:
          textType = "new_recovered";
          seriesName = "Số ca khỏi bệnh mới mỗi ngày";
          extraValue = 0;
          color = "#008132";
          break;
        case 3:
          textType = "total_recovered_2020";
          seriesName = "Tổng số ca khỏi bệnh (từ đầu năm 2020)";
          extraValue = 4;
          color = "#008132";
          break;
        case 4:
          textType = "new_deaths";
          seriesName = "Số ca tử vong mới mỗi ngày";
          extraValue = 0;
          color = "#990000";
          break;
        case 5:
          textType = "total_deaths_2020";
          seriesName = "Tổng số ca tử vong (từ đầu năm 2020)";
          extraValue = 0;
          color = "#990000";
          break;
      }

      let object;
      dataGlobal.forEach((element) => {
        if (element["NGÀY"] === textType) {
          object = element;
        }
      });

      let array = object_To_Array_2_For_VietnamMap2(object).sort((a, b) =>
        a.myVal.localeCompare(b.myVal)
      );

      let today = getMyTime2();
      let todayVal = ((today.getMonth() + 1) * 31 + today.getDate()).toString();

      let arrayToChart = new Array();
      let arrayDay = new Array();
      array.forEach((element) => {
        if (element.myVal <= todayVal) {
          arrayToChart.push(element.val + extraValue);
          arrayDay.push(element.day);
        }
      });

      switch (type2) {
        case 0:
          {
            drawChart(
              "chart-m2",
              seriesName,
              arrayToChart.slice(arrayToChart.length - 7),
              arrayDay.slice(arrayToChart.length - 7),
              color
            );
          }
          break;
        case 1:
          {
            drawChart(
              "chart-m2",
              seriesName,
              arrayToChart.slice(arrayToChart.length - 30),
              arrayDay.slice(arrayToChart.length - 30),
              color
            );
          }
          break;
        case 2:
          {
            drawChart("chart-m2", seriesName, arrayToChart, arrayDay, color);
          }
          break;
      }
    };

    return { selectType };
  },
};
</script>

<style scoped>
#big-container {
  width: 95%;
  margin: auto;
}

#map-container-m2 {
  margin: 12px;
  padding: 24px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(182, 182, 182);
  border-radius: 10px;
}

#info-title-map-m2 {
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0 0 10px 0;
}

.select {
  margin: 0 0 10px 10px;
}
</style>
