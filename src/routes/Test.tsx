import { createSignal, onMount } from "solid-js";
import TairikuTokenDataExtended from "../interfaces/TairikuTokenDataExtended";

export default function Test() {
  const [user, setUser] = createSignal<TairikuTokenDataExtended | null>(null);

  onMount(async () => {
    const access_token = localStorage.getItem("tairiku-auth-client");

    if (access_token) {
      setUser(JSON.parse(access_token) as TairikuTokenDataExtended);
    }
  });

  return (
    <div>
      <h1>
        Logged in as{" "}
        {user() !== null ? user()?.profile.preferred_username : "nobody"}
      </h1>
      <h2>Token: {user() !== null ? user()?.access_token : ""}</h2>
      <h3>Permissions: {user() !== null ? user()?.realm_access.roles.map((e, _) => {
        return `${e}, `;
      }) : "/"}</h3>
    </div>
  );
}
