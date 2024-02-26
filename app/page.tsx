interface Tab {
    term: Term;
    label: string;
}

const TABS: Tab[] = [
    { term: 'short_term', label: 'last month' },
    { term: 'medium_term', label: 'last 6 months' },
    { term: 'long_term', label: 'all time' },
];

export default function Home() {
    return <h2>Welcome Page!</h2>;
}
