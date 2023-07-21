import prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async(res, {params}) =>
{
    try{
        await connectToDB();
        const prompts = await prompt.find({
            auth: params.id,
        }).populate('auth');

        return new Response(JSON.stringify(prompts), {status : 200});
    }catch(err){
        return new Response("Failed to fetch all prompts", {status : 500});
    }
}