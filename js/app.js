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
  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $('main').append($newSection);
}

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(horns => {
    horns.forEach(value => {
      new Horns(value).render();
    })
  }).then(()=> {
    keywords.forEach((keyword) =>{
      let stuff = `<option value = "${keyword}">${keyword}</option>`
      $('select').append(stuff);
    })
  });


$('select').on('change', function() {
  let $variable = $(this).val();
  if ($variable === 'default') {
    $('section').show();
  } else {
  $('section').hide();
  $(`section[class="${$variable}"]`).show();
}
});
