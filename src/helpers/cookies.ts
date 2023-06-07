export function setCookie(
    name: string,
    value: string,
    expireDate: Date | undefined
) {
    const expires = expireDate ? "; expires=" + expireDate.toUTCString() : "";
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function eraseCookie(name: string) {
    document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
