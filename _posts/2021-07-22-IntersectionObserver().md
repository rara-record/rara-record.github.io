layout: post
title: IntersectionObserver()
categories: [Reference]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-07-22

## IntersectionObserver() 

​	웹 API중 하나로, 특정한 요소들이 화면에 들어오거나 나갈 때, 우리가 등록한 콜백함수를 호출 해 준다. 즉, 우리의 콜백함수를 호출해주는 관찰자이다.

- entries (-array)
  -  IntersectionObserverEntry : 화면에 들어온 요소에 대한 정보
  - intersectionRatio : 요소가 얼마만큼 들어와 있는지 확인 한다. 0~1
  - isIntersectiong : 요소가 안으로 들어온 상태면 true / 아니면 false 
  - isVisible : 현재 요소가 보여지는지 아닌지 true / false 
  - rootBounds : 디폴트 값은 뷰포트(윈도우 창)를 기준, 뷰포트의 크기를 알 수 있다. 
  - target : 지금 현재 관찰하고 있는 요소
- observer
  - root: 어떤 것을 기준으로 요소들이 들어오고 나가는지 확인하고 싶을때, 부모 컨테이너를 지정해줄 수 있다. 디폴트 값 null, 기본값은 뷰포트
  - rootMargin: 마진을 주면, 그 마진만큼 포함된 영역을 계산함. 디폴트 0px
  -  threshold: 얼마만큼 보여져야 콜백함수가 호출될지를 결정하는데, 요소가 나갈때는 지정한 값의 반대. 0.0~1 