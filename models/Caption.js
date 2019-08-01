const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for captions
const CaptionSchema = new Schema({
  id_caption: {
    type: String,
    required: true
  },

  img_filename: {
    type: String,
    required: true
  },

  caption_content: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  study: {
    type: String,
    required: true
  },

  study_field: {
    type: String,
  },

  work: {
    type: String,
  },

  work_occupation: {
    type: String,
  },

  eng_certif: {
    type: String,
    required: true
  },

  eng_certif_res: {
    type: String,
  },

  eng_nat_speaker: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = Caption = mongoose.model('caption', CaptionSchema);
