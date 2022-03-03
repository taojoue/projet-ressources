function signUp() {
    return (
    <div>
        <body>
            <h1>Register</h1>
            <form action="/users/register" method="POST">
                <div>
                    <input type="text" id="nomUtilisateur" name="nomUtilisateur" placeholder="Nom" required/>
                </div>
                <div>
                    <input type="text" id="prenomUtilisateur" name="prenomUtilisateur" placeholder="Prénom" required/>
                </div>
                <div>
                    <input type="text" id="pseudoUtilisateur" name="pseudoUtilisateur" placeholder="Pseudo" required/>
                </div>
                <div>
                    <input type="email" id="mailUtilisateur" name="mailUtilisateur" placeholder="Email" required/>
                </div>
                <div>
                    <input type="password" id="mdpUtilisateur" name="mdpUtilisateur" placeholder="Mot de passe" required/>
                </div>
                <div>
                    <input type="password" id="checkPassword" name="checkPassword" placeholder="Confirmation mot de passe" required/>
                </div>
                <div>
                    <input type="submit" value="Register" />
                </div>
                <a href="/sign-in">Vous avez déjà un compte? Connectez-vous ici</a>
            </form>
        </body>
    </div>
    );
}

export default signUp