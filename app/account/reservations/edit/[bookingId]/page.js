// lib
import { updateBooking } from '@/app/_lib/actions';
import { getBooking, getCabin } from '@/app/_lib/data-service';

// Components
import SubmitButton from '@/app/_components/SubmitButton';

// Page Metadata
export const metadata = {
	title: 'Edit reservation',
};

export default async function Page({ params }) {
	// Getting the booking id
	const bookingId = (await params).bookingId;

	// Gettting the booking
	const { numGuests, observations, cabinId } = await getBooking(bookingId);

	// Getting the cabin
	const { maxCapacity } = await getCabin(cabinId);

	return (
		<div>
			<h2 className='font-semibold text-2xl text-accent-400 mb-7'>
				Edit Reservation #{bookingId}
			</h2>

			<form
				action={updateBooking}
				className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
			>
				{/* Hidden input for bookingId */}
				<input type='hidden' name='bookingId' value={bookingId} />

				<div className='space-y-2'>
					<label htmlFor='numGuests'>How many guests?</label>
					<select
						name='numGuests'
						id='numGuests'
						className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
						required
						defaultValue={numGuests}
						key={numGuests}
					>
						<option value='' key=''>
							Select number of guests...
						</option>
						{Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
							(x) => (
								<option value={x} key={x}>
									{x} {x === 1 ? 'guest' : 'guests'}
								</option>
							)
						)}
					</select>
				</div>

				<div className='space-y-2'>
					<label htmlFor='observations'>
						Anything we should know about your stay?
					</label>
					<textarea
						name='observations'
						className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
						defaultValue={observations}
						key={observations}
					/>
				</div>

				<div className='flex justify-end items-center gap-6'>
					<SubmitButton
						btnName='Update reservation'
						pendingLabel='Updating...'
					/>
				</div>
			</form>
		</div>
	);
}
