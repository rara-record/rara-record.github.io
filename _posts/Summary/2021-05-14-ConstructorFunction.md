---
layout: post
title: 객체 생성자 함수
categories: [JavaScript]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-05-14
---
# 'new' 연산자와 객체 생성자 함수
객체 리터럴 `{...}` 을 사용하면 객체를 쉽게 만들 수 있습니다. 그런데 개발을 하다 보면 유사한 객체를 여러 개 만들어야 할 때가 생기곤 합니다. 복수의 사용자, 메뉴 내 다양한 아이템을 객체로 표현하려고 하는 경우가 그렇죠.

`"new"` 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있습니다.



## **객체 생성자 함수**

```javascript
const spoon1 = {무게:400, 길이:25, 재질:"스테인리스", 색깔:"은색"};

const spoon2 = {무게:130, 길이:20, 재질:"나무", 색깔:"연갈색"};
```

이 두 객체가 넓은 범주에서 서로 같다는 것을 프로그램 적으로 확인 할 방법이 없습니다.

객체 생성자 함수를 사용하면 키의 구성이 같은 객체를 여러개 찍을 낼 수 있습니다.

**객체생성자함수** : 객체를 생성해 주는 함수로, `"new"` 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있습니다.

1. 함수 이름의 첫 글자는 대문자로 시작합니다.
2. 반드시 `"new"` 연산자를 붙여 실행합니다.

예시:

```javascript
function Spoon(weight, length, meterial, color) {
    this.무게 = weight;
    this.길이 = length;
    this.재질 = meterial;
    this.색깔 = color;
}
const spoon1 = new Spoon(400, 25, "스테인리스", "은색"); 
const spoon2 = new Spoon(130, 20, "나무", "연갈색");

console.log( spoon1 ); // Spoon {무게: 400, 길이: 25, 재질: "스테인리스", 색깔: "은색"}
console.log( spoon2 ); // Spoon {무게: 130, 길이: 20, 재질: "나무", 색깔: "연갈색"}
```

**`new Spoon(...)`를 써서 함수를 실행**하면 아래와 같은 알고리즘이 동작합니다.

1. 빈 객체를 만들어 `this`에 할당합니다.
2. 함수 본문을 실행합니다. `this`에 새로운 프로퍼티를 추가해 `this`를 수정합니다.
3. `this`를 반환합니다.

예시를 이용해 `new Spoon(...)`이 실행되면 무슨 일이 일어나는지 살펴 보도록 하겠습니다.

````javascript
function Spoon(weight, length, meterial, color) {
  // this = {};  (빈 객체가 암시적으로 만들어짐)

  // 새로운 프로퍼티를 this에 추가함
    this.무게 = weight;
    this.길이 = length;
    this.재질 = meterial;
    this.색깔 = color;

  // return this;  (this가 암시적으로 반환됨)
}
````

이제 `const spoon1 = new Spoon(400, 25, "스테인리스", "은색"); `는 아래 코드를 입력한 것과 동일하게 동작합니다.

```javascript
const spoon1 = {무게:400, 길이:25, 재질:"스테인리스", 색깔:"은색"};
```

잠깐! 모든 함수는 생성자 함수가 될 수 있다는 점을 잊지 마시기 바랍니다. `new`를 붙여 실행한다면 어떤 함수라도 위에 언급된 알고리즘이 실행됩니다. 이름 "첫 글자가 대문자"인 함수는 `new`를 붙여 실행해야 한다는 점도 잊지 마세요. 공동의 약속이니까요.

💡 **new function() { … }**

    재사용할 필요가 없는 복잡한 객체를 만들어야 한다고 해봅시다. 
    많은 양의 코드가 필요할 겁니다. 
    이럴 땐 아래와 같이 코드를 익명 생성자 함수로 
    감싸주는 방식을 사용할 수 있습니다.

  
```javascript
let user = new function() {
this.name = "John";
this.isAdmin = false;
// 사용자 객체를 만들기 위한 여러 코드.
// 지역 변수, 복잡한 로직, 구문 등의
// 다양한 코드가 여기에 들어갑니다.
};
```

> 위 생성자 함수는 익명 함수이기 때문에 어디에도 저장되지 않습니다. 처음 만들 때부터 단 한 번만 호출할 목적으로 만들었기 때문에 재사용이 불가능합니다. 이렇게 익명 생성자 함수를 이용하면 재사용은 막으면서 코드를 캡슐화 할 수 있습니다.



## **생성자와 return문**

생성자 함수엔 보통 `return` 문이 없습니다. 반환해야 할 것들은 모두 `this`에 저장되고, `this`는 자동으로 반환되기 때문에 반환문을 명시적으로 써 줄 필요가 없습니다.

그런데 만약 `return` 문이 있다면 어떤 일이 벌어질까요? 아래와 같은 간단한 규칙이 적용됩니다.

- 객체를 `return` 한다면, `this` 대신 객체가 반환됩니다.
- 원시형을 `return` 한다면, `return`문이 무시됩니다.

`return` 뒤에 객체가 오면 생성자 함수는 해당 객체를 반환해주고, 이 외의 경우는 `this`가 반환되죠.

아래 예시에선 첫 번째 규칙이 적용돼, `return`은 `this`를 무시하고 객체를 반환합니다.

```javascript
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- this가 아닌 새로운 객체를 반환함
}

alert( new BigUser().name );  // Godzilla
```

아무것도 `return`하지 않는 예시를 살펴봅시다. 원시형을 반환하는 경우와 마찬가지로 두 번째 규칙이 적용됩니다.

```javascript
function SmallUser() {

  this.name = "John";

  return; // <-- this를 반환함
}

alert( new SmallUser().name );  // John
```

`return`문이 있는 생성자 함수는 거의 없습니다. 여기선 튜토리얼의 완성도를 위해 특이 케이스를 소개해보았습니다.

💡 **괄호 생략하기**

인수가 없는 생성자 함수는 괄호를 생략해 호출할 수 있습니다.

```javascript
let user = new User; // <-- 괄호가 없음
// 아래 코드는 위 코드와 똑같이 동작합니다.
let user = new User();
```

명세서엔 괄호를 생략해도 된다고 정의되어 있지만, "좋은 스타일"은 아닙니다.



## **생성자 내 메서드**

생성자 함수를 사용하면 매개변수를 이용해 객체 내부를 자유롭게 구성할 수 있습니다. 엄청난 유연성이 확보되죠.

지금까진 `this`에 프로퍼티를 더해주는 예시만 살펴봤는데, 메서드를 더해주는 것도 가능합니다.

아래 예시에서 `new User(name)`는 프로퍼티 `name`과 메서드 `sayHi`를 가진 객체를 만들어줍니다.

```javascript
function User(name) {
    this.name = name;
    
    this.sayHi = function() {
      alert(`My name is: ${this.name}`);  
    };
}

let john = new User('John');

john.sayHi(); // My name is: John

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```



## 📚 **정리**

* 생성자 함수는 일반 함수입니다. 다만, 일반 함수와 구분하기 위해 함수 이름 첫 글자를 대문자로 씁니다.
* 생성자 함수는 반드시 `new`연산자와 함께 호출해야 합니다. `new`와 함께 호출하면 내부에서 `this`가 암묵적으로 만들어지고, 마지막엔 `this`가 반환됩니다.

유사한 객체를 여러 개 만들 때 생성자 함수가 유용합니다.





## 📝 **연습**

### 누산기 만들기

생성자 함수 `Accumulator(startingValue)`를 만들어 보세요.

`Accumulator(startingValue)`를 이용해 만드는 객체는 아래와 같은 요건을 충족해야 합니다.

- 프로퍼티 `value`에 현재 값(current value)을 저장합니다. 최초 호출 시엔 생성자 함수의 인수, `startingValue`에서 시작값(starting value)을 받아옵니다.
- 메서드 `read()`에선 `prompt` 함수를 사용해 사용자로부터 숫자를 받아오고, 받은 숫자를 `value`에 더해줍니다.

프로퍼티 `value`엔 `startingValue`와 사용자가 입력한 모든 값의 총합이 더해져 저장됩니다.

데모를 위한 코드는 다음과 같습니다.

```javascript
let accumulator = new Accumulator(1); // 최초값: 1

accumulator.read(); // 사용자가 입력한 값을 더해줌
accumulator.read(); // 사용자가 입력한 값을 더해줌

alert(accumulator.value); // 최초값과 사용자가 입력한 모든 값을 더해 출력함
```



------



```javascript
function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function() {
    this.value += +prompt('더할 값을 입력해주세요.');
  };
}

let accumulator = new Accumulator(1);
accumulator.read();
accumulator.read();
alert(accumulator.value);
```
<br>
<br>

[출처]
https://ko.javascript.info/constructor-new
