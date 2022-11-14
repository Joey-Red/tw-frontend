import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import TrendingLg from "./mini-components/Trending/TrendingLg";
import TrendingMd from "./mini-components/Trending/TrendingMd";
import TrendingSm from "./mini-components/Trending/TrendingSm";
function MainContent() {
    let [index, setIndex] = useState(1);
    let [loading, setLoading] = useState(true);
    let [contentOne, setContentOne] = useState();
    let [contentTwo, setContentTwo] = useState();
    let [contentThree, setContentThree] = useState();
    // Check Screen size so that our interval can stop if were not in lg mode
    let [currSize, setCurrSize] = useState("sm");
    let loadingContent = {
        // moviePoster: ""
        movieName: "..loading",
        userRating: "loading..",
        postUser: "..loading",
        comment: "loading..",
    };
    useEffect(() => {
        if (currSize === "sm") {
            const interval = setInterval(() => {
                changeCount(1);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [index, currSize]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 639) {
                setCurrSize("sm");
            }
            if (window.innerWidth >= 640 && window.innerWidth <= 767) {
                setCurrSize("md");
            }
            if (window.innerWidth >= 768) {
                setCurrSize("lg");
            }
        }
        window.addEventListener("resize", handleResize);
        return (_) => window.removeEventListener("resize", handleResize);
        // console.log(window.innerWidth);
    });

    let changeCount = (number) => {
        if (index === 3 && number === 1) {
            return setIndex(1);
        } else if (index === 1 && number === -1) {
            return setIndex(3);
        } else {
            setIndex((index) => {
                return index + number;
            });
        }
    };
    useEffect(() => {
        // Get 3 most recent posts
        Axios.get("https://cyan-alive-pangolin.cyclic.app/trending", {})
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    // setTrending(res.data);
                    // console.log("data: ", res.data);
                    setLoading(false);
                    setContentOne(res.data[0]);
                    setContentTwo(res.data[1]);
                    setContentThree(res.data[2]);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    return (
        <div className="h-min relative max-h-[540px] h-2/6 flex flex-col bg-slate-50 rounded group m-2">
            <div className="rounded-tr rounded-tl flex bg-slate-900/90 text-white py-2 min-w-full max-w-full absolute hidden sm:flex">
                <p className="min-w-fit px-2"> Trending on The Watchlist</p>
            </div>
            {!loading && (
                <div className="h-full flex max-h-[540px] sm:mt-10 bg-stone-50 gap-2 md:flex hidden">
                    <TrendingSm content={contentOne} />
                    <TrendingSm content={contentTwo} />
                    <TrendingSm content={contentThree} />
                </div>
            )}
            {loading && (
                <div className="h-full flex max-h-[540px] sm:mt-10 bg-stone-50 gap-2 md:flex hidden">
                    <TrendingSm content={loadingContent} />
                    <TrendingSm content={loadingContent} />
                    <TrendingSm content={loadingContent} />
                </div>
            )}
            {!loading && (
                <div className="h-full flex sm:mt-10 max-h-[540px]  bg-stone-50 gap-2 sm:flex hidden md:hidden">
                    <TrendingMd content={contentOne} />
                    <TrendingMd content={contentTwo} />
                </div>
            )}
            {!loading && (
                <div className="h-full flex sm:mt-10 max-h-[540px]  bg-stone-50 gap-2 sm:hidden">
                    <button
                        onClick={() => changeCount(-1)}
                        className="z-30 hover:bg-white min-h-[252px] hover:text-black text-white absolute left-0 top-0 bottom-0 w-8 bg-slate-900/60 rounded-tl rounded-bl"
                    >
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    </button>
                    {index === 1 && !loading && (
                        <TrendingLg content={contentOne} />
                        // </motion.div>
                    )}
                    {index === 2 && !loading && (
                        <TrendingLg content={contentTwo} />
                    )}

                    {index === 3 && !loading && (
                        <TrendingLg content={contentThree} />
                    )}
                    <button
                        onClick={() => changeCount(1)}
                        className="z-30 min-h-[252px] hover:bg-white hover:text-black text-white absolute right-0 top-0 bottom-0 w-8 bg-slate-900/60 rounded-tr rounded-br"
                    >
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default MainContent;
