// app/api/cars/route.js
import prisma from '../../lib/prisma';

export async function POST(req) {

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

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

export async function GET(req, res) {
  try {

    const cars = await prisma.car.findMany();
    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    console.error('Error fetching reservations:', error); // Log the error message
    return new Response(JSON.stringify({ error: 'Failed to fetch cars'+error }), { status: 500 });
  }
}
