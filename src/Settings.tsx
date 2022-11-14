import React, { useState, useEffect } from "react";
import Axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
interface SettingsProps {
    user: any;
    setUser: Function;
    setLoggedIn: Function;
}
function Settings({ user, setUser, setLoggedIn }: SettingsProps) {
    let [success, setSuccess] = useState(false);
    let [pwStepOne, setPwStepOne] = useState(false);
    let [stepOne, setStepOne] = useState(false);
    let [newPw, setNewPw] = useState("");
    let [newPwConfirm, setNewPwConfirm] = useState("");
    let [noMatch, setNoMatch] = useState(false);
    let [err, setErr] = useState(false);
    let [deleteGuest, setDeleteGuest] = useState(false);
    let goHome = () => {
        window.location.replace("http://localhost:3001/");
    };
    let confirmDelete = () => {
        Axios.delete("http://localhost:8080/delete-user", {
            data: {
                user: user,
            },
        })
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                }
                if (res.data === "Nice try!") {
                    setDeleteGuest(true);
                } else {
                    // console.log(res);
                    setUser({});
                    localStorage.clear();
                    setLoggedIn(false);
                    setSuccess(true);
                    setTimeout(goHome, 5000);
                    // MAKE CONFIRMATION
                    // CANT DELETE GUEST ACCOUNT
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    let updatePassword = () => {
        setErr(false);
        Axios.put("http://localhost:8080/update-password", {
            newPw: newPw,
            user: user,
        })
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    console.log(res.data.message);
                    if (res.data.message === "Something went wrong.") {
                        setErr(true);
                    }
                    // setLoggedIn(false);
                    // setSuccess(true);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    let initDelete = () => {
        setStepOne(true);
    };
    let initPw = () => {
        setPwStepOne(true);
    };
    let misclick = () => {
        setStepOne(false);
        setDeleteGuest(false);
    };
    useEffect(() => {
        // setShowErr(false);
        // setShowPwErr(false);
        // setShowUnErr(false);
        if (newPw !== newPwConfirm && newPwConfirm !== "" && newPw !== "") {
            //Show ERR or Disable button
            setNoMatch(true);
        }
        if (newPwConfirm === newPw && newPwConfirm !== "" && newPw !== "") {
            setNoMatch(false);
        }
    }, [newPw, newPwConfirm, err]);
    return (
        <div
            className="flex flex-col justify-center h-full"
            style={{ overflowY: "auto" }}
        >
            {" "}
            {user._id !== undefined &&
            user._id !== null &&
            user._id.length > 5 ? (
                <div className="flex flex-col justify-center h-full">
                    <p className="underline text-3xl text-center my-2">
                        Account Center
                    </p>
                    <div className="flex flex-col mx-auto my-4">
                        <p className="underline text-[gray] text-center">
                            Change Password
                        </p>
                        <button
                            onClick={initPw}
                            className="w-[184px] text-center p-2 border rounded-full border-2 update-pass"
                            disabled
                        >
                            Change Password
                            <FontAwesomeIcon
                                icon={faSquarePen}
                                className=" ml-4"
                                size="lg"
                            />
                        </button>
                    </div>{" "}
                    {pwStepOne && (
                        //  mt-80
                        <div className="bg-neutral-900/90 w-[80%] rounded mx-auto flex flex-col p-9 mt-24 sm:mt-2">
                            <p className="text-white text-lg text-center">
                                Update Password
                            </p>
                            <div className="flex justify-center w-full text-white gap-2 flex-col">
                                <label
                                    htmlFor="New Password"
                                    className="text-center mt-4"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="rounded mx-auto text-black"
                                    onChange={(e) => setNewPw(e.target.value)}
                                />
                                <label
                                    htmlFor="New Password Confirm"
                                    className="text-center mt-4"
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    className="rounded mx-auto text-black"
                                    onChange={(e) =>
                                        setNewPwConfirm(e.target.value)
                                    }
                                />
                                {noMatch && (
                                    <p className="text-[red] text-center">
                                        New password must be the same as new
                                        confirm new password and password must
                                        be at least 6 characters.
                                    </p>
                                )}
                                {err && (
                                    <p className="text-center text-white">
                                        An error occured.
                                    </p>
                                )}
                                <button
                                    onClick={updatePassword}
                                    className="border border-2 rounded px-2 mx-auto"
                                >
                                    Update Password
                                </button>
                                <button
                                    onClick={() => setPwStepOne(false)}
                                    className="border border-2 rounded px-2  mx-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                    {success && (
                        <p className="text-xl text-center text-[red]">
                            Account successfully deleted, redirecting home.
                        </p>
                    )}
                    {deleteGuest && (
                        <p className="text-xl text-center text-[red]">
                            You can't delete the guest account, nice try though!
                        </p>
                    )}
                    {stepOne && (
                        <div className="bg-neutral-900/90 w-[80%] rounded mx-auto flex flex-col p-9 mt-4">
                            <p className="text-[red] text-lg text-center">
                                Are you sure you would like to delete your
                                account?
                            </p>
                            <div className="flex justify-center w-full text-white">
                                <button
                                    onClick={confirmDelete}
                                    className="text-red  border-[transparent] border-2 rounded px-2 hover:border-[red]"
                                >
                                    Delete it
                                </button>
                                <button
                                    onClick={misclick}
                                    className="text-red  border-[transparent] border-2 rounded px-2 hover:border-[green]"
                                >
                                    No, I misclicked!
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col mx-auto my-4">
                        <p className="underline text-[gray] text-center">
                            Delete Account
                        </p>
                        <button
                            className="w-[184px] text-center p-2 border rounded-full border-2"
                            onClick={initDelete}
                        >
                            Delete Account
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="text-[red] ml-4"
                                size="lg"
                            />
                        </button>
                    </div>
                    <p className="underline text-3xl text-center  my-4">
                        Contact
                    </p>
                    <p className="underline text-[gray] text-center">Email</p>
                    <p className="w-[184px] text-center mx-auto my-2 p-2 border rounded-full border-2">
                        xjoey96@gmail.com
                    </p>
                    <p className="underline text-[gray] text-center">Name</p>
                    <p className="w-[184px] text-center mx-auto my-2 p-2 border rounded-full border-2">
                        Joey Dalrymple
                    </p>
                    <div className="flex justify-evenly mt-auto bg-slate-900/90">
                        <div className="text-white flex justify-center hover:bg-white rounded-full p-2 hover:text-[#242930] flex mx-auto my-2">
                            <a
                                href="https://github.com/Joey-Red"
                                target="blank"
                                className="flex justify-center"
                            >
                                <FontAwesomeIcon
                                    icon={faGithub}
                                    size="2xl"
                                    className="flex justify-center my-auto"
                                />
                            </a>
                        </div>
                        <div className="text-white hover:scale-125 hover:text-[#0A66C2] p-2 flex justify-center align-center my-auto mx-auto">
                            <a
                                href="https://www.linkedin.com/in/joey-dalrymple/"
                                target="blank"
                            >
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    size="2xl"
                                    className="my-auto flex"
                                />
                            </a>
                        </div>
                        <div className="hover:scale-125 hover:text-[#1E9BF0] p-2 flex justify-center text-white align-center my-auto mx-auto">
                            <a
                                href="https://twitter.com/JoeyDalrymple_"
                                target="blank"
                            >
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    size="2xl"
                                    className=" my-auto flex"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-3xl text-center mb-auto mt-4">
                    You must sign in if you would like to update your account.
                </p>
            )}
        </div>
    );
}

export default Settings;
