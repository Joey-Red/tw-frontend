import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencilAlt,
    faCheck,
    faEraser,
    faX,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
interface MyCollectionProps {
    setUserRating: Function;
    userRating: number;
    rating: any;
    disabled: boolean;
    setDisabled: Function;
    user: any;
}

function MyCollection({
    setUserRating,
    userRating,
    rating,
    disabled,
    setDisabled,
    user,
}: MyCollectionProps) {
    let [editing, setEditing] = useState(false);
    let [deleting, setDeleting] = useState(false);
    let [success, setSuccess] = useState(false);
    let [updateMsg, setUpdateMsg] = useState(false);
    let handleEdit = (e: any) => {
        setUserRating(e.userRating);
        setEditing(true);
        setDisabled(true);
    };
    let cancelEdit = () => {
        setEditing(false);
        setDisabled(false);
    };

    let updateRating = () => {
        Axios.put("https://cyan-alive-pangolin.cyclic.app/update-rating", {
            id: rating._id,
            rating: userRating,
        })
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    // YO IT WAS UPDATED
                    setUpdateMsg(true);
                    setEditing(false);
                    setDisabled(false);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    useEffect(() => {
        setTimeout(function () {
            setUpdateMsg(false);
        }, 3000);
    }, [updateMsg]);

    let deleteMovie = () => {
        Axios.delete("https://cyan-alive-pangolin.cyclic.app/delete-movie", {
            data: {
                id: rating._id,
                user: user,
            },
        })
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    console.log(res);
                    setSuccess(true);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    return (
        <>
            {success && null}
            {!success && (
                <>
                    {editing && (
                        <div className="flex my-2 sm:text-2xl  bg-neutral-900/10 p-2 w-full justify-between">
                            <div className="flex flex-col w-full">
                                <div className="w-full flex flex-col justify-center my-auto">
                                    <div>
                                        <p className="max-w-[20ch] mx-auto text-center">
                                            {rating.movieName}
                                        </p>
                                        <p className="max-w-[20ch] mx-auto text-center">
                                            Rating: {rating.userRating}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center sm:flex-row flex-col m-2">
                                    <div className="w-full flex justify-center items-center">
                                        <div className="flex items-center mr-2">
                                            <div>
                                                <label htmlFor="userRating">
                                                    Rating (1-10)
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <input
                                                type="range"
                                                min="0"
                                                max="10"
                                                className="mx-2"
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
                                    </div>
                                    <div className="flex gap-2 justify-between flex items-center">
                                        <div
                                            onClick={cancelEdit}
                                            className="hover:cursor-pointer hover:bg-red-900 bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                        >
                                            <FontAwesomeIcon icon={faX} />
                                        </div>
                                        <div
                                            onClick={updateRating}
                                            className="hover:cursor-pointer hover:bg-green-900 bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="max-w-[100px] max-h-[148px] sm:max-h-[445px] sm:max-w-[300px] ml-auto my-auto"
                                src={rating.moviePoster}
                                alt={rating.movieName}
                            />
                        </div>
                    )}
                    {!editing && (
                        <div
                            key={rating._id}
                            className="flex my-2 sm:text-2xl  bg-neutral-900/10 p-2 w-full justify-between relative"
                        >
                            {updateMsg && (
                                <p className="text-center mt-auto bg-neutral-900/90 text-[green] top-0 left-0 right-0 absolute">
                                    Successfully updated rating!
                                </p>
                            )}

                            <div className="w-full flex flex-col justify-center text">
                                <div>
                                    <p className="max-w-[20ch] mx-auto text-center">
                                        {rating.movieName}
                                    </p>
                                    <p className="max-w-[20ch] mx-auto text-center">
                                        Rating: {rating.userRating}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex">
                                    {" "}
                                    <img
                                        className="max-w-[100px] max-h-[148px] sm:max-h-[445px] sm:max-w-[300px] ml-auto"
                                        src={rating.moviePoster}
                                        alt={rating.movieName}
                                    />
                                    <div className="flex flex-col">
                                        <div
                                            onClick={() => setDeleting(true)}
                                            className="hover:cursor-pointer bg-red-900 bg-blue-900/20 grow p-1 flex text-white justify-center items-center"
                                        >
                                            <FontAwesomeIcon icon={faEraser} />
                                        </div>
                                        {!disabled && (
                                            <div
                                                onClick={(e) =>
                                                    handleEdit(rating)
                                                }
                                                className="hover:cursor-pointer bg-green-900 p-1 bg-blue-900/20 flex items-center justify-center text-white grow"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPencilAlt}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {disabled && (
                                    <div className="hover:cursor-pointer bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faSpinner} />
                                    </div>
                                )}
                                {deleting && (
                                    <div className="my-1 bg-red-400 p-2 rounded w-full flex items-center">
                                        <div className="w-full flex justify-between">
                                            <div className="flex items-center mr-2">
                                                <span className="mr-2">
                                                    Are you sure you would like
                                                    to remove{" "}
                                                    <span className="font-bold">
                                                        {rating.movieName}
                                                    </span>{" "}
                                                    from your list?
                                                </span>
                                            </div>
                                            <div className="flex gap-2 justify-center flex items-center flex-col sm:flex-row">
                                                <div
                                                    onClick={() =>
                                                        setDeleting(false)
                                                    }
                                                    className="hover:cursor-pointer hover:bg-red-900 bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faX}
                                                    />
                                                </div>
                                                <div
                                                    onClick={deleteMovie}
                                                    className="hover:cursor-pointer hover:bg-green-900 bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default MyCollection;
