//----------remove whitespace around svgs-----------------//
Element.prototype.removeAttributes = function(...attrs) {
attrs.forEach(attr => this.removeAttribute(attr));
}

//round to 2 decimal places
//https://stackoverflow.com/a/11832950
function r(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

//remove svg whitespace
function svgRemoveWhitespace(svg) {
    let box = svg.getBBox(),
            viewBox = [
                r(box.x),
                r(box.y),
                r(box.width),
                r(box.height)
            ].join(' ');
    
    svg.setAttribute('viewBox', viewBox);
    svg.removeAttributes('width', 'height'); //optional
    // showNewViewbox(svg, viewBox);
}

//shows the new viewbox above the svg
function showNewViewbox(el, result) {
    let output = document.createElement('div');
    output.classList.add('output');
    output.textContent = result;
    el.insertAdjacentElement('beforebegin', output);
}

const svgs = document.querySelectorAll('svg');
svgs.forEach(svg => svgRemoveWhitespace(svg));
//----------remove whitespace around svgs-----------------//

// make the carousel scrollable
const carousel = document.querySelector('.products-carousel');
carousel.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    carousel.scrollLeft += evt.deltaY;
});

//hide all the products after 4th product in carousel in mobile view
if(window.innerWidth <= 580){
    for(var i=5; i<=7; i++){
        document.querySelector(".product-container:nth-child("+i+")").style.display = 'none';
    }
}

//toggle side menu when hamburger is clicked in mobile view
const mobileNav = document.querySelector(".mobile-nav");
const hamburger = document.querySelector(".mobile-nav .hamburger");
const navLinks = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click",()=>{
    document.querySelector(".navbar").classList.toggle("nav-active");
    document.querySelector("body").classList.toggle("body-toggle");

    mobileNav.classList.toggle('toggle');

    navLinks.forEach((link, index)=>{
        if(link.style.animation){
            link.style.animation = '';
        }else{
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 9 + 0.3}s`
        }
    })
})