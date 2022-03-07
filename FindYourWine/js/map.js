/**************************************************************/
/*
/* Project in course TNM048
/* Authors: Afra Farkhooy, Julia Johnstone & Victoria Stråberg
/*
/**************************************************************/

function worldMap() {

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");

  // Set themes. Handle the animations with color
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create the map chart.
  // MapChart is a chart type used to display geographical maps
  // https://www.amcharts.com/docs/v5/charts/map-chart/
  var chart = root.container.children.push(am5map.MapChart.new(root, {
    panX: "translateX", 
    panY: "translateY", 
    projection: am5map.geoNaturalEarth1(),
  }));

  // Create main polygon series for countries
  // To create a map polygon series we need to call 
  // its new() method and push the new object into chart's series list
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
  var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"],
    fill: am5.color(0xECB984),
  }));

  var polygonTemplate = polygonSeries.mapPolygons.template;

  polygonTemplate.setAll({
    tooltipText: "{name}",
    toggleKey: "active",
    interactive: true
  });

  //When hover over country
  polygonTemplate.states.create("hover", {
    fill: am5.color(0xD58258)
  });

  //Selected country
  polygonTemplate.states.create("active", {
    fill: am5.color(0x963A2F)
  });

  //Get the name of the selected country/countries
  polygonTemplate.events.on("click", function (e) {

    var found = false;
    var name = e.target.dataItem.dataContext.name;
    if (name == "United States") name = "USA"
    if (name == "United Kingdom") name = "UK"

    for (let i = 0; i < selected_country.length; ++i) {
      if (selected_country[i] == name) {
        selected_country.splice(i, 1);
        found = true;
      }
    }

    if (!found)
      selected_country.push(name);
    changeData();
    console.log(selected_country);

  });

  //Add zoom control
  //https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
  var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

  var homeButton = zoomControl.children.moveValue(am5.Button.new(root, {
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 1,
    buttonFillColor: "0x963A2F",
    icon:
      am5.Graphics.new(root, {
        svgPath: "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8",
        fill: am5.color(0xffffff)
      })
  }), 0)

  homeButton.events.on("click", function () {
    chart.goHome();
  })

  // Make stuff animate on load
  chart.appear(1000, 100);
}