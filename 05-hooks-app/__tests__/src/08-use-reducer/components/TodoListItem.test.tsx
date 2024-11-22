import React from 'react';
import { Todo } from '../../../../src/08-use-reducer/interfaces/todo.interface';
import { fireEvent, render, screen } from '@testing-library/react';
import { TodoListItem } from '../../../../src/08-use-reducer/components/TodoListItem';

describe('Testing in TodoListItem.tsx', () => {

  const todo: Todo = {
    id: 1,
    description: 'Soul rock',
    done: false,
  };

  const onDeleteTodoMock = jest.fn();
  const onToggleTodoMock = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('Should to show a pending todo', () => {
    render(<TodoListItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock} />);

    const liElement = screen.getByRole('listitem');
    expect(liElement.className).toBe('list-group-item d-flex justify-content-between');

    const spanElement = screen.getByLabelText('span');
    expect(spanElement.className).toContain('align-self-center pointer');
    expect(spanElement.className).not.toContain('text-decoration-line-through');
  });

  test('Should to show a done todo.', () => {
    todo.done = true;
    render(<TodoListItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock} />);

    const spanElement = screen.getByLabelText('span');
    expect(spanElement.className).toContain('text-decoration-line-through');
  });

  test('Span should to call the toogleTodo when i am doing a click.', () => {
    render(<TodoListItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock} />);
    const spanElement = screen.getByLabelText('span');
    fireEvent.click(spanElement);
    expect(onToggleTodoMock).toHaveBeenCalledWith(todo);
  });

  test('Span should to call the deleteTodo when i am doing a click.', () => {
    render(<TodoListItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(onDeleteTodoMock).toHaveBeenCalledWith(todo);
  });
});