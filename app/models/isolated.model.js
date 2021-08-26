const mongoose = require("mongoose");

//schema isolated
let isolatedSchema = mongoose.Schema({
		fullName:String,
		address:{
			publicLocal:String, 
			numberAddress:Number
		},
		directContacts:[String],
		initialDate:Date,
		finalDate:Date,
		inspection:{
			date:Date,
			inHome:Boolean,
			needSupport:Boolean,
		}
	},
	{timestamps:true}
	)

//override id to _id

isolatedSchema.method("to JSON", () =>{
	const {__v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

// create a model
const IsolatedModel	 = mongoose.model("Isolated", isolatedSchema)

module.exports = IsolatedModel;