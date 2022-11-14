import React, { useState } from "react";
import Axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faBars,
    faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
interface SearchProps {
    setSidebar: Function;
    setLoggedIn: Function;
    sidebar: Boolean;
    loggedIn: Boolean;
    setShowLogIn: Function;
    user: any;
    setDisplayData: Function;
    setActors: Function;
    setAwards: Function;
    setPlot: Function;
    setBoxOffice: Function;
    setDirector: Function;
    setGenre: Function;
    setPoster: Function;
    setRating: Function;
    setWriters: Function;
    setRelease: Function;
    setImdbRating: Function;
    setLoading: Function;
    setTitle: Function;
    setRunTime: Function;
    disabledSearch: any;
    setDisabledSearch: Function;
    setUser: Function;
    setNotFound: Function;
}

function Search({
    setLoading,
    setSidebar,
    sidebar,
    loggedIn,
    setUser,
    setLoggedIn,
    setShowLogIn,
    user,
    setDisplayData,
    setActors,
    setAwards,
    setPlot,
    setBoxOffice,
    setDirector,
    setGenre,
    setPoster,
    setRating,
    setWriters,
    setRelease,
    setImdbRating,
    setTitle,
    setRunTime,
    disabledSearch,
    setDisabledSearch,
    setNotFound,
}: SearchProps) {
    let [currSearch, setCurrSearch] = useState("");
    // let sidebarContainer = document.getElementById("sidebar");
    const showSidebar = () => {
        setSidebar(true);
        // sidebarContainer?.classList.remove("hidden");
    };
    let handleLogIn = () => {
        setShowLogIn(true);
        setSidebar(false);
    };

    const searchFilm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currSearch === "") {
            return;
        }
        setDisabledSearch(true);
        setDisplayData(true);
        setSidebar(false);
        Axios.post(
            `http://www.omdbapi.com/?apikey=f8c753b6&t=${currSearch}&plot=full`
        )
            .then((res: any) => {
                if (res.status === 200 && !res.data.Error) {
                    setActors(res.data.Actors);
                    setAwards(res.data.Awards);
                    setPlot(res.data.Plot);
                    setBoxOffice(res.data.BoxOffice);
                    setDirector(res.data.Director);
                    setGenre(res.data.Genre);
                    setPoster(res.data.Poster);
                    setRating(res.data.Rated);
                    setWriters(res.data.Writer);
                    setRelease(res.data.Released);
                    setImdbRating(res.data.imdbRating);
                    setTitle(res.data.Title);
                    setRunTime(res.data.Runtime);
                    setLoading(false);
                }
                if (res.data.Error === "Movie not found!") {
                    setNotFound(true);
                    setLoading(false);
                }
            })
            .catch(function (error: AxiosError | string | object | any) {
                if (
                    error.response.status === 400 ||
                    error.response.status === 403 ||
                    error.response.status === 401
                ) {
                    console.log(error);
                }
            });
    };

    const handleLoginGuest = () => {
        Axios.post("https://cyan-alive-pangolin.cyclic.app/log-in", {
            username: "Guest",
            password: "123456",
        })
            .then((res: any) => {
                if (res.status === 200) {
                    setLoggedIn(true);
                    setUser(res.data);
                    // store the user in localStorage
                    let stringData = JSON.stringify(res.data);
                    localStorage.setItem("user", stringData);
                    setShowLogIn(false);
                }
            })
            .catch(function (error: AxiosError | string | object | any) {
                if (
                    error.response.status === 400 ||
                    error.response.status === 403 ||
                    error.response.status === 401
                ) {
                    console.log(error);
                }
            });
    };
    return (
        <div className="flex h-max flex-col">
            {/* mt-20 */}
            {/* <div className=" "> */}
            <div className="flex">
                <span className="text-3xl p-2 w-full flex">
                    <span className="inline text-base flex self-end pb-[2px]">
                        <a href="https://joey-red.github.io/tw-frontend/">
                            The
                        </a>
                    </span>
                    <span className="inline flex self-end pb-0">
                        <a href="https://joey-red.github.io/tw-frontend/">
                            Watchlist
                        </a>
                    </span>
                </span>
                {!loggedIn && (
                    <span className="max-w-[200px] m-2 justify-center w-full text-center flex items-center rounded border border-gray-400/30">
                        <button
                            onClick={handleLoginGuest}
                            className="w-full flex justify-center"
                        >
                            Guest
                            <span className="hidden sm:flex ml-[0.5ch]">
                                Log In
                            </span>
                        </button>
                    </span>
                )}
                <span className="max-w-[200px] m-2 justify-center w-full text-center flex items-center rounded border border-gray-400/30">
                    {loggedIn && (
                        <>
                            <FontAwesomeIcon icon={faCircleUser} size="sm" />
                        </>
                    )}

                    {sidebar && (
                        <>
                            {!loggedIn && (
                                <button
                                    className="w-full"
                                    onClick={handleLogIn}
                                >
                                    Log In
                                </button>
                            )}
                            {loggedIn && (
                                <>
                                    <p className="max-w-[10ch] truncate ml-2">
                                        {user.username}
                                    </p>
                                </>
                            )}
                        </>
                    )}
                    {!sidebar && (
                        <>
                            {!loggedIn && (
                                <>
                                    <button
                                        className="w-full"
                                        onClick={handleLogIn}
                                    >
                                        Log In
                                    </button>
                                </>
                            )}
                            {loggedIn && (
                                <>
                                    <p className="max-w-[17ch] truncate ml-2">
                                        {user.username}
                                    </p>
                                </>
                            )}
                        </>
                    )}
                </span>
            </div>
            {/* </div> */}
            {/*  md:rounded-3xl  */}
            <div className="block sm:flex sm:items-center sm:w-auto">
                <div className="px-3 py-2 flex justify-between items-center w-full">
                    {!sidebar && (
                        <div
                            onClick={showSidebar}
                            className="h-8 w-8 bg-slate-50 justify-center items-center flex rounded-tl rounded-bl hover:bg-neutral-900 hover:text-white bg-white p-2"
                        >
                            <FontAwesomeIcon icon={faBars} size="lg" />
                        </div>
                    )}
                    <form className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search for a movie!"
                            className="h-fit p-1 w-full mr-[1px] ml-[1px]"
                            id="search"
                            onChange={(e) => setCurrSearch(e.target.value)}
                            disabled={disabledSearch}
                        />
                        {/* w-52 max-w-full */}
                        <div className="h-8 w-8 bg-slate-50 justify-center items-center flex rounded-br rounded-tr hover:bg-neutral-900 hover:text-white bg-white p-2">
                            <button className="flex" onClick={searchFilm}>
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    size="lg"
                                />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Search;
