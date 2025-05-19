// cattura elementi
let navbar = document.querySelector("#navbar")
let navLinks = document.querySelectorAll(".nav-link")
let navItems = document.querySelectorAll(".nav-item")
let logo = document.querySelector("#logo")
let firstNumber = document.querySelector("#firstNumber")
let secondNumber = document.querySelector("#secondNumber")
let thirdNumber = document.querySelector("#thirdNumber")
let collapse = document.querySelector("#navbarSupportedContent")
let btnNavbar = document.querySelector(".navbar-toggler")
let btnNavbarIcon = document.querySelector(".navbar-toggler-icon")

// cambio navbar allo scroll della pagina
window.addEventListener("scroll", ()=>{

    let scroll = window.scrollY;

    if (scroll > 0) {
        navbar.classList.add("bg-scroll");
        changeNavbar("rgb(250, 250, 250)", "logoW", "rgb(250,250,250)", "rgb(250,250,250)" )

    }else {
        navbar.classList.remove("bg-scroll");
        changeNavbar("rgb(26,26,26)", "logoB", "rgb(250,250,250)","rgb(250,250,250)" )
    }

})

//cambio collapse su schermi piccoli
let confirm = false;
btnNavbar.addEventListener("click", ()=> {
    if(confirm == false) {
        navbarSupportedContent.classList.add("bg-gray");
        // perché non prende la classe ms-2? 

        // navLinks.add("tx-black", "ms-2");
        confirm = true;
    }
})


function changeNavbar( linkColor,  imgLogo, btnColor, btnColor2) {
    navLinks.forEach( (link)=> {
        link.style.color = linkColor;
        // link.addEventListener("mouseenter", ()=> {
        //     link.style.borderBottom = borderBcolor1

        // })

        // link.addEventListener("mouseleave", ()=> {
        //     link.style.borderBottom = borderBcolor2

        // })
    })
    logo.src = `http://127.0.0.1:5500/media/${imgLogo}.png`
    btnNavbar.style.color = btnColor;
    btnNavbarIcon.style.color = btnColor2;
}

// chiamata asincrona: funzione che resta in attesa che tutto il codice sincrono sia stato caricato e poi scatta
function createInterval(maxNumber, element, timing) {
    let counter = 0;

    let interval = setInterval(()=> {
        if (counter< maxNumber ) {
            counter++
            element.innerHTML = counter
        }else {
            clearInterval(interval);
        }
    }, timing);
}


let observer = new IntersectionObserver((entries)=>  {

    entries.forEach((entry)=>  {
        if (entry.isIntersecting && confirm == false) {
            createInterval(500,firstNumber, 40 );
            createInterval(2000,secondNumber, 10 );
            createInterval(5000,thirdNumber, 4);
            confirm = true
        }
    })
});

observer.observe(firstNumber);