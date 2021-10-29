'use strict';

// Navbar가 상단에 있을 때 투명하게 표시
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.clientHeight; // navbar의 높이를 구한다
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// NavbarMenu 클릭시 스크롤 처리
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event)=> {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
  navItemActivate(target);
  console.log(target)
});

// Navbar toggle 버튼 
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// 홈에 있는"contact me" button 클릭시 contact으로 이동한다.
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// 스크롤 내릴 수록 home 투명도가 희미해진다
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

    // 이전 버튼에 selected를 없애고, 새로 클릭된 item에 selected를 부여한다.
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


  /* intersectionobserver 
  1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
  2. intersectionobserver를 이용해서 모든 섹션들을 관찰한다.
  3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
    3-1. 이전 섹션이 나갈때, navbar에 border를 넣어준다.
    3-2. 스크롤이 내려갈때 == 페이지가 올라갈때) y= -일때, 인덱스 +1
    3-3. 스크롤이 올라갈때 == 페이지가 내려갈때) y= +일때, 인덱스 -1
  */

  const sectionIds = [
    "#home", 
    "#about", 
    "#skills", 
    "#work", 
    "#testimonials", 
    "#contact",
  ];

  // section과 navbar-menu-item을 받아와서 새로운 배열을 만든다.
  const sections = sectionIds.map(id => document.querySelector(id));
  const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
    console.log(sections)
    console.log(navItems)
    
  // 선택된 메뉴 index
  let selectedNavIndex = 0;
  // 선택된 메뉴 요소
  let selectedNavItem = navItems[0];

  // 새로운 메뉴 아이템을 선택해준다.
  function navItemActivate(selected) {
    // 먼저 선택된 메뉴 아이템에 active를 지운다.
    selectedNavItem.classList.remove("active");
    // "navItems"중에 선택된 인덱스 다시 할당
    selectedNavItem = selected;
    // navItem에 active 추가
    selectedNavItem.classList.add("active"); 
  }

  // Scroll 공용 함수
  function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    navItemActivate(navItems[sectionIds.indexOf(selector)]);
  };

  // 옵션 지정
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };

  // entries를 돌면서 메뉴를 활성화 해준다.
  const observerCallback = (entries) => {
    entries.forEach((entry) => {

      // entry가 진입하지 않을때 처리한다.
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {

          // entry가 빠져나갈때, entry의 target은 빠져나가는 section이다. 그 section의 index를 구한다.
          const index = sectionIds.indexOf(`#${entry.target.id}`);

          // 스크롤이 내려갈때 == 페이지가 올라갈때
          if (entry.boundingClientRect.y < 0) {
            selectedNavIndex = index + 1;
          } else {
            selectedNavIndex = index - 1;
          } 
        }
    });
  };

  // IntersectionObserver 생성 (관찰자 생성)
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  //  section들을 돌면서 observer에게 모든 섹션을 관찰하게 한다.
  sections.forEach((section) => observer.observe(section));

  window.addEventListener("wheel", () => {
    // 스크롤이 제일 위에 있다면
    if (window.scrollY === 0) {
      selectedNavIndex = 0;
      // 스크롤이 제일 밑에 있다면
    } else if ( 
      Math.round(window.scrollY + window.innerHeight) >= 
      document.body.clientHeight) {
      // 배열의 제일 마지막 index
      selectedNavIndex = navItems.length - 1;
    }
    navItemActivate(navItems[selectedNavIndex]);
  });

