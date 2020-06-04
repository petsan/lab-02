'use strict'

let allHorns = [];
let keywords = [];
let page = 'data/page-1.json';

const clearArrays = () => {
  allHorns = [];
  keywords = [];
}

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
  $.ajax(`${page}`, {method: 'GET', dataType: 'JSON'})
    .then(horns => {
      horns.forEach(value => {
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
    $('section').show();
  } else {
    $('section').hide();
    $(`section[class="${$variable}"]`).show();
  }
});


$('#load-page-1').on('click' , function() {
  clearArrays();
  pageLoad('load-page-1');
})

$('#load-page-2').on('click' , function() {
  console.log(allHorns, keywords)
  clearArrays();
  console.log(allHorns, keywords)
  page = 'data/page-2.json';
  pageLoad(page);
})

$('#sort').on('click', function(event){
  console.log(allHorns, keywords)
  clearArrays();
  console.log(allHorns, keywords)
  pageLoad(page)
})

$(document).ready( () => {
  // $('main').clear();
  pageLoad(page);
});
