---
layout: post
title: Can't perform a React state update on an unmounted component.. useEffect cleanup function.
categories: [error]
excerpt: " "
comments: true
share: true
tags: [error]
date: 2022-04-05
---

# [error] Can't perform a React state update on an unmounted component.. useEffect cleanup function.

## router 이동시 메모리 lack 에러

리액트로 router를 이동시 아래와 같은 에러가 나올 수 있다.
언마운트된 컴포넌트에서는 상태를 추적할 수 없고, 상태를 추적하지 않기에
작업이 수행되지 않지만, 메모리 누수가 발생할 수 있으니 useEffect의 cleanup함수를 이용하라.

## 에러 내용

> Error: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

## 발생 이유

1. router 이동 후, 이동 전 컴포넌트에서 state를 바꾸려는 시도가 있을 때
2. 비동기 처리 과정

## 해결

위 1,2번 모두 동일한 해결 방법이 있다.

1. 라우터를 이동 전, 또는 모달이 꺼지기 직전에 해당 컴포넌트에서 state변경 작업을 모두 완료 후, 라우터 이동 or 모달 꺼짐 (컴포넌트 언마운트)를 시킨다
2. react 조언대로 useEffect의 cleanup 함수를 이용한다.

## 문제코드 1

![error1](https://user-images.githubusercontent.com/70184893/161719759-c997eb2d-3b22-4762-98c1-6fedc3996e7d.png)
이 CommunityCard 컴포넌트는 데이터를 받아서, 데이터를 출력해주는 아주 단순한 구조이다. 상위 컴포넌트에는 CommunitySection, Home이 있다.

truncate함수는 받은 데이터 안의 글자가 너무 길면, 잘라서 보여주는 함수인데 여기서 변수를 설정할때,

수정 전)

```typescript
let length: number | string = name.length;
```

수정 후)

```typescript
let length: number | string = name && name.length;
```

이 부분에서 && 연산자를 추가했더니, 에러가 사라졌다.
데이터가 없는데 변수를 설정해서, 컴포넌트가 리렌더링 되지 못한 것 같다.
데이터를 받을때, 무조건 데이터가 있다고 생각하지 말고
없을 경우, 있을 경우를 생각해써 && 꼭 써주도록 해야겠다.

## 문제코드 2

![error2](https://user-images.githubusercontent.com/70184893/161721524-78847707-466b-4b19-afc6-fbdb33d19aeb.png)

Navigation 컴포넌트이다. useEffect는 changeBackground()라는 함수를 실행한다. changeBackground()는 스크롤을 내릴때 Navigation의 배경색이 바뀌는 기능을 담당한다.

수정 전)

```typescript
useEffect(() => {
  changeBackground();
  window.addEventListener("scroll", changeBackground);
}, []);
```

수정 후)

```typescript
useEffect(() => {
  changeBackground();
  window.addEventListener("scroll", changeBackground);
  return () => window.removeEventListener("scroll", changeBackground);
}, []);
```

윈도우에 이벤트를 등록해놓았기 때문에, 컴포넌트가 언마운트 되어도
스크롤이 될때마다 changeBackground함수가 실행되어 메모리 누수가 발생했다.
컴포넌트가 언마운트 되기 직전에 이벤트를 제거 해, 에러를 해결했다.
