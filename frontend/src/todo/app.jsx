import { useReducer } from "react";
import { useEffect } from "react";

import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";

import { INIT } from "./constants";
import { todoReducer } from "./reducer";

import "./app.css";

export function App() {
    const [todos, dispatch] = useReducer(todoReducer, []);

    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/todo`);
                const todos = await response.json();
                if(todos.data){
                    dispatch({ type: INIT, payload: todos.data });
                }
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        }

        fetchTodos();
    }, []);

    return (
        <>
            <Header dispatch={dispatch} />
            <Main todos={todos} dispatch={dispatch} />
            <Footer todos={todos} dispatch={dispatch} />
        </>
    );
}
