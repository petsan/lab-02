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

Horns.prototype.render = function(){
  const myTemplate = $('#photo-template').html();
  const $newSection = $(`<section class="${this.keyword}">${myTemplate}</section>`);
  //replace with mustash
  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $('main').append($newSection);
}

let page = 'data/page-1.json';

let pageLoad = function() {
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
  page = 'data/page-1.json';
  console.log('load page 1');
  pageLoad();
})

$('#load-page-2').on('click' , function() {
  page = 'data/page-2.json';
  console.log('load page 2');
  pageLoad();
})

pageLoad();
//need to clear the old render and replace with new images.