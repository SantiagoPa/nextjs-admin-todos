import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma';

export async function GET(request: Request) {

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            { description: 'Learn React', completed: true },
            { description: 'Learn Next.js', completed: false },
            { description: 'Learn TypeScript', completed: false },
            { description: 'Learn GraphQL', completed: false },
            { description: 'Learn Prisma', completed: true },
        ],
    });

    return NextResponse.json({ message: "Seed Executed" });
}