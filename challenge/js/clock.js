
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
  clock.innerText = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
}
getClock(); // website가 load되자마자 getClock()을 즉시 호출하고,
//setInterval(getClock, 1000); // 또 매초마다 다시 호출

/*
function getClock2() {
  const now = new Date();  
  const year2 = now.getFullYear();
  const month2 = ("0"+(now.getMonth()+1)).slice(-2);
  const day2 = ("0"+now.getDate()).slice(-2);
  const hours2 = ("0"+now.getHours()).slice(-2);
  const minutes2 = ("0"+now.getMinutes()).slice(-2);
  const seconds2 = ("0"+now.getSeconds()).slice(-2);

  console.log(`${year2}-${month2}-${day2} ${hours2}:${minutes2}:${seconds2}`);
}
getClock2();
*/






