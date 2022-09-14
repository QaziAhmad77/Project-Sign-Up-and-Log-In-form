const express = require('express');
const router = express.Router();
const homeSchema = require('../models/homeSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.get('/', function (req, res) {
    res.render('register', {
        title: "",
        password: " ",
        email: " "
    })
});

router.post('/register', async function (req, res) {
    try {
        const { name, number, email, password, cpassword } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12)
        if (password === cpassword) {
            const userData = new homeSchema({
                name: name,
                number: number,
                email: email,
                password: hashedPassword
            })
            await userData.save(err => {
                if (err) {
                    // res.render('register', {
                    //     title: "Email already exists",
                    //     password: " ",
                    //     email: " "
                    // })
                    console.log(err);
                }
                else {
                    res.render('register', {
                        title: "Done",
                        password: " ",
                        email: " "
                    })
                }
            })

            // const userEmail = await homeSchema.findOneAndRemove("6304d3685caecfe4d2b804eb");
            // console.log(userEmail);
            // const userEmail = await homeSchema.findById("6304d3685caecfe4d2b804eb");
            // console.log(userEmail);
            
            // Email validation
            const userEmail = await homeSchema.findOne({email});
            console.log(userEmail);
            if(email === userEmail.email){
                res.render('register', {
                    title: "",
                    password: " ",
                    email: "Email already exists please choose another email"
                })
            }
            else{
                console.log("error");
            }
        }
        else {
            res.render('register', {
                title: "",
                password: "Password not matching",
                email: " "
            })
        }

    } catch (error) {
        console.log(error);
        res.render('register', {
            title: "Please first fill the form",
            password: " ",
            email: " "
        })
    }
});

// singin

router.post('/login',function(req,res) {
    const {email, password} = req.body;
    homeSchema.findOne({email},(err,result)=>{
        if(email === result.email && password === result.password){
        result = result.toJSON();
        delete result.password;
        console.log(result);
            res.render('logedin',{
                name: result.name
            })
        }
        else if(password != result.password){
            res.send("Password is in correct");
        }
        else{
            res.send("Email and Password both are in correct correct");
        }
    })
});


module.exports = router;


// async function login(req, res) {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res.status(400).send("Required fields can't be empty");
//       }
  
//       let student = await Students.findOne({ email });
//       if(!student) {
//         return res.status(404).send("Email doesn't exist");
//       }
  
//       const result = await bcrypt.compare(password, student.password);
//       if(!result) {
//         return res.status(401).send("Password is incorrecct");
//       }
  
//       student = student.toJSON();
//       delete student.password;
    //   const token = jwt.sign({
    //     student: student
    //   }, "first-token")
  
    //   res.status(200).send({
    //     token, student
    //   });
      
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Something went wrong!");
//     }
//   }