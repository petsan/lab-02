'use strict'

let allHorns = [];
let keywords = [];
let page = 'data/page-1.json';

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

Horns.prototype.render = function(){
  const template = $('#photos-template').html();
  const myTemplate = Mustache.render(template, this);
  $('main').append(myTemplate);
}

const pageLoad = (page) => {
  // clearing the page
  allHorns = [];
  keywords = [];
  $('main').empty();
  $('#dropdown').empty();

  console.log('32' + keywords)
  //making the animal objects
  makeHorns(page);

  // here we need to sort
  console.log('37' + keywords)
  //start rendering everything
  let defaultOption = $('<option value="default">Filter by Keyword</option>')
  $('#dropdown').append(defaultOption);
  // $('#dropdown').append(`<option value = "${'hi'}">${'hi'}</option>`);
  // console.log('start to process keywords', keywords);
  console.log('43' + keywords)
  console.log(page);
  for (var i = 0; i < keywords.length; i++) {
    console.log(page);
  }
  keywords.forEach((keyword) =>{
    console.log('45' + keyword);
    // let stuff = $(`<option value = "${keyword}">${keyword}</option>`);
    // $('#dropdown').append(stuff);

  })


  // console.log(keywords)
  // keywords.forEach((key) => {
  //   console.log('49' + key);
  // })


  allHorns.forEach((animal) => {
    console.log(animal.title);
    animal.render();
  })
}

function makeHorns(page) {
  $.ajax(`${page}`, {method: 'GET', dataType: 'JSON'})
    .then(horns => {
      horns.forEach(value => {
        new Horns(value).render();
        // console.log(Horns)
      })
    })
}



$('#dropdown').on('change', function() {
  let $variable = $(this).val();
  if ($variable === 'default') {
    $('div').show();
  } else {
    $('div').hide();
    $(`div[class="${$variable}"]`).show();
  }
});

const applySortOrder = (sortOrder) => {
 if (sortOrder === 'sortAlpha') {
    allHorns.sort((a,b) => { return a.title > b.title ? 1 : -1; });
  } else if (sortOrder === 'sortNum') {
    allHorns.sort((a,b) => { return a.horns - b.horns ? 1 : -1; });
  } else {
    return allHorns;
  }
  // return allHorns;
}

$('#sort-by').on('change', function() {
  let $variable = $(this).val();
  if ($variable === 'default') {
    console.log('default');
  } else if ($variable === 'alpha'){
    console.log('alpha');
    applySortOrder('sortAlpha')
    pageLoad(page);
  } else if ($variable === 'num-horns') {
    console.log('horns')
    applySortOrder('sortAlpha');
    pageLoad(page);
  }
});

$('#load-page-1').on('click' , function() {
  page = 'data/page-1.json';
  pageLoad(page);
})

$('#load-page-2').on('click' , function() {
  page = 'data/page-2.json';
  pageLoad(page);
})

$(document).ready( () => {
  pageLoad(page);
});
