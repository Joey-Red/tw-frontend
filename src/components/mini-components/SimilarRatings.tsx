import React, { useEffect, useState } from "react";
import axios from "axios";
import Axios, { AxiosError } from "axios";
import LoadingOne from "./Trending/LoadingOne";
import theater from "../../img/theater2.jpg";
interface SimilarRatingsProps {
    user: Object;
    loggedIn: Boolean;
}

function SimilarRatings({ user, loggedIn }: SimilarRatingsProps) {
    let [allSimilar, setAllSimilar]: any = useState([{}]);
    let [loading, setLoading] = useState(true);
    let [similarUsers, setSimilarUsers]: any = useState([{}]);
    useEffect(() => {
        // console.log(user);
        if (loggedIn === true) {
            Axios.post("http://localhost:8080/similar", {
                user: user,
            })
                .then((res) => {
                    setAllSimilar(res.data);
                    // console.log(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    if (axios.isAxiosError(err)) {
                        // Access to config, request, and response
                    } else {
                        // Just a stock error
                    }
                });
        }
    }, [loggedIn, user]);
    useEffect(() => {
        let newArr = allSimilar
            .sort(() => (Math.random() > 0.5 ? 1 : -1))
            .slice(0, 3);
        // console.log(newArr);
        setSimilarUsers(newArr);
    }, [allSimilar]);
    return (
        <div className="">
            {!loggedIn && (
                <div
                    className="sm:max-h-[300px] sm:min-h-[300px] flex relative"
                    // style={{
                    //     background: `url(${theater}) center center no-repeat`,
                    //     backgroundSize: "cover",
                    // }}
                >
                    <div className="w-full relative flex border rounded border-white">
                        {/* <div
                            className="absolute top-0 bottom-0 left-0 right-0 bg-neutral-900/90 contrast-[0.75] blur-sm"
                            style={{
                                background: `url(${theater}) center center no-repeat fixed`,
                                backgroundSize: "cover",
                            }}
                        ></div>{" "} */}
                        <div className="text-center text-white text-2xl flex z-20 rounded m-4 p-4 my-auto bg-neutral-900/90">
                            Log in and start adding movies to see which movies
                            you and others have in common!
                        </div>
                    </div>
                </div>
            )}
            {loggedIn && !loading && (
                <div
                    style={{ overflowY: "auto" }}
                    className="relative flex flex-col max-h-[300px] min-h-[300px] overflow-x-[hidden]"
                >
                    {/* <div
                        className="absolute top-[0] bottom-[0] left-[0] right-[0] bg-neutral-900/90 contrast-[0.75] blur-sm"
                        style={{
                            background: `url(${theater}) center center fixed no-repeat`,
                            backgroundSize: "cover",
                        }}
                    ></div> */}
                    {similarUsers.map((a: any) => {
                        return (
                            <div
                                key={a._id + a.postUser + a.movieName}
                                className="z-20 my-2 p-2 text-lg flex flex-col text-white break-all max-w-[504px]"
                            >
                                <div>User: {a.postUser}</div>
                                <div>Movie: {a.movieName}</div>
                                {a.comment !== "No comment" &&
                                    a.comment !== "" && (
                                        <div>Comment: {a.comment}</div>
                                    )}
                                <div>Rating: {a.userRating}</div>
                            </div>
                        );
                    })}
                    {allSimilar.length < 3 && (
                        <div className="flex mt-auto w-full justify-center text-white text-lg z-20 bg-neutral-900/20">
                            Add movies to see more users you share interests
                            with!
                        </div>
                    )}
                </div>
            )}
            {loading && loggedIn && (
                <>
                    <LoadingOne />
                    <LoadingOne />
                    <LoadingOne />
                    <LoadingOne />
                    <LoadingOne />
                </>
            )}
        </div>
    );
}

export default SimilarRatings;
