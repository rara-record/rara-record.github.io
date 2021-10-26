---
layout: post
title: IntersectionObserver
categories: [Reference]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-07-23
---

# IntersectionObserver() 

웹 API중 하나로,  그들이 감시하고자 하는 요소들이 화면(viewport)에 들어오거나 나갈 때, 우리가 등록한 콜백함수를 호출 해 준다. 즉, 우리의 콜백함수를 호출해주는 관찰자이다.

## IntersectionObserver 생성하기

생성자는 2개의 인수를 가진다.

```javascript
let io = new IntersectionObserver(callback, options); // 관찰자 초기화
let target = document.querySelector('#listItem'); 
io.observe(target); // 관찰할 대상(요소) 등록
```

## intersectionObserver 옵션설정하기

options `선택과목` : 

```javascript
let options = {
	root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
  	threshold: 0.5
}
```

- root
  - 타겟의 가시성을 검사하기 위해 (요소들이 들어오고 나가는지 확인하고 싶을때)  사용한다.
  - 뷰포트 대신 사용할 요소 객체(루트 요소)를 지정한다.
  - 타겟의 조상 요소여야 한다.
  - 값이 null이거나, 지정되지 않으면 기본값으로 설정한다. (기본값 `0`)

- rootMargin
  - root가 가진 여백.  마진을 주면, 그 마진만큼 포함된 영역을 계산한다.
  - css속성이랑 유사하다. “10px 20px 30px 40px” (top, right, bottom, left). 
  - 단위는 `%`, `px` 로 나타낼 수 있는데, **단위를 꼭 입력**해야한다.
  - 기본값`0`

- threshold
  - 얼마만큼 보여져야 콜백함수가 호출될지를 결정한다. (`0.0`~`1`)
  - 숫자 혹은 배열
  - 50%만큼 요소가 보여졌을때 탐지시 값은 `0.5` 
  - 25%단위로 콜백이 실행되게 하고 싶다면 [`0`, `0.25`,` 0.5`, `0.75`,` 1`] 
  - 기본값은 `0`이며(이는 요소가 1픽셀이라도 보이자 마자 콜백이 실행됨을 의미). 
  - `1.0`은 요소의 모든 픽셀이 화면에 노출되기 전에는 콜백을 실행시키지 않음을 의미한다.

## callback

관찰할 대상(Target)이 등록되거나, 가시성(Visibility, 보이는지 보이지 않는지)에 변화가 생기면 관찰자는 콜백(Callback)을 실행한다. 콜백은 2개의 인수(`entrise`, `observer`)를 가진다

```javascript
const io = new IntersectionObserver((entrise, observer) => {}, options)
io.observe(target)
```

### 📌**entries** 

entries는 intersectionObserverEntry 인스턴스의 배열이다. 

- **intersectionObserverEntry** : 화면에 들어온 요소에 대한 정보를 담는다.

  - boundingClientRect 
    - 관찰 대상의 사각형 정보 (x, y, width, height, top, right, bottom, left)
  - intersectionRect 
    - 관찰 대상과 루트 요소와의 교차하는(겹치는) 영역에 대한 사각형 정보
  - intersectionRatio 
    - 관찰 대상이 얼마만큼 들어와 있는지 확인 한다. 
    - intersectionRect 영역에서 boundingClientRect영역까지의 비율 : 0~1
  - isIntersectiong 
    - 관찰 대상이 안으로 들어온 상태면 true / 아니면 false 
  - isVisible : 
    - 현재 관찰 대상 보여지는지 아닌지 true / false 
  - rootBounds 
    - 디폴트 값은 뷰포트(윈도우 창)를 기준, 뷰포트의 크기를 알 수 있다. 
  - target : 
    - 지금 현재 관찰하고 있는 요소
  - time
    - 문서가 작성된 시간을 기준으로 교차 상태 변경이 발생한 시간을 나타내는 타임스템프를 반환

  ```javascript
  const io = new IntersectionObserver((entrise, observer) => {
      entrise.forEach(entry => {
          console.log(entry) // entry is 'IntersectionObserverEntry'
      })
  }, options)
  
  io.observe(target)
  ```

### 📌**observer**

콜백이 실행되는 해당 인스턴스를 참조한다

