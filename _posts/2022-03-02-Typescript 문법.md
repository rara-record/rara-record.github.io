---
layout: post
title: Typescript 문법
categories: [Reference]
excerpt: " "
comments: true
share: true
tags: [typescript]
date: 2022-03-02
---

# Typescript 문법

## 오늘 배운 것

타입스크립트 문법

협업하기 좋은 코딩 스타일

## TypeScript

javascript 동적타입 언어 : 타입오류가 런타임 시 발견

typescript 정적타입 언어 : 타입오류가 컴파일 시 발견

### **타입스크립트의 타입** (변수명 뒤에 `:` 타입)

1. Primary type: number, string, boolean

```typescript
let product_id: number = 123456;
let product_name: string = "VR 글래스";
let is_waterprofing: boolean = false;
```

2. Any type

- 모든 타입에 대해서 허용한다는 의미

- 기존에 자바스크립트로 구현되어 있는 웹 서비스 코드에 타입스크립트에 점진적으로 적용할 때 활용하면 좋은 타입

- tsconfig.json에 noImplicitAny 설정 값이 ture여야 사용 가능

```typescript
let str: any = "hi";
let num: any = "10";
let arr: any = ["a", 2, true];
```

3. Array type : 설정이 없으면 에러가 난다.

```typescript
// 오직 숫자 아이템만 허용
let nums: number[] = [100, 200, 300];

// 오직 문자 아이템만 허용
let strs: string[] = ["ㄱ", "ㄴ", "ㄷ"];

// 오직 boolean 아이템만 허용
let boos: boolean[] = [true, false, true];

// 모든 데이터 타입을 아이템으로 허용
let anys: any[] = [100, "ㄴ", true];

// 특정 데이터 타입만 아이템으로 허용
let selects: (number | string)[] = [102, "o"];
```

3. Union type: number, string 모두 가능하게 하려면 파이프(|)을 사용하여 설정

```typescript
let userAge: number | string;
userAge = 13;
userAge = "24";

function setInfo(id: number | string, name: string) {
  return { id, name };
}
```

4. 사용자 정의 타입: 옵션값일 경우 `:` 앞에 `?`

```typescript
type userType = {
    name: string;
    age?: number;
    email?: string;
    phone: string;
    created: string;
    grade: 'A'|'B'|'C';
}

let kim: userType = {
    name: '김라라',
    age: -1,
    phone: '010-1111-2222',
    created: '2022-02-27 11:00'
    grade: 'A'
}
```

그 외 tuple, enum, object, never 타입이 있지만 자주 쓰이지는 않는다.

## Null과 undefined

**undefined**는 변수를 선언하고 값을 할당하지 않은 상태 (=자료형이 없는 상태)

**null**은 변수를 선언하고 빈 값을 할당한 상태(빈 객체)이다.

- typeof를 통해 자료형을 확인해보면 **null은 object**이고, undefined는 undefined가 출력된다
- null은 데이터가 없음을 표현하기 위해, 유니온 타입으로 많이 쓴다.

```typescript
const userName: string | null = null;
```

## 함수

- 정의된 **매개 변수의 갯수** 만큼 인자를 넘겨야 한다.
- 아무것도 리턴하지 않는 함수는 리턴값 타입을 void로 명시할 수 있다
- 디폴트값을 넣거나, `?`을 사용하면, 정해진 매개변수의 갯수가 아니어도 인자를 넘길 경우, 에러가 나지 않는다

```typescript
// 매개변수에 타입 지정
function buildName(firstName: string, lastName: string) {
  if (lastName) {
    return firstName + lastName;
  } else {
    lastName;
  }
}

// 아무것도 리턴하지 않는 함수의 타입 지정
function voidFun(name: string, age: number): void {
  console.log(name, age);
}

// 디폴트값을 넣거나, `?`을 사용하기
function sum(a: number, b?: number) {
  return a + b;
}
function sum(a: number, b: number = 1) {
  return a + b;
}
```

## interface

- 타입 체크를 위해 사용한다.
- 변수, 함수, 클래스에 사용한다
- 여러가지 타입을 갖는 property로 이루어진 새로운 타입을 정의하는 것과 유사하다
- interface와 type은 매우 유사한 기능이라서, 둘 중 어느것을 사용해도 상관 없는 경우가 대부분이다.

### **interface와 type의 차이점**

1. interface는 property 확장이 가능하지만, type은 불가능
2. interface는 하나의 형태만 가능, type은 union 또는 tuple도 가능

- 확장

```typescript
// interface
interface user {
  name: string;
  age: number;
  email?: string;
  phone: string;
  created: string;
}
interface user {
  grade: "A" | "B" | "C";
}

// type
type userType = {
  name: string;
  age: number;
  email?: string;
  phone: string;
  created: string;
  grade: "A" | "B" | "C";
};
```

- 형태

```typescript
// interface
interface ActionCount {
  type: "COUNT";
  count: string;
}
interface ActionEat {
  type: "EAT";
  food: string;
}
interface ActionRead {
  type: "READ";
  book: string;
}
let action: ActionCount | ActionEat | ActionrEAD;

// type
type ActionType =
  | { type: "COUNT"; count: number }
  | { type: "EAT"; food: number }
  | { type: "READ"; book: number };
```

## 오늘의 팁

new Date() 대신에 dayjs

// TODO: comments

## 리뷰

처음 문법을 배웠는데 알 것 같으면서도 헷갈리는 게 많았다. 익숙하지 않아서 일꺼다. 계속 눈에 익히는 게 중요한 것 같다.
