const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const isAuthenticated = require('../middleware/auth');
dotenv.config({path:'../config/config.env'})
const { modelUsuarios,modelProducto } = require('../models/modelUsers.js')

setters = app =>{
    app.post('/register', async(req,res)=>{
      try {
        const { name, email, password } = req.body;
        //Check emptyness of the incoming data
        if (!name || !email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }

        //Check if the user already exist or not
        const userExist = await modelUsuarios.findOne({ email: req.body.email });
        if (userExist) {
            return res.json({ message: 'User already exist with the given emailId' })
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = new modelUsuarios(req.body);
        await user.save();
        
        return res.json({ success: true, message: 'User registered successfully', data: user })
    } catch (error) {
        return res.json({ "message ": error });
    }
           
    })

    app.post('/agregarProducto',async (req,res)=>{
        try{
              const { name,precioBase,precioVenta,stock } = req.body;
              if( !name,!precioBase,!precioVenta,!stock ){
                return res.json({"message": "por favor ingrese todos los campos"})
              }
              const productos = new modelProducto(req.body)
              await productos.save();
              
              return res.json({data:productos})
        }catch(e){
            return res.json({"message": e});
        }
    })
}

const getters = app =>{
   app.post('/login',async(req,res)=>{
    try {
      const { email, password } = req.body;
      //Check emptyness of the incoming data
      if (!email || !password) {
          return res.json({ message: 'Please enter all the details' })
      }
      //Check if the user already exist or not
      const userExist = await modelUsuarios.findOne({ email: req.body.email });
      if (!userExist) {
          return res.json({ message: 'Wrong credentials' })
      }
      //Check password match
      const isPasswordMatched = await bcrypt.compare(password, userExist.password);
      if (!isPasswordMatched) {
          return res.json({ message: 'Wrong credentials pass' });
      }
      process.env.JWT_EXPIRE="1d"
      const token =  jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRE,
      });
      
      return res.cookie("token",token).json({ success: true, message: 'LoggedIn Successfully', token: token })
       } catch (error) {
         return res.json({ error: error });
       }
      })

      app.get('/productos', async (req, res) => {
        try {
            const productos = await modelProducto.find();
            if (!productos) {
                return res.json({ message: 'No product found' })
            }
            return res.json({ productos: productos })
        } catch (error) {
            return res.json({ error: error });
        }
    })
   }

module.exports={
  setters,getters
}