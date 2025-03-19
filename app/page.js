import Image from 'next/image';
import Link from 'next/link';

// public
import bg from '/public/bg.png';

export default function Page() {
	return (
		<main className='h-[450px]'>
			<Image
				src={bg}
				fill
				placeholder='blur'
				quality={80}
				className='object-cover object-top'
				alt='Mountains and forests with two cabins'
			/>

			<div className='z-10 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'>
				<h1 className='text-6xl text-primary-50 mb-10 tracking-tight font-normal lg:text-8xl'>
					Welcome to paradise.
				</h1>

				<Link
					href='/cabins'
					className='bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all'
				>
					Explore luxury cabins
				</Link>
			</div>
		</main>
	);
}
