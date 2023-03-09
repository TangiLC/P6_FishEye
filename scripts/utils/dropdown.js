
const dropOpen = document.querySelector('.dropOpen');
const dropClose = document.querySelector('.dropClose');
const dropFocus = document.querySelector('.firstLine');
const dropVisible1 = document.querySelector('.dropVisible1');
const dropVisible2 = document.querySelector('.dropVisible2');
const dropTotal = document.querySelector('.dropdown');
const galerieSect = document.querySelector('.galerie-section');

function dropDownClose () {
  console.log('close');
  [dropVisible1, dropVisible2, dropClose].forEach(function (e) {
    e.style.display = 'none';})

  dropOpen.style.display = 'block';
  galerieSect.style.marginTop = '20px';
}
function dropDownOpen () {
  console.log('open');
  [dropVisible1, dropVisible2, dropClose].forEach(function (e) {
    e.style.display = 'block';})

  dropOpen.style.display = 'none';
  galerieSect.style.marginTop = '-90px';
  dropFocus.focus();
}

