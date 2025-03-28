'use client';

import {
	differenceInDays,
	isPast,
	isSameDay,
	isWithinInterval,
} from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

// To Consume the context value (Custom corresponding hook)
import { useBooking } from '@/app/_components/BookingContext';

function isAlreadyBooked(range, datesArr) {
	return (
		range.from &&
		range.to &&
		datesArr.some((date) =>
			isWithinInterval(date, { start: range.from, end: range.to })
		)
	);
}

function DateSelector({ settings, bookedDates, cabin }) {
	// 03) Consuming context value
	const { range, setRange, resetRange } = useBooking();

	// Check if the date is already booked
	const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

	// Data
	const { regularPrice, discount } = cabin;
	const numNights = differenceInDays(range.to, range.from);
	const cabinPrice = numNights * (regularPrice - discount);

	// SETTINGS
	const { minBookingLength, maxBookingLength } = settings;

	return (
		<div className='flex flex-col justify-between'>
			<DayPicker
				className='pt-12 place-self-center min-[1134px]:pr-[0.5rem]'
				mode='range'
				selected={displayRange}
				onSelect={setRange}
				min={minBookingLength + 1}
				max={maxBookingLength}
				captionLayout='dropdown'
				numberOfMonths={2}
				disabled={(curDate) =>
					isPast(curDate) ||
					bookedDates.some((date) => isSameDay(date, curDate))
				}
			/>

			<div
				className={`${range?.from ? 'max-[520px]:h-[200px]' : ''} 
				 text-center min-[521px]:flex items-center justify-between max-[1133px]:rounded-full max-[1133px]:my-5 px-8 bg-accent-500 text-primary-800 h-[50px] min-[521px]:h-[72px] transition-all duration-500`}
			>
				<div className='max-[520px]:pt-2 min-[521px]:flex justify-center items-baseline gap-6'>
					<p className='flex justify-center gap-2 items-baseline max-[520px]:mb-2'>
						{discount > 0 ? (
							<>
								<span className='text-2xl'>
									${regularPrice - discount}
								</span>
								<span className='line-through font-semibold text-primary-700'>
									${regularPrice}
								</span>
							</>
						) : (
							<span className='text-2xl'>${regularPrice}</span>
						)}
						<span>/night</span>
					</p>

					{numNights ? (
						<>
							<p className='bg-accent-600 px-3 py-2 text-2xl max-[520px]:mb-2'>
								<span>&times;</span> <span>{numNights}</span>
							</p>
							<p className='max-[520px]:mb-2'>
								<span className='text-lg font-bold uppercase'>
									Total
								</span>{' '}
								<span className='text-2xl font-semibold'>
									${cabinPrice}
								</span>
							</p>
						</>
					) : null}
				</div>

				{range?.from || range?.to ? (
					<button
						className='border border-primary-800 py-2 px-4 text-sm font-semibold max-[520px]:mb-3'
						onClick={resetRange}
					>
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
}

export default DateSelector;
