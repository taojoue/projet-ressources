// import { Pool } from "pg";
//import("./other.js");
require('dotenv').config();
//// Hash mdp (à enlever et récupérer directement dans 'other.js')
const { compare } = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');


const Pool = require('pg-pool');
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABAS_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const message = console.log('Test queries.js');
//////////////////////////////////////////////////////////  U S E R S //////////////////////////////////////////////////////////////////////////
const getUsers = (request, response) => {
    pool.query('SELECT * FROM compte', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}


const addUsers = (request, response) => {
    const prenomUtilisateur="Elies";
    const nomUtilisateur="TEST";
    const pseudoUtilisateur="elitesto";
    const mdpUtilisateur="mdptest";
    const mailUtilisateur="test@test.fr"
    // const mdpCrypte = bcrypt.hashSync(mdpUtilisateur,1);

    pool.query('INSERT INTO compte ("prenomUtilisateur","nomUtilisateur","pseudoUtilisateur","mailUtilisateur","mdpUtilisateur","dateCreationUtilisateur") VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING * ', [prenomUtilisateur,nomUtilisateur,pseudoUtilisateur,mailUtilisateur,mdpUtilisateur], (error, results) => {
        if (error) {
            throw error
        }        
        response.status(200).json(results.rows)
    })
}


const updateUsers = (request, response) => {
    const nouveauPrenom="WWWWWWAAAAAAAAAAAAEEEEEEEEEEE";
    pool.query('UPDATE compte SET "prenomUtilisateur" = $1 WHERE "idCompte"=2 RETURNING "idCompte", "prenomUtilisateur", NOW() ', [nouveauPrenom], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
        // response.redirect('/users')
    })
}

// const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)

//     pool.query('SELECT * FROM "Compte" WHERE "idCompte" = $1', [id], (error, results) => {
//         if (error) {
//             throw error;
//         }
//         // response.status(200).json(results.rows);
//         // var reponse = Response.redirect(url,status);
//         reponse.redirect('/users', 200);
//     })
// }

// const createUser = (request, response) => {
//     const { name, email } = request.body

//     pool.query('INSERT INTO "Compte" (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send(`User added with ID: ${result.insertId}`)
//     })
// }

// const updateUsers2 = (request, response) => {
//     const { name } = request.body;
//     console.log(name);
//     pool.query('INSERT INTO "Compte" ("nomUtilisateur") VALUES ($1)', [name], (error, results) => {
//         if (error) {
//             throw error
//         }        
//         // response.status(200).json(results.rows);
//         response.redirect('/users');
//     })
// }
//////////////////////////////////////////////////////////  C O M M E N T A I R E S /////////////////////////////////////////////////////////////////
const getNbrCommentaires = (request, response) => {
    const idUser="2";
    pool.query('SELECT count(commentaire."idCommentaire") FROM commentaire, compte WHERE compte."idCompte"=$1', [idUser], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
        // response.redirect('/users')
    })
}

//////////////////////////////////////////////////////////  R E S S O U R C E S /////////////////////////////////////////////////////////////////
const getRessources = (request, response) => {
    pool.query('SELECT * FROM ressource WHERE "lienRessource" is not null ORDER BY "dateRessource" asc ', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const addRessources = (request, response) => {
    const titreRessouce="test";
    const categorieRessource="ttest";
    const typeRessource="tttest";
    const typeRelationRessource="ttttest";
    const lienRessource="ttttestLIENRESSOURCE";
    // const mdpCrypte = bcrypt.hashSync(mdpUtilisateur,1);

    pool.query('INSERT INTO ressource ("titreRessource","categorieRessource","typeRessource","typeRelationRessource","favorisRessource","dateRessource","lienRessource") VALUES ($1,$2,$3,$4,false,NOW(),$5) RETURNING * ', [titreRessouce,categorieRessource,typeRessource,typeRelationRessource,lienRessource], (error, results) => {
        if (error) {
            throw error
        }        
        response.status(200).json(results.rows)
    })
}

const deleteRessources = (request, response) => {
    pool.query('DELETE FROM ressource WHERE "idRessource"=21 RETURNING *', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const updateRessources= (request, response) => {
    const titreRessource="titre changé";
    pool.query('UPDATE ressource SET "titreRessource" = $1 WHERE "idRessource"=14 RETURNING "titreRessource" ', [titreRessource], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
        // response.redirect('/users')
    })
}

module.exports = {
    message,
    pool,
    getUsers,
    //getUserById,
    //createUser,
    updateUsers,
    addUsers,
    getNbrCommentaires,
    addRessources,
    deleteRessources,
    getRessources,
    updateRessources
}