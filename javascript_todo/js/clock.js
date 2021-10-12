// 시계 만드는 방법
const clock = document.querySelector(".clock");
  // 현재 날짜/시간을 구한다


function getClock() {
  // 현재의 날짜/시간을 구한다
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  clock.innerText = `${hour < 10 ? `0${hour}` : `${hour}`}:${
    minute < 10 ? `0${minute}` : `${minute}`
  }:${second < 10 ? `0${second}` : `${second}`}`;
}
getClock(); // website가 load되자마자 getClock()을 즉시 호출하고,
setInterval(getClock, 1000); // 또 매초마다 다시 호출






