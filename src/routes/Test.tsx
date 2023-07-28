import { useEffect, useState } from "react";
import { TairikuTokenDataExtended } from "../types";
import { Link } from "react-router-dom";

export const Test = () => {
    const [user, setUser] = useState<TairikuTokenDataExtended>();

    useEffect(() => {
        const _test = async () => {
            const access_token = localStorage.getItem("tairiku-auth-client");

            if (access_token) {
                setUser(JSON.parse(access_token) as TairikuTokenDataExtended);
            }
        };
        _test();
    }, []);

    return (
        <Link to="/">
            <h1>
                Logged in as{" "}
                {user ? user?.profile.preferred_username : "nobody"}
            </h1>
            <h2>Token: {user ? user?.access_token : ""}</h2>
            <h3>
                Permissions:{" "}
                {user
                    ? user?.realm_access.roles.map((e, _) => {
                          return `${e}, `;
                      })
                    : "/"}
            </h3>
        </Link>
    );
};
