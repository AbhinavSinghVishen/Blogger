import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router'
import appwriteService from '../Appwrite/config'
import { Container, Button } from '../components'
import parse from 'html-react-parser'

const Post = () => {
    const [posts, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = posts && userData && (userData.$id === posts.userId)

    useEffect(() => {
        if (slug) {
            const fetchPost = async () => {
                try {
                    const fetchedPost = await appwriteService.getPost(slug)
                    if (fetchedPost) {
                        setPosts(fetchedPost)
                    }
                    else {
                        navigate('/')
                    }
                } catch (error) {
                    console.log(`Error in fetching post: ${slug} ${error}`)
                }
            }
            fetchPost()
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    const deletePost = async () => {
        try {
            const deleteStatus = await appwriteService.deletePost(posts.$id)
            if (deleteStatus) {
                await appwriteService.deleteFile(posts.featuredImage)
                navigate('/')
            }
        } catch (error) {
            console.log(`Error in deletion of post ${posts.$id} ${error}`)
        }
    }
    return posts ? (
        <div className='py-8'>
            <Container>
                <div className='bg-white dark:bg-gray-900 p-10 rounded-2xl'>
                    <div className="w-full flex justify-center mb-4 relative  rounded-xl p-2">
                        <img src={appwriteService.getPreview(posts.featuredImage)} alt={posts.title} className='rounded-xl' />
                        {isAuthor && (  //is componoent ko ya to post ke begining mein rakho ya to end mein
                            <div className='absolute right-6 top-6'>
                                <Link to={`/edit-post/${posts.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-3xl font-bold text-black dark:text-gray-100">{posts.title}</h1>
                    </div>
                    <div className="browser-css dark:text-gray-100">
                        {
                            parse(posts.content) //as this content is provided by tinymce which outputs contents as HTML string
                            //React, by default, treats strings as plain text to prevent XSS attacks, parse(post.content) tells
                            //React: "Take this HTML string, parse it, and render it as actual HTML elements
                        }
                    </div>

                </div>
            </Container>
        </div>
    ) : null
}

export default Post
