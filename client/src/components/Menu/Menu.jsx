import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import Directories from "./Directories/Directories";
import NavLinks from "./NavLinks";
import LayoutMenus from "../Utilities/LayoutMenus";
const classLinkActive = "text-emerald-700 bg-emerald-100 border-r-4 border-emerald-700 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const Menu = () => {
    const menuOpen = useAppSelector((state) => state.menu.menuHeaderOpened);
    const dispatch = useAppDispatch();
    const closeMenuHandler = () => {
        dispatch(menusActions.closeMenuHeader());
    };
    return (<LayoutMenus menuOpen={menuOpen} closeMenuHandler={closeMenuHandler} className="left-0">
      <header className="h-full flex flex-col">
        <h1 className="font-bold text-center mt-8 text-2xl tracking-wide hidden xl:block">
          TodoFy
        </h1>
        <p className="font-bold text-center mt-2 text-sm tracking-wide hidden xl:block">
          To-do managment
        </p>
        <NavLinks classActive={classLinkActive}/>
        <Directories classActive={classLinkActive}/>
      </header>
    </LayoutMenus>);
};
export default Menu;
