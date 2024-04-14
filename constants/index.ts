export const TABS: Tab[] = [
    { term: 'short_term', label: 'last month' },
    { term: 'medium_term', label: 'last 6 months' },
    { term: 'long_term', label: 'all time' },
];

export const ROUTES = [
    { id: 1, text: 'Home', route: '/' },
    { id: 2, text: 'Music', route: '/music' },
    { id: 3, text: 'Artists', route: '/artists' },
    { id: 4, text: 'Genres', route: '/genres' },
];

export const HERO_TITLES: Record<string, string> = {
    '/': 'Home',
    '/music': 'Most Listened Music',
    '/artists': 'Most Listened Artists',
    '/genres': 'Most Listened Genres',
};
