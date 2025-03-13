'use client';

import { useOptimistic } from 'react';

// lib
import { deleteBooking } from '@/app/_lib/actions';

// Components
import BookingCard from '@/app/_components/BookingCard';

function BookingList({ bookings }) {
	// Using useOptimistic hook to delete the bookings immediately when user clicked on the delete btn
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(curBookings, bookingId) => {
			return curBookings.filter((booking) => booking.id !== bookingId);
		}
	);

	// Trigger async operation that will be running in the background
	async function handleDelete(bookingId) {
		optimisticDelete(bookingId); // To remove from the UI
		await deleteBooking(bookingId); // To remove in the database
	}

	return (
		<ul className='space-y-6'>
			{optimisticBookings.map((booking) => (
				<BookingCard
					booking={booking}
					key={booking.id}
					onDelete={handleDelete}
				/>
			))}
		</ul>
	);
}

export default BookingList;
