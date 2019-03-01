$(document).ready(function () {
 

    // ==================================
    // GLOBAL VARIABLES
    // ==================================

    var GIFbuttons = ["bill murray", "baseball", "chihuahua"];
    var returnLimit = 1;

    // ==================================
    // FUNCTIONS
    // ==================================

    // add button on click
    $("#add-button").on("click", function () {
        event.preventDefault();
        // grab text from input
        var newGIF = $("#button-input").val().trim();
        // push value to array of buttons
        GIFbuttons.push(newGIF);
        renderButtons();
    });

    // display buttons in button area
    function renderButtons() {
        // clear button area
        $("#btnArea").empty();
        // loop through GIFbuttons and create all buttons
        for (var i = 0; i < GIFbuttons.length; i++) {
            var btnText = GIFbuttons[i]
            var newBtn = $("<button>");
            newBtn.addClass("search-GIF btn btn-success");
            newBtn.attr("data-term", btnText);
            newBtn.text(btnText);
            $("#btnArea").prepend(newBtn);
        }
    }

    // display 10 GIFS of button pressed
    $(document).on("click", ".search-GIF", function () {
        // debugger;
        var searchTerm = $(this).attr("data-term");
        var myAPIkey = "IGNv9aTcr52tNmJdGibtGwzBnh5sUboL"
        var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" +
            searchTerm + "&api_key=" + myAPIkey;

        console.log(queryURL);

        for (var j = 0; j < returnLimit; j++) {
            console.log("Loop " + j + " of " + returnLimit)
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                // shortened response variable
                var results = response.data;

                // create a div for each GIF
                var termDiv = $("<div>");
                // termDiv.addClass("mb-3")

                // add rating info -- not available for random
                // var rating = $("<div>");
                // rating.html("<b>Rating: </b>" + results.rating.toUpperCase());

                // add image
                var termImage = $("<img>");
                // build out div
                termImage.attr("src", results.images.fixed_width.url);
                termDiv.append(termImage);
                // prepend to gifarea
                $("#GIFArea").prepend(termDiv);
            });
        }

    });

    // call function to initialize buttons
    renderButtons();

});