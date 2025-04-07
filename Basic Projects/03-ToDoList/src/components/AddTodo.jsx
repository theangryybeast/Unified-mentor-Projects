import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const editingTodo = useSelector((state) => state.todo.editingTodo);

  useEffect(() => {
    // Populate the input if we're editing an existing todo
    if (editingTodo) {
      setInput(editingTodo.text);
    }
  }, [editingTodo]);

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (editingTodo) {
      // If editing, dispatch updateTodo
      dispatch(updateTodo({ id: editingTodo.id, text: input }));
    } else {
      // Otherwise, add a new todo
      dispatch(addTodo(input));
    }
    setInput(""); // Clear input
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {editingTodo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
}

export default AddTodo;
