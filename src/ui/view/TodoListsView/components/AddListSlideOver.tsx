import { useState } from 'react';
import { Button } from 'src/ui/common/Button';
import { ColorPicker, Colors } from 'src/ui/common/ColorPicker';
import { Input } from 'src/ui/common/Input';
import SlideOver from 'src/ui/common/SlideOver';

import { type GenericEvent } from '../../../../../types/events';
import { type TodoList } from '../../../../../types/main';

interface AddListSlideOverProps {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddTodoList: (newTodoList: TodoList) => void;
}

const AddListSlideOver = ({
  setOpen,
  handleAddTodoList,
  open,
  title,
}: AddListSlideOverProps) => {
  const [listTitle, setListTitle] = useState('');
  const [color, setColor] = useState(Colors[0]);

  const handleInputChange = (e: GenericEvent) => {
    const { value } = e.target;
    setListTitle(value);
  };

  const handleSubmit = async (e: GenericEvent) => {
    e.preventDefault();
    if (listTitle.length) {
      const newList = {
        title: listTitle,
        color,
        createdAt: new Date(),
      } as TodoList;
      handleAddTodoList(newList);
      setOpen(false);
    }
  };

  return (
    <SlideOver title={title} open={open} setOpen={setOpen}>
      <form id="addData-form" onSubmit={handleSubmit}>
        <div className="mb-6">
          <Input
            value={listTitle}
            maxLength={30}
            onChange={handleInputChange}
            label="List Name"
          />
          <ColorPicker color={color} setColor={setColor} />
        </div>
        <Button type="submit" color={color} />
      </form>
    </SlideOver>
  );
};

export default AddListSlideOver;
