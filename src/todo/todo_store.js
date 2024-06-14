/**@odoo-module**/
// import { useEnv ,useState } from "@odoo/owl";
const {useEnv,useState} = owl;

export class TodoStore {
    static nextId = 1;
    static nextTodoId =1;
    constructor()
    {
    this.lists =[];
    }
    createList()
    {
    const id = TodoStore.nextId++;
    this.lists.push({id,name:`List ${id}`,todos: []});
    }
    removeList(listId)
    {
        const list = this.lists.find((l)=>l.id === listId);
        this.lists.splice(list,1);
    }
    addTodo(listId,description)
    {
        const list = this.lists.find((l)=>l.id === listId);
        const todo = {
            id : TodoStore.nextTodoId++,
            listId,
            description,
            isCompleted :false,
        };
        list.todos.push(todo);
    }
    toggleTodo(listId,todoId)
    {
        const list = this.lists.find((l)=>l.id === listId);
        const todo = list.todos.find((t)=>t.id === todoId);
        todo.isCompleted = !todo.isCompleted;
    }
    removeTodo(listId,todoId)
    {
        const list = this.lists.find((l)=>l.id === listId);
        const index = list.todos.find((t)=>t.id === todoId);
        list.todos.splice(index,1);
    }
    getNumbers()
    {
        let Completed = 0;
        let total =0;
        for(let list of this.lists)
        {
            total += list.todos.length;
            for(let todo of list.todos)
            {
              if(todo.isCompleted)
              {
                 Completed++;
              }
            }
        }
        return { Completed,total };
    }
}
export function useTodoStore()
{
    const env = useEnv();
    return useState(env.todoStore);
}