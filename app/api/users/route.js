// app/api/users/route.js
import prisma from '../../lib/prisma';

export async function POST(req) {
  const { phoneNumber, email, username, password } = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        phoneNumber,
        email,
        username,
        password,
      },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
}
