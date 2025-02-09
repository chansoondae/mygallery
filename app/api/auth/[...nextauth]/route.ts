import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    callbacks: {
        async jwt({ token }) {
          token.userRole = "user"
          return token
        },
        // session({ session, token, user }) {
        //   return session // The return type will match the one returned in `useSession()`
        // },
      },
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    })

export { handler as GET, handler as POST }