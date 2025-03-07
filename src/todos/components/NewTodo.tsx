"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

// import * as todosApi from "@/todos/helper/todos";
// import { useRouter } from "next/navigation";
import { addTodo, deleteCompleted } from "../actions/todo-actions";

export const NewTodo = () => {
  const [description, setDescription] = useState("");

  // const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    const todo = await addTodo(description);
    // const todo = await todosApi.createTodo(description);
    console.log({ newTodo: todo });
    setDescription("");
    // router.refresh();
  };

  const onDeleteTodosCompleted = async () => {
    const response = await deleteCompleted();
    console.log({ response });
    // const response = await todosApi.removeTodosCompleted();
    // if (!response?.message) {
    //   alert("Error al eliminar los todos completados");
    //   return;
    // }
    // router.refresh();
  };

  return (
    <form className="flex w-full" onSubmit={onSubmit}>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => onDeleteTodosCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Borrar completados</span>
      </button>
    </form>
  );
};
