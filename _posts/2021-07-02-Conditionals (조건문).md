---
layout: post
title: Conditionals
categories: [TIL]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-07-02
---

# Conditionals (조건문)

1. prompt function은 답을 하기 전까지 javascript의 실행을 멈추고, css스타일도 적용시키지 못한다.
2. prompt에 입력받은 value는 stringType이다.
3. typeof : 데이터타입을 알 수 있다. ex) console.log(typeof value);
4. parseInt : stringType을 numberType으로 변경한다. ex) console.log(parseInt(value));
5. parseInt는 “LALA” 같은 string은 처리하지 못하고 NaN을 반환한다. “123” 같은 것들만 처리 할 수 있다.
6. NaN : 숫자가 아님
7. isNaN은 boolean을 반환한다. value가 stringType이면 true, numberType이면 false
8. 조건문에서 else는 선택사항이다, 꼭 사용해야하는 것은 아니다.
9. window.innerWidth : 창 틀을 뺀 브라우저의 넓이



// 노마드 코더 챌린지 과제 느낀점

- if/else 조건문을 수행할 때, 주어진 조건에 부합하는 코드를 if , else if에서 처리하고,  그 나머지를 else에 두는 것이 좋은 것 같다. 
