import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_API_URL;

async function fetchFresh(apiUrl = API_URL) {
	const reponse = await fetch(apiUrl+'/todos');
	return await reponse.json();
}

export const fetchTodos = createAsyncThunk('todos/fetchtodos', async () => {
	return fetchFresh();
});

export const deleteTodo = createAsyncThunk('todos/deletetodo', async (id) => {
	const response = await fetch(API_URL+`/todo/+${id}`, {
		method: 'delete',
	});
	if(response.status === 200) {
		return fetchFresh();
	}
	return [];
});

export const completeTodo = createAsyncThunk('todos/copmletetodo', async (id) => {
	let currTodo = await fetch(API_URL+`/todos/${id}`);
	currTodo = await currTodo.json();
	const response = await fetch(API_URL+`/todo`, {
		method: 'put',
		headers: {'Content-type': 'application/json'},
		body: JSON.stringify({
			...currTodo,
			id: id,
			completed: "true"
		})
	});
	if(response.status === 200) {
		return fetchFresh();
	}
	return [];
});


const TodosSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		completed:[],
		currentPage: 1,
		todosPerPage: 6,
		isLoading: false
	},
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
		},
		setTodosPerPage: (state, action) => {
			state.todosPerPage = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			// state.todos = action.payload;
			action.payload.forEach(todo => {
				if (todo.completed) state.completed.push(todo);
				else state.todos.push(todo);
			});
			state.isLoading = false;
			state.error = false;
		})
		builder.addCase(fetchTodos.pending, (state) => {
			state.isLoading = true;
			state.error = false;
		})
		builder.addCase(fetchTodos.rejected, (state) => {
			state.isLoading = false;
			state.error = true;
		})
		builder.addCase(deleteTodo.pending, (state) => {
			state.isLoading = true;
		})
		builder.addCase(deleteTodo.fulfilled, (state, action) => {
			state.completed = []
			state.todos = []
			action.payload.forEach(todo => {
				if (todo.completed) state.completed.push(todo);
				else state.todos.push(todo);
			});
			state.isLoading = false;
		})
		builder.addCase(deleteTodo.rejected, (state) => {
			state.isLoading = false;
			state.error = true;
		})
		builder.addCase(completeTodo.pending, (state) => {
			state.isLoading = true;
		})
		builder.addCase(completeTodo.fulfilled, (state, action) => {
			state.completed = []
			state.todos = []
			action.payload.forEach(todo => {
				if (todo.completed) state.completed.push(todo);
				else state.todos.push(todo);
			});
			state.isLoading = false;
		})
		builder.addCase(completeTodo.rejected, (state) => {
			state.isLoading = false;
			state.error = true;
		})
	}
});


export const { setCurrentPage, setTodosPerPage } = TodosSlice.actions;
export default TodosSlice.reducer;