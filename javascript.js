$(document).ready(function(){
  $(".button").click(function(){
    if($(this).css("display")==="block"){
      $(this).siblings().slideDown("slow");
      $(this).slideUp("slow");
      $(this).siblings().css("visibility", "visible");
    }
  });
  $(".hidden").click(function(){
    if($(this).css("display")==="block"){
      $(this).slideUp("slow");
      $(this).css("visibility", "hidden");
      $(this).siblings().slideDown("slow");
      $(this).siblings().css("visibility", "visible");
    }
  })
})

//array of movies -> have movies listed with class of "unselected"
var comedies = ["Step Brothers", "The Other Guys", "Zoolander", "Megamind", "Semi-pro", "Blades of Glory", "21 Jump street", "22 Jump Street", "American Pie", "American Wedding", "American Reunion", "The Hangover", "Just Go With It", "50 First Dates"];
var romance = ["Thor", "Iron Man", "Iron Man 2", "The Incredible Hulk", "Spider-Man", "Spider-Man 2", "Spider-Man 3", "Transformers", "Transformers: Age of Extinction", "Transformers: Dark of the Moon", "Transformers: Revenge of the Fallen", "Batman Begins", "The Dark Knight", "The Dark Knight Rises", "Man of Steel", "Captain America: The first avenger"];
var action = ["The Expendables", "The Expendables 2", "The Expendables 3", "The Help", "Rambo", "Gangster Squad", "The Terminator", "Terminator 3: Rise of the Machines", "Terminator Salvation", "Taken", "Taken 2", "The A-team", "ZombieLand"];
var chuckNorris = ["The Delta Force", "Sidekicks", "Missing In Action", "The Hitman", "Firewalker", "DodgeBall: A True Underdog story", "Top Dog", "Hellbound", "The Cutter", "Hero and the Terror", "The emperor's new groove"];


//create each section of the movie ->
// 1. each with their own poster
var list = document.getElementById("theList");
// var eachItem = function(section){
//   for(var i=0; i < section.length; i++){

//Alvin! YOU(I) created this function for callback, *FOR LOOP DID NOT WORK*
var createTags = function(elem){
//comedies.forEach(function(elem){
    var image = document.createElement("img");
    image.className="unselected";
    var li = document.createElement("li");
    var button = document.createElement("Button");
    button.className="poster"
    var p = document.createElement("p");
    var div = document.createElement("div");
    div.className="button";

    //each list item contains a image and title of movie
    list.appendChild(li);
    li.appendChild(button);
    button.appendChild(div);
    div.appendChild(image);
    div.appendChild(p)

    //hidden elements to be displayed
    var hiddenDiv = document.createElement("div");
    hiddenDiv.className ="hidden";
    var title = document.createElement("h2");
    title.className="title";
    var year = document.createElement("h3");
    year.className="year";
    var plot = document.createElement("p");
    plot.className="plot";
    var director = document.createElement("p");
    director.className="director";
    var actor = document.createElement("p");
    actor.className="actor";

    //append list items with hidden element (hiddenDiv)
    button.appendChild(hiddenDiv);
    hiddenDiv.appendChild(title);
    hiddenDiv.appendChild(year);
    hiddenDiv.appendChild(plot);
    hiddenDiv.appendChild(director);
    hiddenDiv.appendChild(actor);


    //this is for the 1. input // 2. URI encodes with % // 3. API with link
    var input = elem;
    var url_safe = encodeURI(input);
    var url = "http://omdbapi.com/?t=" + url_safe;
    //console.log(url);

    //constructor object
    var xhr = new XMLHttpRequest();

    //gets the data from url
    xhr.open("GET", url);
    xhr.addEventListener('load', function(e){
      var d = xhr.responseText; // ***(d is)DATA, COMES IN JSON STRINGIFIED***
      var parsed = JSON.parse(d); // ***MUST PARSE THE DATA FIRST***
      image.src = parsed.Poster; //parsed is now the object (.Poster is key in object)
      //console.log("image source added");

      p.innerHTML = parsed.Title;

      //hidden elements
      title.innerHTML = "Movie: " + parsed.Title;
      year.innerHTML = "Year: " + parsed.Year;
      plot.innerHTML = "Plot: " + parsed.Plot;
      director.innerHTML = "Directed by: " + parsed.Director;
      actor.innerHTML = "Starring: " +parsed.Actors;

      //anchor.setAttribute("href", " "); //this makes posters clickable temporary
    })
   xhr.send(); // **I have no idea what this does**
 }

comedies.forEach(createTags);
romance.forEach(createTags);
action.forEach(createTags);
chuckNorris.forEach(createTags);
