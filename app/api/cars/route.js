// app/api/cars/route.js
import prisma from '../../lib/prisma';

export async function POST(req) {

  const { name, image, modele, marque, year, price } = await req.json();

  const yearInt = parseInt(year);
  const priceFloat = parseFloat(price);
  try {
    const car = await prisma.car.create({
      data: {
        name,
        image,
        modele,
        marque,
        year : yearInt,
        price : priceFloat,
      },
    });
    return new Response(JSON.stringify(car), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create car'+error }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const fromDate = url.searchParams.get('dateFrom');
    const toDate = url.searchParams.get('dateTo');

    if (fromDate && toDate) {
      // Validate date inputs
      const from = new Date(fromDate);
      const to = new Date(toDate);
      console.log("from :",from);
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
    } else {
      // Fetch all cars if no date parameters are provided
      const cars = await prisma.car.findMany();
      return new Response(JSON.stringify(cars), { status: 201 });
    }
  } catch (error) {
    console.error('Error fetching cars:', error); // Log the error message
    return new Response(JSON.stringify({ error: 'Failed to fetch cars' + error }), { status: 500 });
  }
}

