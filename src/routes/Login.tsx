import { onMount } from "solid-js";
import { login } from "../helpers/auth_helper";

export default function Login() {
    onMount(async () => {
        await login();
    });

    return (<></>);
}