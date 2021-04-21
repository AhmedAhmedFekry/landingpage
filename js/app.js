

//class section 
class Section {
    // make the last id of section by zero value when run project 
    last_id=0;

    // make the content html for every section created 
    get seactionHtmlConten(){
        return `
        <section id="section${this.last_id}" data-nav="section ${this.last_id}" class="active-class">
        <div class="landing__container">
        <h2>Section ${this.last_id}</h2>
        <p>tttttttttttttttttttttttttttttttttttttttttttttttt</p>
        </div>
        </section>
        `
    };
    // this function for adding new section 
    new_section(){
        this.last_id +=1;
        document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend',this.seactionHtmlConten);
    }
}// end class 



// class for navbar 
class Navbar {
    // menu elment select by id 
    menuElement = document.getElementById('navbar__list');
    buildMenu(){
        this.menuElement.innerHTML='';
        document.querySelectorAll('section').forEach(element =>{
            this.menuElement.insertAdjacentHTML("beforeend",`<li> <a class="menu__link" href="#${element.id}" data-section-id="${element.id}" >${element.dataset.nav}</a></li>`);
            
        });
        this.goToSection();
    }
    goToSection(){
        this.menuElement.addEventListener('click',function(event){
            event.preventDefault();
            document.getElementById(event.target.dataset.sectionId).scrollIntoView({behavior:'smooth'});
            addActiveClass(event.target.dataset.sectionId)
        });
    }
}
const section = new Section();
const menu = new Navbar()
const goToTopElement = document.getElementById('scrollToTop');

function new_section(){
    section.new_section();
    menu.buildMenu();
}

// function to scroll to top 

function scrollToTop(){
    goToTopElement.addEventListener('click', ()=>{
        window.scrollTo({
            top:0
        })
    });
}

// this function check which section show  on screen 
//  section_on_screen
function section_on_screen(element,buffer){
    buffer = typeof buffer ==='undefined' ? 0 : buffer;
    const bounding=element.getBoundingClientRect();
    if (bounding.top >= buffer && bounding.left && buffer.right <= 
        ((window.innerWidth || document.documentElement.clientWidth) -buffer) &&
        bounding.bottom <= ((window.innerHeight || document.documentElement.clientHeight) -buffer ) ){
            return true
        } else{
            return false
        }       
}

///  add even when the user scroll 
window.addEventListener('scroll',()=>{
    let scrollPrecent= ((window.innerHeight + window.scrollY)/document.body.offsetHeight)*100;

    if (scrollPrecent > 50 ){
        // show scroll top button if the scrollPrecent > 50
        goToTopElement.classList.remove('display__none');
    }
    else {
           // hide scroll top button if the scrollPrecent =< 50 
        goToTopElement.classList.add('display__none');
    }
    document.querySelectorAll('section').forEach(element =>{
        if(section_on_screen(element,-300)){
            addActiveClass(element.id)
        }
    });
});


// this function for add active class 
function addActiveClass(id){
    document.querySelector('.link__active')?.classList.remove('link__active');
    document.querySelector(`[href="#${id}"]`).classList.add('link__active')

    document.querySelector('.active-class')?.classList.remove('active-class');
    document.querySelector(`#${id}`).classList.add('active-class');
    // update location
    setTimeout(()=>{
        window.location.hash = id
    },0);
}



// calling this funtion to bluid new section 
section.new_section();
section.new_section();
section.new_section();
section.new_section();
section.new_section();
menu.buildMenu()
scrollToTop();