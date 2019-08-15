const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for captions
const CaptionSchema = new Schema({
  id_caption: {
    type: String,
  },

  img_filename: {
    type: String,
  },

  caption_content: {
    type: String,
  },

  age: {
    type: String,
  },

  gender: {
    type: String,
  },

  study: {
    type: String,
  },

  eng_certif: {
    type: String,
  },

  eng_certif_res: {
    type: String,
  },

  eng_nat_speaker: {
    type: String,
  },

  total_time: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = Caption = mongoose.model('caption', CaptionSchema);
