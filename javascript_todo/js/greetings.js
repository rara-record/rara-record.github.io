
// submit
const loginForm = document.getElementById("login-form");
const longinInput = document.getElementById("login-input");
const greeting = document.querySelector(".greeting");
// localStorage에 저장될 아이템의 이름
const USERNAME_KEY = "username";
// 중복 사용 할 CALSS 변수로 저장
const HIDDEN_CLASSNAME = "hidden";

// 1. localStorage에서 유저정보를 가져온다.
const savedUsername = localStorage.getItem(USERNAME_KEY);

// 자바스크립트가 local storage를 확인한다.
// form에 hidden class를 제거하고, form의 submit을 기다린다.
if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings();
}

// 로그인 함수
function onLoginSubmit(e) {
  e.preventDefault();
  // submit되면 form 숨기고, 유저정보를 저장 후, 인사말 함수 호출
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, longinInput.value);
  paintGreetings();
}
// 인사말을 화면에 그리는 함수
function paintGreetings() {
  // 유저 정보를 가져와서, 화면에 그려주고, HTML에서 CLASS를 지워준다.
  const username = localStorage.getItem(USERNAME_KEY);
  greeting.innerText = `${username}님! 좋은 하루 보세요. 화이팅!`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}


