import React, { useState, useEffect } from "react";
import Axios, { AxiosError } from "axios";
import DisplayMovies from "./mini-components/DisplayMovies";
import LoadingMany from "./mini-components/LoadingMany";

function MemberList() {
    const [listOfUsers, setListOfUsers] = useState<any>([{}]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get("http://localhost:8080/user-list")
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    setListOfUsers(res.data);
                    // console.log("data: ", res.data);
                    setLoading(false);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);
    return (
        <div className="overflow-y-scroll">
            {loading ? (
                <div>
                    <LoadingMany />
                </div>
            ) : (
                <>
                    {listOfUsers.map((user: any) => {
                        return <DisplayMovies user={user} key={user._id} />;
                    })}
                </>
            )}
        </div>
    );
}

export default MemberList;
