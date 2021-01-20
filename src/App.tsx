import React, { useState } from 'react';
import './App.css';
import { Navbar } from "./components/Navbar";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { Todo } from "./interfaces";

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addHandler = (title: string) => {
        const newTodo: Todo = {
            title,
            id: Date.now(),
            completed: false,
        }
        setTodos(prev => [newTodo, ...prev]);
    }

    const toggleHandler = (id: number) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }

            }
            return todo;
        }));
    }

    const removeHandler = (id: number) => {
        const shouldConfirm = window.confirm('Вы уверены, что хотите удалить элемент?');
        if (shouldConfirm) {
            setTodos(prev => prev.filter(todo => todo.id !== id));
        }
    }

    return (
      <>
        <Navbar />
        <div className="container">
            <TodoForm onAdd={addHandler}/>
            <TodoList todos={todos} onToggle={toggleHandler} onRemove={removeHandler} />
        </div>
      </>
    );
}

export default App;
