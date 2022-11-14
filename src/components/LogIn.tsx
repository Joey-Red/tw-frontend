import React, { useState, useEffect, useRef } from "react";
import Axios, { AxiosError } from "axios";

interface logInProps {
    setShowRegister: Function;
    setShowLogIn: Function;
    setLoggedIn: Function;
    setUser: Function;
    setSidebar: Function;
}
function LogIn({
    setShowRegister,
    setShowLogIn,
    setLoggedIn,
    setUser,
    setSidebar,
}: logInProps) {
    let [usernameField, setUsernameField] = useState("");
    let [passwordField, setPasswordField] = useState("");
    let [showErr, setShowErr] = useState(false);
    let handleRegister = () => {
        setShowRegister(true);
        setShowLogIn(false);
    };
    useEffect(() => {
        setShowErr(false);
    }, [usernameField, passwordField]);

    const logIn = () => {
        Axios.post("https://cyan-alive-pangolin.cyclic.app/log-in", {
            username: usernameField,
            password: passwordField,
        })
            .then((res: any) => {
                if (res.status === 200) {
                    setLoggedIn(true);
                    setUser(res.data);
                    // store the user in localStorage
                    let stringData = JSON.stringify(res.data);
                    localStorage.setItem("user", stringData);
                    setShowLogIn(false);
                }
            })
            .catch(function (error: AxiosError | string | object | any) {
                if (
                    error.response.status === 400 ||
                    error.response.status === 403 ||
                    error.response.status === 401
                ) {
                    setShowErr(true);
                    console.log(error);
                }
            });
    };
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowLogIn(false);
                    setShowRegister(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <div className="bg-slate-900/40 absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center">
            <div
                ref={wrapperRef}
                className="bg-white z-40 justify-center items-center flex h-1/2 w-full max-w-screen-lg rounded border border-black"
            >
                <div className="flex items-center flex-col ">
                    <p className="text-lg">Sign in</p>
                    {showErr && (
                        <div className="bg-red-400/80 p-2 m-2 rounded">
                            Username or Password is Incorrect.
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Username"
                        className="border rounded p-2"
                        onChange={(e) => setUsernameField(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border rounded p-2 mt-2"
                        onChange={(e) => setPasswordField(e.target.value)}
                    />
                    <button
                        className="border rounded px-2 mt-2"
                        onClick={logIn}
                    >
                        Submit
                    </button>
                    <p className="p-2">
                        Don't have an account?{" "}
                        <span className="underline">
                            {" "}
                            <button onClick={handleRegister}>Register.</button>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
