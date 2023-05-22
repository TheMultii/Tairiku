export default function Footer() {
    let copyDate = new Date().getFullYear() != 2023 ? `2023 - ${new Date().getFullYear()}` : '2023';

    return (
        <footer class="py-[32px] bg-[#1c1c1c] text-center">
            <h1>Copyright &copy; {copyDate} — <span class="text-[#1ab69d]">Marcel Gańczarczyk</span></h1>
        </footer>
    )
}