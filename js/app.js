'use strict'

let allHorns = [];
let keywords = [];

function Horns(obj){
  this.title = obj.title;
  this.description = obj.description;
  this.image_url = obj.image_url;
  this.keyword = obj.keyword;
  this.horns = obj.horns

  allHorns.push(this);
  if(!keywords.includes(this.keyword)){
    keywords.push(this.keyword);
  }
}


// const dropdownTemplate = $('#dropdown-template').html();
// const $newOption = $(`<option>${dropdownTemplate}</option>`);
// console.log(keywords)

// let stuff = keywords[0];

// console.log(keywords[0])

// $newOption.find('option').text('hello')

Horns.prototype.render = function(){
  // I need to render the object instances to the index page
  // prototype -
  // get my template
  // make a copy of it
  // fill it with my object instance
  // append it to the DOM

  //selecting all the htl in the template
  const myTemplate = $('#photo-template').html();

  //creat a new section
  // const $newSection = $('<section></section>');
  const $newSection = $(`<section>${myTemplate}</section>`);
  // keywords.forEach((keyword) =>{
  //   let stuff = `<option value = "${keyword}">${keyword}</option>`
  //   $('select').append(stuff);

  // })

  //fill new section with the html template
  // $newSection(myTemplate);

  //fill this with my object instance
  // $newSection(myTemplate);
  
  //fill the h2 with the name
  $newSection.find('h2').text(this.title);
  
  //fill the p with the hobbies
  $newSection.find('p').text(this.description);
  
  //fill the src of the im to the image_url
  $newSection.find('img').attr('src', this.image_url);

  // $newSection.find('.keyword').text(this.keyword);
  
  // append to the DOM
  $('main').append($newSection);
}

//get data and make new object instances with it
$.ajax('/data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(horns => {
  
    // do something with that data
    // data only exists here
    console.log(horns)
  
    horns.forEach(value => {
      new Horns(value).render();
    })
    }).then(()=> {
      keywords.forEach((keyword) =>{
        let stuff = `<option value = "${keyword}">${keyword}</option>`
        $('select').append(stuff);
    
      })
  })

// data does not exist down here
// const distinctKeywords = [...new Set(allHorns.map(x => x.keyword))]

// console.log(distinctKeywords)

// Horns.prototype.addkeyword = function(){
//   if(keywords.includes(this.keyword)){
//     keywords.push(this.keyword)
//   }
// }

//$keywords