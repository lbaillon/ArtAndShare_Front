"use client";

import styles from "./Header.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { faSackDollar} from "@fortawesome/free-solid-svg-icons";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";





function Header() {
  const navigate = useNavigate()

  const goToProducts = () => {
    navigate("/products");
  }

  const goHome = () => {
    navigate("/")
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img onClick={goHome} className={styles.logo} alt="logo" src="https://res.cloudinary.com/djvbcdtwl/image/upload/v1763113565/logoArt_jdlsld.png"></img>
        </div>
        <div className={styles.titleContainer}>Art&Share</div>
        <div className={styles.inconsContainer}>
          <FontAwesomeIcon className={styles.icon} icon={faUserAstronaut}/>
          <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass}/>
          <FontAwesomeIcon className={styles.icon} icon={faSackDollar}/>
          <FontAwesomeIcon className={styles.icon} icon={faHeart}/>
        </div>
      </div>
      <div className={styles.menu}>
        <button className={styles.button} onClick={goToProducts}>Oeuvres</button>
        <button className={styles.button}>Artistes</button>
        <button className={styles.button}>Thèmes</button>
        <button className={styles.button}>Formules</button>
        <button className={styles.button}>Contact</button>
      </div>
    </div>
  )
}

export default Header;