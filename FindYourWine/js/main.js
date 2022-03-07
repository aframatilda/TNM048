/**************************************************************/
/*
/* Project in course TNM048
/* Authors: Afra Farkhooy, Julia Johnstone & Victoria Stråberg
/*
/**************************************************************/

var wine_list;
var selected_country = [];
d3.csv("./data/systembolaget.csv", function (data) {

    //Wine list with unique name/year
    keys = ['name', 'year'],
        wine_list = data.filter(
            (s => o =>
                (k => !s.has(k) && s.add(k))
                    (keys.map(k => o[k]).join('|'))
            )
                (new Set)
        );

    //Passing data to the function
    worldMap(wine_list);
    filterData(wine_list);
})

final_div = document.getElementById("finalinfo");
default_div = document.getElementById("default");

//Show default data when loading page
window.addEventListener("load", loadData);

function loadData() {
    d3.csv("./data/systembolaget.csv", function (data) {
        alphabetically = wine_list.sort((a, b) => a.name.localeCompare(b.name))
        wineList(alphabetically);
    })

    final_div.style.display = "none";
    default_div.style.display = "block";
}

//Update dataset when choices are made
function changeData() {

    //Filter wine based on taste sliders
    filteredData = wine_list.filter(function (d) {
        return ((parseFloat(d.tasteFruitAcid) >= minFruit_current && parseFloat(d.tasteFruitAcid) <= maxFruit_current)
            && (parseFloat(d.tasteSweetness) >= minSweet_current && parseFloat(d.tasteSweetness) <= maxSweet_current)
            && (parseFloat(d.tasteBody) >= minBody_current && parseFloat(d.tasteBody) <= maxBody_current))
    })

    //Filter wine based on type (red/white)
    if (wine_type.length > 0)
        filteredData = filteredData.filter(function (d) {
            return wine_type.includes(d.type);
        })

    //Filter wine based on grape
    if (grape_array.length > 0)
        filteredData = filteredData.filter(function (d) {
            return d.grapes.toLowerCase().includes(grape_array[0].toLowerCase());
        })

    //Filter wine based on country/countries
    if (selected_country.length > 0)
        filteredData = filteredData.filter(function (d) {
            return selected_country.includes(d.country);
        })

    //Sort wine list
    var alphabetically = filteredData.sort((a, b) => a.name.localeCompare(b.name))

    wineList(alphabetically)
}
