'use client';

import { differenceInDays } from 'date-fns';

// To Consume the context value (Custom corresponding hook)
import { useBooking } from '@/app/_components/BookingContext';

// lib
import { createBooking } from '@/app/_lib/actions';

// Components
import SubmitButton from '@/app/_components/SubmitButton';

function BookingForm({ cabin, user }) {
	// 03) Consuming context value
	const { range, resetRange } = useBooking();

	const { maxCapacity, regularPrice, discount, id } = cabin;

	const startDate = range.from;
	const endDate = range.to;

	const numNights = differenceInDays(endDate, startDate);
	const cabinPrice = numNights * (regularPrice - discount);

	// An object with the needed data to pass into the form to consume in the server action
	const bookingData = {
		startDate,
		endDate,
		numNights,
		cabinPrice,
		cabinId: id,
	};

	// Using bind method to pass the bookingData object to the server action createBooking function
	const createBookingWithData = createBooking.bind(null, bookingData);

	return (
		<div className='scale-[1.01]'>
			<div className='bg-primary-800 text-primary-300 px-4 min-[691px]:px-16 py-2 flex justify-between items-center object-contain'>
				<p>Logged in as</p>

				<div className='flex gap-4 items-center'>
					<img
						// Important to display google profile images
						referrerPolicy='no-referrer'
						className='h-8 rounded-full'
						src={user.image}
						alt={user.name}
					/>
					<p>{user.name}</p>
				</div>
			</div>

			<form
				className='bg-primary-900 px-4 py-10 min-[691px]:px-16 text-lg flex gap-5 flex-col h-[24rem]'
				// action={createBookingWithData}
				action={async (formData) => {
					await createBookingWithData(formData);
					resetRange();
				}}
			>
				<div className='space-y-2'>
					<label htmlFor='numGuests'>How many guests?</label>
					<select
						name='numGuests'
						id='numGuests'
						className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
						required
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
						id='observations'
						className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
						placeholder='Any pets, allergies, special requirements, etc.?'
					/>
				</div>

				<div className='flex justify-end items-center gap-6'>
					{!(startDate && endDate) ? (
						<p className='text-primary-300 text-base'>
							Start by selecting dates
						</p>
					) : (
						<SubmitButton
							btnName='Reserve now'
							pendingLabel='Booking...'
						/>
					)}
				</div>
			</form>
		</div>
	);
}

export default BookingForm;
