



## 실행 컨텐스트



### 1. 실행 컨텍스트란?

#### 1-1.스택과 큐

- **📌 스택(stack)**: 출입구가 하나 뿐인 우물과 같은 데이터 구조이다.
  abcd순서대로 들어가면, 꺼낼때는 d,c,b,a 순이다.
- 📌 **큐(queue)**: 한쪽은 입력만, 다른 한쪽은 출력만 담당하는 구조이다. (양쪽 모두 입출력 되는 큐도 있음) abcd순으로 저장했다면 꺼낼 때는 abcd순이다.
- 📌 **실행 컨텍스트**: 실행할 코드에 제공할 환경 정보들을 모아 놓은 객체
- 📌 실행 컨텍스트를 구성하는 방법으로는 아래와 같다.
  - 1) 전역공간
  - 2) eval()함수
  - 3) 함수

자동으로 생성되는 전역공간과 악마로 취급받는 eval 제외하면 흔히 실행컨텍스트를 구성하는 방법은 **함수를 실행**하는 것이다.



#### 1-2 💻  실행 컨텍스트의 순서

```javascript
let a = 1;  ----------------- (1)
function outer() {
	function inner() {
    	console.log(a); // undefined
        let a = 3;
    }
    inner(); ----------------- (3)
    console.log(a); // 1
}

outer();   ----------------- (2)
console.log(a); // 1
```

📝 **처음 자바스크립트 코드를 실행하는 순간**
**(1) 전역 컨텍스트가 콜 스택에 담기게 된다.**
브라우저에서 자동으로 실행하므로 자바스크립트 파일이 열리는 순간 전역 컨텍스트가 활성화된다고 이해하면 된다.

**(2) outer함수를 호출하면 javascript엔진은 outer에 대한 환경정보를 수집해서 outer 실행 컨텍스트를 생성한 후 콜스택에 담는다.** 전역 컨텍스트 관련 코드는 일시중단된다.

**(3) outer내부에서 다시 inner함수의 실행 컨텍스트가 콜스택 가장 위에 담기면 outer 컨텍스트와 관련된 코드의 실행을 중단하고 inner함수 내부의 코드를 순서대로 진행한다.**

inner 실행컨텍스트가 종료되면 콜스택에서 제거 되고, outer 컨텍스트가 이어서 실행된다. <br>마찬가지로 outer 실행이 종료되면 전역 컨텍스트가 실행되고, 그 마저 종료되면 콜스택에는 아무것도 남지 않는 상태로 종료된다.



**실행 컨텍스트와 콜 스텍** 

![](C:\Users\O.C User\Desktop\rara-record.github.io\image\callstack.png)

> 한 실행 컨텍스트가 콜 스택의 맨 위에 쌓이는 순간 =  현재 실행할 코드에 관여하게 되는 시점



#### 1-3. 실행 컨텍스트 활성화  

**실행 컨텍스트 활성화 될 때, 자바스크립트 엔진은 해당 컨텍스트에 관련된 코드들을 실행하는데 필요한 환경정보를 수집하고, 객체에 저장한다. 이 객체는 무엇일까?**

이 객체는 자바스크립트 엔진이 활용할 목적으로 생성할 뿐, 개발자들은 코드를 통해 확인이 불가능하다. 담기는 정보들은 아래와 같다.

- **📌 variableEnvironment:**  현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보, 선언 시점의 LexicalEnvironment의 스냅샷
- **📌 LexicalEnvironment:** 처음에는 variableEnvironment와 같지만 변경 사항이 실시간으로 반영된다.
- **📌 ThisBinding:** this 식별자가 바라봐야 할 대상 객체이다.     



### 2. VariableEnvironment

담기는 내용은 LexicalEnvironment 와 같지만 최초 실행 시의 스냅샷을 유지한다는 점이 다르다.
variableEnvironment, LexicalEnvironment 내부에는 environmentRecord와 outer-Environment로 구성되어 있다.

### 3. LexicalEnvironment

컨텍스트를 구성하는 환경 정보들을 사전에 접하는 느낌으로 모아 놓는 것이다.

#### 3-1. environmentRecord와 호이스팅

- environmentRecord에는 **현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.**
  **매개변수 식별자**, 선언한 함수가 있을 경우 **함수 자체**, var로 선언된 **변수의 식별자** 등

- 컨텍스트 내부 전체를 처음부터 끝까지 쭉 **순서대로** 수집한다. 코드가 실행도기 전임에도 불구하고자바스크립트 엔진은 이미 해당 환경에 속한 코드의 변수명들을 모두 알고 있게 된다.

- 자바스크립트 엔진은 **‘’식별자들을 최상단으로 끌어올려놓는다‘’ ** 라고 생각하고, 코드를 해석하더라고 문제 될 것이 없다. ( 실제로 끌어올리진 않음, 이해하기 쉽도록 편의상 그렇다라고 간주하자는 것.)

  > 실행 컨텍스트는 변수 객체를 생성하는 대신 자바스크립트 구동 환경이 별도로 제공하는 객체, 즉 전역 객체(global object)를 활용한다. 전역 객체에는 브라우저의 window, Node.js의 global 객체 등이 있다. 이들은 자바스크립트 내장 객체(native object)가 아닌 호스트 객체(host object)d로 분류된다.

#### 3-2. 호이스팅(hoisting) 규칙

**호이스팅이 되지 않았을 때 출력 값**

```javascript
function a(x) {
	console.log(x); // undefined
    var x;
    console.log(x); // undefined
    var x = 2;
    console.log(x); // 2
}

a(1);
```



##### ⚠️ js 엔진 구동방식을 사람 입장에서 이해하고자 코드를 변경 할 것입니다.<br>(!실제 엔진은 이러한 변환과정을 거치지 않습니다!)



```javascript
function a(x) {
	var x = 1; // 수집 대상 1(매개변수 선언)
	console.log(x);
    var x; // 수집 대상 2 (변수 선언)
    console.log(x); 
    var x = 2; // 수집 대상 3 (변수 선언)
    console.log(x); 
}

a(1);
```

매개변수를 변수 선언/할당과 같다고 간주하여 변환한 상태입니다.

```javascript
function a(x) {
	var x; // 수집 대상 1 (매개변수 선언)
    var x; // 수집 대상 2 (변수 선언)
    var x; // 수집 대상 3 (변수 선언)
    
    x = 1; // 수집 대상 1의 할당
	console.log(x); // 1
    
    console.log(x); // 1
    x = 2;  // 수집 대상 3의 할당
    console.log(x);  // 2
}

a(1);
```





##### 💻 **함수 선언에 대한 예제**

예상 하는 값 

```javascript
function a() {
	console.log(b); // (1) 
    var b = 'bbb';  // 수집 대상 1 (변수 선언)
    console.log(b);  // (2) 
    function b() {} //수집 대상 2 (함수 선언)
    console.log(b); // (3) 
}
a();
```

(1) undefined (2) ‘bbb’ (3) b함수



실제 값 -호이스팅을 마친 상태 

```javascript
function a() {         
	var b;                  // 수집 대상 1. 변수는 선언부만 끌어올린다
    var b = function b() {} // 수집 대상 2. 함수 선언은 전테를 끌어올린다.
    
	console.log(b); // (1) 
    b = 'bbb';      // 변수의 할당부는 원래 자리
    console.log(b);  // (2)
    
    console.log(b); // (3)
}
a(); 
```

(1)  b함수(2) ‘bbb’ (3) ‘bbb’

- a함수를 실행하는 순간 a 함수의 실행 컨텍스트가 생성된다. 
- 변수명과 함수선언의 정보를 위로 끌어올린다. 
- 변수는 선언부와 할당부로 나누어 선언부만 끌어 올린다.
- 함수선언은 함수 전체를 끌어올린다. 
-  수집 대상 2: 호이스팅이 끝난 상태에서의 함수 선언문은 함수명으로 선언한 변수에 함수를 할당 것 처럼 여길수 있다.



#### 3-2. 함수 선언문과 함수 표현식

**📌 함수 선언문**(function declaration)
function 정의부만 존재하고 별도의 할당 명령이 없는 것, 함수명이 정의되야한다.

```javascript
function a () {}  //  a가 곧 변수명
a(); // 실행 Ok.
```

**📌 함수 표현식**(function expression)
정의한 function을 별도의 변수에 할당하는 것이다.

```javascript

var b = function () {} // 익명 함수 표현식. 변수명 b가 곧 함수명
b(); //실행 Ok.

var c = function d () {} // 기명 함수 표현식. 변수명은 c, 함수명은 d.
c(); // 실행 OK.
d(); // error!
```

> 과거에는 기명함수 표현식을 많이 사용했었는데, 그 이유는 디버깅시에 익명 함수 표현식은 함수명 undefined, unnamed라고 나왔기 때문이다. 그러나 현재 모든 브라우저들은 익명함수 표현식의 변수명을 함수의 name 프로퍼티에 할당하고 있어서, 굳이 기명함수 사용하지 않아도 된다.



💡 함수선언식은 자바스크립트 로딩시점에 변수객체에 함수를 할당하기 때문에 변수객체에 너무 많은 코드를 저장하면 어플리케이션 응답속도가 느려질 수 있다. 그러나 함수 표현식은 runtime시점에서 실행되기 때문에, <br>**함수 표현식 권장!**



##### 💻 함수 선언문,표현식 호이스팅

```javascript
console.log(sum(1,2));
console.log(multiply(3,4));

function sum(a,b) {
	return a + b;
}

var multiply = function (a,b) {
	return a * b;
}
```

호이스팅 후

```javascript
function sum(a,b) { // 함수 선언문은 전체를 호이스팅
	return a + b;
}

var multiply; // 변수는 선언부만 끌어올림


console.log(sum(1,2));
console.log(multiply(3,4));


multiply = function (a,b) { // 변수 할당부는 원래 자리에
	return a * b;
}
```



##### ⚠️전역공간에 동명의 함수가 여럿 존재하는 상황이라 하더라도 모든 함수가 **함수 표현식으로 정의**돼 있다면, <br>그 줄에 바로 에러가 검출 되므로 빠른 타이밍에 디버깅을 할 수 있다. 



#### 3-3. var, const, let 호이스팅

|          |   var    | const |  let  |
| :------: | :------: | :---: | :---: |
|  스코프  | function | block | block |
|  재선언  |    O     |   X   |   X   |
|  재할당  |    O     |   X   |   O   |
| 호이스팅 |    O     |   O   |   O   |

const,let도 호이스팅이 된다고 하는데 실제로는 reference error가 발생한다. 그 이유는 무엇일까??