<template>
  <div id="table-container">
    <div id="table-info">
      <p id="info-title-vn">Chi tiết các tỉnh/thành</p>
      <p id="provinceSafe"></p>
      <p id="provinceNoCase"></p>
    </div>

    <div id="flex-radio">
      <label class="radio">
        <input
          type="radio"
          checked="true"
          name="sort"
          v-model="sort"
          value="0"
        />
        Xếp theo số ca mới hôm nay
      </label>
      <label class="radio">
        <input type="radio" name="sort" v-model="sort" value="1" />
        Xếp theo tổng số ca mắc
      </label>
    </div>

    <div class="table-container">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Tỉnh/thành</th>
            <th>Số ca mới hôm nay</th>
            <th>Tổng số ca mắc</th>
          </tr>
        </thead>
        <tbody id="tbody3"></tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import {
  object_To_Array,
  mergeArray,
  intersectionArrayELement,
  getAllProvince,
  getMyTime,
} from "../js/func.js";

let arrGlobal = new Array();

function compare1(a, b) {
  if (a.total < b.total) {
    return 1;
  }
  if (a.total > b.total) {
    return -1;
  }
  return 0;
}

function compare2(a, b) {
  if (a.new < b.new) {
    return 1;
  }
  if (a.new > b.new) {
    return -1;
  }
  return 0;
}

export default {
  name: "VietnamDetail",
  data() {
    return {
      sort: "",
    };
  },
  watch: {
    sort: function(newValue) {
      if (newValue === "0") {
        //sort by new case
        arrGlobal.sort(compare2);
      } else if (newValue === "1") {
        //sort by total case
        arrGlobal.sort(compare1);
      }

      let str = "";
      arrGlobal.forEach((element) => {
        str =
          str +
          "<tr><td>" +
          element.province +
          "</td><td>+ " +
          (element.new === "" ? "0" : element.new.toLocaleString()) +
          "</td><td>" +
          element.total.toLocaleString() +
          "</td></tr>";
      });
      document.getElementById("tbody3").innerHTML = str;
    },
  },
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
      firebase.app(); // if already initialized, use that one
    }

    let todayString = getMyTime("/");

    const dbRef = firebase.database().ref();
    dbRef
      .child("vietnam_total_location")
      .get()
      .then((snapshot) => {
        let todayElement1 = {};
        let arr1 = snapshot.val().total.json;
        arr1.forEach((element) => {
          if (element["Ngày"] === todayString) {
            todayElement1 = element;
            return;
          }
        });
        let array1 = object_To_Array(todayElement1);

        let todayElement2 = {};
        let indexOfTodayElement;
        let arr2 = snapshot.val().location.json;
        arr2.forEach((element) => {
          if (element["Ngày"] === todayString) {
            todayElement2 = element;
            indexOfTodayElement = arr2.indexOf(element);
            return;
          }
        });
        let array2 = object_To_Array(todayElement2);

        let array = mergeArray(array1, array2);
        //save to global
        arrGlobal = array;

        array.sort(compare2);

        let str = "";
        array.forEach((element) => {
          str =
            str +
            "<tr><td>" +
            element.province +
            "</td><td>+ " +
            (element.new === "" ? "0" : element.new.toLocaleString()) +
            "</td><td>" +
            element.total.toLocaleString() +
            "</td></tr>";
        });
        document.getElementById("tbody3").innerHTML = str;

        //arr2 (API location) -> 14 days without new cases
        let arrProvinceNoCase14Days = new Array();
        for (let i = indexOfTodayElement - 13; i <= indexOfTodayElement; i++) {
          let arrDay = object_To_Array(arr2[i]);
          let provinceNoCaseInOneDay = new Array();
          arrDay.forEach((element) => {
            if (element.val === "" && element.province.length > 1)
              provinceNoCaseInOneDay.push(element.province);
          });
          arrProvinceNoCase14Days.push(provinceNoCaseInOneDay);
        }
        let nocase14day = intersectionArrayELement(arrProvinceNoCase14Days);
        let st = `Có <strong>${nocase14day.length}</strong> tỉnh/thành đã qua 14 ngày không ghi nhận ca nhiễm mới, gồm: `;
        nocase14day.forEach((element) => {
          st = st + element + ", ";
        });
        document.getElementById("provinceNoCase").innerHTML =
          st.substring(0, st.length - 2) + ".";

        //arr2 (API location) -> safe Province
        let unsafe = new Array();
        array2.forEach((element) => {
          unsafe.push(element.province);
        });
        let all = getAllProvince();
        let safe = new Array();
        all.forEach((element) => {
          if (!unsafe.includes(element)) safe.push(element);
        });
        let st2 = `Có <strong>${safe.length}</strong> tỉnh/thành không ghi nhận ca nhiễm trong đợt dịch này, gồm: `;
        safe.forEach((element) => {
          st2 = st2 + element + ", ";
        });
        document.getElementById("provinceSafe").innerHTML =
          st2.substring(0, st2.length - 2) + ".";

        //emit to Vietnam.vue
        context.emit("loaded", "loaded");
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
#table-container {
  padding: 24px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(182, 182, 182);
  border-radius: 10px;
}

.table-container {
  height: 485px;
  overflow-y: scroll;
}

#info-title-vn {
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0 0 10px 0;
}

#provinceNoCase {
  padding-bottom: 15px;
}

#provinceSafe {
  padding: 0 0 10px 0;
}

#flex-radio {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 10px 20px 0px;
}
</style>
