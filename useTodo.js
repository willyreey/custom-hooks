import { useEffect } from "react";
import { useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer";


const init = () =>{
    return JSON.parse( localStorage.getItem('todos')) || []
}

export const useTodo = () => {
    todoReducer
    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))

    }, [todos])
    

    const handleNewTodo = (todo) =>{
        const action = {
            type: '[TODO] Add todo',
            payload: todo,
        }

        dispatch(action)
    }

    const handleDeleteTodo = (todo) =>{
        dispatch({
            type: '[TODO] Remove todo',
            payload: todo,
        })
    }

    const handleToggleTodo = (todo) =>{
       
        dispatch({
            type: '[TODO] Toggle todo',
            payload: todo,
        })
    }

    const allTodoCount = todos.length

    const pendingTodosCount = todos.filter(todo => !todo.done).length

  return {
    allTodoCount, pendingTodosCount,  todos, handleNewTodo, handleDeleteTodo, handleToggleTodo
  }
}
