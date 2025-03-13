import Link from 'next/link';

// Components
import BookingList from '@/app/_components/BookingList';

// lib
import { getBookings } from '@/app/_lib/data-service';
import { auth } from '@/app/_lib/auth';

// Page Metadata
export const metadata = {
	title: 'Bookings',
};

export default async function Page() {
	// Getting the guestID
	const session = await auth();

	// Getting the bookings
	const bookings = await getBookings(session.user.guestId);

	return (
		<div>
			<h2 className='font-semibold text-2xl text-accent-400 mb-7'>
				Your bookings
			</h2>

			{bookings.length === 0 ? (
				<p className='text-lg'>
					You have no bookings yet. Check out our{' '}
					<Link className='underline text-accent-500' href='/cabins'>
						luxury cabins &rarr;
					</Link>
				</p>
			) : (
				<BookingList bookings={bookings} />
			)}
		</div>
	);
}
