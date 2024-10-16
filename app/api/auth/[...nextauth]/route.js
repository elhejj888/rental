import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma"; // prisma client setup here
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "john@example.com" },
        password: { label: "Password", type: "password", placeholder: "********" },
      },
      async authorize(credentials) {
        // Fetch the user by username
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        // If user exists and password matches, return the user object with all fields
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: user.lastName,
          }; // Include all user properties here
        } else {
          // Throw an error if authentication fails
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/auth/signout",
    error: "/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in
  },
  session: {
    strategy: "jwt", // Using JWT for session
  },
  callbacks: {
    // Add all user fields to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.phoneNumber = user.phoneNumber;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    // Add the user fields from the JWT token to the session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.phoneNumber = token.phoneNumber;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
