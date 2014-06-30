App = Ember.Application.create();
console.log("Run!");
//var posts = parseJSON(JSONData); //See bottom
var bigDate; //the date of the menu we are looking at


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
	  $('#dateDisplay').html(getDate());
      parseJSON();
  },

  prev: function() {
      bigDate.setDate(bigDate.getDate() - 1);
	  $('#dateDisplay').html(getDate());
      parseJSON();
      console.log(items);
  }
});

Ember.Handlebars.helper('format-date', function(temp) {
  return temp.toLocaleDateString();
});

Ember.Handlebars.helper('get-date', getDate); //This needs to be a function! JK

var getDate = function getDate(){
  return bigDate.toLocaleDateString();
}


var JSONString = ['{"date":"06-29-2014","1":{"title":"Hamburger-1?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"5":{"title":"Chicken Fingers2?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"6":{"title":"Chicken Fingers3?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."}}',
                  '{"date":"06-30-2014","1":{"title":"Hamburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"5":{"title":"Chicken Fingers2?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"6":{"title":"Chicken Fingers3?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."}}',
                  '{"date":"07-01-2014","1":{"title":"Hamburger1?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"5":{"title":"Chicken Fingers2?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"6":{"title":"Chicken Fingers3?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."}}'];


var parseJSON = function (){
    if(typeof bigDate === 'undefined'){ //No current date.. set it to today
    bigDate = new Date();
  } else {
    //Do nothing.
  }


 var temp = [];
 var index = 0;
 for(var i = 0; i < JSONString.length; i++){
  var data = new Date(JSONString[i].substring(9,19));

  if (data.toLocaleDateString() == getDate()){
    index = i;
    break;

  }
 }
 
 var JSONValue = $.parseJSON(JSONString[index]);
 var indvDate = typeof JSONValue["date"] === 'undefined';
 
 
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
