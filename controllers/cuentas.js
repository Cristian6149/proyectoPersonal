const {modelSaldo,modelPrestamoCortoPlazo,modelPRestamoLargoPlazo,modelCapitalSocial } = require('../models/modelCuentas');

const setterCuenta= app =>{
    app.post('/registrocuenta',async (req,res)=>{
        try{
            const newCuenta = new modelSaldo(req.body)
             await newCuenta.save()
             return res.json({message:newCuenta})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/registroprestamocortoplazo',async (req,res)=>{
        try{
            const newPrestamoC = new modelPrestamoCortoPlazo(req.body)
             await newPrestamoC.save()
             return res.json({message:newPrestamoC})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/registroprestamolargoplazo',async (req,res)=>{
        try{
            const newPrestamoL = new modelPRestamoLargoPlazo(req.body)
             await newPrestamoL.save()
             return res.json({message:newPrestamoL})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })

    app.post('/registrocapitalsocial',async (req,res)=>{
        try{
            const newCapitalSocial = new modelCapitalSocial(req.body)
             await newCapitalSocial.save()
             return res.json({message:newCapitalSocial})

        }catch(e){
            console.log(e)
            return res.json({error:e})
        }
    })
}

module.exports={setterCuenta}