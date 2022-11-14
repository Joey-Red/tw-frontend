import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Axios, { AxiosError } from "axios";
import { motion } from "framer-motion";

interface displayDataProps {
    user: any;
    setDisplayData: Function;
    actors: String;
    awards: String;
    plot: String;
    boxOffice: String;
    director: String;
    genre: String;
    poster: any;
    rating: String;
    writers: String;
    release: String;
    imdbRating: String;
    loading: Boolean;
    title: String;
    runTime: String;
    setDisabledSearch: Function;
    notFound: Boolean;
    setNotFound: Function;
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
}
function DisplayData({
    setNotFound,
    user,
    setDisplayData,
    actors,
    awards,
    plot,
    boxOffice,
    director,
    genre,
    poster,
    rating,
    writers,
    release,
    imdbRating,
    loading,
    title,
    runTime,
    setDisabledSearch,
    notFound,
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
    setLoading,
    setTitle,
    setRunTime,
}: displayDataProps) {
    let [provideFeedback, setProvideFeedback] = useState(false);
    let [showHideMore, setShowHideMore] = useState(false);
    let [showReadMore, setShowReadMore] = useState(true);
    let [seen, setSeen] = useState(false);
    let [planSee, setPlanSee] = useState(false);
    let [comment, setComment] = useState("");
    let [showPoster, setShowPoster] = useState(true);
    let [userRating, setUserRating] = useState(0);
    // console.log(user);
    let changePoster = () => {
        setShowPoster(!showPoster);
    };
    let handleClick = () => {
        setProvideFeedback(!provideFeedback);
    };
    let checkYesPlan = () => {
        setPlanSee(!planSee);
        // console.log(planSee);
    };
    let plansLabel = document.getElementById("plansLabel");
    let yesSeen = document.getElementById("yesSeen");
    let checkYesSeen = () => {
        setSeen(!seen);
    };
    useEffect(() => {
        // Grey out text if you select the other option
        if (seen) {
            plansLabel?.classList.add("text-zinc-400");
        } else {
            plansLabel?.classList.remove("text-zinc-400");
        }
        if (planSee) {
            yesSeen?.classList.add("text-zinc-400");
        } else {
            yesSeen?.classList.remove("text-zinc-400");
        }
    });
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDisplayData(false);
                    setDisabledSearch(false);
                    setNotFound(false);
                    setActors("");
                    setAwards("");
                    setPlot("");
                    setBoxOffice("");
                    setDirector("");
                    setGenre("");
                    setPoster("");
                    setRating("");
                    setWriters("");
                    setRelease("");
                    setImdbRating("");
                    setTitle("");
                    setRunTime("");
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    let handleSubmit = () => {
        if (seen) {
            Axios.all([
                Axios.put("http://localhost:8080/update-movies", {
                    postUser: user,
                    movieList: title,
                }),
                Axios.post("http://localhost:8080/movie-comment", {
                    postUser: user,
                    postUserId: user.id,
                    movieName: title,
                    seen: seen,
                    planSee: planSee,
                    userRating: userRating,
                    moviePoster: poster,
                    comment: comment,
                }),
            ]).then(
                Axios.spread((data1, data2) => {
                    // console.log(data1, data2);
                })
            );
        }
        if (!seen) {
            Axios.post("http://localhost:8080/movie-comment", {
                postUser: user,
                postUserId: user.id,
                movieName: title,
                seen: seen,
                planSee: planSee,
                moviePoster: poster,
                comment: comment,
            });
        }
        window.location.replace("http://localhost:3001/");
    };
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    let showElem = () => {
        let hiddenElem = document.getElementById("hidden");
        hiddenElem?.classList.remove("hidden");
        setShowReadMore(false);
        setShowHideMore(true);
    };
    let hideElem = () => {
        let hiddenElem = document.getElementById("hidden");
        hiddenElem?.classList.add("hidden");
        setShowHideMore(false);
        setShowReadMore(true);
    };
    let close = () => {
        setDisplayData(false);
        setDisabledSearch(false);
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/40 absolute bottom-0 top-0 left-0 right-0 z-40 flex items-center justify-center"
        >
            <div
                ref={wrapperRef}
                className="z-40 h-3/4 w-full max-w-screen-lg rounded border border-black absolute   overflow-y-scroll"
                style={
                    showPoster
                        ? {
                              background: `url(${poster}) `,
                              backgroundColor: "#0f172a",
                          }
                        : { background: "#0f172a" }
                }
            >
                {notFound && (
                    <div className="text-white text-xl text-center justify-center items-center flex h-full">
                        No movie found, please verify your query.
                    </div>
                )}{" "}
                {!notFound && (
                    <>
                        <div className="w-full flex justify-end absolute">
                            <button
                                className="fixed m-6 text-rose-500 z-[40] bg-neutral-900/80 px-[6px] py-[2px] rounded"
                                onClick={close}
                            >
                                <FontAwesomeIcon icon={faXmark} size="xl" />
                            </button>
                        </div>
                        {/* max-h-[650px] */}
                        <div className="flex justify-evenly min-h-full items-center flex-col p-2 pt-0 bg-neutral-800/90">
                            {loading && (
                                <div className="flex-grow m-2 p-2 bg-black/90 rounded text-white h-full w-full">
                                    <div className="border border-grey-900 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="flex-1 space-y-6 py-1">
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Data */}
                            <div className="mt-4 flex">
                                {showPoster && (
                                    <div className="absolute right-4 top-4 z-[1]">
                                        <img
                                            src={poster}
                                            alt="movie poster"
                                            className="max-w-[150px] border-black border rounded"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col text-white">
                                    {showPoster && (
                                        <button
                                            onClick={changePoster}
                                            className="duration-300 hover:bg-white/90 hover:text-black/90 z-10 border border-black p-2 rounded bg-neutral-900/80 text-neutral-300 max-w-fit mb-4"
                                        >
                                            Hide Posters
                                        </button>
                                    )}
                                    {!showPoster && (
                                        <button
                                            onClick={changePoster}
                                            className="duration-300 hover:bg-white/90 hover:text-black/90 z-10 border border-black p-2 rounded bg-neutral-900/80 text-neutral-300 max-w-fit mb-4"
                                        >
                                            Show Posters
                                        </button>
                                    )}

                                    <h3 className="underline max-w-[60ch]">
                                        Title
                                    </h3>
                                    <p className="z-10">{title}</p>
                                    <p className="z-10">Released: {release}</p>
                                    <p className="z-10">Rated: {rating}</p>
                                    <p className="z-10">Runtime: {runTime}</p>
                                    <p className="z-10">Genre: {genre}</p>
                                    <p className="z-10">Director: {director}</p>
                                    <h3 className="underline max-w-[60ch]">
                                        Writer(s)
                                    </h3>
                                    <p className="z-10">{writers}</p>

                                    <h3 className="underline max-w-[60ch]">
                                        Actors
                                    </h3>
                                    <p>{actors}</p>
                                    {/* Fetch full plot only display partial bc spoilers */}
                                    <h3 className="underline">Plot</h3>
                                    <div className="text-left max-w-[60ch]">
                                        {plot.length > 300 ? (
                                            <div>
                                                {plot.substring(0, 300)}{" "}
                                                {showReadMore && (
                                                    <button
                                                        onClick={showElem}
                                                        className="underline"
                                                    >
                                                        Read more
                                                    </button>
                                                )}
                                                <div
                                                    className="hidden"
                                                    id="hidden"
                                                >
                                                    {plot.substring(301)}{" "}
                                                    {showHideMore && (
                                                        <button
                                                            onClick={hideElem}
                                                            className="underline"
                                                        >
                                                            Hide more
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>{plot}</div>
                                        )}
                                    </div>
                                    <h3 className="underline">Awards</h3>
                                    <p>{awards}</p>
                                    <h3>IMDB Rating</h3>
                                    <p>{imdbRating}/10</p>
                                    <h3>Box Office Value</h3>
                                    <p>{boxOffice}</p>
                                </div>
                            </div>
                            {user._id !== undefined && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="border border-black text-white p-2 rounded bg-neutral-900/80 hover:bg-white/90 hover:text-black/90 duration-300"
                                    onClick={handleClick}
                                    id="provideFeedbackButton"
                                >
                                    Provide Feedback
                                </motion.button>
                            )}

                            {user._id === undefined && (
                                <div className="border border-black text-white p-2 rounded bg-neutral-900/80">
                                    Sign in to provide feedback
                                </div>
                            )}
                            {provideFeedback && (
                                <div className="text-white">
                                    <p>Have you seen this movie?</p>
                                    <p className="text-zinc-400">
                                        (Leave blank for No)
                                    </p>
                                    <div className="flex-row">
                                        <label
                                            htmlFor="yesSeen"
                                            className="mr-2"
                                            id="yesSeen"
                                        >
                                            Yes
                                        </label>
                                        <input
                                            type="checkbox"
                                            name="yesSeen"
                                            id=""
                                            onChange={checkYesSeen}
                                            disabled={planSee}
                                        />
                                    </div>
                                    <p>Do you plan on it?</p>
                                    <p className="text-zinc-400">
                                        (Leave blank for No)
                                    </p>
                                    <div className="flex flex-row">
                                        <label
                                            htmlFor="yesPlans"
                                            className="mr-2"
                                            id="plansLabel"
                                        >
                                            Yes
                                        </label>
                                        <input
                                            type="checkbox"
                                            name="yesPlans"
                                            id=""
                                            onChange={checkYesPlan}
                                            disabled={seen}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="userRating">
                                            Rating (1-10)
                                        </label>
                                    </div>
                                    {/* <input
                                type="number"
                                name="userRating"
                                id="userRating"
                                min="0"
                                max="10"
                                maxLength={2}
                                className="text-black rounded"
                                onChange={changeRating}
                            /> */}
                                    <div className="slidecontainer">
                                        <input
                                            type="range"
                                            min="0"
                                            max="10"
                                            className="slider"
                                            id="myRange"
                                            onChange={(e) =>
                                                setUserRating(
                                                    e.target.valueAsNumber
                                                )
                                            }
                                            value={userRating}
                                        />
                                        <div>{userRating}</div>
                                    </div>
                                    <p>
                                        Would you like to comment on the movie?
                                    </p>
                                    <div>
                                        <textarea
                                            name="movie comment"
                                            className="rounded text-black"
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="border border-black p-2 rounded text-black bg-[#1E75FF]"
                                            onClick={handleSubmit}
                                            disabled={
                                                !seen &&
                                                comment === "" &&
                                                !planSee
                                            }
                                        >
                                            Submit
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}

export default DisplayData;
