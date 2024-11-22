import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoApp } from '../../../src/08-use-reducer/TodoApp';
import { useTodos } from '../../../src/08-use-reducer/hooks/useTodos';

jest.mock('../../../src/08-use-reducer/hooks/useTodos');

describe('Testing in TodoApp.tsx', () => {
  // useTodos.mockReturnValue({
  //   todos: [{ id: 1, description: 'Todo One', done: false }, { id: 2, description: 'Todo One', done: true }],
  //   onSendNewTodoToTodoApp: jest.fn(),
  //   handleDeleteTodo: jest.fn(),
  //   onHandleDoneTodo: jest.fn(),
  //   allTodos: 1,
  //   doneTodos: 1
  // });
  test('Should to show the component, correctly', () => {
    
  });
});