'use client';

import { createContext, useContext, useState } from 'react';

// Context (Provider)
const BookingContext = createContext();

// Initial state
const initialState = { from: undefined, to: undefined };

// 1) Provider component
function BookingProvider({ children }) {
	const [range, setRange] = useState(initialState);

	// Helper function
	const resetRange = () => setRange(initialState);

	return (
		// 2) Provide value to child components
		<BookingContext.Provider value={{ range, setRange, resetRange }}>
			{children}
		</BookingContext.Provider>
	);
}

// Custom corresponding hook (Basically to Consume the context value)
function useBooking() {
	const context = useContext(BookingContext);
	if (context === undefined)
		throw new Error('Context was used outside provider');
	return context;
}

export { BookingProvider, useBooking };
