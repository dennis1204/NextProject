'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const MyProfile = ()=> {
    const router = useRouter();
    const {data : session} = useSession();

    const[posts , setPosts] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            console.log("data fetched: ", data);
            setPosts(data);
        }
        // console.log(posts);
        if(session?.user.id) {
            fetchData();
        }
    }, [session?.user.id]);
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async(post) =>{
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if(hasConfirmed){
            try{
                // console.log(post);
                // console.log("========");
                // console.log(post._id);
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE'
                });
                const filteredPosts = posts.filter((p)=>p._id !== post._id);

                setPosts(filteredPosts);
            }catch(err){
                console.log(err);
            }
        }
    }
    return (
        <Profile 
            name="My"
            description="Your personal profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete} 
        />
    )
}

export default MyProfile;