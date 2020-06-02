'use strict'

let allDogs = [];

function Dog(obj){
  this.name = obj.name;
  this.hobbies = obj.hobbies;
  this.image_url = obj.image_url;
  allDogs.push(this);
}
Dog.prototype.render = function(){
  // I need to render the object instances to the index page
    // prototype -
     // get my template
     // make a copy of it
     // fill it with my object instance
     // append it to the DOM

  //selecting all the htl in the template
  const myTemplate = $('#dog-template').html();

  //creat a new section
  const $newSection = $('<section></section');

  //fill new section with the html template
  $newSection(myTemplate);

  //fill this with my object instance
  $newSection(myTemplate);

  //fill the h2 with the name
  $newSection.find('h2').text(this.name);

  //fill the p with the hobbies
  $newSection.find('p').text(this.hobbies);

  //fill the src of the im to the image_url
  $newSection.find('img').attr('src', this.image_url);

  // append to the DOM
  $('main').append($newSection);
}

//get data and make new object instances with it
$.ajax('page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(dogs => {

    // do something with that data
    // data only exists here
    console.log(dogs)

    dogs.foreach(value => {
      new Dog(value).render();
    });
  })

  // data does not exist down here