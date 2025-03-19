'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Navigation({ session }) {
	const [mobNav, setMobNav] = useState(false);

	return (
		<>
			{/* Open mobile navigation */}
			<Bars3Icon
				className={`${
					mobNav ? 'hidden' : 'block'
				} z-50 w-10 min-[700px]:hidden`}
				onClick={() => setMobNav(true)}
			/>

			{/* Close mobile navigation */}
			<XMarkIcon
				className={`w-10 relative z-50 ${mobNav ? 'block' : 'hidden'}`}
				onClick={() => setMobNav(false)}
			/>

			<nav
				className={`z-40 text-xl ${
					mobNav ? 'w-[20rem]' : 'w-0'
				} transition-all duration-500  flex justify-center items-center fixed right-0 top-0 bottom-0 ${
					mobNav ? ' bg-black' : ''
				} 
		bg-opacity-90 min-[700px]:w-auto min-[700px]:static min-[700px]:bg-transparent`}
			>
				<ul
					className={`${
						mobNav ? 'opacity-100' : 'opacity-0'
					} flex flex-col gap-16 text-center min-[700px]:flex-row min-[700px]:opacity-100`}
					onClick={() => setMobNav(false)}
				>
					<li>
						<Link
							href='/cabins'
							className='hover:text-accent-400 transition-colors'
						>
							Cabins
						</Link>
					</li>
					<li>
						<Link
							href='/about'
							className='hover:text-accent-400 transition-colors'
						>
							About
						</Link>
					</li>
					<li>
						{session?.user?.image ? (
							<Link
								href='/account'
								className='hover:text-accent-400 transition-colors flex gap-4'
							>
								<img
									className='h-8 rounded-full'
									src={session.user.image}
									alt={session.user.name}
									referrerPolicy='no-referrer'
								/>
								<span>Guest area</span>
							</Link>
						) : (
							<Link
								href='/account'
								className='hover:text-accent-400 transition-colors'
							>
								Guest area
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</>
	);
}
