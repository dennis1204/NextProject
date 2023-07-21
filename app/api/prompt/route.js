import prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async(response) =>
{
    try{
        await connectToDB();
        const prompts = await prompt.find({}).populate('auth');

        return new Response(JSON.stringify(prompts), {status : 200});
    }catch(err){
        return new Response("Failed to fetch all prompts", {status : 500});
    }
}