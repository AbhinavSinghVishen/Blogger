import React, { useEffect, useState } from 'react'
import appwriteService from '../Appwrite/config'
import { Container, PostCard } from '../components'

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await appwriteService.getPosts()//only active posts should be fetched
                if (fetchedPosts) {
                    setPosts(fetchedPosts.documents)
                }
            } catch (error) {
                console.log("Error in fetching active posts ", error)
            }
        }

        fetchPosts()
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full h-[65vh] flex justify-center items-center border rounded-2xl">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No Posts Found!
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    )
}

export default Home
