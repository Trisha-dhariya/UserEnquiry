const enquiryModel = require("../../models/enquirymodel.js")
let enquiryInsert = (req, res) => {
  let { Name, Email, Phone, Message } = req.body;
  let enquiry = new enquiryModel({
    Name,
    Email,
    Phone,
    Message
  });
  enquiry.save().then(() => {
    res.status(201).send({ status: 1, message: "enquiry saved successfully" });
  }).catch((err) => {
    if (err.code === 11000) {
      return res.status(400).send({
        status: 0,
        code: 11000,
        message: "Email already exists. Please use another email.",
        errorResponse: err
      });
    }
    // 🔹 Handle any other error
    res.status(500).send({
      status: 0,
      message: "Something went wrong while saving enquiry.",
      errorResponse: err
    });
  });
};

let enquiryList = async (req, res) => {
  try {
    let enquiry = await enquiryModel.find();
    res.status(200).send({
      status: 1,
      enquiry: enquiry
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: "Failed to fetch enquiries",
      error: err
    });
  }
};
console.log("done");

let enquiryDelete = async (req, res) => {
  try {
    let enId = req.params.id;
    let enquiry = await enquiryModel.deleteOne({_id : enId});
    res.send({ status: 1, message: "Enquiry deleted successfully", enquiry });
  }
  catch (err) {
    res.status(500).send({ status: 0, message: "Failed to delete enquiry", error: err });
  };}

let enquirySingleRow=async(req,res)=>{
     let enId = req.params.id;
    let enquiry = await enquiryModel.findOne({_id : enId});
    res.send({status:1,enquiry});
  };

  let enquiryUpdate = async (req, res) => {
    try {
      let Id = req.params.id;
      let { Name, Email, Phone, Message } = req.body;

      let result = await  enquiryModel.updateOne(
        { _id: Id },
        { $set: { Name, Email, Phone, Message } }
      );

      res.status(200).send({
        status: 1,
        message: "Row updated successfully",
        result
      });
    } catch (err) {
      res.status(500).send({
        status: 0,
        message: "Failed to update enquiry",
        error: err
      });
    }
  };
  console.log("done");




  module.exports = { enquiryInsert, enquiryList, enquiryDelete,enquirySingleRow,enquiryUpdate  };