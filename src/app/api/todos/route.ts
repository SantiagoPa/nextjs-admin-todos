
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as Yup from 'yup';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');

    if (isNaN(take)) {
        return NextResponse.json({ message: 'Invalid take parameter - take has to a number' }, { status: 400 });
    }

    if (isNaN(skip)) {
        return NextResponse.json({ message: 'Invalid skip parameter - skip has to a number' }, { status: 400 });
    }

    const todos = await prisma.todo.findMany({
        take: take,
        skip: skip,
    });

    return NextResponse.json({todos, length: todos.length});
}


const postSchema = Yup.object({
    description: Yup.string().required(),
    completed: Yup.boolean().optional().default(false),
})

export async function POST(request: Request) {
    try {
        const { completed, description } = await postSchema.validate(await request.json());

        const todo = await prisma.todo.create({ data: { completed, description } });

        return NextResponse.json(todo, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ message: error.errors }, { status: 400 });
    }
}