import { useState, useEffect, useRef } from "react";
import Axios, { AxiosError } from "axios";

interface RegisterProps {
    setShowRegister: Function;
    setShowLogIn: Function;
    setLoggedIn: Function;
    setUser: Function;
}
function Register({
    setShowRegister,
    setShowLogIn,
    setLoggedIn,
    setUser,
}: RegisterProps) {
    let [usernameField, setUsernameField] = useState("");
    let [passwordField, setPasswordField] = useState("");
    let [passwordConfirmField, setPasswordConfirmField] = useState("");
    let [noMatch, setNoMatch] = useState(true);
    let [showErr, setShowErr] = useState(false);
    let [showPwErr, setShowPwErr] = useState(false);
    let [showUnErr, setShowUnErr] = useState(false);

    let handleLogIn = () => {
        setShowRegister(false);
        setShowLogIn(true);
    };
    useEffect(() => {
        setShowErr(false);
        setShowPwErr(false);
        setShowUnErr(false);
        if (usernameField === "") {
            setNoMatch(true);
        }
        if (
            passwordConfirmField !== passwordField &&
            passwordConfirmField !== "" &&
            passwordField !== ""
        ) {
            //Show ERR or Disable button
            setNoMatch(true);
        }
        if (
            passwordConfirmField === passwordField &&
            passwordConfirmField !== "" &&
            passwordField !== "" &&
            usernameField !== ""
        ) {
            setNoMatch(false);
        }
    }, [usernameField, passwordField, passwordConfirmField]);
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
    // Sign Up
    const signUp = () => {
        Axios.post("http://localhost:8080/sign-up", {
            username: usernameField,
            password: passwordField,
        })
            .then((res: any) => {
                // What to do after sign up has been posted?
                // setCurrentUser(res.data.user.username);
                // localStorage.setItem("token", res.data.token);
                // localStorage.setItem("user", res.data.user.username);
                // window.location.href = "/createPost";
                if (res.data === "Username taken.") {
                    return setShowErr(true);
                }
                if (res.data === "Password too short.") {
                    return setShowPwErr(true);
                }
                if (res.data === "Username doesn't meet requirements.") {
                    return setShowUnErr(true);
                }
                setLoggedIn(true);
                setUser(res.data);
                // store the user in localStorage
                // localStorage.setItem("user", res);
                let stringData = JSON.stringify(res.data);
                localStorage.setItem("user", stringData);
                // console.log(res.data);
                setShowRegister(false);
                // window.location.replace("http://localhost:3001/");
            })
            .catch(function (error: AxiosError | string | object | any) {
                if (
                    error.response.status === 400 ||
                    error.response.status === 403 ||
                    error.response.status === 401
                ) {
                    console.log(error);
                }
            });
    };
    return (
        <div className="bg-slate-900/40 absolute top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center">
            {/* max-w-screen-lg */}
            {/* h-1/2 top-1/4 absolute left-1/4 right-1/4 */}
            <div
                ref={wrapperRef}
                className="bg-white z-40 justify-center items-center flex h-2/3 max-h-[800px] w-full max-w-screen-lg rounded border border-black"
            >
                <div className="flex items-center flex-col">
                    <p className="text-lg">Sign up</p>
                    {showErr && (
                        <div className="bg-red-400/80 p-2 m-2 rounded">
                            Username taken.
                        </div>
                    )}
                    {showPwErr && (
                        <div className="bg-red-400/80 p-2 m-2 rounded">
                            Password must be at least 6 characters.
                        </div>
                    )}
                    {showUnErr && (
                        <div className="bg-red-400/80 p-2 m-2 rounded">
                            Username must be 3 to 20 characters.
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="border rounded p-2 mt-2"
                        onChange={(e) =>
                            setPasswordConfirmField(e.target.value)
                        }
                    />

                    <button
                        disabled={noMatch}
                        className="border rounded px-2 mt-2"
                        onClick={signUp}
                    >
                        Submit
                    </button>
                    <div className="pt-3">
                        <ul>
                            <li>Username must be 3-20 characters.</li>
                            <li>Passwords must match and be 6+ characters.</li>
                        </ul>
                    </div>
                    <p className="p-2">
                        Already have an account?{" "}
                        <span className="underline">
                            <button onClick={handleLogIn}>Sign In.</button>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
