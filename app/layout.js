// Components
import Header from '@/app/_components/Header';

// Font
import { Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
	subsets: ['latin'],
	display: 'swap',
});

// Global style
import '@/app/_styles/globals.css';

// Context API
import { ReservationProvider } from '@/app/_components/ReservationContext';

// Metadata
export const metadata = {
	title: {
		template: '%s / The Wild Oasis',
		default: 'Welcome / The Wild Oasis',
	},
	// SEO
	description:
		'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
			>
				<Header />

				<div className='flex-1 px-8 py-12 grid'>
					<main className='max-w-7xl mx-auto w-full'>
						{/* Providing context API to entire client */}
						<ReservationProvider>{children}</ReservationProvider>
					</main>
				</div>
			</body>
		</html>
	);
}
