import type { Todo } from '@/types/main';

export const SET_TODOS = 'SET_TODOS';
export const SET_CURRENT_TODO = 'SET_CURRENT_TODO';
export const SET_NEW_TODO = 'SET_NEW_TODO';
export const UPDATE_SINGLE_ELEMENT = 'UPDATE_SINGLE_ELEMENT';

interface TodosState {
  todos: Todo[];
  currentTodo: Todo;
  newTodo: Todo;
}

export const initialTodosState = (todosDb: Todo[]): TodosState => ({
  todos: todosDb,
  currentTodo: {} as Todo,
  newTodo: {} as Todo,
});

// Define action types
type TodosAction =
  | { type: typeof SET_TODOS; payload: Todo[] }
  | { type: typeof SET_CURRENT_TODO; payload: Todo }
  | { type: typeof SET_NEW_TODO; payload: Todo }
  | {
      type: typeof UPDATE_SINGLE_ELEMENT;
      payload: { todoId: string; fieldsToUpdate: Partial<Todo> };
    };

const todosReducer = (state: TodosState, action: TodosAction): TodosState => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.payload };
    case SET_CURRENT_TODO:
      return { ...state, currentTodo: action.payload };
    case SET_NEW_TODO:
      return { ...state, newTodo: action.payload };
    case UPDATE_SINGLE_ELEMENT:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload.todoId
            ? { ...todo, ...action.payload.fieldsToUpdate }
            : todo,
        ),
      };
    default:
      return state;
  }
};

export const setTodos = (todos: Todo[]): TodosAction => ({
  type: SET_TODOS,
  payload: todos,
});

export const setCurrentTodo = (currentTodo: Todo): TodosAction => ({
  type: SET_CURRENT_TODO,
  payload: currentTodo,
});

export const setNewTodo = (newTodo: Todo): TodosAction => ({
  type: SET_NEW_TODO,
  payload: newTodo,
});

export const updateSingleElement = (
  todoId: string,
  fieldsToUpdate: Partial<Todo>,
): TodosAction => ({
  type: UPDATE_SINGLE_ELEMENT,
  payload: {
    todoId,
    fieldsToUpdate,
  },
});

export default todosReducer;
