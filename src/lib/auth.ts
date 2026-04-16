import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        // TODO: look up the user in the DB and verify bcrypt hash.
        // Admin accounts must be seeded — never allow self-registration for ADMIN role.
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-expect-error — role is a custom field added via DB lookup
        token.role = user.role ?? "CUSTOMER";
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        // @ts-expect-error — surface role on the session object
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
