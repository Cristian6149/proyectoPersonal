const mongoose = require('mongoose')

mongoose.connect(process.env.URI,{useUnifiedTopology:true})