

//class section 
class Section {
    // make the last id of section by zero value when run project 
    last_id=0;

    // make the content html for every section created 
    get seactionHtmlConten(){
        return `
        <section id="section${this.last_id}" data-n="section ${this.last_id}" class="activeClass">
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
class Nav {
    // menu elment select by id 
    menuElement = document.getElementById('navbar__list');
    buildMenu(){
        this.menuElement.innerHTML='';
        document.querySelectorAll('section').forEach(element =>{
            this.menuElement.insertAdjacentHTML("beforeend",`<li> <a class="menu__link" href="#${element.id}" data-section-id="${element.id}" >${element.dataset.n}</a></li>`);
            
        });
        this.to_section();
    }
    to_section(){
        this.menuElement.addEventListener('click',function(event){
            event.preventDefault();
            document.getElementById(event.target.dataset.sectionId).scrollIntoView({behavior:'smooth'});
            activeClass(event.target.dataset.sectionId)
        });
    }
}
const section = new Section();
const menu = new Nav()
const TopElement = document.getElementById('scrollToTop');

function new_section(){
    section.new_section();
    menu.buildMenu();
}

// function to scroll to top 

function scrollToTop(){
    TopElement.addEventListener('click', ()=>{
        window.scrollTo({
            top:0
        })
    });
}

// this function check which section show  on screen 
//  section_on_screen
function section_on_screen(element,buffer){
    buffer = typeof buffer ==='undefined' ? 0 : buffer;
    const b=element.getBoundingClientRect();
    if (b.top >= buffer && b.left && buffer.right <= 
        ((window.innerWidth || document.documentElement.clientWidth) -buffer) &&
        b.bottom <= ((window.innerHeight || document.documentElement.clientHeight) -buffer ) ){
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
        TopElement.classList.remove('noDisplay');
    }
    else {
           // hide scroll top button if the scrollPrecent =< 50 
        TopElement.classList.add('noDisplay');
    }
    document.querySelectorAll('section').forEach(element =>{
        if(section_on_screen(element,-200)){
            activeClass(element.id)
        }
    });
});


// this function for add active class 
function activeClass(id){
    document.querySelector('.activeClass')?.classList.remove('activeClass');
    document.querySelector(`#${id}`).classList.add('activeClass');
    document.querySelector('.linkActive')?.classList.remove('linkActive');
    document.querySelector(`[href="#${id}"]`).classList.add('linkActive')

   
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