import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import appwriteService from '../Appwrite/config'
import { Container, PostForm } from '../components'

const EditPost = () => {
    const [posts, setPosts] = useState(null)
    const {slug} = useParams()//because we have defined routes that contains :slug
    const navigate = useNavigate()


    useEffect( () => {
        if(slug){
            const fetchPost = async() => {
                try {
                    const fetchedPost = await appwriteService.getPost(slug)
                    if(fetchedPost){
                        setPosts(fetchedPost)
                    }
                    else{
                        navigate('/')
                    }
                } catch (error) {
                    console.log(`Error in fetching post: ${slug} ${error}`)
                }
            }
            fetchPost()
        }else{
            navigate('/')
        }

    }, [slug, navigate])
  return posts ? (
    <div className='py-8'>
      <Container>
        <PostForm post={posts}/>
      </Container>
    </div>
  ) : null
}

export default EditPost
