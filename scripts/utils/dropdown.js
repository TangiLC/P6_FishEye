//-----------------------dropdown menu sort---------------------------------

const dropBtn=document.querySelector('.dropbtn');
const dropDown=document.querySelector('.dropdown-content');
function dropDownClose(){
    console.log('close');
    dropDown.style.display="none";
    dropBtn.style.display="block";
}
function dropDownOpen(){
    console.log('open');
    dropBtn.style.display="none";
    dropDown.style.display="block";
    dropDown.focus();
}
dropBtn.focus();
dropBtn.addEventListener("onmouseover", dropDownOpen());
dropBtn.addEventListener("keydown", function() {
    if ( KeyboardEvent.code ==13 || KeyboardEvent.code==40 ) {dropDownOpen();}});   /*enter=13  down=40*/
dropBtn.addEventListener("onmouseout",setTimeout(dropDownClose(),1000));
dropBtn.addEventListener("keydown", function() {
    if ( KeyboardEvent.code ==27 || KeyboardEvent.code==38 ) {dropDownOpen();}});   /* esc=27  up=38*/
