$("#searchPage").live("pageshow", function(e) {
  $('#userdata').focus(function() {
    var full = $("#moviedata").has("img").length ? true : false;
    if (full == false) {
      $('#moviedata').empty();
    }
  });

  var getMoviedata = function() {

    var film = $('#userdata').val();
    if (film == '') {
      $('#moviedata').html("<h2 class='info'> Please enter some movie name..</h2>");
    } else {
      $('#moviedata').html("<h2 class='info'> Movie info with picture is downloading...please wait </h2>");

      //$.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/871589fcc9b0df2c273ff959ce73f972/" + film + "?callback=?", function(json) {
      $.getJSON("http://api.themoviedb.org/3/search/movie?api_key=871589fcc9b0df2c273ff959ce73f972&language=en&query=" + film + "?callback=?", function(json) {
        //	if (json != "Nothing found.") {
        if (json.results.length !== 0) {
          var poster = "Picture not found";
          if (json[0].posters != "") {
            poster = "<img id=moviePic src=" + json[0].posters[0].image.url + "  />"
          }
          $('#moviedata').html('<h2 class="info"> Well, we have found the movie </h2> <br /><strong>Name : </strong>' + json[0].name + ' <br /> <strong>Overview : </strong>' + json[0].overview + ' <br /> <strong>Release Date : </strong>' + json[0].released + '<br /> <b>Picture : </b> <br />' + poster);
        } else {
          $('#moviedata').html('<h2 class="info"><strong>Nothing found...</strong> Please re-enter the movie name.');
        }
      });
    }
    return false;
  }

  $('#search').click(getMoviedata);
  $('#userdata').keyup(function(event) {
    if (event.keyCode == 13) {
      getMoviedata();
    }
  });
});