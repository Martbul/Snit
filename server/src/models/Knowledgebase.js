const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const ImageSchema = new mongoose.Schema({
//   imageUrl: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   // Add any other fields you need for your image
// });


const KnowledgebaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minLength: [3, "title is too short"],
      maxLength: [70, "title is too long"],
    },

    images: {
      type: Array,
    },

    // images: [ImageSchema], // Define structure for items in the images array

    docs: {
      type: Array,
    },

    creator: { type: String, required: [true, "creator is required"] },
  },
  {
    timestamps: true,
  }
);



const Knowledgebase = mongoose.model("Knowledgebase", KnowledgebaseSchema);


module.exports = Knowledgebase;
