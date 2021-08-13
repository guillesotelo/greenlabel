const mongoose = require('mongoose');

const uri = "mongodb+srv://namethetree:3365@cluster0.ptbp1.mongodb.net/NameTheTrees?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  
module.exports = mongoose