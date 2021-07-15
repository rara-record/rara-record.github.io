---
layout: post
title: LoginEvents1
categories: [TIL]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-07-03
---

# LOGIN

## Input Values

1. HTML에서 input에 value를 선입력 할 수도 있다.
2. input.value : input의 내용을 가져옴
3. HTML : required maxliength = "글자수"
4. HTML : placeholder : input 내용의 안내문구
5. input의 유효성 검사를 작동시키기 위해서는, input이 form 안에 있어야한다.
6. **form의 기본동작 : form이 자동으로 submit되고, 페이지가 새로고침 된다.** (form안에 button을 누르거나, type이 submit인 input을 클릭 or 엔터를 눌렀을때)
7. 브라우저의 기본 동작을 막아준다. : argument.preventDefault() : 

<br>

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

function onLoginSubmit(ev) {
  ev.preventDefault();
  console.log(ev);
}
loginForm.addEventListener("submit", onLoginSubmit);
```

브라우저는 event가 발생할 때 function을 호출하게 되는데, 비어있는 채로 호출되지 않고

- onLoginSubmit() --- x

- onLoginSubmit( {infomation} )

필요한 정보를 JS에게 넘겨준다. ev argument는 그 공간을 제공하는 것이다.

javascript는 방금 일어난 event에 대한 정보를 argument를 채워넣을 것이다. ( 비워두면 당연히 어떠한 정보도 받지 못함 )

즉, ev 는 지금 막 일어난 일들의 대한 정보가 된다.

브라우저가 우리에게 ev argument를 통해서 어떤 정보를 넘겨주는지 확인해 볼 수 있다.

**요약 : javascript는 어떤 정보를 담은채로 function을 호출한다.**
