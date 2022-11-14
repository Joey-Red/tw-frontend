import React, { useState, useEffect } from "react";
import Axios from "axios";
import LoadingOne from "./Trending/LoadingOne";

function SharedProfile() {
    let [movieList, setMovieList]: any = useState([{}]);
    let [noUserFound, setNoUserFound] = useState(false);
    let [loaded, setLoaded] = useState(false);
    let [userId, setUserId] = useState("");
    let [userFound, setUserFound] = useState(false);
    useEffect(() => {
        let windowLoc = window.location.href;
        let splitUrl = windowLoc.split("/");
        let partialUrl = splitUrl[3];
        let userIdFromUrl = partialUrl.slice(5);
        setUserId(userIdFromUrl);
        if (userId !== "") {
            fetch();
        }
    }, [userId]);
    let fetch = () => {
        Axios.post(`https://cyan-alive-pangolin.cyclic.app/get_user/`, {
            user: userId,
        })
            .then((res) => {
                if (res.data.name === "CastError") {
                    setNoUserFound(true);
                    setLoaded(true);
                } else if (res.data === "No User Found") {
                    setNoUserFound(true);
                    setLoaded(true);
                } else {
                    setMovieList(res.data);
                    setUserFound(true);
                    setLoaded(true);
                    setNoUserFound(false);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    return (
        <div
            className="max-h-screen m-2 p-2"
            style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
        >
            {!loaded && (
                <>
                    <div className="text-2xl text-center bg-neutral-900/90 text-white rounded">
                        <LoadingOne />
                    </div>
                    <div className="flex my-2 sm:text-xl md:text-3xl bg-neutral-900/10 p-2">
                        <div className="w-full">
                            <div>
                                <p className="max-w-[20ch] mx-auto text-center">
                                    <LoadingOne />
                                </p>
                            </div>
                            <div>
                                <LoadingOne />
                            </div>
                            <div>
                                <LoadingOne />
                            </div>
                        </div>
                        <div className="bg-slade-900 max-w-[100px] max-h-[148px] sm:max-h-[445px] smmax-w-[300px] ml-auto" />
                    </div>
                </>
            )}
            {loaded && userFound && (
                <div className="text-2xl text-center bg-neutral-900/90 text-white rounded">
                    {movieList[0].username}'s Watchlist!
                </div>
            )}
            {noUserFound && (
                <div className="bg-neutral-900/90 rounded p-4 text-center text-xl text-white">
                    Either no users were found, or they have not added any
                    movies to their list.
                </div>
            )}
            {loaded &&
                userFound &&
                movieList.map((film: any) => {
                    return (
                        <div
                            className="flex my-2 sm:text-2xl  bg-neutral-900/10 p-2"
                            key={film.movieName + film.userRating}
                        >
                            <div className="w-full">
                                <div>
                                    <p className="max-w-[20ch] mx-auto text-center">
                                        {film.movieName}
                                    </p>
                                </div>
                                <p className="underline">Feedback</p>
                                <div>Rating: {film.userRating}</div>
                                {film.comment !== "No comment" &&
                                    film.comment !== "" && (
                                        <div>Comment: {film.comment}</div>
                                    )}
                            </div>
                            <img
                                className="max-w-[100px] max-h-[148px] sm:max-h-[445px] sm:max-w-[300px] ml-auto"
                                src={film.moviePoster}
                                alt={film.movieName}
                            />
                        </div>
                    );
                })}
        </div>
    );
}

export default SharedProfile;
