const {modelPropiedad,modelequipo} = require('../models/modelInmueble.js')

const setterInmuebles = app=>{
    app.post('/propiedades',async (req,res)=>{
        try{
            const newProdpiedaes = new modelPropiedad(req.body)
             await newProdpiedaes.save()
             return res.json({message:newProdpiedaes})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/equipo',async (req,res)=>{
        try{
            const newEquipo = new modelequipo(req.body)
             await newEquipo.save()
             return res.json({message:newEquipo})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })
}

module.exports={setterInmuebles}