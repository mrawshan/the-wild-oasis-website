import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

// Components
import DeleteBooking from './DeleteBooking';

export const formatDistanceFromNow = (dateStr) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	}).replace('about ', '');

function BookingCard({ booking, onDelete }) {
	const {
		id,
		guestId,
		startDate,
		endDate,
		numNights,
		totalPrice,
		numGuests,
		status,
		created_at,
		cabins: { name, image },
	} = booking;

	return (
		<div className='flex max-[800px]:flex-col border border-primary-800 '>
			<div className='relative min-[801px]:h-32 aspect-square'>
				<Image
					src={image}
					alt={`Cabin ${name}`}
					fill
					className='object-cover min-[801px]:border-r border-primary-800'
				/>
			</div>

			<div className='flex-grow max-[590px]:px-2 px-6 py-3 flex flex-col'>
				<div className='flex items-center justify-between'>
					<h3 className='text-xl font-semibold'>
						{numNights} nights in Cabin {name}
					</h3>
					{isPast(new Date(startDate)) ? (
						<span className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
							past
						</span>
					) : (
						<span className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
							upcoming
						</span>
					)}
				</div>

				<p className='text-lg text-primary-300'>
					{format(new Date(startDate), 'EEE, MMM dd yyyy')} (
					{isToday(new Date(startDate))
						? 'Today'
						: formatDistanceFromNow(startDate)}
					) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
				</p>

				<div className='flex max-[590px]:flex-wrap min-[591px]:gap-5 mt-auto items-baseline'>
					<p className='text-xl font-semibold text-accent-400'>
						${totalPrice}
					</p>
					<p className=' text-primary-300 max-[590px]:ml-5 max-[590px]:mr-5'>
						&bull;
					</p>
					<p className='text-lg text-primary-300'>
						{numGuests} guest{numGuests > 1 && 's'}
					</p>
					<p className='ml-auto text-sm text-primary-400 max-[590px]:w-full'>
						Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
					</p>
				</div>
			</div>

			<div className='flex max-[800px]:ml-auto max-[800px]:mb-4 max-[800px]:w-[200px] min-[801px]:flex-col min-[801px]:border-l border-primary-800 w-[100px]'>
				{!isPast(startDate) ? (
					<>
						<Link
							href={`/account/bookings/edit/${id}`}
							className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 min-[801px]:border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
						>
							<PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
							<span className='mt-1'>Edit</span>
						</Link>
						<DeleteBooking bookingId={id} onDelete={onDelete} />
					</>
				) : null}
			</div>
		</div>
	);
}

export default BookingCard;
