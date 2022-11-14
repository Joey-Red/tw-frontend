import React, { useState } from "react";
interface TrendingMdProps {
    content: any;
}
function TrendingMd({ content }: TrendingMdProps) {
    let [opaque, setOpaque] = useState(false);
    let opaqueStyle = {
        display: "none",
    };
    let none = {};
    return (
        <div
            style={{
                background: `url(${content.moviePoster}) `,
                backgroundSize: "cover",
            }}
            className="flex-col relative max-h-[252px] min-h-[252px] w-full sm:w-1/2 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex bg-blue-200 "
            onMouseEnter={() => setOpaque(true)}
            onMouseLeave={() => setOpaque(false)}
        >
            <div
                style={opaque ? opaqueStyle : none}
                className="rounded-br rounded-bl pointer-events-none absolute top-0 bottom-0 left-0 right-0 bg-neutral-900/80"
            ></div>
            <div className="z-20 text-white p-2 flex justify-between flex-col h-full">
                <p className="text-lg text-center">{content.movieName}</p>
                <div>
                    <p>Score: {content.userRating}/10</p>
                    <p>{content.postUser}</p>
                    {content.comment && content.comment !== "" && (
                        <p className="italic">"{content.comment}"</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrendingMd;
