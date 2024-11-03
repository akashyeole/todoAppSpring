import {Navbar, NavbarBrand, NavbarItem, Link} from "@nextui-org/react";
import { Link as LN, useLocation } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon } from "@nextui-org/shared-icons";

function TodoNavbar() {
  const location = useLocation();
  return (
    <Navbar className="flex flex-row">
        <NavbarBrand className="w-fit">
          <LN to={'/'}>
            <p className="font-bold text-inherit">Todo App</p>
          </LN>
        </NavbarBrand>
        <NavbarItem  className="w-fit">
            {location.pathname === '/completed' ? 
                <LN to={'/'}>
                  <p className="flex flex-row items-center gap-2 text-blue-500">
                    Incomplete todos
                    <ArrowLeftIcon/>
                  </p>
                </LN>: 
                <LN to={'/completed'}>
                  <p className="flex flex-row items-center gap-2 text-green-500">
                    Completed todos
                    <CheckIcon/>
                  </p>
                </LN>
            }
        </NavbarItem>
    </Navbar>
  );
}

export default TodoNavbar;