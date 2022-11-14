import React, { useEffect, useState } from "react";
import Axios, { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import LoadingOne from "./Trending/LoadingOne";
import LoadingMany from "./LoadingMany";
interface DisplayMoviesProps {
    user: any;
}
function DisplayMovies({ user }: DisplayMoviesProps) {
    let [loading, setLoading] = useState(true);
    let [randomized, setRandomized] = useState(false);
    let [avg, setAvg] = useState<number | string>("NA");
    // let [hide, setHide] = useState(true);
    const [listOfRatings, setListOfRatings] = useState<any>([{}]);
    useEffect(() => {
        Axios.post("http://localhost:8080/ratings", {
            postUser: user,
        })
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    setListOfRatings(res.data);
                    // console.log("data: ", res.data);
                    setLoading(false);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);
    let showComment = (e: any) => {
        let comment = document.getElementById(e.target.value);
        if (comment?.classList.contains("hidden")) {
            comment?.classList.remove("hidden");
        } else {
            comment?.classList.add("hidden");
        }
    };

    let ratingArray = listOfRatings;
    let newRatingArr: any = [];
    let displayMovieArr: any = [];

    ratingArray.forEach((rating: any) => {
        if (rating.postUserId === user._id) {
            // console.log(rating.movieName, rating.moviePoster);
            newRatingArr.push(rating.userRating);
            // Getting user rating and comment of each movie
            displayMovieArr.push(
                <div
                    key={uuidv4()}
                    className="flex flex-col sm:text-xl p-2 min-w-[33%] justify-between items-center"
                    style={{
                        overflowY: "auto",
                        textOverflow: "clip",
                        // whiteSpace: "nowrap",
                        overflowX: "hidden",
                    }}
                >
                    <div className="text-center">
                        {rating.movieName} - {rating.userRating}
                    </div>
                    <img
                        className="max-w-[100px] max-h-[148px] mx-auto mt-auto"
                        // sm:max-h-[445px] sm:max-w-[300px]
                        src={rating.moviePoster}
                        alt={rating.movieName}
                    />
                    {rating.comment !== "No comment" && rating.comment !== "" && (
                        <div style={{ overflowWrap: "break-word" }}>
                            <button
                                className="bg-black/20 px-1 rounded text-sm"
                                value={rating.comment + rating.movieName}
                                onClick={showComment}
                            >
                                Show Comment
                            </button>{" "}
                            <div
                                className="flex flex-col hidden break-all bg-neutral-900/90 text-white p-4 z-20 rounded min-h-xs max-h-[90%] max-w-[90%] w-[40ch] absolute left-0 top-[50%] right-0 mx-auto my-auto"
                                id={rating.comment + rating.movieName}
                            >
                                {rating.comment}
                                <button
                                    className="bg-black px-1 rounded text-sm"
                                    value={rating.comment + rating.movieName}
                                    onClick={showComment}
                                >
                                    Hide Comment
                                </button>
                            </div>
                        </div>
                    )}
                    {rating.comment === "No comment" ||
                        (rating.comment === "" && (
                            <div className="sm:h-[28px] h-[46px]"></div>
                        ))}
                </div>
            );
        }
    });

    useEffect(() => {
        // Averaging out all the users scores
        if (newRatingArr.length !== 0) {
            let finalVal =
                Math.round(
                    (newRatingArr.reduce((a: number, b: number) => a + b) /
                        newRatingArr.length) *
                        100
                ) / 100;
            setAvg(finalVal);
        }
    }, [newRatingArr]);

    return (
        <>
            {loading && (
                <>
                    <div
                        key={uuidv4()}
                        className="bg-neutral-900/10 text-lg rounded m-1 p-2 relative"
                    >
                        <LoadingMany />
                    </div>
                </>
            )}
            {!loading && (
                <div
                    key={user._id}
                    className="bg-neutral-900/10 text-lg rounded m-1 p-2"
                >
                    <div className="text-center pseudo sm:text-xl">
                        {user.username} Avg rating: {avg}
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {displayMovieArr}
                    </div>
                </div>
            )}
        </>
    );
}

export default DisplayMovies;
