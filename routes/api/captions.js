const express = require('express');
const router = express.Router();

// Caption Model
const Caption = require('../../models/Caption');

// @route   GET api/captions
// @desc    Get All captions
// @access  Public
router.get('/', (req, res) => {
  Caption.find()
    .then(captions => res.json(captions));
});

// @route   POST api/captions
// @desc    Create A captions
// @access  Private
router.post('/', (req, res) => {
  const newCaption = new Caption({
    id_caption: req.body.id_caption,
    img_filename : req.body.img_filename,
    caption_content : req.body.caption_content,
    age : req.body.age,
    gender : req.body.gender, 
    study : req.body.study,
    eng_certif : req.body.eng_certif,
    eng_certif_res : req.body.eng_certif_res,
    eng_nat_speaker : req.body.eng_nat_speaker,
    total_time : req.body.total_time
  });

  newCaption.save().then(caption => res.json(caption));
});

module.exports = router;
