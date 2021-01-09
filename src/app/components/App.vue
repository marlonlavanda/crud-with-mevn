<template>

   <div>

   <nav class="navbar navbar-light bg-light">
     <div class="mx-auto">
       <a href="" class="navbar-brand">MEVN STACK</a>
     </div>
   </nav>
   
   <div class="container">
     <div class="row pt-5">
       <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="addTask">
                <div class="form-group">
                  <input type="text" v-model="task.title" 
                  placeholder="Insert a new task"
                  class="form-control">
                </div>

                <div class="form-gropu mt-3">
                  <textarea v-model="task.description"
                  class="form-control" placeholder="Insert a Description"
                  cols="30" rows="10"></textarea>
                </div>
                <template v-if="edit === false">
                  <div class="d-grid mt-3">
                    <button class="btn btn-primary">
                      Save</button>
                  </div>
                </template>
                <template v-else>
                  <div class="d-grid mt-3">
                    <button class="btn btn-primary">
                      Update</button>
                  </div>
                </template>
              </form>
            </div>
          </div>
       </div>
       <div class="col-md-7">
         <table class="table table-bordered">
           <thead>
             <tr>
               <th>Task</th>
               <th>Description</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="task of tasks" :key="task.description">
               <td>{{task.title}}</td>
               <td>{{task.description}}</td>
               <td>
                 <button @click="deleteTask(task._id)" 
                 class="btn btn-danger">Delete</button>
                 
                 <button  @click="editTask(task._id)" 
                 class="btn btn-secondary">Edit</button>
               </td>
              </tr>
           </tbody>
         </table>
       </div>
     </div>
   </div>
   </div>
</template>
<script>
class Task {
  constructor(title, description){
    this.title = title;
    this.description = description;
  }
}
// new Task('Salir a correr', 'Tengo que salir a correr a las 7')
  export default {
    data(){
      return {
        task: new Task(),
        tasks: [],
        edit: false,
        taskToEdit: ''
      }
    },
    created() {
      this.getTasks()
    }, 
    methods: {
      getTasks(){
        fetch('/api/tasks/')
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
          console.log(this.tasks);
        })
      },
      addTask(){
        if (this.edit === false) {
          fetch('/api/tasks/', {
          method: 'POST',
          body: JSON.stringify(this.task),
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
          }
        })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
        })
        } else {
          fetch('/api/tasks/' + this.taskToEdit, {
            method: 'PUT',
            body: JSON.stringify(this.task),
            headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            } 
          })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
            this.edit = false;
          })
        }

        this.task = new Task();

      },
      deleteTask(id){
        fetch('/api/tasks/' + id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
          }
        })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
        })
      },
      editTask(id){
        fetch('/api/tasks/' + id)
          .then(res => res.json())
          .then(data => {
            this.task = new Task(data.title, data.description);
            this.taskToEdit = data._id;
            this.edit = true;
        })
      }
    }
  }
</script>