import React, { useState, useEffect } from "react";
import Axios from "axios";
import DisplayMovies from "./mini-components/DisplayMovies";
import LoadingMany from "./mini-components/LoadingMany";

function MemberList() {
    const [listOfUsers, setListOfUsers] = useState<any>([{}]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get("https://cyan-alive-pangolin.cyclic.app/user-list")
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    setListOfUsers(res.data);
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
