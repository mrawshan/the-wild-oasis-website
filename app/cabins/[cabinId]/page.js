import { Suspense } from 'react';

// lib
import { getCabin, getCabins } from '@/app/_lib/data-service';

// Components
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import Cabin from '@/app/_components/Cabin';

// Generating Dynamic Metadata using generateMetadata function
export async function generateMetadata({ params }) {
	const cabinId = (await params).cabinId;

	const { name } = await getCabin(cabinId);

	return { title: `Cabin ${name}` };
}

// Making dynamic rendering to static rendering using generateStaticParams function
export async function generateStaticParams() {
	// Fetching cabins
	const cabins = await getCabins();

	const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

	return ids;
}

export default async function Page({ params }) {
	// Getting cabinId from params
	const cabinId = (await params).cabinId;

	// Fetching cabin info based on the cabin id
	const cabin = await getCabin(cabinId);

	return (
		<div className='max-w-6xl mx-auto mt-8'>
			<Cabin cabin={cabin} />
			<div>
				<h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
					Reserve {cabin.name} today. Pay on arrival.
				</h2>

				{/* To book a cabin */}
				{/* (Streaming) Using Suspense to show loading indication only for Reservation section when data is loading */}
				<Suspense fallback={<Spinner />}>
					<Reservation cabin={cabin} />
				</Suspense>
			</div>
		</div>
	);
}
