// app/api/message/route.js
import prisma from '../../lib/prisma';

export async function POST(req) {
  const { name, email, phoneNumber, message } = await req.json();

  try {
    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        phoneNumber,
        message,
      },
    });
    return new Response(JSON.stringify(newMessage), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create message: ' + error }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const messages = await prisma.message.findMany();
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch messages: ' + error }), { status: 500 });
  }
}
