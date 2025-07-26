import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import appwriteService from '../../Appwrite/config'
import { useSelector } from 'react-redux'
import { Input, RTE, Select, Button, Loader } from '../index.js'

const PostForm = ({ post }) => {
    const [loader, setLoader] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '', //slug is id of post
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        setLoader(true)
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if (file) {
                await appwriteService.deleteFile(post.featuredImage)
            }
            //as there is no appwriteService defined in config.js to update a file
            //so we are just deleting the old file and upload a new file

            const updatedPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            })

            if (updatedPost) {
                navigate(`/post/${updatedPost.$id}`)
            }
        }
        else {
            const file = await appwriteService.uploadFile(data.image[0])
            if (file) {
                data.featuredImage = file.$id
                const newPost = await appwriteService.createPost({
                    ...data, userId: userData.$id
                })

                if (newPost) {
                    navigate(`/post/${newPost.$id}`)
                }
            }
        }
        setLoader(false)
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
        }
        return ''
    }, [])

    useEffect(() => {
        const subcription = watch((value, { name }) => { //value: value of whole form inputs, name: name of element that triggerss change
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
                //When you manually update a form field's value using setValue, React Hook Form, by default, might not immediately re-validate that field
                //shouldValidate: true in React Hook Form tells the form to immediately run validation on the specific field(s) whose value you just changed using setValue.
            }
        })

        return () => subcription.unsubscribe()
    }, [watch, setValue, slugTransform])


    return (
        <>
            {loader ? <Loader status={post ? "Updating the Post..." : "Creating a new Post..."} /> : <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getPreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className={`w-full ${post ? "hover:bg-green-600" : "hover:bg-blue-700"}
                    ${Object.keys(errors).length ? 'cursor-not-allowed' : 'cursor-pointer'}`
                    }>
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>}
        </>
    )
}

export default PostForm
