'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// lib
import { auth, signIn, signOut } from '@/app/_lib/auth';
import { supabase } from '@/app/_lib/supabase';
import { getBookings } from '@/app/_lib/data-service';

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
	if (!session) throw new Error('You must be logged in');

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

	// clearing the caching
	revalidatePath('/account/profile');
}

// Create bookings
export async function createBooking(bookingData, formData) {
	// Authentication
	const session = await auth();
	if (!session) throw new Error('You must be logged in');

	const newBooking = {
		...bookingData,
		guestId: session.user.guestId,
		numGuests: +formData.get('numGuests'),
		observations: formData.get('observations').slice(0, 1000),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: 'unconfirmed',
	};

	// Create in the database
	const { error } = await supabase.from('bookings').insert([newBooking]);

	if (error) throw new Error('Booking could not be created');

	// Clearing the caching to update the UI
	revalidatePath(`cabins/${bookingData.cabinId}`);

	// Redirect to the bookings
	redirect('/cabins/thankyou');
}

// Update booking
export async function updateBooking(formData) {
	// Authentication
	const session = await auth();
	if (!session) throw new Error('You must be logged in');

	// Getting the booking id
	const bookingId = +formData.get('bookingId');

	// Fields to be updated
	const updateData = {
		numGuests: +formData.get('numGuests'),
		observations: formData.get('observations').slice(0, 1000),
	};

	// Extra protection (Authorization) (To make users can update only their own booking)
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingIds.includes(bookingId))
		throw new Error('You are not allowed to update this booking');

	// Updating the changes in the database
	const { data, error } = await supabase
		.from('bookings')
		.update(updateData)
		.eq('id', bookingId)
		.select()
		.single();

	if (error) throw new Error('Booking could not be updated');

	// Clearing the caching to update the UI
	revalidatePath('/account/bookings');

	// Redirect to the bookings
	redirect('/account/bookings');
}

// Delete booking
export async function deleteBooking(bookingId) {
	// Authentication
	const session = await auth();
	if (!session) throw new Error('You must be logged in');

	// Extra protection (Authorization) (To make users can delete only their own booking)
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingIds.includes(bookingId))
		throw new Error('You are not allowed to delete this booking');

	// Deleting in the database
	const { error } = await supabase
		.from('bookings')
		.delete()
		.eq('id', bookingId);

	if (error) throw new Error('Booking could not be deleted');

	// clearing the caching to update the UI
	revalidatePath('/account/bookings');
}
