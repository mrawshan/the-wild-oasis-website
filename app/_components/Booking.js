// lib
import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import { auth } from '@/app/_lib/auth';

// Components
import DateSelector from '@/app/_components/DateSelector';
import BookingForm from '@/app/_components/BookingForm';
import LoginMessage from '@/app/_components/LoginMessage';

async function Booking({ cabin }) {
	// Fixing blocking waterfall (Multiple fetching)
	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id),
	]);

	// Getting currently login user
	const session = await auth();

	return (
		<div className='grid grid-cols-[auto_auto] border border-primary-800'>
			<DateSelector
				settings={settings}
				bookedDates={bookedDates}
				cabin={cabin}
			/>
			{session?.user ? (
				<BookingForm cabin={cabin} user={session.user} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
}

export default Booking;
