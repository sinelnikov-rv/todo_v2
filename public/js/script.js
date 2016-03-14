var todo = [];
var done =[];
var Task = function (text) {
    var self = this;
    this.text = text;
    this.checked = false;
    this.html = document.createElement("tr");
    this.html.innerHTML = '<td><div><input type="checkbox" class="check">'+text+'</div><button class="move">move</button><button class="delete">del</button></td> ';
    this.html.getElementsByClassName("move")[0].addEventListener('click',function(){
        self.move()
    });
    this.html.getElementsByClassName("check")[0].addEventListener('click', function(){
        self.check()
    });
    this.html.getElementsByClassName("delete")[0].addEventListener('click', function(){
        self.delete()
    });
    this.list;
};
Task.prototype.move = function() {
    if (this.list === "taskList") {
        delTask(this, todo);
        this.list = "doneList";
        done.push(this);
        document.getElementById("doneList").getElementsByTagName("tbody")[0].appendChild(this.html);
    } else {
        delTask(this, done);
        this.list = "taskList";
        todo.push(this);
        document.getElementById("taskList").getElementsByTagName("tbody")[0].appendChild(this.html);
    }
};
Task.prototype.delete = function() {
    console.log(done.indexOf(this));
    if(this.checked){
        if(this.list==="taskList")
            todo.splice(todo.indexOf(this),1);
        else {
            done.splice(done.indexOf(this),1);
        }
        this.html.parentNode.removeChild(this.html);
    }
};
function addTask (text,list,htmlList) {
    if (text !== "") {
        var element = new Task(text);
        element.list = htmlList;
        list.push(element);
        document.getElementById(htmlList).getElementsByTagName("tbody")[0].appendChild(element.html);
    }
}

Task.prototype.check = function() {
    if (this.checked === false){
        this.checked = true;
        this.html.getElementsByTagName("input")[0].checked=true;
        this.html.getElementsByTagName("div")[0].setAttribute("class","checked");
    }
    else {
        this.checked = false;
        this.html.getElementsByTagName("input")[0].checked=false;
        this.html.getElementsByTagName("div")[0].setAttribute("class","");
    }
};
function delTask (task,list){
    var index = list.indexOf(task);
    if(index!==-1) {
        list.splice(index, 1);
    }
}
addTask("test",todo,"taskList");
addTask("test",todo,"taskList");
addTask("test",todo,"taskList");

//var taskBar = document.createElement("div");
//taskBar.innerHTML = '<label><input type="checkbox">select all</label><button>delete all</button>';
//document.getElementById("taskBar").appendChild(taskBar);
var taskBar = document.getElementById("taskBar");
var selectAllCheckbox = taskBar.getElementsByTagName("input")[0];
var deleteAllButton = taskBar.getElementsByTagName("button")[0];
selectAllCheckbox.addEventListener("click",function() {
    if (selectAllCheckbox.checked === true) {
        done.forEach(function (task) {
                if (!task.checked) {
                    task.check()
                }
            }
        )
    } else {
        done.forEach(function (task) {
                if (task.checked) {
                    task.check()
                }
            }
        )
    }
});
deleteAllButton.addEventListener("click",function(){
    for(var i = done.length-1; i>=0; --i){
        done[i].checked=true;
        done[i].delete();
    }
});
document.getElementById("addTask").addEventListener("click", function(){
    var taskText=document.getElementById("text");
    if (taskText.value) {
        addTask(taskText.value,todo,"taskList");
        taskText.value="";
    }
});
var buttonList = ["ToDo","Both","Done"];
buttonList.forEach(function(button){
    var Button = document.getElementById(button);
    Button.addEventListener("click",function(){
        if (!Button.classList.contains("active")) {
            setActive(button);
            var secondList = buttonList.filter(function(buttonName){
                return buttonName !== button && buttonName !== "Both"
            });
            if (button==="Both") {
                showList("todo");
                showList("done");
            } else {
                showList(button.toLowerCase());
                hideList(secondList[0].toLowerCase());
            }
        }
    })
});
/*document.getElementById("ToDo").addEventListener("click",function(){
    if(!document.getElementById("ToDo").classList.contains("active")){
        setActive("ToDo");
        showList("todo");
        hideList("done");
        //if(document.getElementsByClassName("todo")[0].classList.contains("col-md-6")) {
        //    document.getElementsByClassName("todo")[0].classList.toggle("col-md-6");
        //    document.getElementsByClassName("todo")[0].classList.toggle("col-md-12")
        //}
    }
});
document.getElementById("Done").addEventListener("click",function(){
    if(!document.getElementById("Done").classList.contains("active")){
        setActive("Done");
        showList("done");
        hideList("todo");
    //    if(document.getElementsByClassName("done")[0].classList.contains("col-md-6")) {
    //        document.getElementsByClassName("done")[0].classList.toggle("col-md-6");
    //    document.getElementsByClassName("done")[0].classList.toggle("col-md-12")
    //}
    }
});
document.getElementById("Both").addEventListener("click",function (){
    if(!document.getElementById("Both").classList.contains("active")){
        setActive("Both");
        showList("todo");
        showList("done");
        //if(document.getElementsByClassName("todo")[0].classList.contains("col-md-12")) {
        //    document.getElementsByClassName("todo")[0].classList.toggle("col-md-12");
        //    document.getElementsByClassName("todo")[0].classList.toggle("col-md-6");
        //}
        //if(document.getElementsByClassName("done")[0].classList.contains("col-md-12")) {
        //    document.getElementsByClassName("done")[0].classList.toggle("col-md-12");
        //    document.getElementsByClassName("done")[0].classList.toggle("col-md-6")
        //}
    }
});*/

function setActive(activeButton){
    buttonList.forEach(function(button){
        if (activeButton === button) {
            document.getElementById(button).setAttribute("class","active");
        } else {
            document.getElementById(button).classList.remove("active");
        }
    })
}
function showList(list) {
    document.getElementsByClassName(list)[0].removeAttribute("style");
}
function hideList(list) {
    document.getElementsByClassName(list)[0].setAttribute("style","display: none;");
}
//check(list[1]);
//console.log(list[3]===list[3]);
