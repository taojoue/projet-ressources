require('dotenv').config();
const { compare } = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');

const message = console.log('Test other.js');

///////////////////////////////////////////////////// HASH MDP ////////////////////////////////////////////////////////////////////////
const motDePasseUtilisateur="mdptest";
const motDePasseCompare="testmdp";
const motDePasseCrypte1 = bcrypt.hashSync(motDePasseUtilisateur,1);
const motDePasseCrypte2 = bcrypt.hashSync(motDePasseUtilisateur,2);
// 'motDePasseCrypte1' et 'motDePasseCrypte2' ne sont pas identiques, mais ils sont tous les 2 égaux à 'motDePasseUtilisateur'

console.log(motDePasseUtilisateur);
console.log(motDePasseCrypte1);
console.log(motDePasseCrypte2);

const comparaisonMdp1= bcrypt.compare(motDePasseUtilisateur, motDePasseCrypte1, function(err, res){
    console.log(res);
    console.log(err);
    if (res) 
    console.log('1Le MDP est bueno'); 
    if (err) 
    console.log('1erreur de mot de passe');
    return;
})

const comparaisonMdp2= bcrypt.compare(motDePasseUtilisateur, motDePasseCrypte2, function(err, res){
    console.log(res);
    console.log(err);
    if (res) 
    console.log('2Le MDP est bueno'); 
    if (err) 
    console.log('2erreur de mot de passe');
      return;
})

// test FAUX 
const comparaisonMdp3= bcrypt.compare(motDePasseCompare, motDePasseCrypte2, function(err, res){
    console.log(res);
    console.log(err);
    if (res) 
    console.log('3Le MDP est bueno'); 
    if (err) 
    console.log('3erreur de mot de passe');
      return;
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



