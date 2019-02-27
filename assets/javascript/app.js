
// display 10 GIFS of button pressed -- rename button class
$("#select-GIF").on("click", function () {
    var searchTerm = $(this).attr("data-term");
    var myAPIkey = "IGNv9aTcr52tNmJdGibtGwzBnh5sUboL"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=" + myAPIkey + "&limit=20";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        // shortened response variable
        var results = response.data;

        // create a div for each GIF
        for (var i = 0; i < results.length; i++) {
            var termSpan = $("<div>");
            // add rating info
            var rating = $("<div>");
            rating.html("<b>Rating: </b>" + results[i].rating.toUpperCase());
            // add image
            var termImage = $("<img>");
            // build out div
            termImage.attr("src", results[i].images.fixed_width.url);
            termSpan.append(termImage, rating);
            // prepend to gifarea
            $("#GIFArea").prepend(termSpan);
        }
    });
});