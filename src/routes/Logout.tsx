import { onMount } from "solid-js";
import { logout } from "../helpers/auth_helper";

export default function Logout() {
    onMount(async () => {
        await logout();
    });

    return (<></>);
}