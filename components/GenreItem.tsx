import { cn } from '@/lib/utils';

interface GenreItem {
    genre: string;
    count: number;
    totalGenresAmount: number;
    index: number;
}

const FIRST_INDEX = 0;
const LAST_INDEX = 19;

const calculatePercentage = (count: number, total: number) => {
    return ((count / total) * 100).toFixed(2);
};

const GenreItem: React.FC<GenreItem> = ({ genre, count, totalGenresAmount, index }) => {
    const percantage = calculatePercentage(count, totalGenresAmount);

    return (
        <div
            className={cn('flex items-center text-sm space-x-4 py-3 hover:bg-muted transition-colors', {
                'rounded-t-sm': index === FIRST_INDEX,
                'rounded-b-sm': index === LAST_INDEX,
            })}
        >
            <p className="text-xs w-6 text-center">{index + 1}</p>

            <div className="grid grid-cols-3 flex-1">
                <p>{genre}</p>
                <p className="text-center">{percantage}%</p>
                <p className="text-right">({count} artists)</p>
            </div>
        </div>
    );
};

export default GenreItem;
