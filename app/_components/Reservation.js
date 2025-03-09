// lib
import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import { auth } from '@/app/_lib/auth';

// Components
import DateSelector from '@/app/_components/DateSelector';
import ReservationForm from '@/app/_components/ReservationForm';
import LoginMessage from '@/app/_components/LoginMessage';

async function Reservation({ cabin }) {
	// Fixing blocking waterfall (Multiple fetching)
	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id),
	]);

	// Getting currently logedin user
	const session = await auth();

	return (
		<div className='grid grid-cols-[auto_auto] border border-primary-800 min-h-[100px]'>
			<DateSelector
				settings={settings}
				bookedDates={bookedDates}
				cabin={cabin}
			/>
			{session?.user ? (
				<ReservationForm cabin={cabin} user={session.user} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
}

export default Reservation;
