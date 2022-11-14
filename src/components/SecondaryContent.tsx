import React, { useEffect, useRef, useState } from "react";
import Axios, { AxiosError } from "axios";
import placeholder from "../img/download.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ArticleContainer from "./ArticleContainer";
import LoadingMany from "./mini-components/LoadingMany";
import LoadingOne from "./mini-components/Trending/LoadingOne";
import LoadingOneAlt from "./mini-components/Trending/LoadingOneAlt";
import SimilarRatings from "./mini-components/SimilarRatings";
import theater from "../img/theater.jpg";

interface SecondaryContentProps {
    user: Object;
    loggedIn: Boolean;
}

function SecondaryContent({ user, loggedIn }: SecondaryContentProps) {
    let [articles, setArticles] = useState([{}]);
    let [loading, setLoading] = useState(true);
    let [loadingTop, setLoadingTop] = useState(true);
    let [topThree, setTopThree]: any = useState([{}]);
    useEffect(() => {
        // Axios.get("https://inshorts.deta.dev/news?category=entertainment")
        //     .then((res) => {
        //         setArticles(res.data.data);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         if (axios.isAxiosError(err)) {
        //             // Access to config, request, and response
        //         } else {
        //             // Just a stock error
        //         }
        //     });
    }, []);
    useEffect(() => {
        Axios.get("http://localhost:8080/rankings")
            .then((res) => {
                setTopThree(res.data);
                // console.log(res.data);
                setLoadingTop(false);
            })
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    // Access to config, request, and response
                } else {
                    // Just a stock error
                }
            });
    }, []);

    return (
        <div className="flex-grow flex gap-2 m-2 mt-0 flex-col sm:flex-row">
            <div className="sm:w-[50%] rounded flex flex-col">
                <div
                    // style={{ background: "rgba(0,0,0 / 100%)" }}
                    className=" bg-slate-900/90 rounded"
                    // style={{
                    //     background: `url(${theater}) center center no-repeat`,
                    //     backgroundSize: "cover",
                    // }}
                >
                    <p className="p-2 pb-0 text-center text-white text-xl text-center">
                        Users with similar ratings
                    </p>
                    <div className="flex flex-col p-2 pt-0 rounded relative">
                        <div
                            className="absolute top-[0] bottom-[0] left-[0] right-[0] bg-neutral-900/90 contrast-[0.75] blur-sm"
                            style={{
                                background: `url(${theater}) center center no-repeat`,
                                backgroundSize: "cover",
                            }}
                        ></div>
                        <SimilarRatings user={user} loggedIn={loggedIn} />
                    </div>
                </div>
                <div className="mt-3 rounded w-full flex flex-col h-full">
                    <p className="bg-white text-black border-l-4 border-red-400 p-1 mb-2 text-center text-white text-xl text-center">
                        Top 3 Movies
                    </p>
                    {!loadingTop && (
                        <div className="">
                            <div className="flex flex-col justify-between h-full gap-2 max-h-[600px] overflow-y-scroll">
                                <div className="bg-slate-900/90 flex-col flex sm:min-h-[600px] rounded-bl rounded-tl ">
                                    <p className="text-white text-xl text-center">
                                        Rank One
                                    </p>
                                    <div
                                        style={{ height: "100%" }}
                                        className="h-full relative flex flex-col text-white text-xl text-center justify-center"
                                    >
                                        <div className="bg-neutral-900/90  my-8  h-40 z-20 flex flex-col justify-center text-2xl">
                                            <p>{topThree[0].film.movieName}</p>
                                            <p>
                                                Average Rating:{" "}
                                                {topThree[0].avgRating}
                                                /10
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                background: `url(${topThree[0].film.poster})`,
                                                backgroundSize: "cover",
                                            }}
                                            className="absolute top-0 bottom-0 left-0 right-0"
                                        ></div>
                                    </div>
                                    <div className="h-6"></div>
                                </div>
                                <div className="bg-slate-900/90 flex-col flex sm:min-h-[600px] rounded-bl rounded-tl ">
                                    <p className="text-white text-xl text-center">
                                        Rank Two
                                    </p>
                                    <div className="h-full relative flex flex-col text-white text-xl text-center justify-center">
                                        <div className="bg-neutral-900/90 z-20  my-8  h-40 flex flex-col justify-center text-2xl">
                                            <p>{topThree[1].film.movieName}</p>
                                            <p>
                                                Average Rating:{" "}
                                                {topThree[1].avgRating}
                                                /10
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                background: `url(${topThree[1].film.poster})`,
                                                backgroundSize: "cover",
                                            }}
                                            className="z-10 absolute top-0 bottom-0 left-0 right-0"
                                        ></div>
                                    </div>
                                    <div className="h-6"></div>
                                </div>
                                <div className="bg-slate-900/90 flex-col flex sm:min-h-[600px] rounded-bl rounded-tl justify-center">
                                    <p className="text-white text-xl text-center">
                                        Rank Three
                                    </p>
                                    <div className="h-full relative flex flex-col text-white text-xl text-center justify-center">
                                        {" "}
                                        <div className="bg-neutral-900/90 z-20 my-8  h-40 flex flex-col justify-center text-2xl">
                                            <p>{topThree[2].film.movieName}</p>
                                            <p>
                                                Average Rating:{" "}
                                                {topThree[2].avgRating}
                                                /10
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                background: `url(${topThree[2].film.poster})`,
                                                backgroundSize: "cover",
                                            }}
                                            className="absolute top-0 bottom-0 left-0 right-0"
                                        ></div>
                                    </div>
                                    <div className="h-6"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {loadingTop && (
                        <>
                            <div className="flex flex-col justify-between h-full gap-2 max-h-[600px] overflow-y-scroll">
                                <div className="bg-slate-900/90 flex-col flex sm:min-h-[600px] rounded justify-center">
                                    <p className="text-white text-xl text-center">
                                        Rank One
                                    </p>
                                    <div className="flex flex-col">
                                        <LoadingOneAlt />
                                        <LoadingOneAlt />
                                        <LoadingOneAlt />
                                    </div>
                                </div>
                                <div className="bg-slate-900/90 flex-col flex sm:min-h-[600px] rounded justify-center">
                                    <p className="text-white text-xl text-center">
                                        Rank Two
                                    </p>
                                    <div className="flex flex-col">
                                        <LoadingOneAlt />
                                        <LoadingOneAlt />
                                        <LoadingOneAlt />
                                    </div>
                                </div>
                                <div className="bg-slate-900/90 flex-col flex sm:min-h-[600px] rounded justify-center">
                                    <p className="text-white text-xl text-center">
                                        Rank Three
                                    </p>
                                    <div className="flex flex-col">
                                        <LoadingOneAlt />
                                        <LoadingOneAlt />
                                        <LoadingOneAlt />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex-grow sm:w-[50%]">
                <p className="text-center border-l-4 border-red-400 bg-white w-full">
                    Pop Culture News
                </p>
                <div className="overflow-y-scroll last:pb-4">
                    {!loading && (
                        <div className="max-h-[999px]">
                            {articles.map((post: any) => {
                                const obj = {
                                    author: post.author,
                                    content: post.content,
                                    imageUrl: post.imageUrl,
                                    readMoreUrl: post.readMoreUrl,
                                    title: post.title,
                                };
                                return (
                                    <div key={obj.author + obj.content}>
                                        <ArticleContainer {...obj} />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {loading && (
                        <div className="max-h-[952px]">
                            <LoadingMany />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SecondaryContent;
