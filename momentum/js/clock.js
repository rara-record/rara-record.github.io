
// setInterval
function sayHello() {
  console.log("hello");
}
//setInterval(sayHello, 5000); // 매 5초마다 호출되도록 만든다.

// setTimeout
function sayBye() {
  console.log("bye"); 
}
setTimeout(sayBye, 2000); // 2초 뒤에 실행되도록 만든다


// 시계 만드는 방법
const clock = document.querySelector("#clock");
const $date = document.querySelector("#date");
  // 현재 날짜/시간을 구한다


function getClock() {
  // 현재의 날짜/시간을 구한다
  const date = new Date();  
  const year = String(date.getFullYear()).padStart(2, "0");
  const month = String(date.getMonth()+1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  // date객체에서 현재의 시간: 분: 초를 구한다
  $date.innerText = `${year}-${month}-${day}`  
  clock.innerText = `${hours}:${minutes}:${seconds}`
  console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
}
getClock(); // website가 load되자마자 getClock()을 즉시 호출하고,
//setInterval(getClock, 1000); // 또 매초마다 다시 호출






