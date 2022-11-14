import React, { useState, useEffect } from "react";
import Axios, { AxiosError } from "axios";
import MyCollection from "./mini-components/MyCollection";
import LoadingOneAlt from "./mini-components/Trending/LoadingOneAlt";
interface MyListProps {
    user: any;
}
// declare module "axios" {
//     export interface AxiosRequestConfig {
//         user: object;
//         id: string;
//         data: { id: any; user: any; }
//     }
// }
function Mylist({ user }: MyListProps) {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    let [userRating, setUserRating] = useState(0);
    let [disabled, setDisabled] = useState(false);
    let [noUser, setNoUser] = useState(false);
    useEffect(() => {
        // console.log(user);
        if (
            user._id === undefined ||
            user._id === null ||
            user._id.length < 5
        ) {
            setNoUser(true);
        }
        Axios.post("http://localhost:8080/ratings", {
            postUser: user,
        })
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    setMovies(res.data);
                    // console.log("data: ", res.data);
                    setLoading(false);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);
    // useEffect(() => {
    //     console.log(movies);
    // }, [movies]);
    let ratingArray = movies;
    let newRatingArr: any = [];
    let displayMovieArr: any = [];
    ratingArray.forEach((rating: any) => {
        if (rating.postUserId === user._id) {
            newRatingArr.push(rating.userRating);
            // Getting user rating and comment of each movie
            displayMovieArr.push(
                <MyCollection
                    key={rating._id}
                    rating={rating}
                    setUserRating={setUserRating}
                    userRating={userRating}
                    disabled={disabled}
                    setDisabled={setDisabled}
                    user={user}
                />
            );
        }
    });
    // console.log(user)
    let copyLink = () => {
        navigator.clipboard.writeText(`http://localhost:3001/user:${user._id}`);
    };
    return (
        <div
            className="flex flex-col items-center m-2"
            style={{ overflowY: "auto" }}
        >
            <div className="mt-4 text-2xl text-center flex flex-col">
                Your personal movie collection.
                {!noUser && (
                    <button
                        onClick={copyLink}
                        className="text-sm border rounded-full bg-slate-400 px-1 ml-auto"
                    >
                        Share my list
                    </button>
                )}
            </div>
            <>
                {!loading && <>{displayMovieArr}</>}
                {loading && (
                    <div className="w-full">
                        <LoadingOneAlt />
                    </div>
                )}
            </>
            {noUser && (
                <div className="h-full my-auto">
                    Log in to start building your Watchlist!
                </div>
            )}
        </div>
    );
}

export default Mylist;
