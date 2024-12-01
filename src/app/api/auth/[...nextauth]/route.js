import { connectDB } from '@/lib/connectDB';
import bcrypt from "bcrypt";
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";


const handler = NextAuth({
  secret: process?.env?.NEXT_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          console.log('Cant find credentials');
          return null;
        }
        const db = await connectDB();
        const currentUser = await db.collection('users').findOne({ email })
        if (!currentUser) {
          console.log('Cant find currentuser');
          return null;
        }

        const passwordMatched = bcrypt.compareSync(password, currentUser?.password)

        if (!passwordMatched) {
          console.log('Password didnt matched');
          return null;
        }
        console.log({ 'currentUser': currentUser });
        return currentUser

      }
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),

    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google' || account.provider === 'github') {
        const { name, email, image } = user;
        try {
          const db = await connectDB();
          const userCollection = db.collection('users')
          const userExist = await userCollection.findOne({ email })
          if (!userExist) {
            const res = await userCollection.insertOne(user);
            return user
          }
          else {
            return user
          }
        }
        catch (err) {
          console.log(err);
        }
      }
      else {
        return user;
      }
    },
  },

  pages: {
    signIn: '/signin'
  }
})

export { handler as GET, handler as POST };