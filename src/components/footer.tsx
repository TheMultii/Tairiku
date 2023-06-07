export default function Footer() {
    const copyDate =
        new Date().getFullYear() != 2023
            ? `2023 - ${new Date().getFullYear()}`
            : "2023";

    return (
        <footer className="py-[32px] bg-[#1c1c1c] text-center">
            <h1>
                Copyright &copy; {copyDate} —{" "}
                <span className="text-[#1ab69d]">Marcel Gańczarczyk</span>
            </h1>
        </footer>
    );
}
