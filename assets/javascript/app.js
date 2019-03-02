$(document).ready(function () {


    // ==================================
    // GLOBAL VARIABLES
    // ==================================

    var GIFbuttons = ["bill murray", "baseball", "chihuahua"];
    var returnLimit = 10;

    // ==================================
    // FUNCTIONS
    // ==================================

    // add button on click
    $("#add-button").on("click", function () {
        event.preventDefault();
        // grab text from input
        var newGIF = $("#button-input").val().trim();
        if (newGIF !== "") {
            // push value to array of buttons
            GIFbuttons.push(newGIF);
            renderButtons();
        }
    });

    // display buttons in button area
    function renderButtons() {
        // clear button area
        $("#btnArea").empty();
        // loop through GIFbuttons and create all buttons
        for (var i = 0; i < GIFbuttons.length; i++) {
            var btnText = GIFbuttons[i]
            var newBtn = $("<button>");
            newBtn.addClass("search-GIF btn btn-success btn-sm mr-1 mb-1");
            newBtn.attr("data-term", btnText);
            newBtn.text(btnText);
            $("#btnArea").prepend(newBtn);
        }
    }

    // display 9 GIFS of button pressed
    $(document).on("click", ".search-GIF", function () {
        // debugger;
        var searchTerm = $(this).attr("data-term");
        var myAPIkey = "IGNv9aTcr52tNmJdGibtGwzBnh5sUboL"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=" + myAPIkey + "&limit=" + returnLimit;

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // shortened response variable
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                // create a div for each GIF
                var termDiv = $("<div>");
                termDiv.addClass("card mb-3")
                termDiv.attr("style", "width: 48%;")

                // add image and give it alternate states
                var termImage = $("<img>");
                termImage.attr("src", results[i].images.fixed_width_still.url);
                termImage.attr("data-still", results[i].images.fixed_width_still.url);
                termImage.attr("data-animate", results[i].images.fixed_width.url);
                termImage.attr("data-state", "still");
                termImage.addClass("gif card-img-top");

                // create the card body
                var cardBody = $("<div>").addClass("card-body");

                // create the heading
                var gifTitle = $("<h5>");
                gifTitle.text(results[i].title);
                gifTitle.addClass("card-title")


                // add rating info -- not available for random
                var ratings = $("<div>").addClass("card-text");
                ratings.html("<b>Rating: </b>" + results[i].rating.toUpperCase());

                var gifSource = $("<div>").addClass("card-text");
                gifSource.text(results[i].source_tld);

                // make the star
                var favStar = $("<i>").addClass("fas fa-star text-warning");
                var favText = $("<a>").text(" Add to favorites")
                var starDiv = $("<div>").addClass("favorite card-footer");
                starDiv.append(favStar, favText);

            //     <div class="card-footer text-muted">
            //     2 days ago
            //   </div>


                // build out div
                cardBody.append(gifTitle, ratings, gifSource);
                termDiv.append(termImage, cardBody, starDiv);
                // prepend to gifarea
                $("#GIFArea").prepend(termDiv);
            }
            var alertDiv = $("<div>").addClass("alert alert-success col-md-12");
            alertDiv.attr("role", "alert");
            var alertHeader = $("<h4>").addClass("alert-heading").text(searchTerm + " GIFs");
            alertDiv.append(alertHeader);
            $("#GIFArea").prepend(alertDiv);

        });


    });

    // start/stop gif animation
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


    // call function to initialize buttons
    renderButtons();

});