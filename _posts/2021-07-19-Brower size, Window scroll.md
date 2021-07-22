---
layout: post
title: Brower size,Window scroll
categories: [Reference]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-07-19
---

# Brower size, Window scroll

1. window.scrollY :  수직방향으로 스크롤한 픽셀의 수를 나타낸다. 움직이지 않은 상태는 0을 반환한다. 

> 정숫값이 필요하면, Math.round()를 사용해 반올림할 수 있다.

```javascript
document.addEventListener("scroll", () => {
  console.log(window.scrollY)
});
```

2. element.getBoundingClientRect() : 뷰포트를 기준으로 요소의 크기와 위치를 반환한다. 

3. 브라우저 창의 너비와 높이 :  `document.documentElement`의 `clientWidth`와 `clientHeight`를 사용하면 된다.  

```javascript
const navbarHeight = navbar.clientHeight; // navbar의 높이를 구한다
```

4. element.scrollIntoView() : 요소가 사용자에게 표시되도록 요소의 상위 컨테이너를 스크롤한다.

[브라우저 창 사이즈와 스크롤]:  https://ko.javascript.info/size-and-scroll-window
[getBoundingClientRect]: http://www.devdic.com/javascript/refer/dom/method:1764/getBoundingClientRect()
[ 특정 요소 위치로 화면 스크롤 이동하기]: https://mine-it-record.tistory.com/399

