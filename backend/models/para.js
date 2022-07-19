//needle
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ParaSchema = new Schema({
  imgUrl: { type: String, required: false },
  title: { type: String, required: false },
});

module.exports = mongoose.model("Para", ParaSchema);
