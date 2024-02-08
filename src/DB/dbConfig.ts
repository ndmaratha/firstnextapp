import mongoose from "mongoose";
export const connect = async () => {
	try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("successfully connected to mongodb")
        })
        connection.on('error',(err)=>{
            console.log("cannot connect to mongodb"+err)
        })
	} catch (error) {
		console.log("something went wrong when connection to db mongo");
		console.log(error);
        process.exit();
	}
};
