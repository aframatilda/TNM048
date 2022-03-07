/**************************************************************/
/*
/* Project in course TNM048
/* Authors: Afra Farkhooy, Julia Johnstone & Victoria Stråberg
/*
/**************************************************************/

var minSweet_current = 0;
var maxSweet_current = 0;
var minFruit_current = 0;
var maxFruit_current = 0;
var minBody_current = 0;
var maxBody_current = 0;
var wine_type = [];
var grape_array = [];

function filterData(data) {

  /************************* TASTE ******************************/

  var maxSweet = d3.max(data, function (d) { return parseFloat(d.tasteSweetness) });
  var minSweet = d3.min(data, function (d) { return parseFloat(d.tasteSweetness) });

  var maxFruit = d3.max(data, function (d) { return parseFloat(d.tasteFruitAcid) });
  var minFruit = d3.min(data, function (d) { return parseFloat(d.tasteFruitAcid) });

  var maxBody = d3.max(data, function (d) { return parseFloat(d.tasteBody) });
  var minBody = d3.min(data, function (d) { return parseFloat(d.tasteBody) });

  minSweet_current = minSweet;
  maxSweet_current = maxSweet;
  minFruit_current = minFruit;
  maxFruit_current = maxFruit;
  minBody_current = minBody;
  maxBody_current = maxBody;

  d3.select('#sweetness-slider')
    .call(d3.slider()
      .value([minSweet, maxSweet])
      .axis(true)
      .min(minSweet)
      .max(maxSweet)
      .on("slide", function (evt, value) {

        d3.select('#sweetnesstextmin').text(Math.floor(value[0]));
        d3.select('#sweetnesstextmax').text(Math.floor(value[1]));

        minSweet_current = value[0];
        maxSweet_current = value[1];

        changeData();

      }));

  d3.select('#fruit-slider')
    .call(d3.slider()
      .value([minFruit, 100])
      .axis(true).min(minFruit)
      .max(100).on("slide", function (evt, value) {

        d3.select('#fruittextmin').text(Math.floor(value[0]));
        d3.select('#fruittextmax').text(Math.floor(value[1]));

        minFruit_current = value[0];
        maxFruit_current = value[1];

        changeData();
      }))

  d3.select('#body-slider')
    .call(d3.slider()
      .value([minBody, maxBody])
      .axis(true).min(minBody)
      .max(maxBody)
      .on("slide", function (evt, value) {

        d3.select('#bodytextmin').text(Math.floor(value[0]));
        d3.select('#bodytextmax').text(Math.floor(value[1]));


        minBody_current = value[0];
        maxBody_current = value[1];

        changeData();
      }))


  /************************* TYPE ******************************/

  // Filter on this column
  var filter_on = 'type'

  // Building an array with the values to filter on
  var filter_list = d3.map(data, function (d) {
    if ((d[filter_on] == "Red wine" || d[filter_on] == "White wine")) return d[filter_on];

  }).keys()

  if (filter_list.includes("undefined")) {
    filter_list.splice(2, 1);
  }

  // Building the filter checkboxes
  d3.select("#filter-boxes")
    .selectAll("input")
    .data(filter_list)
    .enter()
    .append("label")
    .append("input")
    .attr("type", "checkbox")
    .attr("class", "filter-check")
    .attr("value", function (d) {
      return d
    })
    .attr("id", function (d) {
      return d
    });

  d3.selectAll("label")
    .data(filter_list)
    .attr("class", "form-check form-check-inline")
    .append("text").text(function (d) {
      return " \u00A0 " + d
    })

  var checkBox = d3.selectAll(".filter-check")
  checkBox.on("change", function () {

    wine_type = [];
    // When checkbox changes, refresh wine_type array with checked values
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked[class=filter-check]')
    for (var i = 0; i < checkboxes.length; i++) {
      wine_type.push((checkboxes[i].value))
    }

    changeData();

  });

  /************************* GRAPES ******************************/

  var list = [];
  //Split grape array and put them in list with only unique grapes
  for (let i = 0; i < wine_list.length; i++) {
    if (wine_list[i].grapes != "") {
      var grapes_list = wine_list[i].grapes.toLowerCase().split(" --- ");
      list.push(...grapes_list);
    }
  }

  var unique_grapes = [...new Set(list)].sort()

  // Building the filter checkboxes
  d3.select("#filter-boxes_grapes")
    .selectAll("input")
    .data(unique_grapes)
    .enter()
    .append("label")
    .append("input")
    .attr("type", "radio")
    .attr("class", "filter-check2")
    .attr("value", function (g) {
      return g
    })
    .attr("id", function (g) {
      return g
    });

  d3.selectAll("#filter-boxes_grapes")
    .selectAll("label")
    .data(unique_grapes)
    .attr("class", "radio")
    .append("text")
    .text(function (g) {
      return " " + g
    })

  var grapeCheckBox = d3.selectAll(".filter-check2")
  grapeCheckBox.on("change", function () {

    grape_array = [];
    //When checkbox changes, refresh choices array with checked values
    var grape_array_check = document.querySelectorAll('input[type=radio]:checked[class=filter-check2]')
    for (var i = 0; i < grape_array_check.length; i++) {
      grape_array.push((grape_array_check[i].value))
    }

    //Only one grape can be chosen
    function getCheckboxes() {
      return document.querySelectorAll('input[type=radio][class=filter-check2]');
    }

    function uncheckAllCheckboxes() {
      var checkboxes = getCheckboxes();
      for (var i = 0, length = checkboxes.length; i < length; i++) {
        checkboxes[i].checked = false;
      }
    }

    function manageClick() {
      uncheckAllCheckboxes();

      this.checked = true;
    }

    function init() {
      var checkboxes = getCheckboxes();
      for (var i = 0, length = checkboxes.length; i < length; i++) {
        checkboxes[i].addEventListener('click', manageClick);
      }
    }

    init();

    changeData();

  });
}