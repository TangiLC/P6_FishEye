//-----------------------dropdown menu sort---------------------------------



const dropOpen=document.querySelector('.dropOpen');
const dropClose=document.querySelector('.dropClose');
const dropFocus=document.querySelector('.firstLine');
const dropVisible1=document.querySelector('.dropVisible1');
const dropVisible2=document.querySelector('.dropVisible2');
const dropTotal=document.querySelector('.dropdown');
function dropDownClose(){
    console.log('close');
    dropVisible1.style.display="none";
    dropVisible2.style.display="none";
    dropOpen.style.display="block";
    dropClose.style.display="none";
}
function dropDownOpen(){
    console.log('open');
    dropVisible1.style.display="block";
    dropVisible2.style.display="block";
    dropOpen.style.display="none";
    dropClose.style.display="block";
    dropFocus.focus();
}
dropOpen.focus();
['onmouseover', 'click'].forEach(function(event) { dropOpen.addEventListener(event, dropDownOpen());});
//dropOpen.addEventListener("onmouseover", dropDownOpen());
//dropOpen.addEventListener("click", dropDownOpen());
dropOpen.addEventListener("keydown", function() {
    if ( KeyboardEvent.code ==13 || KeyboardEvent.code==40 ) {dropDownOpen();}});   /*enter=13  down=40*/
dropClose.addEventListener("onmouseover", dropDownClose());
dropClose.addEventListener("click", dropDownClose());
dropClose.addEventListener("keydown", function() {
        if ( KeyboardEvent.code ==13 || KeyboardEvent.code==38 ) {dropDownClose();}});   /*enter=13  up=38*/
dropTotal.addEventListener("onmouseout",setTimeout(dropDownClose(),1000));
dropTotal.addEventListener("keydown", function() {
    if ( KeyboardEvent.code ==27 || KeyboardEvent.code==38 ) {dropDownOpen();}});   /* esc=27  up=38*/
