
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as Yup from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

const getTodo = async (id: string): Promise<Todo | null> => {
    const todo = await prisma.todo.findFirst({ where: { id: id } });
    return todo;
};

export async function GET(request: Request, { params }: Segments) {
    const todo = await getTodo(params.id);
    if (!todo) {
        return NextResponse.json({ message: `Todo with id ${params.id} not found` }, { status: 404 });
    }
    return NextResponse.json(todo);
}


const putSchema = Yup.object({
    description: Yup.string().optional(),
    completed: Yup.boolean().optional(),
})

export async function PUT(request: Request, { params }: Segments) {
    const todo = await getTodo(params.id);
    if (!todo) {
        return NextResponse.json({ message: `Todo with id ${params.id} not found` }, { status: 404 });
    }

    try {
        const { completed, description } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: { id: params.id },
            data: { completed, description }
        })

        return NextResponse.json(updatedTodo);
    } catch (error: any) {
        return NextResponse.json({ message: error.errors }, { status: 400 });
    }
}