import { mongoose } from "mongoose"

export const dbcon = async (url)=>{
    try{
    const connection = await mongoose.connect(url)
        console.log("connected to database successfully")
    }catch(err){
        console.log(`Failed to connect to database at ${url}`)
    }
}