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

    return (
      <>
        <Navbar />
        <div className="container">
            <TodoForm onAdd={addHandler}/>
            <TodoList todos={todos} />
        </div>
      </>
    );
}

export default App;
