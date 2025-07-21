import conf from "../conf/conf";
import { Databases, ID, Client, Storage, Query } from "appwrite";

class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteEndPoint)
            .setProject(conf.appwriteProjectID)

        this.bucket = new Storage(this.client)
        this.databases = new Databases(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug, //we are using slug as unique id for document
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }catch(error){
            console.log("Appwrite service :: createPost :: error ", error);
            return false // to signify that post is not created successfully
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug, // as slug is used as unique document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    // userId, //we will give update feature only to the user
                    //who have creted the post
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
            return false //to signify post is not updated successfully
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID, 
                slug, // as slug is unique id for document
            )
            return true // to signify that post is deleted
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
            return false // to signify that post deletion is unsuccessful
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug, // as slug is unique id for document
            )
        }catch(error){
            console.log("Appwrite service :: getPost :: error ", error);
            return false // to signify that getPost is unsuccessful
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error ", error);
            return false // to signify that getPosts is unsuccessful
        }
    }


    //file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(), 
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadPost :: error ", error);
            return false // to signify that uploadPost is unsuccessful
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true //file deletion is successful
        } catch (error) {
            console.log("Appwrite services :: deleteFile :: error ", error)
            return false // file deletion is unsuccessful
        }
    }

    getPreview(fileId){ //this does not returns a promise so that we can use it without async
        return this.bucket.getFileView(
            conf.appwriteBucketID, 
            fileId
        )
    }
}

const service = new Service()

export default service;