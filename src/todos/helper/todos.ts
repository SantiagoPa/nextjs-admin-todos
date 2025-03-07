import { Todo } from '@prisma/client';


const sleep = (seconds: number): Promise<boolean> => new Promise( (resolve) => setTimeout(() => resolve(true), seconds * 1000));

export const updateTodo = async (id: string, completed: boolean): Promise<Todo> => {

    const body = { completed };

    const todo = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()
    ).catch((err) => console.log(err));
    return todo;
}

export const createTodo = async (description: string): Promise<Todo> => {

    const body = { description };

    const todo = await fetch(`/api/todos`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()
    ).catch((err) => console.log(err));
    return todo;
}

export const removeTodosCompleted = async (): Promise<{ message: string } | null> => {
    const response = await fetch(`/api/todos`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()
    ).catch((err) => console.log(err));
    return response;
}