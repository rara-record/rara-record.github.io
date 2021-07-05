# Login Event2

1. 이벤트로부터 얻을 수 있는 다양한 정보가 존재한다.
2. **click이벤트에 비롯된 정보는, MouseEvent이다.**
3. **MouseEvnet는 유저가 클릭한 위치를 X, Y좌표로 알 수 있다.** (유저가 어디를 클릭했는지 알아야 할 때 사용)
4. path : 우리가 클릭할 때 무슨 일이 있었는지, 어디서 발생했는지 배열로 보여준다 .
5. addEventListner() 함수는 우리가 실행하는 것이 아니라, 브라우저가 해주는 것이다.
6. 브라우저는 실행만 시켜주는 것이 아니라, event에 대한 정보도 담아준다.

**💡 유저가 이름을 입력하면, form을 없애고 싶을때 방법은?**

1. HTML요소 자체를 없앤다.  
2.  CSS를 이용해서 숨겨준다. 

## Getting Value(Username)

1. 일반적으로 string만 포함된 변수는 대문자로 표기하고, string을 저장하고 싶을 때 사용한다. 예) const HIDDEN_CLASSNAME = "hidden"

## Saving Value (Username)

1. localStroage API는 우리가 브라우저에 뭔가를 저장할 수 있게 해준다. 그래서 나중에 가져다 쓸 수 있다.
2. **localStroage API method :  { key : value } **
   1. **localStroage.setItem() : lacal stroage에 정보를 저장**
   2. **localStroage .getItem() : localStroage에 저장한 key에 해당하는 value를 불러온다.**
   3. localStroage .removeItem() : localStroage에 저장한 값 삭제
3. localStroage에 없는 정보를 불러오려고 하면, null값을 받는다.