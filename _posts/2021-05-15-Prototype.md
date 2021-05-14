---
layout: post
title: 프로토타입
categories: [JavaScript]
excerpt: ' '
comments: true
share: true
tags: [JavaScript]
date: 2021-05-14
---

# 프로토타입

자바스크립트는 프로토타입 기반 언어입니다.  클래스 기반 언어에서는 ‘상속’을 사용하지만 프로토타입 기반 언어에서는 어떤 객체를 원형(prototype)으로 삼고 이를 복제(참조)함으로써 상속과 비슷한 효과를 얻습니다.



#### 💻 객체생성자함수로 객체를 만들때 발생할 수 있는 문제 

```javascript
const Student = function(name, birthday) {
    this.name = name;
    this.birthday = birthday;
    this.study = function ( subject ) {
        console.log (`${this.name} 학생이 ${subject}를 공부합니다.`);
    }
}
const s1 = new Student ('김보라', '1993-01-20', '12345234');
console.log(s1);    // Student {name: "김보라", birthday: "1993-01-20", study: ƒ}
s1.study('수학');   // 김보라 학생이 수학를 공부합니다.
```

> 💡 메써드를 객체생성자함수 안에서 만들 경우, 객체가 만들어질때 마다 매번 똑같은 내용의 메써드가 계속생성되기 때문에 메모리 낭비와 비효율을 초래한다.



#### 💻 함수를 여러 객체가 공유하는 기능

```javascript
const Student = function(name, birthday) {
    this.name = name;
    this.birthday = birthday;
}

//객체 생성자 함수의 프로토타입
Student.prototype.study = function ( subject ) {
    console.log (`${this['name']} 학생이 ${subject}를 공부합니다.`);
}

const s1 = new Student ('김보라', '1993-01-20', '12345234');
console.log(s1);    // Student {name: "김보라", birthday: "1993-01-20"}
s1.study('수학');   // 김보라 학생이 수학를 공부합니다.
```

> 💡 객체생성자함수의 prototype속성에 함수를 만들어놓으면 같은 객체생성자함수로 만들어진 모든 객체들이 메써드를 공유하게 된다.



## constructor, prototype, instance

![](https://rara-record.github.io/assets/images/Prototype/prototype.png) 

* 어떤 생성자 함수(Constructor)를 `new` 연산자와 함께 호출하면
* `Constructor`에서 정의된 내용을 바탕으로 새로운 `instance`가 생성됩니다.
* 이때 `instance` 에는` __proto__`라는 프로퍼티가 자동으로 부여되는데
* 이 프로퍼티는 `Constructor`의 `prototype`이라는 프로퍼티를 참조합니다.
* `instance`는 `Constructor.prototype`의 메서드를 마치 자신의 메서드인 것처럼 호출할 수 있습니다.



## `__proto__`의 정체

- 모든 객체는 (비어있는 객체라 할지라도) `__proto__` 라는 속성을 이미 갖고있습니다.
- `__proto__`는 **생략 가능**한 속성입니다.

```javascript
function Student( name, birthday) {
	this.name = name;
    this.birthday= birthday;
}
Student.prototype.study = function( subject ) {
    //김보라 학생이 수학과목을 공부합니다.
    console.log( `${this.name} 학생이 ${subject}과목을 공부합니다.` );
};
const s1 = new Student( "김보라", "2000-01-01", "12803987123" );
s1.study('수학');
console.log( s1 ); // Student {name: "김보라", birthday: "2000-01-01"}
```

> 객체생성자함수의 prototype속성은 객체를 만들었을 때 만들어진 객체의 `__proto__`로 복사된다.

<br>
<br>
<br>****


[출처] https://thumbsu.dev/javascript/core-javascript-prototype/

https://velog.io/@iamjoo/%EC%BD%94%EC%96%B4-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-06.-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85