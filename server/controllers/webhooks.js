import { Webhook } from "svix";
import User from "../models/user.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
    try {
        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

        //verifying headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // Getting Data from request body
        const {data, type} = req.body
        
        // Switch Cases for differernt Events
        switch(type){

            case 'user.created':{
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }

                try {
                 const createdUser = await User.create(userData);
                 console.log("Mongo User:", createdUser);
                } catch (err) {
                 console.error("Mongo Error:", err);
                }

                res.json({});
                break;
            }

            case 'user.updated':{
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
            break;
        }
    } catch (error) {
    console.error("Webhook Error:", error);
    console.error(error);
    res.status(500).json({
        success: false,
        message: error.message
    });
}
}