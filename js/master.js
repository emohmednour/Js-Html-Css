// check if there is loval storage color option
let mainColors = localStorage.getItem("color_options");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main--color", mainColors);
  // remove active class from all color item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      // add
      element.classList.add("active");
    }
  });
}

//Variabel To Control The background Interval
let backgoroundinterval;
// RNDOM BACKGROUND OPTION
let randombackoption = true;

// check if there is local storage random background storage
let backgoroundlocalItem = localStorage.getItem("backgoround_option");
if (backgoroundlocalItem !== null) {
  if (backgoroundlocalItem === "true") {
    backgoroundlocalItem = true;
  } else {
    backgoroundlocalItem = false;
  }
  //remove active
  document.querySelectorAll(".random-backgoround span").forEach((element) => {
    element.classList.remove("active");
  });
  // add active
  if (backgoroundlocalItem === "true") {
    document.querySelector(".random-backgoround .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgoround .no").classList.add("active");
  }
}

// toggel icon spin
document.querySelector(".toggel-sttings .fa-gear").onclick = function () {
  // toggel spin in self
  this.classList.toggle("fa-spin");
  // toggel open settings list
  document.querySelector(".setting-box").classList.toggle("open");
};

// Switch color
const colorlis = document.querySelectorAll(".colors-list li");
// loop on items
colorlis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    //set color on local storage
    localStorage.setItem("color_options", e.target.dataset.color);

    handelActive(e);
  });
});

// Switch backgrouind option
const colorgt = document.querySelectorAll(".random-backgoround span");
// loop on all spans
colorgt.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    handelActive(e);
    if (e.target.dataset.background === "yes") {
      randombackoption = true;
      randomizeOption();
      localStorage.setItem("backgoround_option", true);
    } else {
      randombackoption = false;
      clearInterval(backgoroundinterval);
      localStorage.setItem("backgoround_option", false);
    }
  });
});

//show or hide bullets
let bulletspan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");

let bulletlocalItem = localStorage.getItem("bullets_option");
if (bulletlocalItem !== null) {
  bulletspan.forEach((span) => {
    span.classList.remove("active");
    if (bulletlocalItem === "block") {
      bulletContainer.style.display = "block";

      document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
      bulletContainer.style.display = "none";

      document.querySelector(".bullets-option .no").classList.add("active");
    }
  });
}
// loop on all span
bulletspan.forEach((span) => {
  // click on anyu span
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "Show") {
      bulletContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handelActive(e);
  });
});

let landingPage = document.querySelector(".landing-page");

let arrayimages = ["01.jpg", "02.jpg", "03.avif", "04.avif"];
//Function to RanfomizeImge
function randomizeOption() {
  if (randombackoption) {
    backgoroundinterval = setInterval(() => {
      let random = Math.floor(Math.random() * arrayimages.length);
      landingPage.style.backgroundImage =
        'url("image/' + arrayimages[random] + '")';
    }, 1000);
  }
}
// randomizeOption();

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // موضع الجزء العلوي من العنصر
  let skilloffset = ourSkills.offsetTop;

  // ارتفاع العنصر
  let skillouterheight = ourSkills.offsetHeight;

  // ارتفاع نافذة العرض
  let windowheight = this.innerHeight;

  // موضع التمرير العمودي (استخدام scrollY)
  const scrollPosition = window.scrollY;

  // الشرط المعدل
  if (
    Math.round(scrollPosition) >=
    Math.round(skilloffset + skillouterheight - windowheight)
  ) {
    let allskilss = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allskilss.forEach((skills) => {
      skills.style.width = skills.dataset.progress;
    });
  }
};

let ourGallary = document.querySelectorAll(".gallary .images-box img");

ourGallary.forEach((img) => {
  img.addEventListener("click", () => {
    // Create overlay Elment
    let overlay = document.createElement("div");

    // add class
    overlay.className = "popup-overlay";

    //append overlay to the body
    document.body.appendChild(overlay);

    let popbox = document.createElement("div");

    popbox.className = "pop-box";

    if (img.alt) {
      let imghead = document.createElement("h3");
      let imgtext = document.createTextNode(img.alt);
      imghead.appendChild(imgtext);

      popbox.appendChild(imghead);
    }
    // create the img
    let popImge = document.createElement("img");

    popImge.src = img.src;

    popbox.appendChild(popImge);

    // append popbox to the body

    document.body.appendChild(popbox);

    // create close button
    let close = document.createElement("span");

    let closetext = document.createTextNode("X");
    close.appendChild(closetext);
    close.className = "close-button";
    popbox.appendChild(close);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();

    document.querySelector(".popup-overlay").remove();
  }
});

//select all bullet
const allBullet = document.querySelectorAll(".nav-bullets .bullet");

//select all Links
const allLinks = document.querySelectorAll(".links a");

function scrollSomeWhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}
scrollSomeWhere(allBullet);
scrollSomeWhere(allLinks);
// handel Active state
function handelActive(e) {
  // remove active color
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // add active color
  e.target.classList.add("active");
}

// Reset Button
document.querySelector(".reset-option").onclick = function () {
  localStorage.clear();
  // or
  // localStorage.removeItem("color_options")
  // localStorage.removeItem("backgoround_option")
  // localStorage.removeItem("bullets_option")

  // reload
  window.location.reload();
};

//toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");

let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active")
  tlinks.classList.toggle("open")
};

// Click anywhere outside Menue and toggle Buttun
document.addEventListener("click" , (e)=>{



  if(e.target !== toggleBtn && e.target !== tlinks ) {
  //  check if menu is open
  if (tlinks.classList.contains("open")) {
    toggleBtn.classList.toggle("menu-active")
  tlinks.classList.toggle("open")
  }
    
  }

})
tlinks.onclick= function (e) {
  e.stopPropagation();
}