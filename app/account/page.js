// lib
import { auth } from '@/app/_lib/auth';

// Page Metadata
export const metadata = {
	title: 'Guest area',
};

export default async function Page() {
	// Getting currently logedin user
	const session = await auth();
	const firstName = session.user.name.split(' ').at(0);

	return (
		<h2 className='font-semibold text-2xl text-accent-400 mb-7'>
			Welcome, {firstName}
		</h2>
	);
}
