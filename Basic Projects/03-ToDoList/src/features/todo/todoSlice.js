import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{ id: 1, text: "Hello world" }],
    editingTodo: null  // New state to hold the current todo being edited
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        startEditTodo: (state, action) => {
            // Set the todo to be edited
            state.editingTodo = state.todos.find((todo) => todo.id === action.payload);
        },
        updateTodo: (state, action) => {
            // Find the todo by ID and update its text
            const { id, text } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.text = text;
            }
            // Clear editing state after updating
            state.editingTodo = null;
        },
    }
});

export const { addTodo, removeTodo, startEditTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;