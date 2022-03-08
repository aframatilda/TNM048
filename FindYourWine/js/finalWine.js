/**************************************************************/
/*
/* Project in course TNM048
/* Authors: Afra Farkhooy, Julia Johnstone & Victoria Stråberg
/*
/**************************************************************/

function finalWine(clicked_wine) {

    wine_list = clicked_wine;

    $('#imagebox').html('');

    //Get columns from dataset
    var name = wine_list.name;
    var producer = wine_list.producer;
    var country = wine_list.country;
    var taste_description = wine_list.taste;
    var usage_split = wine_list.usage.split("C")[0];
    var usage = (usage_split) + "C";
    var taste_category = wine_list.categoryTaste;
    var year = wine_list.year;
    var price = parseInt(wine_list.price) + " SEK";

    // Building the first image box
    var div = document.getElementById("imagebox");
    var img = document.createElement("img")

   if (wine_list.imageURL == "") img.src = "./assets/images/No-image.png";
    else img.src = wine_list.imageURL + "_100.png";
    div.appendChild(img);

    var styles = {
        "height": "90%",
        "width":"auto",
        "display": "flex",
        "margin-left": "auto",
        "margin-right": "auto",
        "padding-top": "10%",
        "padding-bottom": "20%",
    }

    Object.assign(img.style, styles)

    // Building the middle textbox
    d3.select("#name")
        .text(name)

    d3.select("#producer")
        .text(producer)

    d3.select("#country")
        .text(country)

    d3.select("#taste_description")
        .text(taste_description)

    // Building the last textbox 
    d3.select("#usage")
        .text(usage)

    d3.select("#taste_category")
        .text(taste_category)

    d3.select("#year")
        .text(year)

    d3.select("#price")
        .text(price)
 

    // Prints when dataset is empty and gives a message
    if (wine_list.image == 0) d3.select("#imagebox").text("Not registered")
    if (wine_list.producer == "") d3.select("#producer").text("Not registered")
    if (wine_list.usage == "") d3.select("#usage").text("Not registered")
    if (wine_list.taste_category == "") d3.select("#taste_category").text("Not registered")  
    if (wine_list.year == "") d3.select("#year").text("Not registered")

}