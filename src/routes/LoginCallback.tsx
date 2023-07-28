import { User, UserManager } from "oidc-client";
import { TairikuTokenData, TairikuTokenDataExtended } from "../types";
import { decodeToken } from "../helpers";
import { useEffect } from "react";

export const LoginCallback = () => {
    useEffect(() => {
        const _loginCallback = async () => {
            try {
                const userManager = new UserManager({ response_mode: "query" });
                await userManager.signinCallback();

                const user: User = (await userManager.getUser()) as User,
                    decodedToken = decodeToken(user.access_token);

                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.access_token}`,
                };
                const response = await fetch(
                    "https://api.mganczarczyk.pl/user",
                    {
                        headers,
                    }
                );
                const tairiku_user: TairikuTokenData = JSON.parse(
                    JSON.stringify(user)
                );
                const data = await response.json();
                const tairiku_user_extended: TairikuTokenDataExtended = {
                    ...tairiku_user,
                    tairiku_profile: {
                        bio: data.bio,
                        comments_number: data.comments_number,
                        created_at: data.created_at,
                        posts_number: data.posts_number,
                        tairiku_images: data.tairiku_images,
                    },
                    realm_access: decodedToken.realm_access,
                };

                localStorage.setItem(
                    "tairiku-auth-client",
                    JSON.stringify(tairiku_user_extended)
                );
                window.location.href = "/test";
            } catch (e) {
                console.error(e);
            }
        };
        _loginCallback();
    }, []);

    return <></>;
};
