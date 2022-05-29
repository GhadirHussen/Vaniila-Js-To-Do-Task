const form = document.querySelector("form");
let container = document.getElementById("tasks");
let taskText = document.getElementById("TaskText");
let dateTask = document.getElementById("dateTask");
let timeTask = document.getElementById("timeTask");
const today = new Date();
let tasks = [];
let task;

 
window.addEventListener("load", TaskDisplay());
form.addEventListener('submit', e => {
  e.preventDefault();
  
  let month = today.getMonth() + 1;
  let date = today.getFullYear()+'-'+ 0 + (month)+'-'+today.getDate();
  if(month.toString().length === 2) {
    date = today.getFullYear()+'-'+ (month)+'-'+today.getDate();
  }


  let time = today.getHours()+':'+ (today.getMinutes());

  let task = {
    id: Date.now(),
    taskText:taskText.value,
    dateTask:dateTask.value,
    timeTask:timeTask.value,
  };
  if(taskText !== ""){
    if(date + time <= dateTask + timeTask){
      if (localStorage.getItem("tasks") === null) {
  
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
  
      } else {
  
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } 

        let noteDiv = document.createElement("div");
        let textDiv = document.createElement("div");
        let dateDiv = document.createElement("div");
        let timeDiv = document.createElement("div");
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("data-id", task.id);
        noteDiv.className = "Note";
        textDiv.className = "TaskText";
        dateDiv.className = "dateTask";
        timeDiv.className = "timeTask";
        deleteBtn.className = "glyphicon glyphicon-remove";
        textDiv.appendChild(document.createTextNode(task.taskText));
        dateDiv.appendChild(document.createTextNode(task.dateTask));
        timeDiv.appendChild(document.createTextNode(task.timeTask));
        noteDiv.appendChild(textDiv);
        noteDiv.appendChild(dateDiv);
        noteDiv.appendChild(timeDiv);
        noteDiv.appendChild(deleteBtn);
        container.appendChild(noteDiv);
      
      formReset();
    }else{
      alert("Your Date Is Not Valid,Please Enter A Valid Date");
    }
  }else {
    alert("The text field is empty");
  }
});


 
// Get tasks from localstorge
function TaskDisplay() {
  document.getElementById('TaskText').focus();
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  for (let i = 0; i < tasks.length; i++) {
    let noteDiv = document.createElement("div");
    let textDiv = document.createElement("div");
    let dateDiv = document.createElement("div");
    let timeDiv = document.createElement("div");
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("data-id", tasks[i].id);
    noteDiv.className = "Note";
    textDiv.className = "TaskText";
    dateDiv.className = "dateTask";
    timeDiv.className = "timeTask";
    deleteBtn.className = "glyphicon glyphicon-remove";
    textDiv.appendChild(document.createTextNode(tasks[i].taskText));
    timeDiv.appendChild(document.createTextNode(tasks[i].dateTask));
    timeDiv.appendChild(document.createTextNode(tasks[i].timeTask));
    noteDiv.appendChild(textDiv);
    noteDiv.appendChild(dateDiv);
    noteDiv.appendChild(timeDiv);
    noteDiv.appendChild(deleteBtn)
    container.appendChild(noteDiv);
  }

}


// Reset the inputs of the form after submit
function formReset() {
  taskText.value = "";
  dateTask.value = "";
  timeTask.value = "";
}


//Remove task
container.addEventListener("click", e => {
  const id = e.target.getAttribute("data-id");
  if(e.target.className === "glyphicon glyphicon-remove") {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(t => t.id != id);
    e.target.parentElement.remove();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
})
