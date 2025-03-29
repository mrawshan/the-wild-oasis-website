import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

// Components
import TextExpander from '@/app/_components/TextExpander';

function Cabin({ cabin }) {
	const { id, name, maxCapacity, regularPrice, discount, image, description } =
		cabin;

	return (
		<div className='grid grid-cols-1 min-[901px]:grid-cols-[3fr_4fr] gap-10 min-[901px]:gap-20 border border-primary-800 py-3 px-4 min-[901px]:px-10 mb-24'>
			<div className='relative max-[900px]:border border-accent-400 h-[500px] min-[901px]:h-auto min-[901px]:scale-[1.15] min-[901px]:-translate-x-3'>
				<Image
					src={image}
					alt={`Cabin ${name}`}
					fill
					className='object-cover'
				/>
			</div>

			<div>
				<h3 className='text-accent-100 max-[400px]:text-5xl w-fit font-black text-7xl mb-5 min-[901px]:translate-x-[-254px] bg-primary-950 min-[901px]:p-6 pb-1 min-[901px]:w-[400px]'>
					Cabin {name}
				</h3>

				<p className='text-lg text-primary-300 mb-10 text-justify'>
					<TextExpander>{description}</TextExpander>
				</p>

				<ul className='flex flex-col gap-4 mb-7'>
					<li className='flex gap-3 items-center'>
						<UsersIcon className='h-5 w-5 text-primary-600' />
						<span className='text-lg'>
							For up to <span className='font-bold'>{maxCapacity}</span>{' '}
							guests
						</span>
					</li>
					<li className='flex gap-3 items-center'>
						<MapPinIcon className='h-5 w-5 text-primary-600' />
						<span className='text-lg'>
							Located in the heart of the{' '}
							<span className='font-bold'>Dolomites</span> (Italy)
						</span>
					</li>
					<li className='flex gap-3 items-center'>
						<EyeSlashIcon className='h-5 w-5 text-primary-600' />
						<span className='text-lg'>
							Privacy <span className='font-bold'>100%</span> guaranteed
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Cabin;
