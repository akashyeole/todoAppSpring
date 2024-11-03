import { Button, Input } from "@nextui-org/react";
import Todo from "./Todo";
import TodoSkeleton from "./TodoSkeleton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/TodosSlice";
import { setCurrentPage, setTodosPerPage } from "../redux/TodosSlice";

function Todos(props) {
	const dispatch = useDispatch();
	const { currentPage, todosPerPage, isLoading, todos, completed } = useSelector(state => state.todos);
	const lastTodoIndex = currentPage * todosPerPage;
	const firstTodoIndex = lastTodoIndex - todosPerPage;
	const totalPages = props.completed ? Math.ceil(Math.max(completed.length,1) / todosPerPage) : Math.ceil(Math.max(todos.length,1) / todosPerPage);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [])

	return (
		<>
			<div className='mt-4 todos-container flex w-[50%] justify-center items-center flex-row flex-wrap gap-3'>
				{
					isLoading ?
					[...Array(6)].map((_, idx) => <TodoSkeleton key={idx}/>) : 
					(!props.completed ? todos.slice(firstTodoIndex, lastTodoIndex).map((todo, idx) => {
						return <Todo key={todo.id} index={idx+firstTodoIndex} details={todo}/>
					}) :
					completed.slice(firstTodoIndex, lastTodoIndex).map((todo, idx) => {
						return <Todo key={todo.id} index={idx+firstTodoIndex} details={todo}/>
					})) 
				}

			</div>
			<div className="justify-self-end mt-8 mb-8 flex flex-row gap-8 items-center justify-center">
				<Input
          type="number"
          label="Todos per page"
          placeholder="6"
					value={todosPerPage}
					onChange={(e) => dispatch(setTodosPerPage(e.target.value ? Math.max(e.target.value, 1) : 1))}
        />
				<div className="flex flex-row gap-4">
				{
					[...Array(totalPages)].map((_, idx) => <Button isIconOnly color="primary" variant="light" key={idx} onClick={() => dispatch(setCurrentPage(idx+1))}>
																									{idx+1}
																								</Button>)
				}
				</div>
			</div>
		</>
	);
}

export default Todos;