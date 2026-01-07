"use client";

import Header from "../Header/Header";
import styles from "./Products.module.css"

function Products() {
  return (
    <div className={styles.main}>
      <div className={styles.headerArea}>
      <Header></Header>
      </div>
      <div className={styles.container}>
        <div className={styles.menuTitle}>Catalogue</div>
        <div className={styles.catalogueMenu}>
          <div className={styles.display}>display</div>
          <div className={styles.productNumber}>18 produits</div>
          <div className={styles.classBy}>trier part</div>
        </div>
        <div className={styles.filterAndProductContainer}>
          <div className={styles.filterContainer}>filter</div>
          <div className={styles.productsContainer}>products</div>
        </div>
      </div>
    </div>
  )
}

export default Products;