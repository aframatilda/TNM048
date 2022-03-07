/**************************************************************/
/*
/* Project in course TNM048
/* Authors: Afra Farkhooy, Julia Johnstone & Victoria Stråberg
/*
/**************************************************************/

function wineList(filteredData) {

    var list = document.getElementById("list-container");

    $('#list-container').html('');

    //Display every name of the wine 
    filteredData.forEach(wine => {

        var tag = document.createElement("div");
        var text = document.createTextNode(wine.name);

        tag.appendChild(text);
        list.appendChild(tag);

        tag.onclick = function (name) {
            clicked_wine = wine
            finalWine(clicked_wine);
            final_div.style.display = "block";
            default_div.style.display = "none";

        }
    })
}
