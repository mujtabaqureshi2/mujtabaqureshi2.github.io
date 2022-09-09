const nav = document.getElementById('nav')
const toggleCollapse = document.getElementById('toggle-collapse')
const toggleIcon = document.getElementById('toggle-icons');

function navBar(){
    nav.classList.add('collapse');
    toggleIcon.querySelector('i.fas').classList.remove('fa-bars');
    toggleIcon.querySelector('i.fas').classList.add('fa-xmark');

};

function delBar(){
    nav.classList.remove('collapse');
    toggleIcon.querySelector('i.fas').classList.add('fa-bars');
    toggleIcon.querySelector('i.fas').classList.remove('fa-xmark');
    

};



toggleCollapse.addEventListener('click',()=>{
     
     const isContain=  nav.classList.contains('collapse');
     if(isContain){
        delBar();
     }else{
        navBar();
     }
});




