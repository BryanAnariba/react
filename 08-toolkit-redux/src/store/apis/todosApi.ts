import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';

interface Todo {
    id: number;
    text: string;
  }

export const todosApi = createApi({
    reducerPath: 'todos',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => '/todos'
        }),
    })
});

// export const {useGetTodosQuery} = todosApi;