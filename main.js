var apiKey = "4aQ43nuRLgwAVD6OBNpyNJCenXWZZ6k4";
var searchedTerm = "Space";
var startYear = "";
var endYear = "";
var queryURL = "";
var numberOfRecords = "5";

//conditional to create queryURL
if (startYear && endYear) {
  queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=" + startYear + "0101&end_date=" + endYear + "1231&q=" + searchedTerm + "&api-key=" + apiKey;
} else if (startYear && !endYear) {
  queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=" + startYear + "0101&q=" + searchedTerm + "&api-key=" + apiKey;
} else if (!startYear && endYear) {
  queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?end_date=" + endYear + "1231&q=" + searchedTerm + "&api-key=" + apiKey;
} else {
  queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchedTerm + "&api-key=" + apiKey;
}

function searchNewYorkTimes() {

  //NY Times API Call
  $.ajax({

    url: queryURL,

    method: "GET"

  }).then(function (article) {

    console.log(article);

    //Loop for displaying multiple articles
    for (var i = 0; i < numberOfRecords; i++) {

      var h3El = $('<h3>').text(article.response.docs[i].headline.main).attr("class", "article-title");
      var pEl = $("<p>").text(article.response.docs[i].abstract).attr("class", "article-content");

      $('.article').append(h3El, pEl, "<hr>");

    }
  })
}