App = Ember.Application.create();
console.log("Run!");
//var posts = parseJSON(JSONData); //See bottom
var bigDate;


App.Router.map(function() {
  this.resource('about', function(){
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
	console.log("item: ");
	console.log(items.findBy('id', params.item_id));
    return items.findBy('id', params.item_id);
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

Ember.Handlebars.helper('format-date', function(date) {
  return bigDate.toLocaleDateString();
});


var JSONString = '{"1":{"title":"Hamburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers","restaurant":{"name":"Charlie"},"date":"06-15-2014","excerpt":"A Yummy stuff","body":"A chicken."}}';

//This one has dates attached to each food items instead of all of them

//var JSONString = '{"1":{"title":"Hamburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger","restaurant":{"name":"Charlie\'s"},"date":"06-15-2014","excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers","author":{"name":"Charlie"},"date":"06-15-2014","excerpt":"A Yummy stuff","body":"A chicken."}}'; 

var parseJSON = function (){

 var temp = [];
 //var JSONValue = $.getJSON("./JSON.html"); //From Web
 var JSONValue = $.parseJSON(JSONString);
 var indvDate = JSONValue["date"] === 'undefined';
 
 if( ! indvDate ){ //If one big date
	bigDate = new Date(JSONValue["date"]);
	//bigDate = new Date();
 } else {
    bigDate = new Date();
 }
 
 //console.log("data: "+JSON.stringify(JSONValue, null, 4));
 
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
