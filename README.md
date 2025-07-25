# Blogger - Blog Application

A full-stack blog application built with React.js for the frontend and Appwrite as the powerful backend-as-a-service. This project demonstrates robust user authentication, content management (CRUD operations for posts), and file storage.

## ✨ Features

* **User Authentication**: Secure sign-up, login, and logout functionalities using Appwrite's Auth service.

* **Post Management**:

  * Create new blog posts with rich text content (using TinyMCE).

  * Edit existing posts.

  * Delete posts.

  * View individual posts.

  * Filter posts (e.g., by status like 'active').

* **Featured Images**: Upload and display featured images for blog posts using Appwrite Storage.

* **Slug Generation**: Automatic and editable URL-friendly slugs for posts.

* **Responsive Design**: Built with Tailwind CSS for a mobile-first and responsive user interface.

* **State Management**: Centralized state management using Redux Toolkit.

* **Form Handling**: Efficient form management and validation using React Hook Form.

## 🚀 Technologies Used

**Frontend:**

* **React.js**: A JavaScript library for building user interfaces.

* **Vite**: A fast build tool for modern web projects.

* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

* **React Router DOM**: For client-side routing.

* **Redux Toolkit**: For efficient and scalable state management.

* **React Hook Form**: For flexible and performant form validation.

* **TinyMCE**: A rich text editor for creating blog post content.

* **html-react-parser**: To parse and render HTML strings from TinyMCE.

**Backend-as-a-Service:**

* **Appwrite**: An open-source backend server that provides authentication, databases, and storage APIs.

## 🛠️ Setup and Installation

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```
git clone https://github.com/AbhinavSinghVishen/Blogger.git
cd Blogger

```

### 2. Install Dependencies

```
npm install
# or yarn install

```

### 3. Appwrite Backend Setup

1. **Set up Appwrite Instance**:

   * If you don't have an Appwrite instance, you can use [Appwrite Cloud](https://cloud.appwrite.io/) or self-host it.

   * Create a new project in your Appwrite Console.

2. **Add a Web Platform**:

   * In your Appwrite project, go to **"Overview"** and click **"Add platform"**.

   * Select **"Web"**.

   * **Name**: Give it a name (e.g., "Blogger Frontend").

   * **Hostnames**: Add `localhost` for local development. If deploying, you'll also add your deployment domain (e.g., `your-vercel-app.vercel.app`) here later.

3. **Create Database and Collection**:

   * Go to **"Databases"** in the Appwrite Console.

   * Create a new Database (e.g., `blog_db`).

   * Inside your database, create a new Collection (e.g., `posts`).

   * **Permissions for Collection (`posts`)**:

     * Go to the `posts` collection settings -> **Permissions**.

     * Set **"Read"** permission for **`Any`** (if you want public posts) or **`Users`** (if only logged-in users can see posts).

     * Set **"Create"**, **"Update"**, **"Delete"** permissions for **`Users`**.

     * Ensure **"Document Security"** is enabled if you want per-document permissions (recommended for author-specific editing).

4. **Define Attributes for `posts` Collection**:
   Add the following attributes to your `posts` collection:

   * `title` (String)

   * `slug` (String, unique)

   * `content` (String, long text enabled)

   * `featuredImage` (String)

   * `status` (String, enum: `active`, `inactive`)

   * `userId` (String) - **Crucially, ensure the casing matches exactly, e.g., `userId` or `userID` based on your code.**

5. **Create a Storage Bucket**:

   * Go to **"Storage"** in the Appwrite Console.

   * Create a new Bucket (e.g., `blog_images`).

   * **Permissions for Bucket (`blog_images`)**:

     * Go to the `blog_images` bucket settings -> **Permissions**.

     * Set **"Read"** permission for **`Any`** (if you want public images) or **`Users`** (if only logged-in users can see images).

     * Set **"Create"**, **"Update"**, **"Delete"** permissions for **`Users`**.

     * **Important**: If you are on a free Appwrite Cloud plan, **image transformations (`getFilePreview`) are blocked**. You will need to use `getFileView()` in your `appwriteService` to display images without transformations.

### 4. Environment Variables Configuration

Create a `.env` file in the root of your project (same level as `package.json`) and add your Appwrite credentials:

```
VITE_APPWRITE_ENDPOINT="YOUR_APPWRITE_ENDPOINT"
VITE_APPWRITE_PROJECT_ID="YOUR_APPWRITE_PROJECT_ID"
VITE_APPWRITE_DATABASE_ID="YOUR_DATABASE_ID"
VITE_APPWRITE_COLLECTION_ID="YOUR_COLLECTION_ID"
VITE_APPWRITE_BUCKET_ID="YOUR_BUCKET_ID"
VITE_TINYMCE_API_KEY="YOUR_TINYMCE_API_KEY"

```

* Replace placeholders with your actual IDs from the Appwrite Console.

* **`VITE_TINYMCE_API_KEY`**: Get a free API key from [TinyMCE](https://www.tiny.cloud/). You also need to add your deployment domains (e.g., `localhost`, `your-vercel-app.vercel.app`) to the approved domains in your TinyMCE dashboard.

### 5. Run the Application Locally

```
npm run dev
# or yarn dev

```

Your application should now be running on `http://localhost:5173` (or another port as indicated by Vite).

## ☁️ Deployment on Vercel

To deploy your application on Vercel:

1. **Commit `vercel.json`**: Ensure you have a `vercel.json` file in your project root with the following content to handle client-side routing for SPAs:

   ```
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   
   ```

   Commit this file to your Git repository.

2. **Connect to Vercel**:

   * Go to [vercel.com](https://vercel.com/) and log in.

   * Import your Git repository (e.g., from GitHub).

   * Vercel should auto-detect your Vite project setup.

3. **Configure Environment Variables in Vercel**:

   * Before deploying, go to your Vercel project settings -> **"Environment Variables"**.

   * Add all the `VITE_` prefixed variables from your `.env` file here (e.g., `VITE_APPWRITE_ENDPOINT`, `VITE_APPWRITE_PROJECT_ID`, etc.). These are crucial for your deployed app to connect to Appwrite.

   * Select "Production", "Preview", and "Development" environments for each variable.

4. **Deploy**: Trigger a new deployment.

5. **Update TinyMCE Approved Domains**:

   * Once deployed, copy your Vercel deployment URL (e.g., `https://your-project-name.vercel.app`).

   * Go to your [TinyMCE dashboard](https://www.tiny.cloud/) and add this domain to the approved domains for your API key.

## 💡 Usage

* **Sign Up**: Create a new account.

* **Login**: Log in with your credentials.

* **Create Post**: Navigate to the "Add Post" section to create new blog entries.

* **View Posts**: See all active posts on the homepage.

* **Edit/Delete Post**: If you are the author of a post, you will see options to edit or delete it on the individual post page.
