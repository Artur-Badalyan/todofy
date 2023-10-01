import React, { useEffect, useState } from "react";
const DarkMode = () => {
    const [isCurrentDarkmode, setIsCurrentDarkmode] = useState(() => {
        const darkModeWasSet = localStorage.getItem("darkmode");
        if (darkModeWasSet)
            return true;
        else
            return false;
    });
    const toggleDarkMode = () => {
        setIsCurrentDarkmode((prevState) => !prevState);
    };
    useEffect(() => {
        const html = document.querySelector("html");
        if (isCurrentDarkmode) {
            html.classList.add("dark");
            localStorage.setItem("darkmode", "true");
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#0f172a");
        }
        else {
            html.classList.remove("dark");
            localStorage.removeItem("darkmode");
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#e2e8f0");
        }
    }, [isCurrentDarkmode]);
    return (
        <div className="mt-8 text-left flex items-center justify-between" >
            <span className="dark:text-slate-200">Darkmode</span>
            <label className="switch">
                <input type="checkbox" onClick={toggleDarkMode} />
                <span className="slider"></span>
            </label>
        </div>
    );
};
export default React.memo(DarkMode);
