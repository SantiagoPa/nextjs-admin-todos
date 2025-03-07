import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";



export const metadata = {
 title: 'List Todos',
 description: 'List Todos description',
};

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <div>
      {/* // TODOS: form add new todo */}
      <TodosGrid  todos={ todos } />
    </div>
  );
}