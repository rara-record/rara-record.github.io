
// submit
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
// localStorage에 저장될 아이템의 이름
const USERNAME_KEY = "username";

// 2. form이 submit 되면,
function onLoginSubmit(event) {
  // 브라우저의 기본 동작을 막아준다 == 새로고침
  event.preventDefault(); 

  // hidden이라는 clas을 더해줘서 form을 숨긴다
  loginForm.classList.add(HIDDEN_CLASSNAME);

  // 유저 정보를 localStorage에 저장한다.
  localStorage.setItem(USERNAME_KEY, loginInput.value);

  // paintGreetings를 호출한다.
  paintGreetings();
}

// h1 (greeting)에 USERNAME_KEY를 text로 화면에 표시
function paintGreetings() {    
  // 유저 정보를 찾는다.
  const username = localStorage.getItem(USERNAME_KEY);
  // h1에 username의 텍스트를 추가한다.        
  greeting.innerText = `Hello ${username}`;
  // h1에 class를 지워준다
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

// localStorage에서 유저정보를 가져온다.
const savedUsername = localStorage.getItem(USERNAME_KEY);

// 1. 자바스크립트가 local storage를 확인한다.
if (savedUsername === null) {
  // show the form
  // local stroage에 유저정보가 없다면
  // fomr에 fidden class를 제거하고, form의 submit을 기다린다.
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  // show the greeting 
  // savedUsername가 null이 아니면, 호출
  paintGreetings();
}


