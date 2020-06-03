'use strict'

// let allHorns = [];
// let keywords = [];

// function Horns(obj){
//   this.title = obj.title;
//   this.description = obj.description;
//   this.image_url = obj.image_url;
//   this.keyword = obj.keyword;
//   this.horns = obj.horns

//   allHorns.push(this);
//   if(!keywords.includes(this.keyword)){
//     keywords.push(this.keyword);
//   }
// }
let pages = [];
let pageDataset = [
  {
    'image_url': 'http://cdn.shopify.com/s/files/1/0288/5332/files/jackalope_in_the_wild_large.jpg?11502701639502724114',
    'title': 'Jackalope',
    'description': 'You know, just a jackalope in there for good measure. I know they don\'t have horns, but they have antlers. And they may or may not be real.',
    'keyword': 'jackalope',
    'horns': 2
  }
];

function Page(obj){
  for(let key in obj){
    this[key] = obj[key]
  }
  pages.push(this);
}

pageDataset.forEach(page => {
  new Page(page);
})


Page.prototype.toHtml = function(){
  let template = $('#page-template').html();
  let html = Mustache.render(template, this);
  return html;
}

pages.forEach(page => {
  // this will create the html
  let pageHtml = page.toHtml();

  // append to page
  $('#page').append(pageHtml);
})

// Horns.prototype.render = function(){
//   const myTemplate = $('#photo-template').html();
//   const $newSection = $(`<section class="${this.keyword}">${myTemplate}</section>`);
//   $newSection.find('h2').text(this.title);
//   $newSection.find('p').text(this.description);
//   $newSection.find('img').attr('src', this.image_url);
//   $('main').append($newSection);
// }

// $.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
//   .then(horns => {
//     horns.forEach(value => {
//       new Horns(value).render();
//     })
//   }).then(()=> {
//     keywords.forEach((keyword) =>{
//       let stuff = `<option value = "${keyword}">${keyword}</option>`
//       $('select').append(stuff);
//     })
//   });


// $('select').on('change', function() {
//   let $variable = $(this).val();
//   if ($variable === 'default') {
//     $('section').show();
//   } else {
//   $('section').hide();
//   $(`section[class="${$variable}"]`).show();
// }
// });
