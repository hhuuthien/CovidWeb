<template>
  <button
    class="button is-info is-outlined"
    id="buttonGo"
    v-show="!tf"
    v-on:click="changeState"
  >
    Xem ngày khác
  </button>
  <div id="modal" v-show="tf">
    <i class="material-icons" id="buttonBack" v-on:click="changeState"
      >cancel</i
    >
    <div class="select is-rounded is-info is-normal">
      <select id="selectMonth" v-on:change="func"></select>
    </div>
    <div class="select is-rounded is-info is-normal">
      <select id="selectDay" v-on:change="func"></select>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Picker",
  setup() {
    const tf = ref(false);

    const changeState = () => {
      tf.value = !tf.value;
      if (tf.value === true) {
        let thisMonth = new Date().getMonth() + 1;
        let thisDay = new Date().getDate();
        let monthOption = "";
        for (let i = 4; i <= thisMonth; i++) {
          if (i === thisMonth) {
            monthOption = monthOption + `<option selected>Tháng ${i}</option>`;
          } else {
            monthOption = monthOption + `<option>Tháng ${i}</option>`;
          }
        }
        document.getElementById("selectMonth").innerHTML = monthOption;

        let x = document.getElementById("selectMonth");
        let y = x.options[x.selectedIndex].value;
        let dayOption = "";
        switch (y) {
          case "Tháng 5":
          case "Tháng 7":
          case "Tháng 8":
            for (let i = 1; i <= 31; i++) {
              if (i === thisDay) {
                dayOption = dayOption + `<option selected>Ngày ${i}</option>`;
              } else {
                dayOption = dayOption + `<option>Ngày ${i}</option>`;
              }
            }
            break;
          case "Tháng 4":
          case "Tháng 6":
            for (let i = 1; i <= 30; i++) {
              if (i === thisDay) {
                dayOption = dayOption + `<option selected>Ngày ${i}</option>`;
              } else {
                dayOption = dayOption + `<option>Ngày ${i}</option>`;
              }
            }
            break;
        }
        document.getElementById("selectDay").innerHTML = dayOption;
      }
    };

    const func = () => {
      let x = document.getElementById("selectMonth");
      let monthValue = x.options[x.selectedIndex].value;
      let y = document.getElementById("selectDay");
      let dayValue = y.options[y.selectedIndex].value;
      console.log(dayValue + " " + monthValue);
    };

    return { tf, changeState, func };
  },
};
</script>

<style scoped>
#modal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

#modal > * {
  margin-left: 10px;
}

#buttonBack:hover {
  cursor: pointer;
  color: blue;
  transition: 0.3s ease;
}
</style>
