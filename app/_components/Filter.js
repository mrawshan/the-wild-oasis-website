'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {
	const searchParams = useSearchParams(); // Getting the current url
	const router = useRouter(); // To replace the url in the url bar
	const pathname = usePathname(); // Getting the url path name

	// Getting the current url value to mark the active filter btn
	const activeFilter = searchParams.get('capacity') ?? 'all';

	// Handle filter function
	function handleFilter(filter) {
		// setting the data into the url
		const params = new URLSearchParams(searchParams); // Using web API searchparams
		params.set('capacity', filter); // Set the url internally
		router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // Replacing the url
	}

	return (
		<div className='border border-primary-700 flex'>
			<Button
				filter='all'
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				All cabins
			</Button>

			<Button
				filter='small'
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				1&mdash;3 guests
			</Button>

			<Button
				filter='medium'
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				4&mdash;7 guests
			</Button>

			<Button
				filter='large'
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				8&mdash;12 guests
			</Button>
		</div>
	);
}

// Button component
function Button({ filter, handleFilter, activeFilter, children }) {
	return (
		<button
			className={`px-2 text-xs sm:text-base  sm:px-5 py-2 hover:bg-primary-700 ${
				filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
			}`}
			onClick={() => handleFilter(filter)}
		>
			{children}
		</button>
	);
}

export default Filter;
