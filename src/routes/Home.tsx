export default function Home() {
    return (
        <>
            <header class="relative w-full h-screen max-h-screen overflow-hidden before:content-[''] before:absolute before:h-screen before:w-full before:max-h-screen before:z-2 before:bg-[rgba(0,0,0,.7)]">
                <div class="table absolute top-0 left-0 w-full h-full">
                    <div class="table-cell align-middle">
                        <h1 class="font-[Oswald] not-italic font-normal text-sm text-center uppercase text-white">Marcel Gańczarczyk</h1>
                        <div class="w-full h-[20px]" />
                        <h1 class="text-[65px] sm:text-[85px] md:text-[115px] pointer-events-none select-none tracking-[-0.02em] mx-auto mt-[-10px] mb-[-4px] md:mt-[-14px] md:mb-[-5px] leading-[100%] relative not-italic font-bold text-center uppercase text-white w-full">TAIRIKU</h1>
                        <div class="w-full h-[20px]" />
                    </div>
                </div>
                <div class="z-[500] absolute bottom-[50px] left-[50%] -translate-x-1/2 translate-y-1/2">
                    <div class="absolute w-px h-full left-0 right-0 ml-auto mr-auto opacity-100 visible transition-all duration-[.7s]">
                        <div class="block w-px h-12 before:content-[''] before:block before:w-px before:top-0 before:bg-white before:h-[50%] scroll-animation"></div>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1553880607-dbed5f97aba4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1885&q=80" class="bg-img z-[-1] pointer-events-none absolute top-0 left-0 w-full h-screen max-h-screen overflow-hidden object-cover object-[center_45%]" alt="" />
            </header>
        </>
    );
}