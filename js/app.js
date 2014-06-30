App = Ember.Application.create();
console.log("Run!");
//var posts = parseJSON(JSONData); //See bottom
var bigDate;


var centerNavBar = function(){
 var width = $(document).width();
 var pad = width/2;
 console.log(pad);
  $('#div.navbar-inner').css({
  'padding-left': pad + 'px'
  }); //.navbar-inner
  
  
  $('#navbar-inner').css({
  'padding-left': pad + 'px'
  }); //.navbar-inner
}


App.Router.map(function() {
  this.resource('menu2', function(){
    this.resource('date')
  });
  this.resource('menu1');
  this.resource('item', { path: ':item_id' });
});

App.DateRoute = Ember.Route.extend({
  model: function() {
    return items;
  }
});

App.Menu1Route = Ember.Route.extend({
  model: function() {
    return items;
  }
});

App.ItemRoute = Ember.Route.extend({
  model: function(params) {
	for(var i = 0; i < items.length; i++){
	    if (items[i].id == params.item_id){
		    return items[i];
		}
	}
  }
});

App.itemController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
    this.get('store').commit();
  }
});

App.Menu2Controller = Ember.ObjectController.extend({

  next: function() {
      bigDate.setDate(bigDate.getDate() + 1);
  },

  prev: function() {
      bigDate.setDate(bigDate.getDate() - 1);
  }
});

Ember.Handlebars.helper('format-date', function(temp) {
  return temp.toLocaleDateString();
});

Ember.Handlebars.helper('get-date', function() {
  return bigDate.toLocaleDateString();
});

$(document).ready(function() {
console.log("Ready!");
    centerNavBar();
});



var JSONString = '{"1":{"title":"Hamburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger","restaurant":{"name":"Charlie\'s"},"date":"06-16-2014","excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger","restaurant":{"name":"Charlie\'s"},"date":"06-17-2014","excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers","restaurant":{"name":"Charlie"},"date":"06-18-2014","excerpt":"A Yummy stuff","body":"A chicken."},"5":{"title":"Chicken Fingers2","restaurant":{"name":"Charlie"},"date":"08-27-2014","excerpt":"A Yummy stuff","body":"A chicken."},"6":{"title":"Chicken Fingers3","restaurant":{"name":"Charlie"},"date":"06-27-2014","excerpt":"A Yummy stuff","body":"A chicken."}}';

//This one has dates attached to each food item instead of all of them

//var JSONString = '{"1":{"title":"Hamburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A Yummy stuff","body":"A chicken."},"date":"06-15-2014"}'; 

var parseJSON = function (){

 var temp = [];
 //var JSONValue = $.getJSON("./JSON.html"); //From Web
 var JSONValue = $.parseJSON(JSONString);
 var indvDate = typeof JSONValue["date"] === 'undefined';
 
 //console.log("data: "+JSON.stringify(JSONValue, null, 4));
 
  if(typeof bigDaate === 'undefined'){ //No current date.. set it to today
    bigDate = new Date();
  } else {
    //Do nothing.
  }
 
 for (var postKey in JSONValue){
  var slot = temp.length;
  if(postKey === "date"){
   continue;
  }
  temp[slot] = new Object();
  temp[slot].id = parseInt(postKey);
  temp[slot].title = JSONValue[postKey].title;
  temp[slot].restaurant = JSONValue[postKey].restaurant; 
  temp[slot].date = indvDate ? new Date(JSONValue[postKey].date) : new Date(JSONValue["date"]); 
  temp[slot].excerpt = JSONValue[postKey].excerpt; 
  temp[slot].body = JSONValue[postKey].body;   
 }

 
 
 console.log("temp: ");
 console.log(temp);
 return temp;
}

var items = parseJSON();
