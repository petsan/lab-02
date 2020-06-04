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

$('#togglePage1').on('click' , function() {
  if(event.target.value === 'data/page-1.json'){
    // pageOne = pageTwo
    page = 'data/page-2.json'
    pageLoad();
    console.log(event.target.value)
  }
})

$('#togglePage2').on('click' , function() {
  if(event.target.value === 'data/page-2.json'){
    // pageOne = pageTwo
    page = 'data/page-2.json'
    pageLoad();
    console.log(event.target.value)
  }
})

  // else if (event.target.value === 'data/page-1.json'){
  //   pageOne = event.target.value;

  //   console.log(event.target.value)
  //   pageLoad();
  // }

// function() {
//   console.log(pageTwo)
// }

// need if else
//if event.target = page2, chnage path in ajax call
//make filepath in ajax a template literal
pageLoad();
//if target value = page1, reload page 1
//need to clear the old render and replace with new images.