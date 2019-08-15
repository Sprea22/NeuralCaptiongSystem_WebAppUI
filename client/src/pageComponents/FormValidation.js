
function formValidation(newCaption) {

    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
    console.log("Validating the caption form..")
    const {caption_content, age, gender, study, eng_certif, eng_certif_res, eng_nat_speaker} = newCaption;

    var cond1 = age === "" || gender === "" || study === "" || eng_nat_speaker === ""
    var cond2 = study === ""
    var cond3 = eng_nat_speaker === "No" && ( eng_certif === "" ||  eng_certif_res === "")
    console.log(cond1, cond2, cond3)
    if(cond1 || cond2 || cond3) {
        errors.push("Please enter all the 'Personal Details' fields");
    }

    if(caption_content === "") {
        errors.push("Please enter a caption before submitting the form");
    }

    return errors;
}

module.exports = formValidation;
