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
document.addEventListener('DOMContentLoaded', () => {            //DOMが読み込まれるたびに発動する関数
    const getList = JSON.parse(localStorage.getItem("storage")); //ストレージに文字列として保存してあるオブジェクトを解凍して、配列に戻す
    if (getList) {                                               //もしストレージにアイテムがあれば起こる関数（というより、解凍されれば発動する関数かな。解凍されなければ、この関数は発動しない）
        getList.forEach(todo => {                                //ストレージに存在したオブジェクトをそれぞれ取り出し、それぞれをtodoという変数に入れてaddObj関数を適用される
            addObj(todo);                                        //😅不安な点として、forEachは変数を定義してそれぞれをその変数名として関数を実行しているのか？という点。日本語難しすぎる。
        });
    }
});
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
register.addEventListener("click",function(event){               //登録ボタンがクリックされるたびに発動する関数
    if(input.value.trim() === ""||calendar.value.trim() === ""){ //もしタスク名入力欄が空欄だった場合それか、期日入力欄が空欄だった場合、
        return;                                                  //「何もしない」を返す。つまり登録ボタン押しても何も起こらない。そしてそれ以降の関数は実行されない。
    }
    event.preventDefault();                                      //クリックしたら普通はリロードされて表示されるがそれを止める
    addObj();                                                    //addObj関数を実行
    save();                                                      //save関数を実行
})
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
form1.addEventListener("submit",function(event){                 //タスク入力欄でEnterを押される度起こる関数
    event.preventDefault();                                      //普通なら起こるリロードを止める
    if(input.value.trim() === ""||calendar.value.trim() === ""){ //もし、タスク名入力欄が空欄だった場合それか、期日入力欄が空欄だった場合、
        return;                                                  //「何もしない」を返す。つまり登録ボタン押しても何も起こらない。そしてそれ以降の関数は実行されない。
    }
    addObj();                                                    //addObj関数を実行
    save();                                                      //save関数を実行
})
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
document.addEventListener("click",function(event){               //HTML要素がクリックされるたびに発動する関数
    if(event.target.matches(".hako")){                           //もしクリックされた要素がクラス名"hako"を持っていた場合、以下の関数を実行する
        const evetage = event.target;                            //クリックされた要素をevetageという変数に格納（今回の場合はinputタグ）
        const pevetage = evetage.parentElement;                  //チェックボックスの親要素（今回の場合はtdタグ）をpevetageという変数に格納する
        const ppevetage = pevetage.parentElement;                //tdタグの親要素（今回の場合はtrタグ）をppevetageという変数に格納
        ppevetage.classList.toggle("selected");                  //チェックボックス（inputタグ）がクリックされるたびに、その先祖要素であるtrタグにselectedクラスが付与されたり外されたりする
    }
})
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー




// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
allDelete.addEventListener("click",function(event){              //HTML要素がクリックされるたびに発動する関数
    event.preventDefault();                                      //普通なら起こるリロードを止める
    const selects = document.querySelectorAll(".selected");      //selectedクラスがついている要素を全て持ってきてselectsという変数に格納する
    selects.forEach(line =>{                                     //selectsの中に入っているそれぞれのtrタグをそれぞれlineという変数に入れて以下の関数を実行する
        line.remove();                                           //line変数に入っているものを取り除く
    });
    save();                                                      //save関数を実行する
});
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function addObj(todo){                                           //addObjという関数を定義する（todoという変数に対して以下を実行することもある）
    const task = {};                                             //taskという空のオブジェクトを定義する
    if (todo) {                                                  //もしtodo（ストレージに入っていたアイテム）があれば以下を実行する
        task.input = todo.input;                                 //taskの中身のinputプロパティを定義し、それはtodoのinputプロパティと同じとする
        task.priority = todo.priority;                           //taskの中身のproiorityプロパティを定義し、それはtodoのpriorityプロパティと同じとする
        task.limit = todo.limit;                                 //taskの中身のlimitプロパティを定義し、それはtodoのlimitプロパティと同じとする
        task.check = todo.check;                                 //taskの中身のcheckプロパティを定義し、それはtodoのcheckプロパティと同じとする
    } else {                                                     //もしtodo（ストレージに入っていたアイテム）がなければ以下を実行する
        task.input = input.value;                                //taskの中身のinputプロパティを定義し、それはinputタグに書いてあるものと同じとする
        task.priority = priority.options[priority.selectedIndex].textContent;//taskの中身のproiorityプロパティを定義し、それはpriorityの現在選ばれているテキスト内容と同じとする
        task.limit = calendar.value;                             //taskの中身のlimitプロパティを定義し、それはcalendarに書いてあるものと同じとする
        task.check = false;                                      //taskの中身のcheckプロパティを定義し、それはfalseとする
    }
    const trs = document.createElement("tr");                    //HTMLにtrタグを作るという合図をtrsとする
    table.appendChild(trs);                                      //tableタグの子要素にtrs（trタグ）を作成する
    trs.classList.add("new");                                    //作成したtrタグにクラスnewを付与する


    for (const key in task) {                                    //taskの中のプロパティ達をkeyと定義し、以下の関数を繰り返す
        const td = document.createElement("td");                 //HTMLにtdタグを作成する合図をtdとする
        if (key === "input" || key === "priority" || key === "limit") { //もしkey(プロパティ名)がinputか、priorityか、limitであるならば以下を実行する
            td.classList.add("canEdit");                         //作成したtdにクラス（canEdit）を与える
        }
        if (key === "check") {                                   //もしkey（プロパティ名）がcheckならば以下を実行する
            const checkbox = document.createElement("input");    //HTMLにinputタグを作る合図をcheckboxとする
            checkbox.setAttribute("type","checkbox");            //checkboxにtype属性checkboxを与える（これによってただのinputタグがcheckboxになる）
            checkbox.classList.add("hako");                      //checkboxにhakoというクラスを与える
            td.appendChild(checkbox);                            //ここで初めてtdタグの中にcheckbox（inputタグ）を作成する
            } else {                                             //もしkey（プロパティ名）がcheckではなかったら
            td.textContent = task[key];                          //tdタグの中身のテキストをtask[key]とする（つまり、input、priority、limitであり、それらはテキスト内容を持っている）
            }
        trs.appendChild(td);                                     //trタグの中身にtdタグを作成する
        }
    if (!todo) {                                                 //もし、todoが存在しなかったら（ストレージに何もなかったら）
        input.value = "";                                        //inputタグの中身を空にする
        priority.value = "high"                                  //priorityタグの中身をhighにする（highに割り当てているのは「高」）
        calendar.value = "";                                     //calendarの中身を空にする
    }



    const editButton = document.createElement("button");         //HTML要素にbutton要素を作成する合図をeditButtonとする
    editButton.textContent = "編集";                              //ボタンの中のテキスト内容を「編集」とする
    editButton.classList.add("editBtn");                         //編集ボタンにeditButtonというクラスを与える
    const editTd = document.createElement("td");                 //HTMLにtdタグを作成する合図をeditTdとする
    editTd.appendChild(editButton);                              //editTdタグの中ににeditButtonを作成する
    trs.appendChild(editTd);                                     //trタグの中にeditTdを作成する
}
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function save(){                                                 //save関数の中身を以下のとおりとする
    const lists = document.getElementsByClassName("new");        //newというクラス名を持ったもの達を取得してきてlistsという変数に格納する
    storage =[];                                                 //storageという空の配列を用意する
    Array.from(lists).forEach(list => {                          //listsを第二引数に引き渡し（今回の場合はforEachの引数に引き渡し）、それの中身をlistと定義しそれぞれに以下の関数を実行する
        let todo = {                                             //todoというオブジェクトを用意する
            input: list.querySelector("td:nth-child(1)").innerText,//input:listの一つ目のテキスト内容とする
            priority: list.querySelector("td:nth-child(2)").innerText,//priority:listの二つ目のテキスト内容とする
            limit: list.querySelector("td:nth-child(3)").innerText,//limit:listの三つ目のテキスト内容とする
            check: list.querySelector("td:nth-child(4) input").checked//check:listの四つ目がチェックされているかどうかを調べチェックされていたらtrue、されていなかったらfalseとする
        }
        storage.push(todo);                                      //todo（四つのlistを持っているオブジェクト）をstorageという空の配列に入れる
    });
    localStorage.setItem("storage",JSON.stringify(storage));     //ローカルストレージにstorageの中身を文字列に変更してセットする
}
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
let editing = false;                                             //editingという変数はfalseとする
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
document.addEventListener("click", function(event) {             //HTML要素がクリックされるたびに以下のコードを実行する
    if (!editing && event.target.matches(".editBtn")) {          //もし、クリックされたものがクラスeditBtnで且つfalseではなかった場合、以下のコードを実行する
        editing = true;                                          //editingという変数はtrueとする

        const tr = event.target.closest("tr");                   //
        const tds = tr.querySelectorAll("td.canEdit");           //

        tds.forEach(td => {                                      //
            const oldValue = td.textContent.trim();              //
            const input = document.createElement("input");       //
            input.value = oldValue;                              //
            td.textContent = '';                                 //
            td.appendChild(input);                               //
        });

        const finishEditButton = document.createElement("button");//
        finishEditButton.textContent = "完了";                    //
        finishEditButton.classList.add("finishEditBtn");         //
        const editTd = document.createElement("td");             //
        editTd.appendChild(finishEditButton);                    //
        tr.appendChild(editTd);                                  //

        const editButtons = document.querySelectorAll(".editBtn");//
        editButtons.forEach(button => {                          //
            button.disabled = true;                              //
        });
    }

    if (event.target.matches(".finishEditBtn")) {                //
        editing = false;                                         //

        const tr = event.target.closest("tr");                   //
        const tds = tr.querySelectorAll("td.canEdit");           //

        tds.forEach(td => {                                      //
            const newValue = td.querySelector("input").value.trim();//
            td.textContent = newValue;                           //
        });

        event.target.parentElement.remove();                     //
        save();                                                  //

        const editButtons = document.querySelectorAll(".editBtn");//
        editButtons.forEach(button => {                          //
            button.disabled = false;                             //
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
