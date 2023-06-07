import { useEffect } from "react";
import { login } from "../helpers/auth_helper";

export default function Login() {
    useEffect(() => {
        const _login = async () => await login();
        _login();
    }, []);

    return <></>;
}
