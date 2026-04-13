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
const textArea = document.querySelector("#text-area-element");
const characterLimit = document.getElementById("character-limit");
const characterLimitText = document.querySelector(".character-limit-text");
const errorText = document.querySelector(".error-text");

let maxLengh = 300;

function updateUI() {
    const text = textArea.value;
    const exclude = excludeSpaces.checked;
    const limit = characterLimit.checked;
    let noBlankSpace = text.replace(/\s+/g, "");

    /* Check if exclude spaces is selected - Output total Characters*/
    if(!exclude) {
        totalChars.innerText = `${String(text.length).padStart(2, '0')}`; // Output the count with blank spaces
    } else { 
        totalChars.innerText = `${String(noBlankSpace.length).padStart(2, '0')}`; //Output the count with no blank spaces
    }


    /* Check if limit checkbox is selected */
    console.log(limit)
    if(limit) {
        /* When selected, make the span with class character-limit-text visible and set a character limit */
        characterLimitText.classList.add("block");
        textArea.setAttribute("maxlength", 300)

        /* Check if exclude spaces is selected */
        if(!exclude) {
            characterLimitText.innerText = `${Math.max(0, maxLengh - text.length)}`; // Output the count with blank spaces
        } else {
            characterLimitText.innerText = `${Math.max(0, maxLengh - noBlankSpace.length)}`; //Output the count with no blank spaces
        }
        
        if(text.length >= textArea.maxLength) { //Check if text inside text area is equal or bigger than maxlength
            textArea.classList.add("error"); //Add error class (orange border)
            if(text.length > textArea.maxLength) { // Check if text insde text are is bigger than maxlength
                errorText.classList.add("block") // Make error text visible
            } else {
                errorText.classList.remove("block") //Make error text invisible
            }
        } else {
            textArea.classList.remove("error"); // Remove the orange border
        }
    } else {
        characterLimitText.classList.remove("block"); // Remove counter character limit
        textArea.removeAttribute("maxlength") // Remove maxlength attribute (users can type as long as they deserve)
    }
}

textArea.addEventListener("input", updateUI);
excludeSpaces.addEventListener("change", updateUI);
characterLimit.addEventListener("change", updateUI);

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
