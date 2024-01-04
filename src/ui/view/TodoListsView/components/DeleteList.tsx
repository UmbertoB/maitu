import { type FC, useState } from 'react';
import { useTodoLists } from 'src/hooks/useTodoLists';
import { Input } from 'src/ui/common/Input';

import { type GenericEvent } from '../../../../../types/events';

interface DeleteListProps {
  id: string;
  listTitle: string;
}

export const DeleteList: FC<DeleteListProps> = ({ id, listTitle }) => {
  const [listTitleInput, setListTitleInput] = useState('');
  const { handleDeleteTodoList } = useTodoLists();

  const handleInputChange = (e: GenericEvent) => {
    const { value } = e.target;
    setListTitleInput(value);
  };

  const deleteTodoList = (listId: string) => async (e: GenericEvent) => {
    e.preventDefault();
    if (listTitleInput === listTitle) {
      await handleDeleteTodoList(listId);
    }
  };

  return (
    <div
      className="my-5
        items-center rounded-md border
         border-danger bg-white p-4 font-semibold transition-all
         "
    >
      <form onSubmit={deleteTodoList(id)}>
        <Input
          label={
            <>
              Please type <span className="font-bold">{listTitle}</span> to
              confirm deletion.
            </>
          }
          value={listTitleInput}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={listTitleInput !== listTitle}
          className="w-full cursor-pointer rounded-full bg-danger p-3 text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Delete
        </button>
      </form>
    </div>
  );
};
