---
layout: post
title: JAVASCRIPT ON THE BROWSER
categories: [TIL]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-07-01
---


#	JAVASCRIPT ON THE BROWSER



## The Document Object

1. JavaScript는 HTML에 이미 연결이 되어 있다. 
2. JavaScript는 HTML에 접근하고 항목들을 읽을 수 있다. (추가도 가능)
3. document가 모든 것들의 시작점이다. (Web Site를 의미하기 때문에)

## HTML in Javascript

1. JavaScript로 정보를 가지고 올 수 있는 방법은, document객체와 element를 가져오는 수 많은 함수들을 이용하는 것이다. 
2. 할 수 있는 것은 2가지이다.
   1. document에서 항목들은 가지고 온다.
   2. document 항목들을 변경한다.
3. InnerHTML, InnerText는 JavaScript에서 html 태그`<div>` `p` 등의 내부 문자를 가져올 때 사용한다.
4. innerText와 innerHTML의 차이점 : 내부 문자를 가져올때 html태그를 **문자로 인식할지 태그로 인식할지**의 차이이다.
   - innerText는 가져온 텍스트에 포함된 태그도 하나의 텍스트로 인식하여 보여준다.
   - innerHTML은 가져온 텍스트에 포함된 태그를 인식하여, 태그를 적용시킨 후 문자를 보여준다.

## Searching For Elements

1. getElementsByClassName, getElementsByTagName은 array를 가져온다.
2. querySelector는 중복되는 이름이 있으면, 맨 첫번째 element만 가져온다. returns the first element!  
3. querySelectorAll은 selector 안의 조건에 부합하는 모든 element를 가져온다.returns array!

## Window.events 

1. element의 내부를 보고 싶다면, console.dir
2. console.dir 안의 property 이름 앞에 on이 붙어 있다면, 그것이 event listener이다.
3. .addEventListener("click", callbackfuntion ); === .onClick = callbackfuntion;
4. document가 javascript에서 기본적으로 제공되듯이, window도 기본적으로 제공된다.
5. resize : 화면 크기가 바뀜
6. copy : 복사했는지 알 수 있음
7. MDN [here] (https://developer.mozilla.org/ko/docs/Web/Events)

## CSS in Javascript

1. style은 css에서 처리하는게 깔끔하다.
2. active같은 class명은 javascript 코드에서 변수로 따로 지정하여 사용하는 것이 에러를 줄일 수 있다.
3. **className은 기존에 있던 class 명까지 교체해버리기 때문**에, javascript로 특정한 class name만 변경하고 싶을때는 classList.contains( 지정한 변수 )을 쓰는 것이 좋다.
4. classList에서 지우고 싶다면, classList.remove ( 지정한 변수 )
5. classList에 추가하고 싶다면 classList.add( 지정한 변수 )
6. classList.toggle function은 class name이 존재하는지 확인한다. 만약 class name이 포함되었다면 제거하고, 포함되지 않았다면 추가한다.
