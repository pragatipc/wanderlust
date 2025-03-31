const listing = require("../models/listing");

module.exports.index = async(req,res) => {
    const allListing = await listing.find({});
    res.render("listings/index.ejs",{allListing});
}

module.exports.renderNewForm = async(req,res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async(req,res) =>{
    const {id} = req.params;
    const Listing =  await listing.findById(id).populate({path:"review",populate:{path:"author"},}).populate("owner");
    if(!Listing){
        req.flash("error","Listing you requested for does not exists.");
        res.redirect("/listing")
    }
    console.log(JSON.stringify(listing, null, 2)); 
    res.render("listings/show.ejs",{Listing});
}

module.exports.createListing = async (req,res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    let newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id; // it strore id of current user
    newlisting.image = {url , filename};
    await newlisting.save();
    req.flash("success","New Listing Created");
    res.redirect("/listing");
}

module.exports.editListing = async(req,res) =>  {
    const {id} = req.params;
    const Listing =  await listing.findById(id);
    if(!Listing){
        req.flash("error","Listing you requested for does not exists.");
        res.redirect("/listing")
    }
    let originalImageUrl = Listing.image.url;
    originalImageUrl =  originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{Listing , originalImageUrl});
}

module.exports.updateListing = async(req,res) =>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
    const {id} = req.params;
    let Listing = await listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof(req.file) != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    Listing.image = {url , filename};
    await Listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listing/${id}`);
}

module.exports.deleteListing = async(req,res) => {
    const {id} = req.params;
    const deleteListing =  await listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    console.log(deleteListing);
    res.redirect("/listing");
}