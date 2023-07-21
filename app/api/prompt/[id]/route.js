import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
//Get
export const GET = async(req, {params}) =>
{
    try{
        await connectToDB();
        const prompts = await Prompt.findById(params.id).populate('auth');
        if(!prompts) return new Response("Prompt not found", {status: 404});

        return new Response(JSON.stringify(prompts), {status : 200});
    }catch(err){
        return new Response("Failed to fetch all prompts", {status : 500});
    }
};
//patch
export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json();

    try {
        await connectToDB();
        console.log("Start find prompt by id....");
        console.log(params.id);
        const oldprompt = await Prompt.findById(params.id);
        console.log(oldprompt);
        if(!oldprompt){
            return new Response("Failed to find a prompt by id", {status: 404});
        }
        oldprompt.prompt = prompt;
        oldprompt.tag = tag;
        await oldprompt.save();

        return new Response(JSON.stringify(oldprompt), {status: 200});
    } catch (err) {
        return new Response("Failed to update prompt", {status:500});
}
};
//delete
export const DELETE = async(req,{params}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt is deleted successfully", {status:200});
    } catch (err) {
        return new Response("Failed to delete the prompt", {status:500});
    }
};