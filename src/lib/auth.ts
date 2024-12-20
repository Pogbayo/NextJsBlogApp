// // import NextAuth, { NextAuthOptions } from "next-auth";
// // import GitHubProvider from "next-auth/providers/github";
// // import connectToDb from "./utils";
// // import { User } from "./models";
// // import CredentialsProvider from "next-auth/providers/credentials"
// // import { ProjectionType } from "mongoose";
// // import bcrypt from "bcrypt"
// // const login = async (credentials: { userName: ProjectionType<any> | null | undefined; }) => {
// //     try {
// //       await connectToDb()
// //       const user = await User.findOne({userName})
// //       if (!user) {
// //         throw new Error("Wrong credentials")
// //       }
// //       const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
       
// //       if (!isPasswordCorrect){
// //         throw new Error("Wrong credentials")
// //       }
// //       return user
// //     } catch (err) {
// //       console.log(err)
// //       throw new Error("failed to login")
// //     }
// // }

// // export const authOptions: NextAuthOptions = {
// //   providers: [
// //     GitHubProvider({
// //       clientId: process.env.GITHUB_ID!,
// //       clientSecret: process.env.GITHUB_SECRET!,
// //     }),
// //     CredentialsProvider({
// //       async authorize(credentials) {
// //         connectToDb()
// //       },
// //     })
// //   ],
// //   callbacks: {

// //   //SESSIONS
// //     async session({ session, token }: { session: any; token: any }) {
// //       session.user = {
// //         ...session.user,
// //         id: token.id,
// //         isAdmin: token.email === "admin@example.com", // Example admin check
// //       };
// //       return session;
// //     },

// //   //SIGNIN
// //     async signIn({ user, account, profile }: { 
// //       user: any; 
// //       account: any; 
// //       profile?: any; 
// //     }): Promise<boolean> {
// //       console.log(user, account, profile);
// //       if(account.provider === "github"){
// //      connectToDb();
// //       try {
// //         const user = await User.findOne({email:profile.email})
// //         if (!user) {
// //           const newUser = new User({
// //             userName:profile.login,
// //             email:profile.email,
// //             image:profile.avatar_url,
// //             // password:profile.email,
// //           });

// //           await newUser.save()
// //         }
// //       } catch (err) {
// //         console.log(err)
// //         return false
// //       }
// //       }
// //       return true; // Allow the sign-in
// //     },


// //     //JWT
// //     async jwt({ token, user }: { token: any; user?: any }) {
// //       if (user) {
// //         token.id = user.id;
// //       }
// //       return token;
// //     },
// //   },
// // };

// // export default NextAuth(authOptions);

// // import NextAuth, { NextAuthOptions } from "next-auth";
// // import GitHubProvider from "next-auth/providers/github";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import connectToDb from "./utils";
// // import { User } from "./models";
// // import bcrypt from "bcryptjs";
// // import authConfig from "./auth.config";

// // export const authOptions: NextAuthOptions = {
// //   ...authConfig,
// //   providers: [
// //     GitHubProvider({
// //       clientId: process.env.GITHUB_ID!,
// //       clientSecret: process.env.GITHUB_SECRET!,
// //     }),
// //     CredentialsProvider({
// //       name: "Credentials",
// //       credentials: {
// //         userName: { label: "Username", type: "text" },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         if (!credentials) {
// //           console.log("No credentials provided.");
// //           throw new Error("No credentials provided");
// //         }

// //         const { userName, password } = credentials;

// //         try {
// //           await connectToDb();

// //           // Find the user in the database
// //           const user = await User.findOne({ userName });
// //           if (!user) {
// //             console.log("User not found or invalid username.");
// //             throw new Error("Invalid username or password");
// //           }

// //           // Check password
// //           const isPasswordCorrect = await bcrypt.compare(password, user.password);
// //           if (!isPasswordCorrect) {
// //             console.log("Incorrect password for user: ", userName);
// //             throw new Error("Invalid username or password");
// //           }

// //           console.log("User successfully logged in: ", userName);

// //           // Return the user object
// //           return {
// //             id: user._id.toString(),
// //             userName: user.userName,
// //             email: user.email,
// //           };
// //         } catch (err) {
// //           console.error("Login error: ", err);
// //           return null;
// //         }
// //       },
// //     }),
// //   ],
// //   callbacks: {
// //     async session({ session, token }: { session: any; token: any }) {
// //       session.user = {
// //         ...session.user,
// //         id: token.id,
// //         isAdmin: token.email === "admin@example.com",
// //       };
// //       return session;
// //     },
// //     async signIn({ user, account, profile }: {
// //       user: any;
// //       account: any;
// //       profile?: any;
// //     }): Promise<boolean> {
// //       console.log("Sign-in attempt: ", user, account, profile);
// //       if (account.provider === "github") {
// //         connectToDb();
// //         try {
// //           const existingUser = await User.findOne({ email: profile.email });
// //           if (!existingUser) {
// //             const newUser = new User({
// //               userName: profile.login,
// //               email: profile.email,
// //               image: profile.avatar_url,
// //             });

// //             await newUser.save();
// //           }
// //         } catch (err) {
// //           console.log("GitHub sign-in error: ", err);
// //           return false;
// //         }
// //       }
// //       return true;
// //     },

// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.id = user.id;
// //       }
// //       return token;
// //     },
// //    ...authConfig.callbacks,
// //   },
// // };

// // export default NextAuth(authOptions);



// import { NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectToDb from "./utils";
// import { User } from "./models";
// import bcrypt from "bcryptjs";
// import { JWT } from "next-auth/jwt";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         userName: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) throw new Error("No credentials provided");

//         const { userName, password } = credentials;

//         try {
//           await connectToDb();
//           const user = await User.findOne({ userName });
//           if (!user) throw new Error("Invalid username or password");

//           const isPasswordCorrect = await bcrypt.compare(password, user.password);
//           if (!isPasswordCorrect) throw new Error("Invalid username or password");

//           return {
//             id: user._id.toString(),
//             userName: user.userName,
//             email: user.email,
//             isAdmin: user.isAdmin || false,
//           };
//         } catch (err) {
//           console.error("Login error: ", err);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       return url === baseUrl ? `/` : url;
//     },
//     async session({ session, token }: { session: any; token: JWT }) {
//       session.user = {
//         ...session.user,
//         name: token.userName,
//         id: token.id,
//         email: token.email,
//         isAdmin: token.isAdmin,
//       };
//       return session;
//     },
//     async signIn({ user, account, profile }: {
//               user: any;
//               account: any;
//               profile?: any;
//             }): Promise<boolean> {
//               console.log("Sign-in attempt: ", user, account, profile);      if (account?.provider === "github") {
//         try {
//           await connectToDb();
//           const existingUser = await User.findOne({ email: profile?.email });
//           if (!existingUser) {
//             const newUser = new User({
//               userName: profile?.login,
//               email: profile?.email,
//               image: profile?.avatar_url,
//               isAdmin: false,
//             });
//             await newUser.save();
//           }
//         } catch (err) {
//           console.error("GitHub sign-in error: ", err);
//           return false;
//         }
//       }
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.userName = user.userName;
//         token.isAdmin = user.isAdmin;
//       }
//       const updatedUser = await User.findById(token.id);
//       if (updatedUser) token.isAdmin = updatedUser.isAdmin;
//       return token;
//     },
//   },
// };
