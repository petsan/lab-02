'use strict'
let allHorns = [];
let keywords = [];
let page = 'data/page-1.json';
let sortOrder = 'default'

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

const pageLoad = (page, sortOrder) => {
  allHorns = [];
  keywords = [];
  $('main').empty();
  $('#dropdown').empty();

  let defaultOption = $('<option value="default">Filter by Keyword</option>')
  $('#dropdown').append(defaultOption);
  $.ajax(`${page}`, {method: 'GET', dataType: 'JSON'})
    .then(horns => {
      horns.forEach(value => {
        new Horns(value);
      })
    }).then(()=> {
      applySortOrder(sortOrder);
      allHorns.forEach((animal) => {
        animal.render();
      })
      keywords.forEach((keyword) =>{
        let stuff = `<option value = "${keyword}">${keyword}</option>`
        $('#dropdown').append(stuff);
      })
    })
}

$('select').on('change', function() {
  let $variable = $(this).val();
  if ($variable === 'default') {
    $('div').show();
  } else {
    $('div').hide();
    $(`div[class="${$variable}"]`).show();
  }
});

const applySortOrder = (sortOrder) => {
  if (sortOrder === 'alpha') {
    return allHorns.sort((a,b) => a.title > b.title ? 1 : -1 );
  } else if (sortOrder === 'horns') {
    return allHorns.sort((a,b) => b.horns - a.horns);
  }
}

$('#sort-by').on('change', function() {
  let $variable = $(this).val();
  if ($variable === 'default') {
    pageLoad(page, 'default');
  } else if ($variable === 'alpha'){
    pageLoad(page, 'alpha');
  } else if ($variable === 'num-horns') {
    pageLoad(page, 'horns');
  }
})

$('#load-page-1').on('click' , function() {
  page = 'data/page-1.json';
  pageLoad(page);
})

$('#load-page-2').on('click' , function() {
  page = 'data/page-2.json';
  pageLoad(page);
})

$(document).ready( () => {
  pageLoad(page, sortOrder);
});
