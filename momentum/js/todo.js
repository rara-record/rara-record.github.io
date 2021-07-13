const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos"



// Draw todo list
// 4. span에 newTodo라는 이름으로 받은 매개변수에 저장된 value를 innertext하고, 
// 5. button 만듬
// 6. button에 text입력
// if) 6-1. button 클릭시 이벤트 발생, deleteToDo호출
// 7. li 밑에 span추가
// 8. li 밑에 btn 추가
// 9. 마지막으로 ul에 li추가
function paintToDo(newTodo) {
  const li = document.createElement("li"); 
  const span = document.createElement("span");

  span.innerText = newTodo; 
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

// Delete todo list
// 6-2. event에 대한 정보를 매개변수로 받음
function deleteToDo(event) {
  // target은 클릭된 HTML element이다. 즉 <button>❌</button>
  console.log(event.target); 
  // console.dir target의 property들의 정보를 알 수 있는데,
  console.dir(event.target); 
  // 그 중에서 parentElement property는 target(클릭된 element)의 부모다. 
  console.log(event.target.parentElement); 

  // 6-3. 즉 클릭된 btn의 li
  const parentOfTarget = event.target.parentElement;
  // 6-4. 지워준다
  parentOfTarget.remove();
}

// Input submit
// 1. handleToDoSubmit 안에서, 
// 2. newTodo로 저장해놓은 Input의 value를, 인자로 받아서 paintToDo함수를 호출하게 되면,
// 3. paintToDo에 Input의 value값이 보내진다.
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value; // 복사해서 저장하고
  toDoInput.value = "";           // input.value를 비움
  paintToDo(newTodo);

}
toDoForm.addEventListener("submit", handleToDoSubmit);



// Todo List
// 1. input에 내용을 입력하고 value값이 submit되면, todo list가 나타나야 한다.
// 2. toDoList를 지울 수 있어야 한다. 
// 3. btn을 클릭했을때, 그 btn이 속한 li만 지워야한다. (어떤 li를 지워야 하는지 알아야한다.)
// 4. 새로고침해도 toDoList들이 사라지지 않아야한다. (localStroage) 

