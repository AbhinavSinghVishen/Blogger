import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteEndPoint)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client);
    }

    async createAccount({ email, name, password }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name,
            );
            if (userAccount) {
                //call login function
                return this.logIn({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async logIn({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(error){
            console.log("Appwrite service :: getCurrentUser :: error ", error)
        }
        return null;
    }

    async logOut(){
        try{
            await this.account.deleteSessions()
            return true // to signify logOut is successfull
        }catch(error){
            console.log("Appwrite service :: logOut :: error ", error)
        }
        return false // to signify logOut is unsuccessfull
    }
}

const authService = new AuthService();

export default authService;
