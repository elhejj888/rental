// app/api/reservations/route.js
import prisma from '../../lib/prisma';

// Handle POST request
export async function POST(req) {
  const { carType, carModel, dateFrom, dateTo, pickUpTime, returnTime, phoneNumber, name, email } = await req.json();

  try {
    const reservation = await prisma.reservation.create({
      data: {
        carType,
        carModel,
        dateFrom : new Date(dateFrom), // Ensure these are properly formatted
        dateTo : new Date(dateTo),   // Ensure these are properly formatted
        date: new Date().toISOString(),
        pickUpTime,
        returnTime,
        phoneNumber,
        name,
        email,
      },
    });
    return new Response(JSON.stringify(reservation), { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error); // Log the error message
    return new Response(JSON.stringify({ error: 'Failed to create reservation' }), { status: 500 });
  }
}

// Handle GET request
export async function GET(req) {
  try {
    const reservations = await prisma.reservation.findMany();
    return new Response(JSON.stringify(reservations), { status: 200 });
  } catch (error) {
    console.error('Error fetching reservations:', error); // Log the error message
    return new Response(JSON.stringify({ error: 'Failed to fetch reservations' }), { status: 500 });
  }
}
