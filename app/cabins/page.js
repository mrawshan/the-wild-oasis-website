import { Suspense } from 'react';

// Components
import CabinList from '@/app/_components/CabinList';
import Spinner from '@/app/_components/Spinner';
import Filter from '@/app/_components/Filter';
import BookingReminder from '@/app/_components/BookingReminder';

// Incremental Static Regeneration (ISR) fetch data based on the seconds
// Since we are using searchParams this page is already become dynamic so we no longer need revalidate
// export const revalidate = 3600;

// Page Metadata
export const metadata = {
	title: 'Cabins',
};

export default async function Page({ searchParams }) {
	// Steps to share state between client and server from url (searchParams only available in page.js)
	const urlParams = await searchParams;
	const filter = urlParams?.capacity ?? 'all';

	return (
		<div>
			<h1 className='text-4xl mb-5 text-accent-400 font-medium'>
				Our Luxury Cabins
			</h1>
			<p className='text-primary-200 text-lg mb-10'>
				Cozy yet luxurious cabins, located right in the heart of the Italian
				Dolomites. Imagine waking up to beautiful mountain views, spending
				your days exploring the dark forests around, or just relaxing in
				your private hot tub under the stars. Enjoy nature&apos;s beauty in
				your own little home away from home. The perfect spot for a
				peaceful, calm vacation. Welcome to paradise.
			</p>

			{/* Cabin list filter buttons */}
			<div className='flex justify-end mb-8'>
				<Filter />
			</div>

			{/* (Streaming) Using Suspense to show loading indication only for CabinList section when data is loading */}
			<Suspense fallback={<Spinner />} key={filter}>
				<CabinList filter={filter} />
				<BookingReminder />
			</Suspense>
		</div>
	);
}
