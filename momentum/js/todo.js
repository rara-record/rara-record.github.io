const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos"

let toDos = [];

// save todos
// toDos배열에, newTodoObj를 담아 localStorage에 저장한다.
// save todo : toDos array의 내용을 localStorage에 넣는다
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// Draw todo list
// 4-2. span에 newTodo라는 매개변수로 받은, newTodoObj안의 text를 innertext하고, 
// 4-3. button에 text입력
// if) 4-3-1 button 클릭시 이벤트 발생, deleteToDo호출
// 4-4. li 밑에 span추가 => li 밑에 btn 추가 => 마지막으로 ul에 li추가
function paintToDo(newTodo) {
  const li = document.createElement("li"); 
  li.id = newTodo.id;  // li에 id를 부여한다
  const span = document.createElement("span");
  span.innerText = newTodo.text; // newTodoObj의 toDoInput.value
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

// Delete todo list
// 4-3-2. event에 대한 정보를 매개변수로 받음
function deleteToDo(event) {
  /*
  target은 클릭된 HTML element이다. 즉 <button>❌</button>
  console.log(event.target); 

  console.dir target의 property들의 정보를 알 수 있는데,
  console.dir(event.target); 

  그 중에서 parentElement property는 target(클릭된 element)의 부모다. 
  console.log(event.target.parentElement); 
  */

  // 4-3-3. 즉 클릭된 btn의 li
  const li = event.target.parentElement;
  // 4-3-4. 지워준다 (화면)
    li.remove();
  // 4-3-5. 클릭한 li.id와 다른 toDo는 남긴다. (localStorage)
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  // 4-3-6. 삭제 후 저장 꼭!
  saveToDos();
}

// Input submit
// 1. submit되면, input의 value값 미리 복사 : newTodo로 저장해두고 비워둠
// 2. newTodoObj을 만들어서, newTodo와, 고유id를 저장
// 3. toDos에 newTodoObj push
// 4-1. paintToDo에 newTodoObj를 넘김
// 4.localStorage에 newTodoObj를 추가 하기위해 saveToDos호출
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value; 
  toDoInput.value = "";  
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  } 
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();

}
toDoForm.addEventListener("submit", handleToDoSubmit);

// 새로고침 했을때 이전 데이터가 남아있게
// localStorage에 저장된 newTodoObj를 불러온다.
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  // 배열로 바꿈
  const parsedToDos  = JSON.parse(savedToDos);
  // 이전 값 유지하기.
  toDos = parsedToDos; 
  // 불러 온 todo들을 각각 순회하면서 paint함수 호출
  parsedToDos.forEach(paintToDo); 
}


/*
const arr = [1234, 5454, 223, 122, 45, 6776, 334]
function sexyfilter(x) { return x <= 1000 }
console.log(arr.filter(sexyfilter));
*/



