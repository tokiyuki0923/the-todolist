"use strict";

// それぞれ必要な情報を取得
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const input = document.getElementById("input");
const priority = document.getElementById("priority");
const calendar = document.getElementById("calendar");
const register = document.getElementById("register");
const table = document.getElementById("table"); 
const tr = document.getElementById("tr");
const selected = document.getElementsByClassName("selected");
const allDelete = document.getElementById("allDelete");
const hako = document.getElementsByClassName("hako");





// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
let storage = [];      //ストレージに配列としてオブジェクトを保存するための、空の配列を定義
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
document.addEventListener('DOMContentLoaded', () => {
    const getList = JSON.parse(localStorage.getItem("storage"));
    if (getList) {
        getList.forEach(todo => {
            addObj(todo);
        });
    }
});
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
register.addEventListener("click",function(event){
    if(input.value.trim() === ""||calendar.value.trim() === ""){
        return;
    }
    event.preventDefault();
    addObj();
    save();
})
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
form1.addEventListener("submit",function(event){
    event.preventDefault();
    if(input.value.trim() === ""||calendar.value.trim() === ""){
        return;
    }
    addObj();
    save();
})
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
document.addEventListener("click",function(event){
    if(event.target.matches(".hako")){
        const evetage = event.target;
        const pevetage = evetage.parentElement;
        const ppevetage = pevetage.parentElement;
        ppevetage.classList.toggle("selected");
    }
})
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー




// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
allDelete.addEventListener("click",function(event){
    event.preventDefault();
    const selects = document.querySelectorAll(".selected");
    selects.forEach(line =>{
        line.remove();
    });
    save();
});
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function addObj(todo){
    const task = {};
    if (todo) {
        task.input = todo.input;
        task.priority = todo.priority;
        task.limit = todo.limit;
        task.check = todo.check;
    } else {
        task.input = input.value;
        task.priority = priority.options[priority.selectedIndex].textContent;
        task.limit = calendar.value;
        task.check = false;
    }
    const trs = document.createElement("tr");
    table.appendChild(trs);
    trs.classList.add("new");


    for (const key in task) {
        const td = document.createElement("td");
        if (key === "input" || key === "priority" || key === "limit") { 
            td.classList.add("canEdit");
        }
        if (key === "check") { 
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            checkbox.classList.add("hako");
            td.appendChild(checkbox); 
            } else {
            td.textContent = task[key];
            }
        trs.appendChild(td);
        }
    if (!todo) {
        input.value = "";
        priority.value = "high";
        calendar.value = "";
    }



    const editButton = document.createElement("button");
    editButton.textContent = "編集";
    editButton.classList.add("editBtn");
    const editTd = document.createElement("td");
    editTd.appendChild(editButton);
    trs.appendChild(editTd);
}
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function save(){
    const lists = document.getElementsByClassName("new");
    storage =[];
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
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
let editing = false;
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
document.addEventListener("click", function(event) {
    if (!editing && event.target.matches(".editBtn")) {
        editing = true;

        const tr = event.target.closest("tr");
        const tds = tr.querySelectorAll("td.canEdit");

        tds.forEach(td => {
            const oldValue = td.textContent.trim();
            const input = document.createElement("input");
            input.value = oldValue;
            td.textContent = '';
            td.appendChild(input);
        });

        const finishEditButton = document.createElement("button");
        finishEditButton.textContent = "完了";
        finishEditButton.classList.add("finishEditBtn");
        const editTd = document.createElement("td");
        editTd.appendChild(finishEditButton);
        tr.appendChild(editTd);

        const editButtons = document.querySelectorAll(".editBtn");
        editButtons.forEach(button => {
            button.disabled = true;
        });
    }

    if (event.target.matches(".finishEditBtn")) {
        editing = false; 

        const tr = event.target.closest("tr"); 
        const tds = tr.querySelectorAll("td.canEdit");

        tds.forEach(td => {
            const newValue = td.querySelector("input").value.trim();
            td.textContent = newValue;
        });

        event.target.parentElement.remove();
        save(); 

        const editButtons = document.querySelectorAll(".editBtn");
        editButtons.forEach(button => {
            button.disabled = false;
        });
    }
});
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー











/* 
ぜーーーーんぶ自分で書いたコード。なんだかんだ役に立った。いつかこのコードゴミだなとか思えますように。
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
