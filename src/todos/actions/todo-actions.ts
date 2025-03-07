'use server';

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = async (seconds: number): Promise<boolean> => new Promise((resolve) => setTimeout(() => resolve(true), seconds * 1000));

export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {

    await sleep(3);
    
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
        throw `Todo whit id: ${id} not found`;
    }

    const updateTodo = await prisma.todo.update({
        where: { id },
        data: { completed }
    });

    revalidatePath("/dashboard/server-todos");
    return updateTodo;
}

export const addTodo = async (description: string) => {
    try {
        // const { completed, description } = await postSchema.validate(await request.json());
        const todo = await prisma.todo.create({ data: { description } });
        revalidatePath("/dashboard/server-todos");

        return todo;

    } catch (error: any) {
        return {
            message: `Error when create todo`
        }
    }
}

export const deleteCompleted = async (): Promise<{ message: string }> => {
    try {
        const resp = await prisma.todo.deleteMany({ where: { completed: true } });
        if (resp.count === 0) {
            return { message: "no have todos completed" }
        }
        revalidatePath("/dashboard/server-todos");
        return { message: "todos completed delete" }
    } catch (error) {
        return { message: "Error on this action" }
    }
}