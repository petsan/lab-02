'use strict'

let allHorns = [];
let keywords = [];
let page = 'data/page-1.json';
let sortOrder = 'sortAlpha'
console.log(allHorns);

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

const applySortOrder = (sortOrder) => {
  if (sortOrder === 'sortAlpha') {
    allHorns.sort((a,b) => { return a.title > b.title ? 1 : -1; });
  } else if (sortOrder === 'sortNum') {
    allHorns.sort((a,b) => { return a.horns - b.horns })
  } else {
    return allHorns;
  }
}

applySortOrder('sortNum'); //this is how to call it


Horns.prototype.render = function(){
  const template = $('#photos-template').html();
  const myTemplate = Mustache.render(template, this);
  $('main').append(myTemplate);
}

const pageLoad = (page) => {
  $('main').empty();
  $('select').empty();
  console.log(allHorns)
  applySortOrder('sortNum'); //this is how to call it
  console.log(allHorns)
  let defaultOption = $('<option value="default">Filter by Keyword</option>')
  $('select').append(defaultOption);
  $.ajax(`${page}`, {method: 'GET', dataType: 'JSON'})
    .then(horns => {
      horns.forEach(value => {
        // this needs to be broken off and shove an extra step:sorting
        new Horns(value).render();
      }) //look for lines 46-52 in demo
    }).then(()=> {
      keywords.forEach((keyword) =>{
        let stuff = `<option value = "${keyword}">${keyword}</option>`
        $('select').append(stuff);
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

$('#load-page-1').on('click' , function() {
  page = 'data/page-1.json';
  console.log('load page 1');
  pageLoad(page);
})

$('#load-page-2').on('click' , function() {
  page = 'data/page-2.json';
  console.log('load page 2');
  pageLoad(page);
})

$(document).ready( () => {
  // $('main').clear();
  pageLoad(page);
});
