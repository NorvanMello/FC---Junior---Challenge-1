    const body = document.querySelector("body");
    const headerBtn = document.querySelector(".header-btn");
    const headerBtnImg = document.querySelector(".btn-img")
    const logo = document.querySelector(".logo-img");

    // const checkBox = document.querySelectorAll('.option-sec p input[type="checkbox"]');

    const letterDensity = document.querySelector(".letter-list ul");
    const extraContent = document.querySelector(".extra-content");

    const toggleBtn = document.querySelector(".toggle-btn")

    if(headerBtn) {
         /* Button - Dark/Light Mode */
        headerBtn.addEventListener("click", () => {

        body.classList.toggle("bg-light")
        // headerBtn.classList.toggle("header-btn-light")

        /* Switch the logo */
        if (body.classList.contains("bg-light")) {
            logo.src = "./assets/images/logo-light-theme.svg";  
            headerBtnImg.src = "./assets/images/icon-moon.svg";
        } else {
            logo.src = "./assets/images/logo-dark-theme.svg";
            headerBtnImg.src = "./assets/images/icon-sun.svg";
        }
    })
    }

    /* Functions to work with user's input */
    const totalChars = document.querySelector(".characters");
    const excludeSpaces = document.getElementById("exclude-spaces");
    const textArea = document.querySelector("#text-area-element");
    const characterLimit = document.getElementById("character-limit");
    const characterLimitDisplay = document.querySelector(".character-limit-display");
    const errorText = document.querySelector(".error-text");

    const words = document.querySelector(".words");

    const sentences = document.querySelector(".sentences");

    const MAX_LENGTH = 30;

    function updateUI() {
        const text = textArea.value;
        let noBlankSpace = text.replace(/\s+/g, "");
        
        updateCharacterCount(text, noBlankSpace);

        wordCount(text);

        sentenceCount(text);

        extractLetters(text, noBlankSpace);
    }

    function getCurrentCharacterCount(text, noBlankSpace, exclude) {
        return exclude ? noBlankSpace.length : text.length;
    }

    function renderCharacterCount(count) {
        totalChars.innerText = String(count).padStart(2, '0')
    }

    function clearErrorMessage() {
        errorText.classList.remove("flex");
        errorText.innerHTML = "";
    }

    function updateLimitUI(count, textSize) {

        characterLimitDisplay.classList.add("block");
        textArea.setAttribute("maxlength", MAX_LENGTH)

        const remaining = Math.max(0, MAX_LENGTH - count)
        characterLimitDisplay.innerText = String(remaining).padStart(2, '0');

        if(textSize >= MAX_LENGTH) {
            textArea.classList.add("error");
            if(textSize > MAX_LENGTH) {
                errorText.classList.add("flex");
                errorText.innerHTML = `<img src="./assets/images/icon-info.svg" alt="">Limit reached! Your text exceeds ${MAX_LENGTH} characters.`
            } else {
                clearErrorMessage();
            }
        } else {
            textArea.classList.remove("error");
        }
    }

    function resetLimitUI() {
        characterLimitDisplay.classList.remove("block");
        textArea.removeAttribute("maxlength");

        clearErrorMessage();
        textArea.classList.remove("error");
    }

    function updateCharacterCount(text, noBlankSpace) {
        const exclude = excludeSpaces.checked;
        const limit = characterLimit.checked;

        const currentCount = getCurrentCharacterCount(text, noBlankSpace, exclude);
        renderCharacterCount(currentCount);

        if(limit) {
            updateLimitUI(currentCount, text.length)
        } else {
            resetLimitUI()
        }
    }

    /* Counting Words */
    function wordCount(text) {
        const wordsToCount = text.trim().split(/\s+/).filter(w => w !== ""); // Removing spacing at start and end. Split the string into elements in an array, using space as separator. Filtering to keep non empty words.
        const total = String(wordsToCount.length).padStart(2, '0');
        words.innerText = total;
    }

    /* Counting Sentences */
    function sentenceCount(text) {
        const segmenter = new Intl.Segmenter('en-US', { granularity: 'sentence' });
        const segmentos = segmenter.segment(text);
        sentences.innerText = String(Array.from(segmentos).length).padStart(2, '0');
    }

    /* Event Listener */
    textArea.addEventListener("input", updateUI);
    excludeSpaces.addEventListener("change", updateUI);
    characterLimit.addEventListener("change", updateUI);

    function createLetterItem(letter, percentage) {
        return `
            <li class="list-item list-container">
                <span class="letter-label">${letter.toUpperCase()}</span>

                <div class="progress-bar">
                    <div class="track-bar">
                    <div class="fill-bar" style="width: ${percentage}%" ></div>
                    </div>
                </div>

                <span class="percentage">${percentage}%</span>
            </li> `
    }

    function updateToggleButton(hasExtraContent, isExpanded) {
        if(hasExtraContent && !isExpanded) {
            toggleBtn.innerHTML = `
                See more
                <span class="arrow"></span>`

            extraContent.setAttribute("aria-hidden", "true");
        } else if(hasExtraContent && isExpanded) {
            toggleBtn.innerHTML = `
                See less
                <span class="arrow open"></span>`

            extraContent.setAttribute("aria-hidden", "false");
        } else {
            toggleBtn.innerHTML = "";
            extraContent.setAttribute("aria-hidden", "true");
        }
    }

    /* Output letters and bars */
    const totalElementsVisible = 5;

    function letterCounts(letterObj, noBlankSpace) {
        letterDensity.innerHTML = '';
        extraContent.innerHTML = '';
        toggleBtn.innerHTML = '';
        extraContent.classList.remove("block");

        if(noBlankSpace.length === 0) {
            return;
        }

        const sortedLetters = Object.entries(letterObj).sort((a, b) => b[1] - a[1]);
        let visibleHTML = "";
        let extraHTML = "";

        /* My style using map + join */
        const letterItems = sortedLetters.map(([letter, count]) => {
            const percentage = ((count / noBlankSpace.length) * 100).toFixed(2);

            return {
                letter,
                count,
                percentage,
                html: createLetterItem(letter, percentage)
            }
        })

        visibleHTML = letterItems
            .slice(0, totalElementsVisible)
            .map(item => item.html)
            .join("");

        extraHTML = letterItems
            .slice(totalElementsVisible)
            .map(item => item.html)
            .join("")

        letterDensity.innerHTML = visibleHTML;
        extraContent.innerHTML = extraHTML;

        const hasExtraContent = sortedLetters.length > totalElementsVisible;
        const isExpanded = false;

        updateToggleButton(hasExtraContent, isExpanded);
    }

    toggleBtn.addEventListener("click", () => {
        extraContent.classList.toggle("block")

        const isExpanded = extraContent.classList.contains("block");
        const hasExtraContent = extraContent.innerHTML !== "";

        updateToggleButton(hasExtraContent, isExpanded);
    })

    function extractLetters (text, noBlankSpace) {
        let lettersObj = {};

        let cleanText = text.toUpperCase().replace(/[^a-zA-Z]/g, "")

        for(let letter of cleanText) {
            if(lettersObj[letter]) {
                lettersObj[letter] += 1
            } else {
                lettersObj[letter] = 1;
            }
        }

        letterCounts(lettersObj, noBlankSpace)
    }

    // letterCounts();
