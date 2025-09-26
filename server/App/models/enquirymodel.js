let mongoose=require('mongoose');
let Schema = mongoose.Schema;
let enquirySchema=new Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Message:{
        type:String,
        required:true
    },
});
let enquiryModel=mongoose.model('Enquiry',enquirySchema);
module.exports=enquiryModel;