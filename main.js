
$("#search-button").on("click", function(){

  var apiKey = "4aQ43nuRLgwAVD6OBNpyNJCenXWZZ6k4";
  var searchedTerm = $('#search-term').val();
  var startYear = $("#start-year").val();
  var endYear = $("#end-year").val();
  var queryURL = "";
  
  
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


searchNewYorkTimes();

})


function searchNewYorkTimes() {

  var numberOfRecords = $("#numbers-record").val();

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