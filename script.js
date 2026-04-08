const body = document.querySelector("body");
const headerBtn = document.querySelector(".header-btn");
const headerBtnImg = document.querySelector(".btn-img")
const logo = document.querySelector(".logo-img");
const primaryTextColor = document.querySelectorAll("#text-area-style, .option-sec, .letter-title, .letter-label, .percentage, h1");
const checkBox = document.querySelectorAll('.option-sec p input[type="checkbox"]');

headerBtn.addEventListener("click", () => {
    body.classList.toggle("bg-light")
    headerBtn.classList.toggle("header-btn-light")

    /* Switch the logo */
    if (body.classList.contains("bg-light")) {
        logo.src = "./assets/images/logo-light-theme.svg";  
        headerBtnImg.src = "./assets/images/icon-moon.svg";
    } else {
        logo.src = "./assets/images/logo-dark-theme.svg";
        headerBtnImg.src = "./assets/images/icon-sun.svg";
    }

    primaryTextColor.forEach(el => {
        if(el.id === "text-area-style") {
            el.classList.toggle("bg-text-area-color")
        }
        el.classList.toggle("text-color")
        console.dir(el)
    });

    checkBox.forEach(el => {
        el.classList.toggle("checkBox-light")
    })
})
