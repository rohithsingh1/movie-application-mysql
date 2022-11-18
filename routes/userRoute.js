const router=require('express').Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const authMiddleware=require('../middleware/authMiddleware');
const db = require('../models')

router.post("/register", async (req, res) => {
    try {
        const hashedPassword=await bcrypt.hash(req.body.Password,10)
        req.body.Password=hashedPassword
        const {Name, Email, Password}=req.body;
        const user = await db.User.create({Name,Email,Password});
        res.send({
            message: 'User created successfully',
            success: true,
            data: user,
            token : null
        })
    } catch(err) {
    res.send({
            message: err.errors[0].message,
            success: false,
            data: null,
            token : null
        })
  }
});

router.post("/login", async (req, res) => {
    try {
        const {Email}=req.body;
        const ExistingUser = await db.User.findOne({ where: { Email: Email } });
        if (ExistingUser === null) {
            console.log('Not found!');
            return res.send({
                message: 'User does not exist',
                success: false,
                data: null,
                token : null
            })
        } else {
            console.log('existing user : ', ExistingUser)
            console.log('existing user : ',ExistingUser.Password)
              const passwordMatch=await bcrypt.compare(req.body.Password,ExistingUser.Password)
            if(!passwordMatch) {
                return res.send({
                    message: "Incorrect email or password",
                    success: false,
                    data: null,
                    token : null
                })
            }
            const jwtToken=jwt.sign({
                Name: ExistingUser.Name,
                Email: ExistingUser.Email,
                UserId: ExistingUser.UserId,
            },process.env.JWT_KEY,{
                expiresIn : '1d'
            })
            const {Email,UserId,Name} = ExistingUser
            res.status(200).send({
                message: "User logged in Successfully",
                success: true,
                data: {Email,UserId,Name},
                token : jwtToken
            })
        }
    } catch (error) {
        res.send({
            message: error,
            success: false,
            data: null,
            token : null
        })
    }
})


router.post('/get-user-by-id', authMiddleware, async (req, res) => {
    try {
        const ExistingUser=await db.User.findByPk(req.body.UserId)
        if(!ExistingUser) {
            return res.send({
                message: 'User does not exists',
                success: false,
                data : null
            })
        }
        return res.send({
            message: 'User Exixts',
            success: true,
            data : ExistingUser
        })
    } catch (error) {
        return res.send({
            message: error.message,
            success: false,
            data : null
        })
    }
})



module.exports=router;










