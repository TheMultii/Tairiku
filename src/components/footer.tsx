export const Footer = () => {
    const copyDate =
        new Date().getFullYear() != 2023
            ? `2023 - ${new Date().getFullYear()}`
            : "2023";

    return (
        <footer className="py-8 bg-dark-200 text-center">
            <h1>
                Copyright &copy; {copyDate} —{" "}
                <a href="https://beta.mganczarczyk.pl" className="text-primary">
                    Marcel Gańczarczyk
                </a>
            </h1>
        </footer>
    );
};
