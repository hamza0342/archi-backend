const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const mongoose = require('mongoose')
const fs = require('fs')
const cors = require('cors')
const dotenv = require('dotenv')
const mime = require('mime');

dotenv.config()

const projectRouter = require('./routes/project');
const folderRouter = require('./routes/folder');
const rvtRouter = require('./routes/rvt');
const mirRouter = require('./routes/Mir');
const tourRouter = require('./routes/360tourFolder');
const modelRouter = require('./routes/modelFile')
const tourFileRouter = require('./routes/360tourFile');
const mirFile = require('./routes/mirFile');
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const fileRouter = require('./routes/fileuploader');
const subContractorRouter = require('./routes/subContractor');
const clientRouter = require("./routes/client");
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/',(req,res)=>{
  fs.readFile('docs/apiDocs.json', (err, data)=>{
    if(err){
      res.status(400).json({
        error:err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })
})




// app.get('/download/', function(req, res){

  
//   const file ='./uploads/2021-08-17T16-02-14.008Z-download.jfif';
app.get('/download/uploads/:filename', function(req, res){
  console.log("inside Download")
  console.log(req.params.filename)
  const file =`./uploads/${req.params.filename}`;
  const filename = path.basename(file);
  const mimetype = mime.lookup(file);

  

  res.setHeader("Access-Control-Allow-Origin", "*",'Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  const filestream = fs.createReadStream(file);
  filestream.pipe(res);
});




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())
app.use(expressValidator())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static('uploads'));

app.use('/', projectRouter);
app.use('/',folderRouter);
app.use('/',rvtRouter);
app.use('/',tourRouter);
app.use('/',mirRouter);
app.use('/',mirFile)
app.use('/',modelRouter);
app.use('/',tourFileRouter);
app.use('/',authRouter)
app.use('/',adminRouter)
app.use('/',fileRouter)
app.use('/',subContractorRouter)
app.use('/',clientRouter)

app.use(function(err, req, res, next){
  if(err.name === "UnauthorizedError"){
    res.status(401).json({
      error:"Unauthorized!!"
    })
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//db

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false, useCreateIndex:true}).then(()=>console.log("DB connected"))

mongoose.connection.on("error",err =>{
  console.log(`DB connection error : ${err.message}`)
})


const port = process.env.PORT || 8080;
app.listen(port, ()=>{
  console.log(`A node js API is listening on port : ${port}`)
})

module.exports = app;
