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

// NavbarMenu 클릭시 target이 있는 메뉴로 이동한다
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event)=> {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle 버튼
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// ContackMe 클릭시 contack으로 이동한다
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// 스크롤 내릴 수록 Home의 투명도 조절
const home = document.querySelector(".home__container");
const homeHehgith = home.clientHeight;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHehgith;
});

// 스크롤 내렸을때 ArrowUp버튼을 보여준다
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHehgith / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Arrowup 버튼 home으로 이동하기
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Scroll 공용 함수
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
};

// 프로젝트 버튼을 클릭했을때
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
    // 버튼을 클릭했을때의 data-filter와, span을 클릭했을때 data-filter
    const filter = e.target.dataset.filter ||  e.target.parentNode.dataset.filter;
    if (filter == null) {
      return;
    }

    // 이전 버튼에 Sectioned를 없애고, 새로 클릭된 item에 sectioned 부여한다.
    const active = document.querySelector(".category__btn.selected"); 
    active.classList.remove("selected"); // 이전에 선택된 버튼에 selected를 지워준다
    const target = 
      e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
    target.classList.add("selected");


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
