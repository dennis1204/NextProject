'use client';

import { useState, useEffect} from "react";
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className="mt-16 prompt_layout">
            {data?.map((post)=> (
                <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [post, setPost] = useState("");
    const handleSearchChange = (e) =>{

    }

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();

            setPost(data);
        }
        console.log(post);
        fetchData();
    }, []);
  return (
    <section className="feed">
        <form className="relative w-full flex-center">
            <input
                type="text"
                placeholder="Search for a tag or username"
                value={searchText}
                onChange={handleSearchChange}
                required
                className="search_input peer"/>
        </form>
    </section>
  )
}

export default Feed