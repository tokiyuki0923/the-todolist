"use strict";

// それぞれ必要な情報を取得
const form1 = document.getElementById("form1");
const input = document.getElementById("input");
const priority = document.getElementById("priority");
const calendar = document.getElementById("calendar");
const register = document.getElementById("register");
const table = document.getElementById("table"); 

// 登録ボタンがクリックされた時に発動する関数
register.addEventListener("click",function (event){
    event.preventDefault();
    addText();
    addPriority();
    addDate();
    addCheck();
});
// Enterが押された時に発動する関数
form1.addEventListener("submit",function(event){
    event.preventDefault();
    addText();
    addPriority();
    addDate();
    addCheck();
});

// inputタグに書かれているテキストを加えるというコールバック関数
function addText(){
    let text = input.value;
    if(text){
        const th1 = document.createElement("th");
        th1.innerText = text;
        th1.classList.add("toDoList");
        table.appendChild(th1);
        input.value = "";
    }
}

// 選択されている優先順位を加えるというコールバック関数
function addPriority(){
    let pri = priority.options[priority.selectedIndex].textContent;
    if(pri){
        const th2 = document.createElement("th");
        th2.innerText = pri;
        th2.classList.add("prioritise");
        table.appendChild(th2);
        priority.value = "high"
    }
}

// 選択されている日付を加えるというコールバック関数
function addDate(){
    let date = calendar.value;
    if(date){
        const th3 = document.createElement("th");
        th3.innerText = date;
        th3.classList.add("limit");
        table.appendChild(th3);
        calendar.value = ""
    }
}

function addCheck(){
    const th4 = document.createElement("th");
    table.appendChild(th4);
    if(th4){
        let checkBox = th4.appendChild(document.createElement("input"));
        checkBox.setAttribute("type","checkbox");
    }
}



