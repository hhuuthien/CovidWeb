const formatDate = (string) => {
  let d = new Date(string);
  let day = "";
  if (Number(d.getDate()) < 10) {
    day = "0" + d.getDate();
  } else {
    day = d.getDate();
  }
  let month = "";
  if (Number(d.getMonth()) < 10) {
    month = "0" + d.getMonth();
  } else {
    month = d.getMonth();
  }
  let ddmmyyyy = day + "/" + month + "/" + d.getFullYear();
  return ddmmyyyy;
};

const object_To_Array = (object) => {
  let arrayObject = [];
  var arrayArray = Object.entries(object);
  arrayArray.forEach((element) => {
    if (
      !(element[0] === "") &&
      !(element[0] === "A") &&
      !(element[0] === "B") &&
      !(element[0] === "C") &&
      !(element[0] === "D") &&
      !(element[0] === "E") &&
      !(element[0] === "F") &&
      !(element[0] === "G") &&
      !(element[0] === "Ngày") &&
      !(element[0] === "__1")
    ) {
      let obj = {
        province: element[0],
        val: element[1],
      };
      arrayObject.push(obj);
    }
  });
  return arrayObject;
};

const object_To_Array_2_For_VietnamMap2 = (object) => {
  let arrayObject = [];
  var arrayArray = Object.entries(object);
  arrayArray.forEach((element) => {
    if (!(element[0] === "NGÀY")) {
      let day_in = element[0];
      let arr = day_in.split("in");
      let obj = {
        day: element[0].replace("in", "/"),
        val: element[1],
        myVal: (parseInt(arr[1] * 31) + parseInt(arr[0])).toString(),
      };
      arrayObject.push(obj);
    }
  });
  return arrayObject;
};

const object_To_Array_3 = (object) => {
  let arrayObject = [];
  var arrayArray = Object.entries(object);
  arrayArray.forEach((element) => {
    if (
      !(element[0] === "World") &&
      !(element[0] === "Asia") &&
      !(element[0] === "Europe") &&
      !(element[0] === "European Union") &&
      !(element[0] === "Africa") &&
      !(element[0] === "North America") &&
      !(element[0] === "South America") &&
      !(element[0] === "Oceania")
    ) {
      let obj = {
        country: element[0],
        val: element[1],
      };
      arrayObject.push(obj);
    }
  });
  return arrayObject;
};

const mergeArray = (arr1, arr2) => {
  let merge = new Array();
  for (let index = 0; index < arr1.length; index++) {
    let obj = {
      province: arr1[index].province,
      total: arr1[index].val,
      new: arr2[index].val,
    };
    merge.push(obj);
  }
  return merge;
};

const hashString = () => {
  return "6c01f9ad979adb06adec21a0cb5f9cb0cd20df8c";
};

import Hashes from "jshashes";
const hash = (string) => {
  let RMD160 = new Hashes.RMD160();
  return RMD160.hex(string);
};

const intersectionArrayELement = (array) => {
  let result = new Array();
  array[0].forEach((e) => {
    if (
      array[1].includes(e) &&
      array[2].includes(e) &&
      array[3].includes(e) &&
      array[4].includes(e) &&
      array[5].includes(e) &&
      array[6].includes(e) &&
      array[7].includes(e) &&
      array[8].includes(e) &&
      array[9].includes(e) &&
      array[10].includes(e) &&
      array[11].includes(e) &&
      array[12].includes(e) &&
      array[13].includes(e)
    ) {
      result.push(e);
    }
  });
  return result;
};

const getAllProvince = () => {
  return [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bạc Liêu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Dương",
    "Bình Định",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Cần Thơ",
    "Đà Nẵng",
    "Đăk Lăk",
    "Đăk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lạng Sơn",
    "Lào Cai",
    "Lâm Đồng",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "TP HCM",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];
};

import Highcharts from "highcharts";
const drawChart = (container, name, array, category, color) => {
  Highcharts.chart(container, {
    chart: {
      height: 300,
    },
    title: {
      text: null,
    },
    series: [
      {
        name: name,
        data: array,
      },
    ],
    xAxis: {
      categories: category,
    },
    yAxis: [
      {
        title: {
          text: null,
        },
        labels: {
          align: "left",
          x: 3,
          y: 16,
          format: "{value:.,0f}",
        },
        showFirstLabel: false,
      },
    ],
    plotOptions: {
      series: {
        color: color,
      },
    },
  });
};

const drawChartColumn = (container, name, array, category, color) => {
  Highcharts.chart(container, {
    chart: {
      type: "column",
      height: 300,
    },
    title: {
      text: null,
    },
    series: [
      {
        name: name,
        data: array,
      },
    ],
    xAxis: {
      categories: category,
    },
    yAxis: [
      {
        title: {
          text: null,
        },
        showFirstLabel: false,
      },
    ],
    plotOptions: {
      series: {
        color: color,
      },
    },
  });
};

const drawChartBar = (container, name, array, category, color) => {
  Highcharts.chart(container, {
    chart: {
      type: "bar",
    },
    title: {
      text: null,
    },
    series: [
      {
        name: name,
        data: array,
      },
    ],
    xAxis: {
      categories: category,
    },
    yAxis: [
      {
        title: {
          text: null,
        },
        showFirstLabel: false,
      },
    ],
    plotOptions: {
      series: {
        color: color,
      },
    },
  });
};

const changeName = (arrayStart, arrayEnd) => {
  arrayStart.forEach((element) => {
    if (element === "China") arrayEnd.push("Trung Quốc");
    else if (element === "India") arrayEnd.push("Ấn Độ");
    else if (element === "United States") arrayEnd.push("Hoa Kỳ");
    else if (element === "Germany") arrayEnd.push("Đức");
    else if (element === "United Kingdom") arrayEnd.push("Vương quốc Anh");
    else if (element === "Japan") arrayEnd.push("Nhật Bản");
    else if (element === "France") arrayEnd.push("Pháp");
    else if (element === "Turkey") arrayEnd.push("Thổ Nhĩ Kỳ");
    else if (element === "United Arab Emirates") arrayEnd.push("UAE");
    else if (element === "Denmark") arrayEnd.push("Đan Mạch");
    else if (element === "Netherlands") arrayEnd.push("Hà Lan");
    else {
      arrayEnd.push(element);
    }
  });
};

const getMyTime = (slash) => {
  let today = new Date(); //hôm nay
  if (today.getHours() < 9) {
    today.setDate(today.getDate() - 1); //hôm qua
  }
  let todayString = today.getDate() + slash + (today.getMonth() + 1);
  return todayString;
};

const getMyTime2 = () => {
  let today = new Date(); //hôm nay
  if (today.getHours() < 9) {
    today.setDate(today.getDate() - 1); //hôm qua
  }
  return today;
};

export {
  formatDate,
  object_To_Array,
  mergeArray,
  hashString,
  hash,
  intersectionArrayELement,
  getAllProvince,
  drawChart,
  drawChartColumn,
  drawChartBar,
  object_To_Array_2_For_VietnamMap2,
  object_To_Array_3,
  changeName,
  getMyTime,
  getMyTime2,
};
