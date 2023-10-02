import React from "react";
import avatar1 from "../../assets/avatar.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import LayoutMenus from "../Utilities/LayoutMenus";
import DarkMode from "./DarkMode";
import DeleteTasks from "./DeleteTasks";
import TasksDone from "./TasksDone";

const AccountData = () => {
    const menuOpen = useAppSelector((state) => state.menu.menuAccountOpened);
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const closeMenuHandler = () => {
        dispatch(menusActions.closeMenuAccount());
    };

    return (<LayoutMenus menuOpen={menuOpen} closeMenuHandler={closeMenuHandler} className="top-0 right-0 ">
      <section className="p-5 flex flex-col h-full">
        <div className="flex items-center p-2 space-x-4">
          <img src={avatar1} alt="avatar" class="w-12 h-12 rounded-full dark:bg-gray-500" />
          <div>
            <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
          </div>
        </div>
        <DarkMode />
        <TasksDone />
        <DeleteTasks />
      </section>
    </LayoutMenus>);
};
export default AccountData;
