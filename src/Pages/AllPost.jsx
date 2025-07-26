import React, { useEffect, useState } from 'react'
import { PostCard, Container, Loader } from '../components'
import appwriteService from '../Appwrite/config'

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)

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

export default AllPosts
