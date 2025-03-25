// Components
import SignInButton from '@/app/_components/SignInButton';

// Page Metadata
export const metadata = {
	title: 'Login',
};

export default function Page() {
	return (
		<div className='h-[450px] '>
			<div className='flex flex-col gap-10 items-center text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'>
				<h2 className='text-3xl font-semibold'>
					Sign in to access your guest area
				</h2>

				<SignInButton />
			</div>
		</div>
	);
}
