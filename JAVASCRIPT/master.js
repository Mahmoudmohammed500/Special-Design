//get color from local storage
let maincolor = localStorage.getItem("color-option");
if (maincolor !== null) {
    document.documentElement.style.setProperty("--main-color", maincolor);

} else {
    console.log("null");
}

let toggle = true;
let settingbox = document.getElementById("box");
// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    // Toggle Class Fa-spin For Rotation on Self
    this.classList.toggle("fa-spin");
    // Toggle Class Open On Main Settings Box
    if (toggle) {
        settingbox.style.left = "0";
        toggle = false;
    } else {
        settingbox.style.left = "-200px";
        toggle = true;
    }
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
for (var i = 0; i < colorsLi.length; i++) {

    // Click On Every List Items
    colorsLi[i].addEventListener("click", (e) => {
        // Set Color On Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        //set color on localstorage
        localStorage.setItem("color-option", e.target.dataset.color);
        handleActive(e);
    });
}
let backgroundoption = true;
let backgroundtnteveral;

let backgroundlocalitem = localStorage.getItem("background-option");
if (backgroundlocalitem !== null) {
    if (backgroundlocalitem === true) {
        backgroundoption = true;
    } else {
        backgroundoption = false;
    }
}

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans
randomBackEl.forEach(span => {

    // Click On Every Span
    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeimages();

            localStorage.setItem("background_option", true);

        } else {

            backgroundOption = false;

            clearInterval(backgroundtnteveral);

            localStorage.setItem("background_option", false);

        }

    });

});

//background photos change
/* Select Landing */
let landing = document.querySelector(".landing-page");
/* Get array of photos */
let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg"];
function randomizeimages() {
    backgroundtnteveral = setInterval(() => {
        /* get random number */
        let randomnumber = Math.floor(Math.random() * images.length);
        console.log(randomnumber);
        /* change background*/
        landing.style.backgroundImage = 'url("Images/' + images[randomnumber] + '")';
    }, 10000);
}


//chang skill progress on scroling
//sellect skills selector
let ourskills = document.querySelector(".skills");

window.onscroll = function () {
    // skills offset top
    let skillofsettop = ourskills.offsetTop;
    // skills outer height
    let skillsouterheight = ourskills.offsetHeight;
    // window height
    let windowheight = this.innerHeight;
    // window scroll top
    let windowscrolltop = this.pageYOffset;

    if (windowscrolltop > skillofsettop + skillsouterheight - windowheight) {
        let allskills = document.querySelectorAll(".skill-box .skill-progress span");
        allskills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add Class To Overlay
        overlay.className = 'popup-overlay';

        // Append Overlay To The Body
        document.body.appendChild(overlay);

        // Create The Popup Box
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            // Create Heading
            let imgHeading = document.createElement("h3");

            // Create text For Heading
            let imgText = document.createTextNode(img.alt);

            // Append The Text To The Heading
            imgHeading.appendChild(imgText);

            // Append The Heading To The Popup Box
            popupBox.appendChild(imgHeading);

        }

        // Create The Image
        let popupImage = document.createElement("img");

        // Set Image Source
        popupImage.src = img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        // Append The Popup Box To Body
        document.body.appendChild(popupBox);

        // Create The Close Span
        let closeButton = document.createElement("span");

        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = 'close-button';

        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);

    });

});

// Close Popup
document.addEventListener("click", function (e) {

    if (e.target.className == 'close-button') {

        // Remove The Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();

    }

});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            });

        });

    });

}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev) {

    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    // Add Active Class On Self
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');

        }

        handleActive(e);

    });

});

// Reset Button
document.querySelector(".reset-options").onclick = function () {

    localStorage.clear();
    // another way to clear some of storage only
    // localStorage.removeItem("color_option");
    // localStorage.removeItem("background_option");
    // localStorage.removeItem("bullets_option");

    // Reload Window
    window.location.reload();

};

// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop Propagation
    e.stopPropagation();

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // Check If Menu Is Open
        if (tLinks.classList.contains("open")) {

            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");

        }

    }

});

// Stop Propagation On Menu 
tLinks.onclick = function (e) {
    e.stopPropagation();
}