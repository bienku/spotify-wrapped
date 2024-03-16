import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import NotFoundImage from '@/public/not-found.svg';

export default function NotFound() {
    return (
        <main className="text-center">
            <Image src={NotFoundImage} alt="Page Not Found" />
            <h1>No signal here! We cannot find page you are looking for</h1>

            <Button asChild className="mt-2">
                <Link href="/">Go back home</Link>
            </Button>
        </main>
    );
}
