package com.todo.taskgenerator;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class taskcontroller {
   @Autowired
   private taskrepository taskrepo;

    @GetMapping("/hello")
    public String helloworld() {
        return "hello world";
    }

    @PostMapping("/api/tasks")
    public Task createTask(@RequestBody Task t) {
        //System.out.println(t.getDescription() + " - " + t.isStatus());
         taskrepo.save(t);
         return t; 
    }

    @GetMapping("/api/tasks")
    public List<Task> getalltask(){
        return taskrepo.findAll();
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task){
        task.setId(id);
        return taskrepo.save(task);

    }

    @DeleteMapping("/api/tasks/{id}")
    public void deleteTask(@PathVariable Long id){
        taskrepo.deleteById(id);
    }
}