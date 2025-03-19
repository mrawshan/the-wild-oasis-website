// Components
import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

// lib
import { auth } from '@/app/_lib/auth';

async function Header() {
	// Getting currently login user
	const session = await auth();

	return (
		<header className='border-b border-primary-900 px-3 sm:px-8 py-5 max-[699px]:sticky top-0 max-[699px]:bg-black max-[699px]:bg-opacity-30 z-50'>
			<div className='flex justify-between items-center max-w-7xl mx-auto'>
				<Logo />
				<Navigation session={session} />
			</div>
		</header>
	);
}

export default Header;
