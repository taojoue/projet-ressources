const db = require('./queries');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1234;
const { compare } = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
const session=require('express-session');
const flash=require('express-flash');
const {pool} =require("./queries");
const passport=require("passport");
const initializePassport=require("./passportConfig");

initializePassport(passport);

app.use(session({
    secret:'secret',

    resave:false,

    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.set ("view engine", "ejs");
app.use(express.urlencoded({ extended: false} ));

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

app.get("/users/register", (req,res) => {
    res.render("register");
});

app.get("/users/login", (req,res) => {
    res.render("login");
});

app.get("/users/dashboard", checkAuthenticated, (req,res) => {
    res.render("dashboard", { user: req.user.pseudoUtilisateur });
});

app.get("/users/logout", (req,res)=>{
    req.logOut();
    req.flash("success_msg","Vous venez de vous déconnecter");
    res.redirect("/users/login");
});

app.post("/users/register", async (req, res) => {
    
    let errors=[];
    let {nomUtilisateur, prenomUtilisateur, pseudoUtilisateur, mailUtilisateur, mdpUtilisateur, checkPassword}=req.body;
    let mdpHash= await bcrypt.hash(mdpUtilisateur,1);

    console.log({
        nomUtilisateur,
        prenomUtilisateur,
        pseudoUtilisateur,
        mailUtilisateur,
        mdpUtilisateur,
        checkPassword,
        mdpHash
     });
     
    pool.query(
        'SELECT * FROM compte WHERE "mailUtilisateur"=$1', [mailUtilisateur], (error, result)=>{
            if (error){
                throw error
            }
            console.log('Requête lancée');
            console.log(result.rows);

            if (result.rows.length > 0){
                errors.push({ message: "Ce mail est déjà utilisé"});
                console.log(errors);
                res.render("register", {errors});

            }
            else {
                pool.query(
                    'INSERT INTO compte ("prenomUtilisateur","nomUtilisateur","pseudoUtilisateur","mailUtilisateur","mdpUtilisateur","dateCreationUtilisateur") VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING * ', [prenomUtilisateur,nomUtilisateur,pseudoUtilisateur,mailUtilisateur,mdpHash],
                    (error,result) => {
                        if(error){
                            throw error;
                        }
                        console.log(result.rows);
                        req.flash("success_msg","Vous êtes maintenant enregistré. Veuillez vous connecter");
                        res.redirect('/users/login');
                    }
                )
            }
        }
    )
});

app.post("/users/login", passport.authenticate("local",{
    successRedirect:"/users/dashboard",
    failureRedirect:"/users/login",
    failureFlash:true
})
);

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/users/login");
}

app.get('/users', db.getUsers);
app.get('/addUsers', db.addUsers);
// app.get('/users/:id', db.getUserById);
// app.get('/updateUsers/:name', db.updateUsers);
app.get('/updateUsers', db.updateUsers);
app.get('/getNbrCommentaires', db.getNbrCommentaires);
app.get('/addRessources', db.addRessources);
app.get('/deleteRessources', db.deleteRessources);
app.get('/getRessources', db.getRessources);
app.get('/updateRessources', db.updateRessources);
