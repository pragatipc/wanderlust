const joi = require("joi"); // it handle server side error

module.exports.listingSchema = joi.object({
    listing : joi.object({
    title: joi.string().required(),
    description: joi.string().required() ,
    location: joi. string().required() ,
    country: joi.string().required(),
    price: joi. number().required().min(0),
    image: joi.object({
        url: joi.string().uri().allow("", null), // Validate URL (allow empty or null)
        filename: joi.string().allow("", null)   // Allow empty filename
    }).default({ filename: "default.jpg", url: "https://images.unsplash.com/photo-1742054294226-86d430d25ae5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" })
}).required() 
});

module.exports.reviewSchema = joi.object({
    review : joi.object({
        rating: joi.string().required().min(1).max(5),
        comment: joi.string().required()
    }).required()
});
    1