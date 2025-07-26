import React, { useEffect, useState } from 'react'
import appwriteService from '../Appwrite/config'
import { Container, Loader, PostCard } from '../components'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await appwriteService.getPosts()//only active posts should be fetched
                if (fetchedPosts) {
                    setPosts(fetchedPosts.documents)
                }
            } catch (error) {
                console.log("Error in fetching active posts ", error)
            } finally{
                setLoader(false)
            }
        }
        setLoader(true)
        fetchPosts()
    }, [])

    if (posts.length === 0) {
        return (
            <Loader status={Loader ? "Loading..." : "No Posts Found!"}/>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className="w-full min-h-[70vh]">
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Home
