import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTableList,
    faMagnifyingGlass,
    faGear,
    faArrowRightFromBracket,
    faArrowRightToBracket,
    faPeopleGroup,
    faBars,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import placeholderlogo from "../img/placeholderlogo.png";
interface SidebarProps {
    setMainContent: Function;
    setMyList: Function;
    setMemberList: Function;
    setSidebar: Function;
    sidebar: Boolean;
    setLoggedIn: Function;
    loggedIn: Boolean;
    showLogIn: Boolean;
    setShowLogIn: Function;
    showRegister: Boolean;
    setShowRegister: Function;
    setUser: Function;
    setSettings: Function;
}
function Sidebar({
    setMainContent,
    setMyList,
    setMemberList,
    setSidebar,
    sidebar,
    loggedIn,
    setLoggedIn,
    showLogIn,
    setShowLogIn,
    showRegister,
    setShowRegister,
    setUser,
    setSettings,
}: SidebarProps) {
    const viewList = () => {
        setSettings(false);
        setMyList(true);
        setMemberList(false);
        setSidebar(false);
        setMainContent(false);
    };
    const viewOthers = () => {
        setMainContent(false);
        setSettings(false);
        setMemberList(false);
        setMyList(false);
        setSidebar(false);
    };
    const seeMembers = () => {
        setMemberList(true);
        setMainContent(false);
        setSidebar(false);
        setMyList(false);
        setSettings(false);
    };
    const showSettings = () => {
        setMemberList(false);
        setSettings(true);
        setMainContent(false);
        setSidebar(false);
        setMyList(false);
    };
    let searchBar = document.getElementById("search");
    let setActive = () => {
        if (searchBar !== null && searchBar !== undefined) {
            searchBar.focus();
            searchBar.style.backgroundColor = "rgb(254,202,202)";
            searchBar.style.transition = "100ms linear all";
            setSidebar(false);
        }
    };
    const handleLogout = () => {
        setUser({});
        localStorage.clear();
        window.location.replace("http://localhost:3001/");
        setLoggedIn(false);
    };
    let closeSidebar = () => {
        setSidebar(false);
    };
    return (
        <div
            className="flex flex-col h-full px-1 fixed z-50 bg-stone-100"
            id="sidebar"
        >
            {/* justify-between py-4 */}
            <div className="pb-4 pt-3 px-0 justify-center flex">
                {" "}
                <a href="/">
                    <img src={placeholderlogo} alt="" className="w-8" />
                </a>
            </div>
            <div className="flex-col py-4 h-full">
                {sidebar && (
                    <div className="py-4 px-0 justify-center flex">
                        <div
                            onClick={closeSidebar}
                            className="flex text-md p-3 bg-white rounded-full hover:bg-neutral-900 hover:text-white"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                        </div>
                    </div>
                )}
                <div className="py-4 px-0 justify-center flex">
                    <div
                        onClick={viewList}
                        className="flex text-md p-3 bg-white rounded-full hover:bg-neutral-900 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faTableList} size="xl" />
                    </div>
                </div>
                <div className="py-4 px-0 justify-center flex">
                    <div
                        onClick={seeMembers}
                        className="flex text-md p-3 bg-white rounded-full hover:bg-neutral-900 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faPeopleGroup} size="lg" />
                    </div>
                    {/* <p className="ml-4">My Ratings</p> */}
                </div>
                <div className="py-4 px-0 justify-center flex">
                    <div
                        onClick={setActive}
                        className="flex text-md p-3 bg-white rounded-full hover:bg-neutral-900 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
                    </div>
                    {/* <p className="ml-4">Search</p> */}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="py-4 px-0 justify-center flex">
                    <div
                        onClick={showSettings}
                        className="flex text-md p-3 bg-white rounded-full hover:bg-neutral-900 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faGear} size="xl" />
                    </div>
                    {/* <p className="ml-4">Settings</p> */}
                </div>
                <div className="py-4 px-0 justify-center flex">
                    <div className="flex text-md p-3 bg-white rounded-full hover:bg-neutral-900 hover:text-white">
                        {!loggedIn && (
                            <button onClick={() => setShowLogIn(true)}>
                                <FontAwesomeIcon
                                    icon={faArrowRightToBracket}
                                    size="xl"
                                />
                            </button>
                        )}

                        {loggedIn && (
                            <button onClick={handleLogout}>
                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                    size="xl"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
