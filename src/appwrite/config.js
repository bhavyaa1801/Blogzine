import conf from '../conf/conf.js';
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredimage, status, userid }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }


    async updatePost({ slug, title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }

            )

        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }

    }

    async deletePost(slug) {

        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
            return true

        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }

    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,

            )

        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }

    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,

            )

        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    //file upload

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true

        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFileView(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId,
            600,   // width
            800,   // height
            'center',
            80     // quality
        )
    }

    //likes

    async likePost(postId, userId) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,
                ID.unique(),
                {
                    postid: postId,
                    userid: userId
                }
            );
        } catch (error) {
            console.log("Appwrite service :: likePost :: error", error);
        }
    }




    async unlikePost(likeId) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,
                likeId
            );
        } catch (error) {
            console.log("Appwrite service :: unlikePost :: error", error);
        }
    }

    async getLikes(postid) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,
                [Query.equal("postid", postid)]
            );
        } catch (error) {
            console.log("Appwrite service :: getLikes :: error", error);
            return { documents: [] };
        }
    }

    //comments

    async addComment(data) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                ID.unique(),
                data
            );
        } catch (error) {
            console.log("Appwrite service :: addComment :: error", error);
        }
    }

    async getComments(postid) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                [Query.equal("postid", postid)]
            );
        } catch (error) {
            console.log("Appwrite service :: getComments :: error", error);
            return { documents: [] };
        }
    }




}

const service = new Service()
export default service
