'use strict';

// Navbar 스크롤 내리면 background 넣기
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.clientHeight; // navbar의 높이를 구한다
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// navbarMenu 클릭시 target이 있는 메뉴로 이동
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event)=> {
  const target = event.target;
  const link = target.dataset.link;
  scrollIntoView(link);
});

// contackMe 클릭시 contack으로 이동
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});


function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth", block: "center"});
}
