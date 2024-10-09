// app/api/cars/route.js
import prisma from '../../lib/prisma';

export async function POST(req) {
  const { name, image, description, price } = await req.json();

  try {
    const car = await prisma.car.create({
      data: {
        name,
        image,
        description,
        price,
      },
    });
    return new Response(JSON.stringify(car), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create car' }), { status: 500 });
  }
}
