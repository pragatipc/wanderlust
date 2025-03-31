const Review = require("../models/review");
const listing = require("../models/listing");

module.exports.createReview = async(req,res) =>{

    let listings = await listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    

    await newreview.save();
    await newreview.populate("author");

    listings.review.push(newreview);
    await listings.save();
    
    req.flash("success","New Review Created");
    res.redirect(`/listing/${listings._id}`);
}

module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params;

    await listing.findByIdAndUpdate(id,{$pull:{reviews :reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review Deleted");
    res.redirect(`/listing/${id}`);
}