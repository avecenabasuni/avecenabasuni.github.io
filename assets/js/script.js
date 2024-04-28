"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelectorAll("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const btns = document.querySelectorAll("[data-target]");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.toggle("active");
    overlay.classList.toggle("active");
  });
});

modalCloseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.remove("active");
    overlay.classList.remove("active");
  });
});

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

window.onclick = (e) => {
  if (e.target == overlay) {
    document.querySelector(btn.dataset.target).classList.remove("active");
    overlay.classList.remove("active");
  }
};

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

const startstop = document.getElementById("startstop");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");
const days = document.getElementById("days");

const today = new Date();
const todayAt12 = new Date();
todayAt12.setHours(0, 0, 0, 0);
const birthdate = new Date("01/06/2001");
let totalSeconds = 0;
if (todayAt12.getTime() === birthdate.getTime()) {
  totalSeconds = 0;
} else {
  birthdate.setFullYear(today.getFullYear() + 1);
  totalSeconds = (birthdate - today) / 1000;
}

const setDisplay = (sec) => {
  days.innerText = String(Math.floor(sec / (24 * 60 * 60))).padStart(2, "0");
  sec = sec % (24 * 60 * 60);
  hours.innerText = String(Math.floor(sec / (60 * 60))).padStart(2, "0");
  sec = sec % (60 * 60);
  minutes.innerText = String(Math.floor(sec / 60)).padStart(2, "0");
  sec = sec % 60;
  seconds.innerText = String(Math.floor(sec)).padStart(2, "0");
};

const timer = setInterval(() => {
  if (totalSeconds <= 0) {
    totalSeconds = 0;
    clearInterval(timer);
    return;
  }
  totalSeconds -= 1;
  setDisplay(totalSeconds);
}, 1000);
