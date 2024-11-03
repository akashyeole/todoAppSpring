import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { CheckIcon, DeleteIcon, EditIcon, EyeIcon } from "@nextui-org/shared-icons";
import { useDispatch } from "react-redux";
import { deleteTodo, completeTodo } from "../redux/TodosSlice";

function Todo({ index, details }) {
	const dispatch = useDispatch();
	return (
		<Card className={`todo max-w-[300px] min-w-[300px] ${details.completed ? 'bg-green-500' : ''}`}>
			<CardHeader className="flex gap-3">
				<Avatar name={`#${index+1	}`} />
        <div className="flex flex-col">
          <p className="todo__title text-md">{details.title}</p>
          <p className="text-small text-default-500">{details.createdAt}</p>
        </div>
      </CardHeader>
			<Divider/>
      <CardBody className="todo__description-wrapper overflow-hidden truncate h-[50px]">
        <p className="todo__description">{details.description}</p>
      </CardBody>
      <Divider/>
			<CardFooter>
				<div className="flex w-[100%] gap-4 items-center justify-center">
					<Button isIconOnly color="primary" variant="faded" size="sm">
						<EyeIcon />	
					</Button>
					{ !details.completed &&
					<>
						<Button isIconOnly color="success" variant="faded" size="sm" onClick={() => {
							dispatch(completeTodo(details.id))
						}}>	
							<CheckIcon />
						</Button>
						<Button isIconOnly color="warning" variant="faded" size="sm">
							<EditIcon />
						</Button>
					</>
					}
					<Button isIconOnly color="danger" variant="faded" size="sm" onClick={() => {
						dispatch(deleteTodo(details.id))
					}}>
						<DeleteIcon />
					</Button>    
				</div>
      </CardFooter>
			
		</Card>
	);
}

export default Todo;