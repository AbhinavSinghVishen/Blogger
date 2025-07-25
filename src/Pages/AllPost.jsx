import React, { useEffect, useState } from 'react'
import { PostCard, Container } from '../components'
import appwriteService from '../Appwrite/config'

const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await appwriteService.getPosts([]) //as we want to fetch all posts irrespective of status
                //fetchedPosts = {total: (gives total number of docuemnts for the query), documents: (array of documents data(in obj))}
                if (fetchedPosts) {
                    setPosts(fetchedPosts.documents)
                }
            } catch (error) {
                console.log("Error in fetching Posts: ", error)
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

export default AllPosts
