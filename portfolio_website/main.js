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

// 스크롤 내릴 수록 home 투명도 낮아짐
const home = document.querySelector(".home__container");
const homeHehgith = home.clientHeight;

document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHehgith;
})




function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth", block: "center"});
};








/* 
수직 스크롤을 얼마나 했는지 (내릴수록 커진다) 
const scrollY = window.scrollY; 

절대좌표 값 
const absolutePos = scrollY + posFromTop; 


해당요소가 뷰포트로부터 얼마나 떨어져 있는지 (내릴수록 작아진다) 
const posFromTop = contactContainer.getBoundingClientRect().top; 

https://nykim.work/56
https://codepen.io/eddyerburgh/pen/VaVraj

*/
