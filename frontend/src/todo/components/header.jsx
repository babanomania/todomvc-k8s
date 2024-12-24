import { useCallback } from "react";
import { Input } from "./input";

import { ADD_ITEM } from "../constants";

export function Header({ dispatch }) {

    const addItem = useCallback((title) => {

        fetch(`${process.env.REACT_APP_API_URL}/todo/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: title, completed: false })
        })
            .then(response => response.json())
            .then(({ data }) => {
                if (data.id) {
                    dispatch({ type: ADD_ITEM, payload: data })
                } else {
                    throw new Error('Failed to create the item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })

    }, [dispatch]);

    return (
        <header className="header" data-testid="header">
            <h1>todos</h1>
            <Input onSubmit={addItem} label="New Todo Input" placeholder="What needs to be done?" />
        </header>
    );
}
