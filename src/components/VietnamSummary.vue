<template>
  <div id="covid_main">
    <div id="title_row">
      <p id="title">Hôm nay</p>
      <picker />
    </div>
    <div class="columns">
      <div class="column">
        <my-card
          :cardTitle="cardTitle1"
          :cardData="total"
          :cardSubdata="newtotal"
          :cardStyle="1"
        />
      </div>
      <div class="column">
        <my-card
          :cardTitle="cardTitle2"
          :cardData="recover"
          :cardSubdata="newrecover"
          :cardStyle="2"
        />
      </div>
      <div class="column">
        <my-card
          :cardTitle="cardTitle3"
          :cardData="death"
          :cardSubdata="newdeath"
          :cardStyle="3"
        />
      </div>
    </div>

    <p id="summary_info">
      Ngày {{ p2 }}, Việt Nam ghi nhận thêm {{ p3 }} ca nhiễm mới, trong đó
      {{ p4 }} ca trong nước ghi nhận tại {{ p5 }} tỉnh thành ({{ p6 }} ca trong
      cộng đồng, {{ p7 }} ca ở khu cách ly hoặc khu đã được phong tỏa),
      {{ p8 }} ca nhập cảnh. Cùng ngày, Bộ Y tế công bố {{ p9 }} người khỏi bệnh
      và {{ p10 }} người tử vong.
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase/app";
import "firebase/database";
import { getConfig, getMyTime } from "../js/func";
import MyCard from "./MyCard.vue";
import Picker from "./Picker.vue";

export default {
  name: "VietnamSummary",
  components: { MyCard, Picker },
  data() {
    return {
      cardTitle1: "Tổng số ca mắc",
      cardTitle2: "Số ca khỏi",
      cardTitle3: "Số ca tử vong",
    };
  },
  setup() {
    if (!firebase.apps.length) {
      firebase.initializeApp(getConfig());
    } else {
      firebase.app();
    }

    const total = ref(0);
    const newtotal = ref(0);
    const recover = ref(0);
    const newrecover = ref(0);
    const death = ref(0);
    const newdeath = ref(0);

    const p2 = ref(0);
    const p3 = ref(0);
    const p4 = ref(0);
    const p5 = ref(0);
    const p6 = ref(0);
    const p7 = ref(0);
    const p8 = ref(0);
    const p9 = ref(0);
    const p10 = ref(0);

    firebase
      .database()
      .ref()
      .child("api/vietnamSummary")
      .get()
      .then((snapshot) => {
        let data = snapshot.val();
        let myTime = getMyTime("/");

        let todayData = data.filter(function(e) {
          return e.day === myTime;
        });

        total.value = (todayData[0].totalCase + 53).toLocaleString();
        recover.value = (todayData[0].totalRecover + 4).toLocaleString();
        death.value = todayData[0].totalDeath.toLocaleString();
        newtotal.value = "+ " + todayData[0].newCase.toLocaleString();
        newdeath.value = "+ " + todayData[0].newDeath.toLocaleString();
        newrecover.value = "+ " + todayData[0].newRecover.toLocaleString();

        p2.value = todayData[0].day;
        p3.value = todayData[0].newCase.toLocaleString();
        p4.value = todayData[0].inCountry.toLocaleString();
        p5.value = todayData[0].city;
        p6.value = todayData[0].community.toLocaleString();
        p7.value = todayData[0].blockade.toLocaleString();
        p8.value = todayData[0].import.toLocaleString();
        p9.value = todayData[0].newRecover.toLocaleString();
        p10.value = todayData[0].newDeath.toLocaleString();
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
      p2,
      p3,
      p4,
      p5,
      p6,
      p7,
      p8,
      p9,
      p10,
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

#summary_info {
  padding: 15px;
  text-align: justify;
}

#title_row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  margin-top: 20px;
}

#title {
  font-weight: bold;
  font-size: 1.3rem;
}
</style>
