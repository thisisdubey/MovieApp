$("#searchPage").live("pageshow",function(a){$("#userdata").focus(function(){var c=$("#moviedata").has("img").length?true:false;if(c==false){$("#moviedata").empty()}});var b=function(){var c=$("#userdata").val();if(c==""){$("#moviedata").html("<h2 class='info'> Please enter some movie name..</h2>")}else{$("#moviedata").html("<h2 class='info'> Movie info with picture is downloading...please wait </h2>");$.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/871589fcc9b0df2c273ff959ce73f972/"+c+"?callback=?",function(d){if(d!="Nothing found."){var e="Picture not found";if(d[0].posters!=""){e="<img id=moviePic src="+d[0].posters[0].image.url+"  />"}$("#moviedata").html('<h2 class="info"> Well, we have found the movie </h2> <br /><strong>Name : </strong>'+d[0].name+" <br /> <strong>Overview : </strong>"+d[0].overview+" <br /> <strong>Release Date : </strong>"+d[0].released+"<br /> <b>Picture : </b> <br />"+e)}else{$("#moviedata").html('<h2 class="info"><strong>Nothing found...</strong> Please re-enter the movie name.')}})}return false};$("#search").click(b);$("#userdata").keyup(function(c){if(c.keyCode==13){b()}})});