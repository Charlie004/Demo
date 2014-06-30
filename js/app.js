App = Ember.Application.create();
console.log("Run!");
//var posts = parseJSON(JSONData); //See bottom
var bigDate = new Date(); //the date of the menu we are looking at

var onMenu2 = false;

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
    onMenu2 = true;
    return items;
  }
});

App.Menu1Route = Ember.Route.extend({
  model: function() {
    onMenu2 = false;
    return items1;
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

    $('#dateDisplay2').html(getDate());
      
	  updateMenu();

  },

  prev: function() {
      bigDate.setDate(bigDate.getDate() - 1);
	  $('#dateDisplay').html(getDate());
      $('#dateDisplay2').html(getDate());
	  updateMenu();
      console.log(items);
  }
});

Ember.Handlebars.helper('format-date', function(temp) {
  return temp.toLocaleDateString();
});

Ember.Handlebars.helper('setOnMenu1', function() {
  console.log("Menu 1");
  onMenu2 = false;
});

Ember.Handlebars.helper('setOnMenu2', function() {
  console.log("Menu 2");
  onMenu2 = true;
  bigDate = new Date();
  items = parseJSON();
  updateMenu();
});


Ember.Handlebars.helper('setBackButton', function() {
	$('#backButton').html('<a href="#/menu2/date"><button>Back</buttom></a>');
});


Ember.Handlebars.helper('get-date', getDate); //This needs to be a function! JK


var getDate = function getDate(){
  return bigDate.toLocaleDateString();
}

var JSONString1 = '{"1":{"title":"Hamburger(json1)?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"5":{"title":"Chicken Fingers2?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"6":{"title":"Chicken Fingers3?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."}}';


var JSONString2 = ['{"date":"06-29-2014","1":{"title":"Hamburger-1?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"5":{"title":"Chicken Fingers2?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"6":{"title":"Chicken Fingers3?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."}}',
                  '{"date":"06-30-2014","1":{"title":"Hamburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"5":{"title":"Chicken Fingers2?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"6":{"title":"Chicken Fingers3?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."}}',
                  '{"date":"07-01-2014","1":{"title":"Hamburger1?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh an Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger?!","restaurant":{"name":"Charlie\'s"},"excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"5":{"title":"Chicken Fingers2?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."},"6":{"title":"Chicken Fingers3?!","restaurant":{"name":"Charlie"},"excerpt":"A Yummy stuff","body":"A chicken."}}',
                  '{"1":{"title":"No items for this date.","restaurant":{"name":"N/A"},"excerpt":"Error","body":"Doesnt work because we are too lazy to enter in more test data."}}'];

var parseJSON = function (){
 var index = JSONString2.length-1;
 for(var i = 0; i < JSONString2.length; i++){
  var data = new Date(JSONString2[i].substring(9,19));

  if (data.toLocaleDateString() === getDate()){
    index = i;
    break;
  }
 }
 
 return parseJSONString(JSONString2[index]);
}


var parseJSONMenu1 = function (){
  return parseJSONString(JSONString1);
}


var parseJSONString = function(JSONString){
  var JSONValue = $.parseJSON(JSONString); 
  var temp = []
 for (var postKey in JSONValue){
  var slot = temp.length;
  if(postKey === "date"){
   continue;
  }
  temp[slot] = new Object();
  temp[slot].id = parseInt(postKey);
  temp[slot].title = JSONValue[postKey].title;
  temp[slot].restaurant = JSONValue[postKey].restaurant; 
  temp[slot].date = new Date(JSONValue[postKey].date); 
  temp[slot].excerpt = JSONValue[postKey].excerpt; 
  temp[slot].body = JSONValue[postKey].body;   
 }

 return temp;
}

var updateMenu = function(){
    items = parseJSON();
	//This function uses jQuery to update the menu items
	//It's ugly... but it works
	var begin = '<ul class="list" type=none align="middle"> <h4> <p> '+getDate()+' </p> </h4>';
	var end = '</ul>';
	var middle = "";
	for(var i = 0; i < items.length; i++){
	// 
	   middle += '<li><a href="#/'+i+'">'+items[i].title+'</a></li>';
	}

    var all = begin + middle + end;
	$('#menuItems').html(all);
}

var items1 = parseJSONMenu1();
var items = parseJSON();
