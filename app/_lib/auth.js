import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// lib
import { createGuest, getGuest } from '@/app/_lib/data-service';

const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	// For middleware authorized
	callbacks: {
		authorized({ auth, request }) {
			return !!auth?.user;
		},
		// To save the user in the database if it's a new user (This sign In method receives 3 parameters)
		async signIn({ user, account, profile }) {
			try {
				const existingGuest = await getGuest(user.email);

				// If it's not an existing user then create
				if (!existingGuest)
					await createGuest({ email: user.email, fullName: user.name });

				return true;
			} catch {
				return false;
			}
		},
		// To get the guestId all over the place like this: (const session = await auth();)
		// In the current session only available name and the email (So we are adding the guestId to the session here)
		async session({ session, user }) {
			const guest = await getGuest(session.user.email);

			// Adding the guest id to the session
			session.user.guestId = guest.id;
			return session;
		},
	},
	// For custom login page
	pages: {
		signIn: '/login',
	},
};

export const {
	auth,
	signIn, // SignIn function
	signOut, // SignOut function
	handlers: { GET, POST },
} = NextAuth(authConfig);
