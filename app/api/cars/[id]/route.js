import prisma from '../../../lib/prisma';

// Fetch a car by ID (GET)
export async function GET(req, { params }) {
  const { id } = params;
  
  try {
    const car = await prisma.car.findUnique({
      where: { id: parseInt(id) },
    });

    if (!car) {
      return new Response(JSON.stringify({ error: 'Car not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch car: ' + error }), { status: 500 });
  }
}

// Update a car by ID (PUT)
export async function PUT(req, { params }) {
  const { id } = params;
  const { name, image, modele, marque, year, price } = await req.json();

  const yearInt = parseInt(year);
  const priceFloat = parseFloat(price);
  
  try {
    const updatedCar = await prisma.car.update({
      where: { id: parseInt(id) },
      data: {
        name,
        image,
        modele,
        marque,
        year: yearInt,
        price: priceFloat,
      },
    });

    return new Response(JSON.stringify(updatedCar), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update car: ' + error }), { status: 500 });
  }
}

// Delete a car by ID (DELETE)
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedCar = await prisma.car.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify(deletedCar), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete car: ' + error }), { status: 500 });
  }
}
