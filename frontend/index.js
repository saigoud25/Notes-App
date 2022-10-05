const AddBtn = document.querySelector(".add");
const ClearBtn = document.querySelector(".clear");

const addtaskinput = document.querySelector(".addtaskinput");
const searchtaskinput = document.querySelector(".searchtaskinput");
const tasks=document.querySelector(".tasks");

const addtask=()=>{
    const addtaskinputcontent=addtaskinput.value;
//     <div class="task border-2 border d-flex justify-content-between ">
//     <p class="content p-2">
//         Content hain yeh
//     </p>
//     <span class="bg-dark p-3 text-white"><a href="" class="text-decoration-none text-white fw-bold">X</a></span>
// </div>
const task=document.createElement("div");
task.classList.add("task","border","d-flex","justify-content-between");
const paragraph=document.createElement("p");
paragraph.classList.add("content","p-2")
paragraph.textContent=addtaskinputcontent;
task.appendChild(paragraph);
const span=document.createElement("span");
span.classList.add("bg-dark","p-3");
task.appendChild(span);

const a=document.createElement("a");
a.classList.add("text-decoration-none","text-white");
a.textContent="X";
span.appendChild(a);

tasks.appendChild(task);
}

AddBtn.addEventListener("click",addtask);