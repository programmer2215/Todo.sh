const taskPrompt = document.querySelector('.todo-prompt')
const taskBlinker = taskPrompt.querySelector('.prompt-tail')
const promptTxt = taskPrompt.querySelector(".todo-task-txt")
const list = document.querySelector(".todos")

const urgPrompt = document.querySelector('.urgent-prompt')
const urgBlinker = urgPrompt.querySelector(".prompt-tail")
const urgTxt = urgPrompt.querySelector(".todo-task-txt")
const impPrompt = document.querySelector('.important-prompt')
const impTxt = impPrompt.querySelector(".todo-task-txt")
const impBlinker = impPrompt.querySelector(".prompt-tail")

const completeAud = new Audio("complete.wav")
const deleteAud = new Audio("delete.wav")

let task = "";
let id = 0;
let impInp = ""
let urgInp = ""

let nameAdded = false;
let imp = false;
let listObj = []

let isImp = false
let isUrg = false

function render(){
    list.innerHTML = ""
    listObj.forEach((obj) => {
        if (!obj.isComplete)addTask(obj)
    })
    listObj.forEach((obj) => {
        if (obj.isComplete)addTask(obj)
    })
}

function addEntry(){
    let obj = {
        id : id,
        task : task,
        isImp : isImp,
        isUrg : isUrg,
        isComplete : false
    }

    listObj.push(obj)
    render()
}

function gencategory(i, u){
    if (i || u){
        if (i && u) return "Important + Urgent"
        return i ? "Important + Not Urgent" : "Urgent + Not Important" 
    }
    return "Not Important + Not Urgent"
}

function gencategoryclass(i, u){
    if (i || u){
        if (i && u) return "iu"
        return i ? "inu" : "uni" 
    }
    return "ninu"
}


function delObj(id){
    let idx = listObj.findIndex((obj) => {
        return obj.id == id
    },)

    listObj.splice(idx, 1)
    deleteAud.play()
    render()
}

function toggleCompletion(id){
    let idx = listObj.findIndex((obj) => {return obj.id == id})
    
    listObj[idx].isComplete = listObj[idx].isComplete ? false : true
    
    if(listObj[idx].isComplete)completeAud.play()
    render()
}

function addTask(obj) {
    if (obj.task.length > 0){

    let elem = document.createElement('div')
    elem.classList.add("todo")
    elem.setAttribute('id', obj.id)
    elem.innerHTML = `<div class="sub-div"><label class="task-txt">${obj.task}<input type="checkbox" class="check-box" ${obj.isComplete ? "checked" : ""} onclick="toggleCompletion(${obj.id})"><span class="checkmark"></span></label></div> <span class="${gencategoryclass(obj.isImp, obj.isUrg)}">${gencategory(obj.isImp, obj.isUrg)}</span> <i class="acts fa-sharp fa-regular fa-trash-can" onclick="delObj(${obj.id})"></i>`
       
    list.appendChild(elem); 

    }
}



function type(ev) {
    key = ev.key
    if (key == "Enter"){
        
        if (!nameAdded && task.length > 0){
            nameAdded = true;
            impPrompt.style.visibility = "visible"
            taskBlinker.classList.remove("prompt-tail")
        }else if (nameAdded && !imp && (impInp.toUpperCase() == 'Y' || impInp.toUpperCase() == 'N')){
            imp = true;
            isImp = impInp.toUpperCase() === 'Y' ? true : false
            urgPrompt.style.visibility = "visible"
            impBlinker.classList.remove('prompt-tail')
        }else if(urgInp.toUpperCase() == 'Y' || urgInp.toUpperCase() == 'N'){
            isUrg = urgInp.toUpperCase() === 'Y' ? true : false
            addEntry()
            task = ""
            promptTxt.textContent = task
            impInp = ""
            impTxt.textContent = impInp
            urgInp = ""
            urgTxt.textContent = urgInp
            impPrompt.style.visibility = "hidden"
            taskBlinker.classList.add("prompt-tail")
            urgPrompt.style.visibility = "hidden"
            impBlinker.classList.add('prompt-tail')
            nameAdded = false
            imp = false
            isImp = false
            isUrg = false
            id++;
        }
        
    }else {
        if (!nameAdded){
            task += key;
            promptTxt.textContent = task;
        }   
        else if (!imp){
            impInp += key;
            impTxt.textContent = impInp;
        }else {
            urgInp += key;
            urgTxt.textContent = urgInp;
        }
    }
}

function del(ev){
    if (ev.key == "Backspace"){
        if (!nameAdded && task.length > 0){
            task = task.slice(0, task.length-1)
            promptTxt.textContent = task
        }   
        else if (!imp && impInp.length > 0){
            impInp = impInp.slice(0, impInp.length-1)
            impTxt.textContent = impInp
        }else {
            urgInp = urgInp.slice(0, urgInp.length-1)
            urgTxt.textContent = urgInp
        }
        
        

    }
}

document.addEventListener('keypress', type)
document.addEventListener('keydown', del)


