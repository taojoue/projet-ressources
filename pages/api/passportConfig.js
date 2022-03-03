const LocalStrategy=require("passport-local").Strategy;
const {pool}=require("./queries");
const bcrypt=require("bcrypt");

function initialize(passport){
    console.log('INITIA');
    const authenticateUser = (mailUtilisateur,mdpUtilisateur, done)=>{
        console.log('AUTH');

        pool.query(
            'SELECT * FROM compte WHERE "mailUtilisateur"=$1',[mailUtilisateur],
            (err,results) => {
                if(err) {
                    throw err;
                }
                console.log(results.rows);
                console.log('APRES REQUETE');

                if(results.rows.length > 0){
                    console.log('AVANT COMPARAISON MDP');
                    const user=results.rows[0];
                    bcrypt.compare(mdpUtilisateur, user.mdpUtilisateur, (err, isMatch)=>{
                        if (err){
                            throw err
                        }
                        
                        if (isMatch){
                            return done(null, user);
                        }
                        else {
                            return done(null, false, {message:"Mot de passe incorrecte"});
                        }
                    });
                    console.log(mdpUtilisateur);
                }
                else{
                    return done(null, false, {message:"L'email n'est pas enregistré"});
                }

            }
        );
    };
    console.log('APRES INIT PASS');
    passport.use(
        new LocalStrategy(
            {
                usernameField:"mailUtilisateur",
                passwordField:"mdpUtilisateur",
            },
            authenticateUser
        )
    );
    console.log('APRES PASS USE');

    passport.serializeUser((user, done) => done(null, user.idCompte));
    console.log('SERIAL');

    passport.deserializeUser((idCompte,done)=>{
        pool.query(
            'SELECT * FROM compte WHERE "idCompte"=$1', [idCompte], (err, results)=>{
                if (err){
                    throw err
                }
                return done(null, results.rows[0]);
            });
        });
    }
    
module.exports = initialize;
