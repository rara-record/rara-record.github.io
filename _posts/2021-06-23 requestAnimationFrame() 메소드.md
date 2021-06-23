---
layout: post
title: window.requestAnimationFrame() 메소드
categories: [JavaScript]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-06-23
---


# window.requestAnimationFrame() 메소드



## window.requestAnimationFrame() : 비동기 함수

    requestAnimationFrame(반복할 함수)

* window.setTimeout 함수와 다른 점은 **브라우저가 실행 시기를 결정**한다는 점이다.

* window.setInterval 함수와 다른 점은 **스스로 반복해서 호출하지 않는다**는 점이다.
* 기본적으로는 1초에 60번, 보통은 모니터에 주사율에 맞추어 함수를 실행하게 되어있다.
* **💡** 스스로를 반복 호출하지 않기 때문에, window requestAnimationFrame 함수로 다음 함수를 반복하려면, **재귀적으로 window.requestAnimationFrame 함수를 다시 호출해 줘야 한다.**

###  💻 기본적인 사용법

```javascript
var el = document.querySelector('#움직일-요소');
var left = 0;
 
function frame() {
    left += 0.1;
    el.style.setProperty('transform', 'translateX(' + left + 'px)');
 
    window.requestAnimationFrame(frame);
}
 
window.requestAnimationFrame(frame);
```

> 지정한 요소는 영원히 1프레임마다 0.1px씩 오른쪽으로 움직일 것이다.

💡 특정한 시기에 멈추고 싶다면?

- 분기문을 써주면 된다.

```javascript
function frame() {
    left += 0.1;
    el.style.setProperty('transform', 'translateX(' + left + 'px)');
 
    if (left < 200) window.requestAnimationFrame(frame);
}
 
window.requestAnimationFrame(frame);
```



### requestAnimationFrame()을 사용하는 이유

- **백그라운드 동작 및 비활성화시 중지(성능 최적화)**

- **최대 1ms(1/1000s)로 제한되며 1초에 60번 동작**
- **다수의 애니메이션에도 각각 타이머 값을 생성 및 참조하지 않고 내부의 동일한 타이머 참조** 

```javascript
!(function() {
  let start = new Date().getTime();
  let callback = function() {
    let ts = new Date().getTime();
    if (ts - 1000 > start) {
      // console.log('End');
    }
    else {
      console.log(ts);
      requestAnimationFrame(callback);
    }
  }
  requestAnimationFrame(callback);
})();
```

위 코드를 실행하면 console.log()에는 무제한 호출되는 것이 아닌 단, 60번의 호출만 발생하게 된다. 즉 1/60으로 애니메이션이 제한된다. 최적화된 속도로 부드러운 애니메이션을 표현하면서 성능은 최대한 확보할 수 있는 것이다.



### 💻 본격적인 사용법

위의 코드의 커다란 함정
- window.requestAnimationFrame은 모니터의 주사율과 맞춰서 실행 주기가 결정되기 때문에, **사용 환경에 따라 애니메이션이 완료되는 시기가 제각각이다.***
- **window.requestAnimationFrame이 더 많이 쓰이는 이유는 인자로 넘어오는 **timestamp 값 때문이다.

```javascript
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';
 
function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}
 
window.requestAnimationFrame(step);
```

> timestamp 값을 이용해 2초 동안 200 픽셀 만큼 해당 요소를 우측으로 이동시킨다. 

</br>



**cancelAnimationFrame() 알아보기**

- requestAnimationFrame()를 취소하는 방법으로 **cancelAnimationFrame()**를 사용한다. 

- 마치 setTimeout()의 clearTimeout()처럼 동일하게 사용하고 동작한다.

- 취소시 아래와 같이 사용하고, 변수르 requestId를 저장하고 매개변수로 넘기면 됩니다.

```javascript
myReq = requestAnimationFrame(callback);
cancelAnimationFrame(myReq);
```



## jQuery의 window.setInterval 

  - jQuery등에서는 window.requestAnimationFrame이 지원되지 않는다.

```javascript
var el = document.querySelector('#움직일-요소');
var left = 0;
var id;
 
function frame() {
    left += 0.1;
    el.style.setProperty('transform', 'translateX(' + left + 'px)');
 
    if (left >= 200) window.clearInterval(id);
}
 
id = window.setInterval(frame, 1000 / 60);
```
> 위 코드는 timestamp 값을 이용해 2초 동안 200 픽셀 만큼 해당 요소를 우측으로 이동시킨다.




<br>
<br>
<br>
<br>

[ 출처 ] https://blog.eunsatio.io/develop/JavaScript-window.requestAnimationFrame-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC

https://webisfree.com/2020-03-19/[%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8]-requestanimationframe()%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-%EB%B0%8F-%EC%98%88%EC%A0%9C