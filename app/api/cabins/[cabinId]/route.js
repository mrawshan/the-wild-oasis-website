// lib
import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';

// API end point
export async function GET(request, { params }) {
	// Get the cabinId from the params
	const { cabinId } = params;

	// Fetch data
	try {
		const [cabin, bookedDates] = await Promise.all([
			getCabin(cabinId),
			getBookedDatesByCabinId(cabinId),
		]);
		return Response.json({ cabin, bookedDates });
	} catch {
		return Response.json({ message: 'Cabin not foaund' });
	}
}
