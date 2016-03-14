var todo = [];
var done =[];
var textNode = $("#text");
var Task = function (text, htmlList) {
    var self = this;
    this.text = text;
    this.checked = false;
    this.list = htmlList;
};
function draw() {
    console.log(this);
    var self = this;
    this.html = $('<tr><td><div><input type="checkbox" class="check">'+this.text+'</div><button class="move">move</button><button class="delete">del</button></td></tr>')
    $("#"+this.list+" tbody").append(this.html);
    this.html.find(".move").click(function(){
        self.move()
    });
    this.html.find(".check").click(function(){
        self.check()
    });
    this.html.find(".delete").click(function(){
        self.delete()
    });
};
Task.prototype.delete = function() {
    if(this.checked) {
        if(this.list==="taskList") {
            todo.splice(todo.indexOf(this), 1);
        } else {
            done.splice(done.indexOf(this),1);
        }
        $(this.html).detach();
    }
};
Task.prototype.check = function() {
    if (this.checked === false){
        this.checked = true;
        this.html.find("input").prop("checked",true);
        this.html.find("div").addClass("checked");
    }
    else {
        this.checked = false;
        this.html.find("input").prop("checked",false);
        this.html.find("div").removeClass("checked");
    }
};
Task.prototype.move = function(){
    this.html.detach();
    if(this.list==="taskList"){
        this.list="doneList"
        todo.splice(todo.indexOf(this), 1);
        done.push(this);
        $("#doneList").find("tbody").append(this.html);
    } else {
        this.list="taskList"
        done.splice(done.indexOf(this), 1);
        todo.push(this);
        $("#taskList tbody").append(this.html);
    }
};
function addTask (text,list,htmlList) {
    if (text !== "") {
        var task = new Task(text, htmlList);
        task.list = htmlList;
        $.ajax({
            type: 'POST',
            data: JSON.stringify(task),
            contentType: 'application/json',
            url: 'http://localhost:3000/addtask',
            success: function(task) {
				list.push(task);
            }
        });
        draw(task);
    }
}
$("#addTask").click(function(){

    var text = textNode.val();
    if(text!==""){
        addTask(text,todo,"taskList")
    }
    textNode.val("");
});
$("#taskBar label").click(function(){
   done.forEach(function(task){
       if($("#taskBar input").prop("checked")){
           if(!task.checked){
               task.check();
           }
       } else {
           if(task.checked){
               task.check();
           }
       }
   })

});
function delTask (task,list){
    var index = list.indexOf(task);
    if(index!==-1) {
        list.splice(index, 1);
    }
}
$(document).ready(function(){
    $.ajax({
        type: 'GET',
        data: { get_param: 'value' },
        contentType: 'application/json',
        url: 'http://localhost:3000/todoes',
        success: function(data) {
            console.log(data)
            $.each(data, function(index, task){
                draw(task)
            });
        }
    });
});
//addTask("test1",todo,"taskList");
//addTask("test2",todo,"taskList");
//addTask("test3",todo,"taskList");
