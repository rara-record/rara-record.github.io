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

// navbarMenu 클릭시 target이 있는 메뉴로 이동한다
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event)=> {
  const target = event.target;
  const link = target.dataset.link;
  scrollIntoView(link);
});

// contackMe 클릭시 contack으로 이동한다
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// 스크롤 내릴 수록 home 투명도 낮아진다
const home = document.querySelector(".home__container");
const homeHehgith = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHehgith;
});

// 스크롤 내렸을때 arrowUp버튼을 보여준다
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHehgith / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// arrow up버튼 home으로 이동하기
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// scroll 공용 함수
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth", block: "center"});
};

// 프로젝트 버튼을 클릭했을때
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (event) => {
    // 버튼을 클릭했을때의 data-filter와, span을 클릭했을때 data-filter
    const filter = event.target.dataset.filter ||  event.target.parentNode.dataset.filter;
    if (filter == null) {
      return;
    }

    projectContainer.classList.add("anim-out");
    setTimeout(() => {
    // 프로젝트를 하나하나 가져와서 필터링 해주어 해당요소만 보여준다.
      projects.forEach((project) => {
        if (filter === "*" || filter === project.dataset.type) {
          project.classList.remove("invisible");
        } else {
          project.classList.add("invisible");
        }
      });
      projectContainer.classList.remove("anim-out");
    }, 300);
  });




/*
수직 스크롤을 얼마나 했는지 (내릴수록 커진다) 
const scrollY = window.scrollY; 

절대좌표 값 
const absolutePos = scrollY + posFromTop; 


해당요소가 뷰포트로부터 얼마나 떨어져 있는지 (내릴수록 작아진다) 
const posFromTop = contactContainer.getBoundingClientRect().top; 
*/