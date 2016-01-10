$("#home").live("pageinit", function(e) {
  //var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|windows)/);
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };
  if (!isMobile.any()) {
    $.mobile.changePage($("#ui-desktop-browser"), "pop", false, true)
  }
});

var feedCache = {};

$("#listpage").live("pageinit", function(e) {
  $("h1", this).text("Upcoming Movies");
  google.load("feeds", "1");
  //	initialize();
  //google.load($('#listcontents'), "1");
  function initialize() {
    var url = "http://www.rottentomatoes.com/syndication/rss/upcoming.xml";
    var feed = new google.feeds.Feed(url);
    feed.setNumEntries(10);
    if (!feedCache[url]) {
      feed.load(function(result) {
        if (!result.error) {
          feedCache[url] = res.responseData.feed.entries;
          displayFeed(url);
        } else {
          var error = "<p>Sorry, the movie feed could not be loaded:</p><p>" + result.responseDetails + "</p>";
          $("#listcontents").html(error);
        }
      });
    }
  }
  google.setOnLoadCallback(initialize);
});

function displayFeed(url) {
  var entries = feedCache[url];
  var s = "<ul data-role='listview' data-inset='true'id='entrylist'>";
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    entry.title = entry.title.replace(/\d+(?:\.\d+)?% ?/g, "");
    s += "<li><a href='movie_info.html?entry=" + i + "&url=" + encodeURI(url) + "'>" + entry.title + "</a></li>";
  }
  s += "</ul>";
  $("#listcontents").html(s);
  $("#entrylist").listview();
}

var rt_url = "";
$("#infopage").live("pageshow", function(e) {
  var query = $(this).data("url").split("?")[1];
  query = query.replace("?", "");
  var parts = query.split("&");
  var entryid = parts[0].split("=")[1];
  var url = parts[1].split("=")[1];
  var entry = feedCache[url][entryid];
  $("h1", this).text(entry.title);
  $("#infocontents", this).html(entry.content);
  $("#urllink", this).attr("href", "confirm_page.html");
  rt_url = entry.link;
});

$("#confirmPage").live("pageshow", function(e) {
  $("#urlexternal", this).attr("href", rt_url);
});