'use client';

import { useFormStatus } from 'react-dom';

// New component to place the useFormStatus Hook (To show the loading indication on the btn when submiting the form)
export default function SubmitButton({ btnName, pendingLabel }) {
	console.log(btnName);

	const { pending } = useFormStatus();

	return (
		<button
			className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
			disabled={pending}
		>
			{pending ? pendingLabel : btnName}
		</button>
	);
}
