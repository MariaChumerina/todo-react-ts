import React, { useEffect, useState } from 'react';
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { Todo } from "../interfaces";

export const TodosPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];

        setTodos(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

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
            <TodoForm onAdd={addHandler}/>
            <TodoList todos={todos} onToggle={toggleHandler} onRemove={removeHandler} />
        </>
    );
}
