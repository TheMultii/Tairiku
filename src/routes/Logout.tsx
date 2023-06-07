import { useEffect } from "react";
import { logout } from "../helpers/auth_helper";

export default function Logout() {
    useEffect(() => {
        const _logout = async () => await logout();
        _logout();
    }, []);

    return <></>;
}
