// Components
import UpdateProfileForm from '@/app/_components/UpdateProfileForm';
import SelectCountry from '@/app/_components/SelectCountry';

// lib
import { auth } from '@/app/_lib/auth';
import { getGuest } from '@/app/_lib/data-service';

// Page Metadata
export const metadata = {
	title: 'Update profile',
};

export default async function Page() {
	// Getting the guest data
	const session = await auth();
	const guest = await getGuest(session.user.email);

	console.log(guest);

	return (
		<div>
			<h2 className='font-semibold text-2xl text-accent-400 mb-4'>
				Update your guest profile
			</h2>

			<p className='text-lg mb-8 text-primary-200'>
				Providing the following information will make your check-in process
				faster and smoother. See you soon!
			</p>

			{/* Passing server component as a children props to the client component (Important technique)*/}
			<UpdateProfileForm guest={guest}>
				<SelectCountry
					name='nationality'
					id='nationality'
					className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
					defaultCountry={guest.nationality}
				/>
			</UpdateProfileForm>
		</div>
	);
}
