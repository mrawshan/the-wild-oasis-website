'use server';

// lib
import { auth, signIn, signOut } from '@/app/_lib/auth';
import { supabase } from '@/app/_lib/supabase';

// SERVER ACTIONS (BackEnd) //

// Login
export async function signInAction() {
	await signIn('google', { redirectTo: '/account' });
}

// Logout
export async function signOutAction() {
	await signOut({ redirectTo: '/' });
}

// Updating guest
export async function updateGuest(formData) {
	// Authentication and authorization
	const session = await auth();
	if (!session) throw new Error('You must be log in');

	// Getting the form data
	const nationalID = formData.get('nationalID');
	const [nationality, countryFlag] = formData.get('nationality').split('%');

	// Check if the user is providing a valid nationalID
	// (JavaScript regex to check for an alphanumeric string between 6 and 12 characters)
	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
		throw new Error('Please provide a valid national ID');

	const updateData = { nationalID, nationality, countryFlag };

	// Updating the changes in the database
	const { data, error } = await supabase
		.from('guests')
		.update(updateData)
		.eq('id', session.user.guestId);

	if (error) throw new Error('Guest could not be updated');
}
