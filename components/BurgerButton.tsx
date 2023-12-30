import { cn } from '@/lib/utils';

interface BurgerButton {
    isDrawerOpen: boolean;
    handleNav: () => void;
}

const BurgerButton: React.FC<BurgerButton> = ({ isDrawerOpen, handleNav }) => (
    <button
        onClick={handleNav}
        className="relative flex  items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all duration-200"
    >
        <div
            className={cn(
                'flex flex-col justify-between w-[20px] h-[14px] transform transition-all duration-500 origin-center overflow-hidden',
                { '-rotate-180': isDrawerOpen },
            )}
        >
            <div
                className={cn('bg-black h-[2px] w-7 transform transition-all duration-500', {
                    'rotate-45 -translate-x-1 -translate-y-1': isDrawerOpen,
                })}
            ></div>
            <div className="bg-black h-[2px] w-7 rounded transform transition-all duration-500"></div>
            <div
                className={cn('bg-black h-[2px] w-7 transform transition-all duration-500', {
                    '-rotate-45 -translate-x-1 translate-y-1': isDrawerOpen,
                })}
            ></div>
        </div>
    </button>
);

export default BurgerButton;
