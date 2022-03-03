import styles from "../styles/Footer.module.css"
import Image from 'next/image'
import logo from "../public/img/logo.gif"
import logoentreprise from "../public/img/logoentreprise.png"


const Footer = () => {
  return (
    <div className={styles.footercontainer}>
      <Image className={styles.logo} src={logo} alt="loading..." width={260} height={260}/>
      <ul className={styles.footercontenttext}>
        <p>
        RESSOURCES RELATIONNELLES
        </p>
        <p>
        Immeuble Le Quatrième
        Zone Aéroportuaire de Montpellier Méditerranée
        34130 Mauguio
        </p>
        <a href="mailto:contact@resourcesrelationnelles.fr">contact@resourcesrelationnelles.fr</a>
      </ul>
      <ul className={styles.footercontentpdf}>
        <a href="mentionslegales.pdf" download="mentionslegales.PDF">Mentions légales</a>
        <a href="PolitiqueDeFonctionnalité.pdf" download="PolitiqueDeFonctionnalité.PDF">Politique de confidentialité</a>
        <a href="Conditions.pdf" download="Conditions.PDF">Conditions générales d'utilisation Resources Relationnelles</a>
      </ul>
      <Image className={styles.logoentreprise} src={logoentreprise} alt="loading..." width={260} height={260}/>
      {/* <div class="footer-bottom">
        <p>Copyright &copy;2022 <a href="#">ReSources Relationnelles</a>  </p>
      </div>  */}
      
      
    </div>
  )
}

export default Footer