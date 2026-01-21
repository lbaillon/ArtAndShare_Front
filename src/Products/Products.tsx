"use client";

import { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./Products.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Empty, Slider } from "antd";
import { DownOutlined } from "@ant-design/icons";

type Product = {
    id: number;
    title: string;
    photos: string[];
    theme: string;
    type: string;
    value: number;
    purchaseOption: boolean;
    available: boolean;
};

type Artist = {
    id: number;
    name: string;
};

function Products() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [artistList, setArtistList] = useState<Artist[]>([]);

    useEffect(() => {
        fetch("http://localhost:9000/products")
            .then((response) => response.json())
            .then((data) => {
                setProductsData(data);
                setAllProducts(data)
            });

        fetch("http://localhost:9000/artists")
            .then((response) => response.json())
            .then((data) => {
                setArtistList(data);
            });
    }, []);

    const products = productsData.map((data) => {
        if (productsData.length === 0) {
            return <Empty description="Aucun produit trouvé" />;
        } else {
            return (
                <img
                    key={data.id}
                    className={styles.productImage}
                    alt={data.title}
                    src={data.photos[0]}
                ></img>
            );
        }
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
            key: "available",
        },
        {
            label: "non disponible",
            key: "unavailable",
        },
    ];

    const availabilityClick: MenuProps["onClick"] = (e) => {
        const filteredProducts = allProducts.filter((product) => {
            if (e.key === "available") {
                return product.available;
            }
            if (e.key === "unavailable") {
                return !product.available;
            }
        });

        setProductsData(filteredProducts);
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
        console.log("artiste cliqué", e);
    };

    const artistProps = {
        items: artistFilter,
        onClick: artistClick,
    };

    const themeFilter: MenuProps["items"] = productsData
        .reduce((accumulator: string[], product) => {
            if (!accumulator.includes(product.theme)) {
                accumulator.push(product.theme);
            }
            return accumulator;
        }, [])
        .map((theme: string) => ({
            label: theme,
            key: theme,
        }));

    const themeClick: MenuProps["onClick"] = (e) => {
        console.log("thème cliqué", e);
    };

    const themeProps = {
        items: themeFilter,
        onClick: themeClick,
    };

    const typeFilter: MenuProps["items"] = productsData
        .reduce((accumulator: string[], product) => {
            if (!accumulator.includes(product.type)) {
                accumulator.push(product.type);
            }
            return accumulator;
        }, [])
        .map((type: string) => ({
            label: type,
            key: type,
        }));

    const typeClick: MenuProps["onClick"] = (e) => {
        console.log("type cliqué", e);
    };

    const typeProps = {
        items: typeFilter,
        onClick: typeClick,
    };

    const buyable: MenuProps["items"] = [
        {
            label: "achat possible",
            key: "buyable",
        },
        {
            label: "indisponible à l'achat",
            key: "unbuyable",
        },
    ];

    const buyableClick: MenuProps["onClick"] = (e) => {
        console.log("dipo à l'achat ?", e);
    };

    const buyableProps = {
        items: buyable,
        onClick: buyableClick,
    };

    const maxValue: number = productsData.reduce(
        (accumulator: number, product) => {
            if (accumulator < product.value) {
                accumulator = product.value;
            }
            return accumulator;
        },
        0
    );

    const minValue: number = productsData.reduce(
        (accumulator: number, product) => {
            if (accumulator > product.value) {
                accumulator = product.value;
            }
            return accumulator;
        },
        maxValue
    );

    const priceFilter: MenuProps["items"] = [
        {
            label: (
                <Slider
                    range={{ draggableTrack: true }}
                    max={maxValue}
                    min={minValue}
                    defaultValue={[minValue, maxValue]}
                />
            ),
            key: "1",
        },
    ];

    const priceClick: MenuProps["onClick"] = (e) => {
        console.log("prix choisi", e);
    };

    const priceProps = {
        items: priceFilter,
        onClick: priceClick,
    };

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
                            <Button
                                icon={<DownOutlined />}
                                iconPlacement="end"
                                className={styles.filterButton}
                            >
                                disponibilité
                            </Button>
                        </Dropdown>
                        <Dropdown menu={artistProps}>
                            <Button
                                icon={<DownOutlined />}
                                iconPlacement="end"
                                className={styles.filterButton}
                            >
                                artistes
                            </Button>
                        </Dropdown>
                        <Dropdown menu={themeProps}>
                            <Button
                                icon={<DownOutlined />}
                                iconPlacement="end"
                                className={styles.filterButton}
                            >
                                Thème
                            </Button>
                        </Dropdown>
                        <Dropdown menu={typeProps}>
                            <Button
                                icon={<DownOutlined />}
                                iconPlacement="end"
                                className={styles.filterButton}
                            >
                                Type d'oeuvre
                            </Button>
                        </Dropdown>
                        <Dropdown menu={buyableProps}>
                            <Button
                                icon={<DownOutlined />}
                                iconPlacement="end"
                                className={styles.filterButton}
                            >
                                Possibilité d'achat
                            </Button>
                        </Dropdown>
                        <Dropdown menu={priceProps}>
                            <Button
                                icon={<DownOutlined />}
                                iconPlacement="end"
                                className={styles.filterButton}
                            >
                                Valeur de l'oeuvre
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
