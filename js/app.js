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

let pageOne = 'data/page-1.json';

let pageTwo = 'data/page-2.json';



let pageLoad = function() {
  $.ajax(`${pageOne}`, {method: 'GET', dataType: 'JSON'})
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

$('#togglePage').on('click' , function() {
  if(event.target.value === 'page2'){
    pageOne = pageTwo
    pageLoad();
    console.log(pageOne)
  }
  console.log(event.target.value) ;
}
// function() {
//   console.log(pageTwo)
// }
)
// need if else
//if event.target = page2, chnage path in ajax call
//make filepath in ajax a template literal
pageLoad();
//if target value = page1, reload page 1
//need to clear the old render and replace with new images. 