import Nav from '@/components/Nav';

export default function Home() {
    return (
        <div className="max-h-screen h-screen xs:p-2 md:p-3">
            <div className="w-full h-1/5 bg-cover bg-no-repeat bg-[url('/hero-mobile.jpg')] sm:bg-[url('/hero-desktop.jpg')] xs:max-w-7xl xs:mx-auto xs:rounded-[var(--radius)]">
                <Nav />
            </div>
        </div>
    );
}
