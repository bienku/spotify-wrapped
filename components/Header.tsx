import Nav from '@/components/Nav';
import HeroTitle from '@/components/HeroTitle';

const Header = () => {
    return (
        <header className="relative w-full h-1/5 bg-cover bg-no-repeat bg-[url('/hero-mobile.jpg')] sm:bg-[url('/hero-desktop.jpg')] xs:max-w-7xl xs:mx-auto xs:rounded-[var(--radius)]">
            <Nav />

            <div className="absolute bottom-0 left-0 right-0 max-w-[975px] mx-auto w-5/6 sm:w-2/3">
                <HeroTitle />
            </div>
        </header>
    );
};

export default Header;
