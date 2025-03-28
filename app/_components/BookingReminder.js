'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';

// Context API
import { useBooking } from '@/app/_components/BookingContext';

function BookingReminder() {
	// 03) Consuming context value
	const { range, resetRange } = useBooking();

	if (!range.from || !range.to) return null;

	return (
		<div className='fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center max-[800px]:w-full max-[800px]:justify-center'>
			<p>
				<span>👋</span> Don&apos;t forget to reserve your dates <br /> from{' '}
				{format(new Date(range.from), 'MMM dd yyyy')} to{' '}
				{format(new Date(range.to), 'MMM dd yyyy')}
			</p>
			<button
				className='rounded-full p-1 hover:bg-accent-600 transition-all'
				onClick={resetRange}
			>
				<XMarkIcon className='h-5 w-5' />
			</button>
		</div>
	);
}

export default BookingReminder;
