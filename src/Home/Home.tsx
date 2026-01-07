"use client";

import Header from "../Header/Header";
import styles from "./Home.module.css"

function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.headerArea}>
      <Header></Header>
      </div>
      <div className={styles.container}>
        coucou
      </div>
    </div>
  )
}

export default Home;