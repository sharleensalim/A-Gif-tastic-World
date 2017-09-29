
  	// initial array of topic
  	var countries = ["America", "United Kingdom", "Canada", "Japan", "Australia", "Germany", "Italy", "Sweden", "France", "New Zealand"];

  	// function for creating buttons for existing array of countries
  	function renderButtons() {
 
  		$('#buttons-view').empty();
  		for (var i = 0; i < countries.length; i++) {
  			var a = $("<button>");
  			a.addClass("country");
  			a.attr("data-name", countries[i]);
  			a.text(countries[i]);
  			$("#buttons-view").append(a);
  		}
    }

  	// function that handles event when add adding new countries
  	$("#add-country").on("click", function() {
  		event.preventDefault();
  		var newCountry = $("#country-input").val().trim();
  		countries.push(newCountry);
  		renderButtons();
      $("#country-input").val("");
  	});

    // function that re-renders HTML to display gifs
    function displayCountryGifs() {
      var country = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=dc6zaTOxFJmzC&limit=10";

      // AJAX call for country button that is being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        var results = response.data;

        $("#gifs-appear-here").empty();
        for(var i = 0; i < results.length; i++) {

          var countryDiv = $("<div class='gifsDiv'>");
          var countryImage = $("<img class = 'gif'>");

          var gifRating = results[i].rating;
          // var p = $("<p>").text("Rating: " + gifRating);
          // rating is shown on hover 
              countryImage.attr('title', "Rating: " + gifRating);

          var gifStill = results[i].images.fixed_height_still.url;
          var gifPlay = results[i].images.fixed_height.url;
              countryImage.attr("src", gifStill);
              countryImage.attr("data-still", gifStill);
              countryImage.attr("data-animate", gifPlay);
              countryImage.attr("data-state", "still");

          // countryDiv.append(p);
          countryDiv.append(countryImage);
          $("#gifs-appear-here").prepend(countryDiv);
        }

        // pausing gifs
        $(document).on("click", ".gif", function() {
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "data-animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state","still");
          }
        });
      });
    }

    // calling functions
    renderButtons();
    $(document).on("click", ".country", displayCountryGifs);
          





