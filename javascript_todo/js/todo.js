// form
const questForm = document.querySelector("#quest-form");
// 퀘스트 목록 
const questList = document.querySelector("#quest-list");
// 보상 목록
const rewardList = document.querySelector("#reward-list");
// input
const quest = document.querySelector("input#quest");
const reward = document.querySelector("input#reward");
// 버튼
const submitBtn = document.querySelector(".submit-btn");
// 퀘스트 목록 class순번 전역변수
let idNumbers = 1;


function paintrewardList(rewardObj) {
  // li
  const li = document.createElement("li");

  // li div
  const textBox = document.createElement("div");

  //li div strong: playerName
  //const  playerName = document.createElement("strong");
  //playerName.innerText = `${localStorage.getItem("username")}`;


  // li div span
  const questSpan = document.createElement("span");
  questSpan.innerText = `${rewardObj.quest}을(를) 완료하여 `;

  // li div strong
  const strong = document.createElement("strong");
  strong.innerText = `${rewardObj.reward === "" ? `보람` : `${rewardObj.reward}`}`;

  // li div span
  const textSpan = document.createElement("span");
  textSpan.innerText = `을(를) 얻었습니다!`;

  // button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "✖";
  deleteBtn.addEventListener("click", deleteQuest);

  //div.appendChild(playerName);
  textBox.append(questSpan, strong, textSpan);
  li.append(textBox, deleteBtn);
  rewardList.append(li);
};


// 버튼을 클릭하면 지운다.
// target : 선택된 HTML element
function deleteQuest(e) {
  const selectedList = e.target.parentNode.parentNode;
  selectedList.remove();
};


// 퀘스트 목록의 html을 그려서 사용자 value추가.
function paintQuestList(questObj) {
  // li
  const li = document.createElement("li");
  li.id = `quest-${idNumbers}`;
  idNumbers++;

  // li div
  const textBox =  document.createElement("div");
  textBox.classList.add("text-box");
  const btnBox = document.createElement("div");
  btnBox.classList.add("btn-box");

  // li textBox span / strong
  const questSpan = document.createElement("span");
  questSpan.innerText = questObj.quest;
  const textSpanOne = document.createElement("span");
  textSpanOne.innerText = `을(를) 해서 `;
  const strong = document.createElement("strong");
  strong.innerText = questObj.reward;
  const textSpanTwo = document.createElement("span");
  textSpanTwo.innerText = `을(를) 얻자!`;

  // li btnBox btn
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✔";
  checkBtn.classList.add("check");
  checkBtn.addEventListener("click", addReward);
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "✖";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", deleteQuest);

  // ALL append
  textBox.append(questSpan, textSpanOne, strong, textSpanTwo);
  btnBox.append(checkBtn, deleteBtn);
  li.append(textBox, btnBox);
  questList.append(li);
};

function deleteReward(e) {
  const rewardList = e.target.parentNode;
  rewardList.remove();
}

// 퀘스트를 추가한다.
function addQuest(e) {
  e.preventDefault();
  // 현재 input의 value를 얻어, 새로운 변수에 복사 한 다음, 공백처리.
  const tempQuest = quest.value;
  const tempReward = `${reward.value === "" ? `보람` : `${reward.value}`}`;
  quest.value = "";
  reward.value = "";

  const questObj = {
    quest: tempQuest,
    reward: tempReward,
  };
  paintQuestList(questObj);
};


function addReward(e) { 
  e.preventDefault();
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const parentTemp = e.target.parentNode.parentNode;
  console.log(parentTemp);
  const rewardObj = {
    quest: parentTemp.querySelector("span").innerText,
    reward: parentTemp.querySelector("strong").innerText,
    date: `${hour < 10 ? `0${hour}` : `${hour}`}:${
      minute < 10 ? `0${minute}` : `${minute}`
    }`,
  };
  paintrewardList(rewardObj);
  deleteQuest(e);
}
questForm.addEventListener("submit", addQuest);

// input에서 value를 얻어서, paintQuest함수에 그 값을 보낸다.