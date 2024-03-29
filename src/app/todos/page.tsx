import React from 'react';

import * as TodosService from '@/src/actions/todos.service';
import { CompleteTodos } from '@/src/app/todos/components/CompleteTodos';
import { Header } from '@/src/app/todos/components/Header';
import { TodoDetailSlideOver } from '@/src/app/todos/components/TodoDetailSlideOver';
import { Todos } from '@/src/app/todos/components/Todos';
import { TodosProvider } from '@/src/app/todos/state/provider';
import { json } from '@/src/lib/functions';

type TodosPageProps = {
  searchParams: { listId: string };
};

export default async function TodosPage({ searchParams }: TodosPageProps) {
  const { todos, ...list } = await TodosService.getListTodos(
    searchParams.listId,
  );

  return (
    <TodosProvider listDb={json(list)} todosDb={json(todos)}>
      <main className="mx-auto my-0 h-full max-w-xl">
        <Header />

        <Todos />

        <CompleteTodos />

        <TodoDetailSlideOver />
      </main>
    </TodosProvider>
  );
}
