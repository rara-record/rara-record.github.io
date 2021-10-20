// form
const toDoForm = document.querySelector("#quest-form");
// input
const questInput = document.querySelector("input#quest"), 
      rewardInput = document.querySelector("input#reward");
// 퀘스트 목록, 보상목록 
const questList = document.querySelector("#quest-list"),
      rewardList = document.querySelector("#reward-list");
// 버튼
const submitBtn = document.querySelector(".submit-btn");

// localstrage KEY값 설정
const QUEST_KEY = "quest";
const REWARD_KEY = "reward";

// 객체를 담을 배열
let questArray = [];
let rewardArray = [];

// 퀘스트 번호
let idNumbers = 1;

// 퀘스트 목록 지우는 함수
function deleteQuest(e) {
  // html 태그에서 li 태그 제거
  const quest = e.target.parentNode.parentNode;
  questList.removeChild(quest);

  // localStorage에서 제거
  const cleanArray = questArray.filter(function(list) {
    return list.id !== parseInt(quest.id); // li.id가 삭제를 위해 선택한 id이므로, 이번에 선택하지 않은 친구들만 return함
});
questArray = cleanArray;
// 삭제한 li.id를 뺀 cleanArray 배열로 덮어 씌움 (const면 덮어씌울 수 없으므로 let으로 접근지정자 변경)
saveToDos();
}

// 보상 목록 지우는 함수
function deleteReward(e) {
  // html 태그에서 li 태그 제거
  const reward = e.target.parentNode;
  rewardList.removeChild(reward);

  // localStorage에서 제거
  const cleanArray = rewardArray.filter(function(list) {
    return list.id !== parseInt(reward.id); // li.id가 삭제를 위해 선택한 id이므로, 이번에 선택하지 않은 친구들만 return함
});
rewardArray = cleanArray;
// 삭제한 li.id를 뺀 cleanArray 배열로 덮어 씌움 (const면 덮어씌울 수 없으므로 let으로 접근지정자 변경)
saveReward();
}

// 퀘스트 목록을 저장
function saveToDos() {
  localStorage.setItem(QUEST_KEY, JSON.stringify(questArray));
}

// 보상 목록을 저장
function saveReward() {
  localStorage.setItem(REWARD_KEY, JSON.stringify(rewardArray));
}

// 퀘스트 목록 그리는 함수
function paintQuest(questText, rewardText) {
  // li
  const quest = document.createElement("li");
  const newId = idNumbers;
  quest.id = idNumbers;
  idNumbers++;

  // li div
  const textBox =  document.createElement("div");
  textBox.classList.add("text-box");
  const btnBox = document.createElement("div");
  btnBox.classList.add("btn-box");

  // li textBox span / strong
  const questSpan = document.createElement("span");
  questSpan.innerText = questText;
  const textSpanOne = document.createElement("span");
  textSpanOne.innerText = `을(를) 해서 `;
  const strong = document.createElement("strong");
  strong.innerText = rewardText;
  const textSpanTwo = document.createElement("span");
  textSpanTwo.innerText = `을(를) 얻자!`;

  // li btnBox btn
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "✖";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", deleteQuest);
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✔";
  checkBtn.classList.add("check");
  checkBtn.addEventListener("click", addReward);

  // ALL append
  textBox.append(questSpan, textSpanOne, strong, textSpanTwo);
  btnBox.append(deleteBtn, checkBtn);
  quest.append(textBox, btnBox);
  questList.append(quest);

  // 객체 배열에 넣을 obj
  const questObj = {
    quest: questText,
    reward: rewardText,
    id: newId,
  };
  questArray.push(questObj);
  saveToDos();
}

// 보상 목록 그리는 함수
function paintReward(object) {
  // li
  const reward = document.createElement("li");
  const newId = idNumbers;
  reward.id = idNumbers;
  idNumbers++;

  // li div
  const textBox = document.createElement("div");

  //li div strong: playerName
  const  playerName = document.createElement("strong");
  playerName.innerText = `${localStorage.getItem("username")}`;

  //li div span
  const timeSpan = document.createElement("span");
  timeSpan.innerText = ` 님이 ${object.date}에 `;

  // li div span
  const questSpan = document.createElement("span");
  questSpan.innerText = `${object.quest}을(를) 완료하여 `;

  // li div strong
  const strong = document.createElement("strong");
  strong.innerText = `${object.reward === "" ? `보람` : `${object.reward}`}`;

  // li div span
  const textSpan = document.createElement("span");
  textSpan.innerText = `을(를) 얻었습니다!`;

  // button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "✖";
  deleteBtn.addEventListener("click", deleteReward);

  textBox.append(playerName, timeSpan, questSpan, strong, textSpan);
  reward.append(textBox, deleteBtn);
  rewardList.append(reward);

  // 객체에 id 추가
  object.id = newId;
}

// 보상목록에 추가
function addReward(e) {
  // 완료시 현재 시간
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();

  // 사용자가 선택한 li
  const parentTemp = e.target.parentNode.parentNode;

  // object로 만든다
  const rewardObj = {
    quest: parentTemp.querySelector("span").innerText,
    reward: parentTemp.querySelector("strong").innerText,
    date: `${hour < 10 ? `0${hour}` : `${hour}`}:${
      minute < 10 ? `0${minute}` : `${minute}`
    }`,
  }
  rewardArray.push(rewardObj);
  saveReward();
  paintReward(rewardObj);
  deleteQuest(e);
}

function handleSubmit(e) {
  e.preventDefault();
  const tempQuest = questInput.value;
  const tempReward = `${reward.value === "" ? `보람` : `${reward.value}`}`;
  paintQuest(tempQuest, tempReward);
  questInput.value = ""; // 입력란 초기화
  rewardInput.value = ""; // 입력란 초기화
}

function loadToDos() {
  // loadQuest
  const loadQuest = localStorage.getItem(QUEST_KEY); 
  if(loadQuest !== null) {
    const parsedQuest = JSON.parse(loadQuest);

    parsedQuest.forEach((text) => {
      paintQuest(text.quest, text.reward);
    });
  }

  // loadReward
  const loadReward = localStorage.getItem(REWARD_KEY);
  if(loadReward !== null) {
    const parsedReward = JSON.parse(localStorage.getItem(REWARD_KEY));
    parsedReward.forEach((object) => paintReward(object));
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();


// for(var i =0; i < localStorage.length; i++){
//   console.log(localStorage.getItem(localStorage.key(i)));
// }
