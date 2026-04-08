const body = document.querySelector("body");
const headerBtn = document.querySelector(".header-btn");
const primaryTextColor = document.querySelectorAll("#text-area-style, .option-sec, .letter-title, .letter-label, .percentage, h1")
const checkBox = document.querySelectorAll('.option-sec p input[type="checkbox"]');

// const styles = window.getComputedStyle(body);



headerBtn.addEventListener("click", () => {
    body.classList.toggle("bg-light")

    primaryTextColor.forEach(el => {
        el.classList.toggle("text-color")
    });

    checkBox.forEach(el => {
        el.classList.toggle("checkBox-light")
    })
    
})
