'use client';

import { createContext, useContext, useState } from 'react';

// Context (Provider)
const ReservationContext = createContext();

// Initial state
const initialState = { from: undefined, to: undefined };

// 1) Provider component
function ReservationProvider({ children }) {
	const [range, setRange] = useState(initialState);

	// Helper function
	const resetRange = () => setRange(initialState);

	return (
		// 2) Provide value to child components
		<ReservationContext.Provider value={{ range, setRange, resetRange }}>
			{children}
		</ReservationContext.Provider>
	);
}

// Custom corresponding hook (Basicaly to Consum the context value)
function useReservation() {
	const context = useContext(ReservationContext);
	if (context === undefined)
		throw new Error('Context was used outside provider');
	return context;
}

export { ReservationProvider, useReservation };
