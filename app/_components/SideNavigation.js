'use client';

import Link from 'next/link';
import {
	CalendarDaysIcon,
	HomeIcon,
	UserIcon,
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

// Components
import SignOutButton from './SignOutButton';

const navLinks = [
	{
		name: 'Home',
		href: '/account',
		icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
	},
	{
		name: 'Bookings',
		href: '/account/bookings',
		icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
	},
	{
		name: 'Guest profile',
		href: '/account/profile',
		icon: <UserIcon className='h-5 w-5 text-primary-600' />,
	},
];

function SideNavigation() {
	// To highlight the active navigation
	const pathname = usePathname();

	return (
		<nav className='min-[1060px]:border-r border-primary-900'>
			<ul className='flex max-[1059px]:justify-center min-[1060px]:flex-col gap-2 min-[1060px]:h-full text-lg'>
				{navLinks.map((link) => (
					<li key={link.name}>
						<Link
							className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
								pathname === link.href ? 'bg-primary-900' : ''
							} `}
							href={link.href}
						>
							{link.icon}
							<span className='hidden min-[1060px]:block'>
								{link.name}
							</span>
						</Link>
					</li>
				))}

				<li className='min-[1060px]:mt-auto'>
					<SignOutButton />
				</li>
			</ul>
		</nav>
	);
}

export default SideNavigation;
