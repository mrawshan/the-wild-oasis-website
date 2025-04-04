import { unstable_noStore as noStore } from 'next/cache';

// Components
import CabinCard from '@/app/_components/CabinCard';

// lib
import { getCabins } from '@/app/_lib/data-service';

async function CabinList({ filter }) {
	// Component base opt out data cache (PARTIAL PRE-RENDERING (PPR))
	// noStore();

	// Fetching cabins
	const cabins = await getCabins();

	if (!cabins.length) return null;

	// To filter cabins based on the capacity
	let displayCabins;

	if (filter === 'all') displayCabins = cabins;
	if (filter === 'small')
		displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
	if (filter === 'medium')
		displayCabins = cabins.filter(
			(cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
		);
	if (filter === 'large')
		displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
			{displayCabins.map((cabin) => (
				<CabinCard cabin={cabin} key={cabin.id} />
			))}
		</div>
	);
}

export default CabinList;
