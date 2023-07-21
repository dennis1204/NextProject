import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            state: true,
        })
    ],
    callbacks: {
    async session({session}) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session;
    },
    async signIn({profile, account, user, credentials}){
        try{
            await connectToDB();
            console.log(profile.email);
            const userExists = await User.findOne({
                email: profile.email
            })
            console.log("===============");
            console.log(userExists);
            console.log("===============");
            if(!userExists){
                const newUser = await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
                console.log("Before : ", session.user.id);
                session.user.id = newUser._id.toString(); // Update the session with the new user's ID
                console.log("After : ",session.user.id);
                return true;
            }
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
        
    }
}
})

export {handler as GET, handler as POST};