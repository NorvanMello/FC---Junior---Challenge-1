const body = document.querySelector("body");
const headerBtn = document.querySelector(".header-btn");
const headerBtnImg = document.querySelector(".btn-img")
const logo = document.querySelector(".logo-img");

const checkBox = document.querySelectorAll('.option-sec p input[type="checkbox"]');

const letterDensity = document.querySelector(".letter-density");
const extraContent = document.querySelector(".extra-content");

const toggleBtn = document.querySelector(".toggle-btn")

/* Button - Dark/Light Mode */
headerBtn.addEventListener("click", () => {
    /* Selecting inside the event because before clicking, there is no element created - letter-label for instance */
    const primaryTextColor = document.querySelectorAll("#text-area-style, .option-sec, .letter-title, .letter-label, .percentage, .toggle-btn, h1");

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
    });

    checkBox.forEach(el => {
        el.classList.toggle("checkBox-light")
    })
})

/* Functions to work with user's input */
const totalChars = document.querySelector(".characters");
const excludeSpaces = document.getElementById("exclude-spaces");
const textArea = document.querySelector("#text-area-element")

let words = [];

function updateUI() {
    const text = textArea.value;
    const exclude = excludeSpaces.checked;

    console

    if(!exclude) {
        totalChars.innerText = `${String(text.length).padStart(2, '0')}`
    } else {
        let noBlankSpace = text.replace(/\s+/g, "");
        totalChars.innerText = `${String(noBlankSpace.length).padStart(2, '0')}`
    }

}

textArea.addEventListener("input", updateUI);
excludeSpaces.addEventListener("change", updateUI);

/* Output letters and bars */
const letters = ['a', 'b', 'c'];
const totalElementsVisible = 5;

function renderLetterDensity() {
    for(let i = 0; i < letters.length; i++) {
        if(i < 5) {
            letterDensity.innerHTML += `
            <ul class="list-container">
            <li class="list-item">
                <span class="letter-label">${letters[i].toUpperCase()}</span>

                <div class="progress-bar">
                  <div class="track-bar">
                    <div class="fill-bar"></div>
                  </div>
                </div>

                <span class="percentage"></span>
            </li>
          </ul>
        `
        } else {
            extraContent.innerHTML += `
                <ul class="list-container">
                <li class="list-item">
                    <span class="letter-label">${letters[i].toUpperCase()}</span>

                    <div class="progress-bar">
                    <div class="track-bar">
                        <div class="fill-bar"></div>
                    </div>
                    </div>

                    <span class="percentage"></span>
                </li>
                </ul>
            `
            toggleBtn.innerHTML = `
            See more
            <span class="arrow"></span>`
        }
        
    }
}

/* Button - Modify Text and Arrow */

toggleBtn.addEventListener('click', (e) => {
    extraContent.classList.toggle("block")
    
    if(extraContent.classList.contains("block")) {
        toggleBtn.innerHTML = `
            See less
            <span class="arrow open"></span>`
    } else {
        toggleBtn.innerHTML = `
            See more
            <span class="arrow"></span>` 
    }

    
})

renderLetterDensity();
