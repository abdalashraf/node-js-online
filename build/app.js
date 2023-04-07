console.log("code is chaling");
let myExpress = require('express');
let tokenWali=require('jsonwebtoken')
let meriApp = myExpress();
let fs=require("fs")
meriApp.use(myExpress.json());

let users = [];
let product=[]
let multer=require('multer')

// meriApp.post('/create-user'),function(req,res){
//     users.push(req.body)
//     res.end("data aa gya")
// }
    // meriApp.get('userGya'),function(req,res){
    //     res.json(users)
    // }
   

    const storage = multer.diskStorage({
      destination: function (req, file, cb) { 
        let path='./server/UploadPic/'+req.body.name
     
        
     

          fs.mkdir(path,function(){
                    
            cb(null, path);
          
          });
        
      
      


          cb(null, './server/UploadPic')

      },
      filename: function (req, file, cb) {
      
        cb(null, file.originalname)
      }
    })
    
    const upload = multer({ storage: storage })
    
    // const storage = multer.diskStorage({
    //   destination: function (req, file, cb) { 
    //     let path='./server/UploadPic/'+req.body.name
    //     let folderParaHa=fs.existsSync(path)
    //     console.log(path)
    //     if(folderParaHa==false){

    //       fs.mkdir(path,function(){
                    
    //         cb(null, path);
          
    //       });
    //     }
    //     else{
    //       cd({message:"User para ha"},null)
    //     }
 


    //       cb(null, './server/UploadPic')

    //   },
    //   filename: function (req, file, cb) {
      
    //     cb(null, file.originalname)
    //   }
    // })
    
    // const upload = multer({ storage: storage })


    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) { 
    //       cb(null, './server/UploadPic')
    //     },
    //     filename: function (req, file, cb) {
        
    //       cb(null, file.originalname)
    //     }
    //   })
      
    //   const upload = multer({ storage: storage })




meriApp.post('/create-user',upload.single("file"), function(req,res){
    req.body.file = req.file.originalname;

    users.push(req.body)
    console.log(req.body);
    res.end("data chala gya")
})

// bagarImageWalacode

// meriApp.post('/create-user', function(req, res){

//     users.push(req.body);
//     console.log(req.body)
//     res.end("data chal agya");
//     // res.json({success:true})    

// });
// bagarImageWalacode


meriApp.delete("/user-delete",function(req,res){
    users=users.filter(user=>user.id==req.query.id)

res.json({success:true})     
})




meriApp.get('/abc', function(req, res){

    res.json(users);

 
})

// meriApp.post("/login-Data",function(req,resp){
// let usermilgya=users.find(user=>user.name==req.body.name&&user.password==req.body.password)
// resp.json(usermilgya)

// })




meriApp.post("/login-Data",function(req,resp){
  let usermilgya=users.find(user=>user.name==req.body.name&&user.password==req.body.password)
  if(usermilgya){
    tokenWali.sign({userkiID:usermilgya.id} ,"big apple" ,{expiresIn:"2d"} ,function(err,myToken){
      resp.json({
        usermilgya,
        myToken
      })
  
    })
  }
  
  })
  

meriApp.post('/session_Data' ,function(req,res){
  tokenWali.verify(req.body.token ,"big apple" ,function(err,dataobj){
    if(dataobj){
      let user =users.find(user=>user.id==dataobj.userkiID)
      res.json(user)
      console.log(true);
    }
    console.log("check",dataobj);
  })
})





meriApp.post('/prduct_Data',upload.single("file"),function(req,resp){
  // req.body.file=req.file.body
  req.body.file = req.file.originalname;

  product.push(req.body)  
console.log(req.body );
resp.end("product aa gya ")
})

meriApp.get('/product_Array',function(req,res){
  res.json(product)
  })
 
meriApp.use(myExpress.static('.server/build'))
meriApp.use(myExpress.static('.server/UploadPic'))
// meriApp.use(function(err,req,res,cd){
// res.status(500).json(err)
// })
meriApp.listen(3004, function(){
    console.log("server chaling now");
})


