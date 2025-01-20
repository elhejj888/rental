import prisma from '../../lib/prisma';

// Handle GET request
export async function GET(req) {
  const url = new URL(req.url);
  const fromDate = url.searchParams.get('fromDate');
  const toDate = url.searchParams.get('toDate');

  try {
    if (fromDate && toDate) {
      // Validate date inputs
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (isNaN(from.getTime()) || isNaN(to.getTime())) {
        return new Response(
          JSON.stringify({ error: 'Invalid date parameters' }),
          { status: 400 }
        );
      }

      // Fetch cars that are NOT reserved during the provided dates
      const availableCars = await prisma.car.findMany({
        where: {
          OR: [
            {
              reservations: {
                none: {
                  AND: [
                    { dateFrom: { lte: to } },
                    { dateTo: { gte: from } },
                  ],
                },
              },
            },
          ],
        },
        include: { reservations: true },
      });

      return new Response(JSON.stringify(availableCars), { status: 200 });
    }

    // Fetch all reservations if no query parameters are provided
    const reservations = await prisma.reservation.findMany({
      include: { car: true }, // Include associated car data
    });
    return new Response(JSON.stringify(reservations), { status: 200 });
  } catch (error) {
    console.error('Error fetching reservations or cars:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch reservations or cars' }),
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(req) {
  const { carId, dateFrom, dateTo, pickUpTime, returnTime, phoneNumber, name, email, address } = await req.json();

  try {
    const reservation = await prisma.reservation.create({
      data: {
        carId, // Link to the car via foreign key
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
        pickUpTime,
        returnTime,
        phoneNumber,
        name,
        email,
        address,
      },
    });
    return new Response(JSON.stringify(reservation), { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create reservation'+error }),
      { status: 500 }
    );
  }
}
