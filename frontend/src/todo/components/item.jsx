import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";

export const Item = memo(function Item({ todo, dispatch, index }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;

    const toggleItem = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_URL}/todo/${id}/toggle`, { method: 'PATCH' })
            .then(response => {
                if (response.ok) {
                    dispatch({ type: TOGGLE_ITEM, payload: { id } })
                } else {
                    throw new Error('Failed to toggle the item');
                }
            })
            .catch(error => {
                throw new Error('Failed to toggle the item');
            });
    }, [dispatch]);

    const removeItem = useCallback(() => {

        fetch(`${process.env.REACT_APP_API_URL}/todo/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    dispatch({ type: REMOVE_ITEM, payload: { id } })
                } else {
                    throw new Error('Failed to delete the item');
                }
            })
            .catch(error => {
                throw new Error('Failed to delete the item');
            });

    }, [dispatch]);

    const updateItem = useCallback((id, content) => {

        fetch(`${process.env.REACT_APP_API_URL}/todo/${id}/content`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, content })
        })
            .then(response => {
                if (response.ok) {
                    dispatch({ type: UPDATE_ITEM, payload: { id, content } })
                } else {
                    throw new Error('Failed to update the item');
                }
            })
            .catch(error => {
                throw new Error('Failed to update the item');
            });

    }, [dispatch]);

    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    const handleUpdate = useCallback(
        (title) => {
            if (title.length === 0)
                removeItem(id);
            else
                updateItem(id, title);

            setIsWritable(false);
        },
        [id, removeItem, updateItem]
    );

    return (
        <li className={classnames({ completed: todo.completed })} data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={toggleItem} />
                        <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                            {title}
                        </label>
                        <button className="destroy" data-testid="todo-item-button" onClick={removeItem} />
                    </>
                )}
            </div>
        </li>
    );
});
