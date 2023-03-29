import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import nodemailer from "nodemailer";
import { PostHog } from "posthog-node";
import rn from "random-number";
import { prisma } from "@wove/db";

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      name: string | null | undefined;
      firstName: string | null | undefined;
      lastName: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const options = {
  min: 100000,
  max: 999999,
  integer: true,
};
const client = new PostHog(
  process.env.POSTHOG_WRITE_KEY ||
    "phc_9yYkSdiIwH0w5oanfV9S5jefyBeCblGlNKF0sQ4H9bf",
  { host: "https://app.posthog.com" }, // You can omit this line if using PostHog Cloud
);

// Email HTML body
function html({ email, token }: Record<"url" | "email" | "token", string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;

  // Some simple styling options
  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>Welcome to Playground</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        You're currently signing in as <strong>${escapedEmail}</strong>. <br/>Your one-time login code is: ${token}
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ token }: Record<"token", string>) {
  return `<br/>Your one-time login code is: ${token}`;
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.name = user.name;
      session.user.firstName = user.name?.split(" ")[0];
      session.user.lastName = user.name?.split(" ")[1];
      session.user.email = user.email;
      session.user.image = user.image;
      return session;
    },
  },
  events: {
    async signIn(message) {
      client.identify({
        distinctId: message.user.id,
        properties: {
          email: message.user.email,
          name: message.user.name,
        },
      });
      if (message.isNewUser) {
        client.capture({
          distinctId: message.user.id,
          event: "account created",
          properties: {
            email: message.user.email,
            name: message.user.name,
          },
        });
        // Create a new Team for the user
        const team = await prisma.team.create({
          data: {
            name: "Personal Space",
            owner: { connect: { id: message.user.id } },
          },
        });
        // Create a new TeamMembership for the user
        await prisma.teamMember.create({
          data: {
            team: { connect: { id: team.id } },
            user: { connect: { id: message.user.id } },
            isAdmin: true,
          },
        });
      } else {
        client.capture({
          distinctId: message.user.id,
          event: "account logged in",
          properties: {
            email: message.user.email,
            name: message.user.name,
          },
        });
      }
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
    EmailProvider({
      server: process.env.POSTMARK_EMAIL_SERVER,
      from: process.env.POSTMARK_FROM_EMAIL,
      generateVerificationToken() {
        return rn(options).toString();
      },
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
        token,
      }) {
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to Playground`,
          text: text({ token }),
          html: html({ url, email, token }),
        });
      },
    }),

    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  // pages: {
  //   signIn: "/login",
  //   verifyRequest: "/check-mail",
  // },
};
