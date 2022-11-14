import React, { useState } from "react";
import { motion } from "framer-motion";

interface trendingLgProps {
    content: any;
}
const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            // opacity: 0,
        };
    },
    center: {
        // zIndex: 1,
        x: 0,
        // opacity: 1,
    },
    exit: (direction: number) => {
        return {
            // zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            // opacity: 0,
        };
    },
};
function TrendingLg({ content }: trendingLgProps) {
    let [opaque, setOpaque] = useState(false);
    let opaqueStyle = {
        display: "none",
    };
    let none = {};

    return (
        <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            style={{
                background: `url(${content.moviePoster}) center center`,
                backgroundSize: "cover",
            }}
            onMouseEnter={() => setOpaque(true)}
            onMouseLeave={() => setOpaque(false)}
            className="flex-col relative min-h-[252px] max-h-[252px] w-full sm:w-1/3 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex bg-blue-200 "
        >
            <div
                style={opaque ? opaqueStyle : none}
                className="rounded pointer-events-none absolute top-0 bottom-0 left-0 right-0 bg-neutral-900/80"
            ></div>
            <div className="z-20 text-white p-2 flex justify-between flex-col h-full">
                <p className="text-lg text-center">{content.movieName}</p>
                <div className="text-center text-xl">
                    <p>Score: {content.userRating}/10</p>
                    <p>{content.postUser}</p>
                    {content.comment && content.comment !== "" && (
                        <p className="italic">"{content.comment}"</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default TrendingLg;
