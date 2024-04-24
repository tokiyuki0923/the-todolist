"use strict";

// それぞれ必要な情報を取得
const form1 = document.getElementById("form1");
const input = document.getElementById("input");
const priority = document.getElementById("priority");
const calendar = document.getElementById("calendar");
const register = document.getElementById("register");
const table = document.getElementById("table"); 
const tr = document.getElementById("tr");

let storage = [];


// ドキュメントが読み込まれるたびに起こる関数。ローカルストレージに何も存在しなかったら何も返さないで次に行く→これいるか？







register.addEventListener("click",function(event){
    event.preventDefault();
    addObj();
    save();
})


form1.addEventListener("submit",function(event){
    event.preventDefault();
    addObj();
    save();
})


function addObj(){
    const task = {};
    task.input = input.value;
    task.priority = priority.options[priority.selectedIndex].textContent;
    task.limit = calendar.value;
    task.check = false;
    const trs = document.createElement("tr");
    table.appendChild(trs);
    trs.classList.add("new");
    for (const key in task) {
        const td = document.createElement("td");
        if (key == "check") { 
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            td.appendChild(checkbox); 
            } else {
            td.textContent = task[key];
            }
        trs.appendChild(td);
        }
    input.value = "";
    priority.value = "high";
    calendar.value = "";
}



function save(){
    const lists = document.getElementsByClassName("new");
    let storage = [];
    Array.from(lists).forEach(list => {
        let todo = {
            input: list.querySelector("td:nth-child(1)").innerText,
            priority: list.querySelector("td:nth-child(2)").innerText,
            limit: list.querySelector("td:nth-child(3)").innerText,
            check: list.querySelector("td:nth-child(4) input").checked
        }
        storage.push(todo);
    });
    localStorage.setItem("storage",JSON.stringify(storage));
}










/* const value = task[key];
console.log(`key:${key}, value:${value}`); */



















/* // 登録ボタンがクリックされた時に発動する関数
register.addEventListener("click",function (event){
    event.preventDefault();
    addText();
    addPriority();
    addDate();
    addCheck();
    addTr();
    save();
});
// Enterが押された時に発動する関数
form1.addEventListener("submit",function(event){
    event.preventDefault();
    addText();
    addPriority();
    addDate();
    addCheck();
    addTr();
    save();

}); */
/* 
function addTr(){
    const trs = document.createElement("tr");
    table.appendChild(trs);
    trs.classList.add(aaa);
}

// inputタグに書かれているテキストを加えるというコールバック関数
function addText(){
    let text = input.value;
    if(text){
        const td1 = document.createElement("td");
        td1.innerText = text;
        td1.classList.add("toDoList");
        aaa.appendChild(td1);
        input.value = "";
    }
}

// 選択されている優先順位を加えるというコールバック関数
function addPriority(){
    let pri = priority.options[priority.selectedIndex].textContent;
    if(pri){
        const td2 = document.createElement("td");
        td2.innerText = pri;
        td2.classList.add("toDoList");
        aaa.appendChild(td2);
        priority.value = "high"
    }
}

// 選択されている日付を加えるというコールバック関数
function addDate(){
    let date = calendar.value;
    if(date){
        const td3 = document.createElement("td");
        td3.innerText = date;
        td3.classList.add("toDoList");
        aaa.appendChild(td3);
        calendar.value = ""
    }
}

// チェックボックスを加えるというコールバック関数
function addCheck(){
    const td4 = document.createElement("td");
    aaa.appendChild(td4);
    if(td4){
        let checkBox = td4.appendChild(document.createElement("input"));
        checkBox.setAttribute("type","checkbox");
    }
}



function save(){
    const lists = document.querySelectorAll("toDoList");
    let todolist = [];
    lists.forEach(list =>{
        let todo = {
            text:list
        };
        todolist.push(todo);
    });
    localStorage.setItem("todolist",JSON.stringify(todolist));
} */
