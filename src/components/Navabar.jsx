import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

function TodoNavbar() {
  return (
    <Navbar>
      <NavbarBrand className="f-[100%] flex flex-row items-center justify-center">
        <p className="font-bold text-inherit">Todo App</p>
      </NavbarBrand>
    </Navbar>
  );
}

export default TodoNavbar;