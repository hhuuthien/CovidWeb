<template>
  <div id="table-container2">
    <div id="flex-div">
      <p id="info-title2">Thống kê theo quốc gia</p>
      <div id="input-div">
        <input
          id="inputSearch"
          type="text"
          v-model="value"
          autocomplete="off"
          class="input is-info is-rounded"
          placeholder="Tìm kiếm"
        />
      </div>
    </div>
    <p id="info2">Dữ liệu có thể cập nhật chậm hơn thực tế</p>
    <p id="info3">
      Một số quốc gia/vùng lãnh thổ không công bố số ca khỏi bệnh
    </p>
    <div class="table-container">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead id="thead_small">
          <tr>
            <th>Quốc gia</th>
            <th id="newCaseCol">Mới</th>
            <th id="caseCol">Số ca mắc</th>
            <th id="recoverCol">Số ca khỏi</th>
            <th id="newDeathCol">Mới</th>
            <th id="deathCol">Số ca tử vong</th>
          </tr>
        </thead>
        <tbody id="tbody2"></tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

let dataMain = new Array();

export default {
  name: "WorldList",
  data() {
    return {
      value: "",
    };
  },
  watch: {
    value: function(newValue) {
      let filterArray = [];
      dataMain.forEach((country) => {
        if (country.country_vn.startsWith(newValue)) {
          filterArray.push(country);
        }
      });

      let worldString = "";
      filterArray.forEach((element) => {
        let q = element.country_vn;
        let total = element.total_cases.replaceAll(".", ",");
        let newT = element.new_cases.replaceAll(".", ",");
        let death = element.total_deaths.replaceAll(".", ",");
        let newD = element.new_deaths.replaceAll(".", ",");
        let recover = element.total_recovered.replaceAll(".", ",");
        worldString =
          worldString +
          "<tr><td>" +
          q +
          "</td>" +
          "<td id='newCaseCol'>" +
          newT +
          "</td>" +
          "<td id='caseCol'>" +
          total +
          "</td>" +
          "<td id='recoverCol'>" +
          recover +
          "</td>" +
          "<td id='newDeathCol'>" +
          newD +
          "</td>" +
          "<td id='deathCol'>" +
          death +
          "</td>" +
          "</td></tr>";
      });
      document.getElementById("tbody2").innerHTML = worldString;
    },
  },
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

    firebase
      .database()
      .ref()
      .child("world")
      .get()
      .then((snapshot) => {
        let response = snapshot.val();
        let data = response.data.data[0].table_country;

        function compare(a, b) {
          if (
            parseFloat(a.total_cases.replaceAll(".", "")) <
            parseFloat(b.total_cases.replaceAll(".", ""))
          ) {
            return 1;
          }
          if (
            parseFloat(a.total_cases.replaceAll(".", "")) >
            parseFloat(b.total_cases.replaceAll(".", ""))
          ) {
            return -1;
          }
          return 0;
        }

        let dataSort = data.sort(compare);

        let dataFilter = new Array();
        dataSort.forEach((country) => {
          if (
            country.country_vn !== "Châu Á" &&
            country.country_vn !== "Châu Âu" &&
            country.country_vn !== "Bắc Mỹ" &&
            country.country_vn !== "Nam Mỹ" &&
            country.country_vn !== "Châu Phi"
          ) {
            dataFilter.push(country);
          }
        });

        //send to global
        dataMain = dataFilter;

        let worldString = "";
        dataFilter.forEach((element) => {
          let q = element.country_vn;
          let total = element.total_cases.replaceAll(".", ",");
          let newT = element.new_cases.replaceAll(".", ",");
          let death = element.total_deaths.replaceAll(".", ",");
          let newD = element.new_deaths.replaceAll(".", ",");
          let recover = element.total_recovered.replaceAll(".", ",");
          worldString =
            worldString +
            "<tr><td>" +
            q +
            "</td>" +
            "<td id='newCaseCol'>" +
            newT +
            "</td>" +
            "<td id='caseCol'>" +
            total +
            "</td>" +
            "<td id='recoverCol'>" +
            recover +
            "</td>" +
            "<td id='newDeathCol'>" +
            newD +
            "</td>" +
            "<td id='deathCol'>" +
            death +
            "</td>" +
            "</td></tr>";
        });
        document.getElementById("tbody2").innerHTML = worldString;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
#table-container2 {
  width: 95%;
  margin: auto;
  padding: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(182, 182, 182);
  border-radius: 10px;
}

.table-container {
  max-height: 500px;
  overflow: scroll;
}

#info-title2 {
  font-weight: bold;
  font-size: 1.3rem;
}

#flex-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
}

#input-div {
  width: 20%;
}

#info2 {
  font-size: 0.8rem;
}

#info3 {
  padding-bottom: 15px;
  font-size: 0.8rem;
}

/* #thead_small tr th,
#tbody2 tr td {
  font-size: 0.7rem;
} */

#newCaseCol,
#caseCol {
  color: rgb(0, 13, 129);
}

#newDeathCol,
#deathCol {
  color: rgb(153, 0, 0);
}

#recoverCol {
  color: rgb(0, 129, 50);
}
</style>
