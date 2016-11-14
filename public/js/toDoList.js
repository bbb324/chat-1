

var data = new Vue({
    //数据
    el: '#todolist',
    data: {
        input:'',
        todolist: [
            {id: 1, title: 'one', completed: true},
            {id: 2, title: 'two', completed: false}
        ]
    },

    methods:{
        //新增
        add:function(){
            if (this.input != ''){
                this.todolist.push({id: this.todolist.length.valueOf() + 1, title: this.input, completed: true});
                this.input = "";
            }else{
                alert("xxxxxxxx");
            }
        },

        //删除
        del: function (item) {
            this.todolist.$remove(item, this.completed);
        },

        //完成或正在进行
        end: function (item) {
            item.completed = !item.completed;
        }
    }
});

// var todolist = new Vue({
//     el: '#todolist',
//     data: {
//         message: 'hello Vue'
//     }
// })
