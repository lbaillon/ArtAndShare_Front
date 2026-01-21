"use client";

import { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./Products.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

type Product = {
    title: string;
    photos: string[];
};

type Artist = {
    id: number;
    name: string;
};

function Products() {
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [artistList, setArtistList] = useState<Artist[]>([]);

    useEffect(() => {
        fetch("http://localhost:9000/products")
            .then((response) => response.json())
            .then((data) => {
                setProductsData(data);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:9000/artists")
            .then((response) => response.json())
            .then((data) => {
                setArtistList(data);
            });
    }, []);

    const products = productsData.map((data, i) => {
        return (
            <img
                key={i}
                className={styles.productImage}
                alt={data.title}
                src={data.photos[0]}
            ></img>
        );
    });

    // const filterTable = [
    //     "disponibilité",
    //     "artiste",
    //     "thème",
    //     "type d'oeuvre",
    //     "valeur de l'oeuvre",
    //     "possibilité d'achat",
    //     "tarif de location",
    // ];

    const availability: MenuProps["items"] = [
        {
            label: "disponible",
            key: "1",
        },
        {
            label: "non disponible",
            key: "2",
        },
    ];

    const availabilityClick: MenuProps["onClick"] = (e) => {
        console.log("dipo?", e);
    };

    const availabilityProps = {
        items: availability,
        onClick: availabilityClick,
    };
    
    
    const artistFilter: MenuProps["items"] = artistList.map((artist) => ({
        label: artist.name,
        key: artist.id.toString(),
    }));

    const artistClick: MenuProps["onClick"] = (e) => {
        console.log("artiste clické", e);
    };

    const artistProps = {
        items: artistFilter,
        onClick: artistClick,
    };

    //pour ne pas afficher 0 produits
    if (products.length === 0) {
        return null;
    }

    return (
        <div className={styles.main}>
            <div className={styles.headerArea}>
                <Header></Header>
            </div>
            <div className={styles.container}>
                <div className={styles.menuTitle}>Catalogue</div>
                <div className={styles.catalogueMenu}>
                    <div className={styles.display}>display</div>
                    <div className={styles.productNumber}>
                        {products.length} produits
                    </div>
                    <div className={styles.classBy}>trier part</div>
                </div>
                <div className={styles.filterAndProductContainer}>
                    <div className={styles.filterContainer}>
                        <Dropdown menu={availabilityProps}>
                            <Button icon={<DownOutlined />} iconPlacement="end" className={styles.filterButton}>
                                disponibilité
                            </Button>
                        </Dropdown>
                        <Dropdown menu={artistProps}>
                            <Button icon={<DownOutlined />} iconPlacement="end" className={styles.filterButton}>
                                artistes
                            </Button>
                        </Dropdown>
                    </div>
                    <div className={styles.productsContainer}>{products}</div>
                </div>
            </div>
        </div>
    );
}

export default Products;
