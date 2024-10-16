// app/api/users/route.js
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';


export async function POST(req) {
  const { phoneNumber, email, username, password, firstName , lastName } = await req.json();
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        phoneNumber,
        email,
        username,
        password : hashedPassword,
        firstName,
        lastName
      },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create user'+error }), { status: 500 });
  }
}
export async function GET(req) {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error); // Log the error message
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}
