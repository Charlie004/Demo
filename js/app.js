App = Ember.Application.create();
console.log("Run!");

//var posts = parseJSON(JSONData); //See bottom

App.Router.map(function() {
  this.resource('about');
  this.resource('posts');
  this.resource('post', { path: ':post_id' });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
	console.log("Post: ");
	console.log(posts.findBy('id', params.post_id));
    return posts.findBy('id', params.post_id);
  }
});

App.PostController = Ember.ObjectController.extend({
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
  return moment(date).fromNow();
});


var JSONString = '{"1":{"title":"Hamburger","author":{"name":"Zach"},"date":"06-12-2014","excerpt":"A tasty burger","body":"A delicious burger made of well... burger. 100 Cal. $17.99"},"2":{"title":"Cheeseburger","author":{"name":"Zach"},"date":"06-13-2014","excerpt":"A tasty cheese burger","body":"A delicious burger made of well... burger.. oh and Cheese!. 100 Cal. $17.99"},"3":{"title":"Veggiburger","author":{"name":"Zach"},"date":"06-14-2014","excerpt":"A tasty veggiburger","body":"A delicious burger made of well... plants. 100 Cal. $17.99"},"4":{"title":"Chicken Fingers","author":{"name":"Charlie"},"date":"06-15-2014","excerpt":"A Yummy stuff","body":"A chicken."}}';

var parseJSON = function (){

 var temp = [];
 //var JSONValue = $.getJSON("./JSON.html"); //From Web
 var JSONValue = $.parseJSON(JSONString);
 
 //console.log("data: "+JSON.stringify(JSONValue, null, 4));
 for (var postKey in JSONValue){
  var slot = temp.length;

  temp[slot] = new Object();
  temp[slot].id = parseInt(postKey);
  temp[slot].title = JSONValue[postKey].title;
  temp[slot].author = JSONValue[postKey].author; 
  temp[slot].date = new Date(JSONValue[postKey].date); 
  temp[slot].excerpt = JSONValue[postKey].excerpt; 
  temp[slot].body = JSONValue[postKey].body;   
 }
 console.log("temp: ");
 console.log(temp);
 return temp;
}

var posts = parseJSON();

/*
var posts = [{
  id: '1',
  title: "Human Nature I",
  author: {name: "John S."},
  date: new Date('6-12-2014'),
  excerpt: "Human Nature:",
  body: "It has always seemed strange to me... the things we admire in men, kindness and generosity, openness, honesty, understanding and feeling, are the concomitants of failure in our system. And those traits we detest, sharpness, greed, acquisitiveness, meanness, egotism and self-interest, are the traits of success. And while men admire the quality of the first they love the produce of the second."
}, {
  id: '2',
  title: "A Blog Post",
  author: {name: "John S."},
  date: new Date('6-16-2014'),
  excerpt: "Change:",
  body: "Men do change, and change comes like a little wind that ruffles the curtains at dawn, and it comes like the stealthy perfume of wildflowers hidden in the grass."
}, {
  id: '3',
  title: "Teaching",
  author: {name: "John S."},
  date: new Date('6-19-2014'),
  excerpt: "Teacher:",
  body: "I have come to believe that a great teacher is a great artist and that there are as few as there are any other great artists. Teaching might even be the greatest of the arts since the medium is the human mind and spirit."
}, {
  id: '4',
  title: "How I Live",
  author: {name: "John S."},
  date: new Date('6-21-2014'),
  excerpt: "Philosophy:",
  body: "I have always lived violently, drunk hugely, eaten too much or not at all, slept around the clock or missed two nights of sleeping, worked too hard and too long in glory, or slobbed for a time in utter laziness. I've lifted, pulled, chopped, climbed, made love with joy and taken my hangovers as a consequence, not as a punishment."
}, {
  id: '5',
  title: "Human Nature II",
  author: {name: "John S."},
  date: new Date('6-24-2014'),
  excerpt: "More Human Nature:",
  body: "I believe that there is one story in the world, and only one. . . Humans are caught in their lives, in their thoughts, in their hungers and ambitions, in their avarice and cruelty, and in their kindness and generosity too in a net of good and evil. . . There is no other story. A man, after he has brushed off the dust and chips of his life, will have left only the hard, clean questions: Was it good or was it evil? Have I done well or ill?"
}, {
  id: '6',
  title: "Human Nature III",
  author: {name: "John S."},
  date: new Date('6-25-2014'),
  excerpt: "The Human Mind:",
  body: "And this I believe: that the free, exploring mind of the individual human is the most valuable thing in the world. And this I would fight for: the freedom of the mind to take any direction it wishes, undirected. And this I must fight against: any idea, religion, or government which limits or destroys the individual. This is what I am and what I am about."
}];
*/