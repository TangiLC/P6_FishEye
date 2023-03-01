//-----------------------dropdown menu sort---------------------------------



const dropOpen=document.querySelector('.dropOpen');
const dropClose=document.querySelector('.dropClose');
const dropFocus=document.querySelector('.firstLine');
const dropVisible1=document.querySelector('.dropVisible1');
const dropVisible2=document.querySelector('.dropVisible2');
const dropTotal=document.querySelector('.dropdown');
const galerieSect=document.querySelector('.galerie-section');

function dropDownClose(){
    console.log('close');
    [dropVisible1,dropVisible2,dropClose].forEach(function(e){e.style.display="none"});
    
    dropOpen.style.display="block";
    galerieSect.style.marginTop="20px";
}
function dropDownOpen(){
    console.log('open');
    [dropVisible1,dropVisible2,dropClose].forEach(function(e){e.style.display="block"});
    
    dropOpen.style.display="none";
    galerieSect.style.marginTop="-90px";
    dropFocus.focus();
}

dropOpen.focus();

['onmouseover', 'click'].forEach(function(event) { dropOpen.addEventListener(event, dropDownOpen());});
dropOpen.addEventListener("keydown", function() {
    if ( KeyboardEvent.code ==13 || KeyboardEvent.code==40 ) {dropDownOpen();}});   /*enter=13  down=40*/
    
['onmouseover', 'click'].forEach(function(event) { dropClose.addEventListener(event, dropDownClose());});    
dropClose.addEventListener("keydown", function() {
        if ( KeyboardEvent.code ==13 || KeyboardEvent.code==38 ) {dropDownClose();}});   /*enter=13  up=38*/
dropTotal.addEventListener("onmouseout",dropDownClose());
dropTotal.addEventListener("keydown", function() {
    if ( KeyboardEvent.code ==27 || KeyboardEvent.code==38 ) {dropDownClose();}});   /* esc=27  up=38*/
