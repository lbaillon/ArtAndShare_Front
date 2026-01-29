"use client";

import { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./Products.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Empty, Slider, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { SliderRangeProps } from "antd/es/slider";
import { useNavigate } from "react-router-dom";


type Artist = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    title: string;
    photos: string[];
    theme: string;
    type: string;
    value: number;
    purchaseOption: boolean;
    available: boolean;
    artist: Artist;
};

type Filters = {
    availability?: "available" | "unavailable";
    artistId?: string;
    theme?: string;
    type?: string;
    buyable?: "buyable" | "unbuyable";
    priceRange?: [number, number];
};

function Products() {
    const navigate = useNavigate()

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [artistList, setArtistList] = useState<Artist[]>([]);
    const [filters, setFilters] = useState<Filters>({});

    useEffect(() => {
        fetch("http://localhost:9000/products")
            .then((response) => response.json())
            .then((data) => {
                setProductsData(data);
                setAllProducts(data);
            });

        fetch("http://localhost:9000/artists")
            .then((response) => response.json())
            .then((data) => {
                setArtistList(data);
            });
    }, []);

    function goToProductDetail(id: number) {
        navigate(`/products/${id}`)
    }
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
                    onClick={()=>goToProductDetail(data.id)}
                ></img>
            );
        }
    });

    const applyFilters = (filters: Filters) => {
        const filtered = allProducts.filter((product) => {
            if (filters.availability === "available" && !product.available)
                return false;

            if (filters.availability === "unavailable" && product.available)
                return false;

            if (filters.buyable === "buyable" && !product.purchaseOption)
                return false;

            if (filters.buyable === "unbuyable" && product.purchaseOption)
                return false;

            if (
                filters.artistId &&
                product.artist.id.toString() !== filters.artistId
            )
                return false;

            if (filters.theme && product.theme !== filters.theme) return false;

            if (filters.type && product.type !== filters.type) return false;

            if (
                filters.priceRange &&
                (product.value < filters.priceRange[0] ||
                    product.value > filters.priceRange[1])
            )
                return false;

            return true;
        });

        setProductsData(filtered);
    };

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
        const newFilters = {
            ...filters,
            availability: e.key as Filters["availability"],
        };

        setFilters(newFilters);
        applyFilters(newFilters);
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
        const newFilters = {
            ...filters,
            artistId: e.key,
        };

        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const artistProps = {
        items: artistFilter,
        onClick: artistClick,
    };

    const themeFilter: MenuProps["items"] = allProducts
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
        const newFilters = {
            ...filters,
            theme: e.key,
        };

        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const themeProps = {
        items: themeFilter,
        onClick: themeClick,
    };

    const typeFilter: MenuProps["items"] = allProducts
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
        const newFilters = {
            ...filters,
            type: e.key,
        };

        setFilters(newFilters);
        applyFilters(newFilters);
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
        const newFilters = {
            ...filters,
            buyable: e.key as Filters["buyable"],
        };

        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const buyableProps = {
        items: buyable,
        onClick: buyableClick,
    };

    const maxValue: number = allProducts.reduce(
        (accumulator: number, product) => {
            if (accumulator < product.value) {
                accumulator = product.value;
            }
            return accumulator;
        },
        0,
    );

    const minValue: number = allProducts.reduce(
        (accumulator: number, product) => {
            if (accumulator > product.value) {
                accumulator = product.value;
            }
            return accumulator;
        },
        maxValue,
    );

    const [priceRange, setPriceRange] = useState<[number, number]>([
        minValue,
        maxValue,
    ]);
    const onPriceChange: SliderRangeProps["onChange"] = (value) => {
        if (value.length === 2) {
            setPriceRange([value[0], value[1]]);
        }
    };

    const priceFilter: MenuProps["items"] = [
        {
            label: (
                <Slider
                    range={{ draggableTrack: true }}
                    max={maxValue}
                    min={minValue}
                    defaultValue={[minValue, maxValue]}
                    onChange={onPriceChange}
                />
            ),
            key: "priceFilter",
        },
    ];

    const priceClick: MenuProps["onClick"] = () => {
        const newFilters = {
            ...filters,
            priceRange,
        };

        setFilters(newFilters);
        applyFilters(newFilters);
        setPriceRange([minValue, maxValue]);
    };

    const priceProps = {
        items: priceFilter,
        onClick: priceClick,
    };

    const filterLabels = {
        availability: (value: Filters["availability"]) =>
            value === "available" ? "Disponible" : "Non disponible",

        buyable: (value: Filters["buyable"]) =>
            value === "buyable" ? "Achat possible" : "Indisponible à l'achat",

        theme: (value: string) => value,
        type: (value: string) => value,

        artistId: (value: string) =>
            artistList.find((a) => a.id.toString() === value)?.name ??
            "Artiste",

        priceRange: (value: [number, number]) =>
            `Prix : ${value[0]} € – ${value[1]} €`,
    };

    return (
        <div className={styles.main}>
            <div className={styles.headerArea}>
                <Header></Header>
            </div>
            <div className={styles.container}>
                <div className={styles.menuTitle}>Catalogue</div>
                <div className={styles.catalogueMenu}>
                    <div className={styles.productNumber}>
                        {products.length} produits
                    </div>
                </div>
                <div className={styles.filterAndProductContainer}>
                    <div className={styles.filterContainer}>
                        <Dropdown menu={availabilityProps}>
                            <Button
                                icon={<DownOutlined />}
                                iconPlacement="end"
                                className={styles.filterButton}
                            >
                                Disponibilité
                            </Button>
                        </Dropdown>
                        <Dropdown menu={artistProps}>
                            <Button
                                icon={<DownOutlined />}
                                iconPlacement="end"
                                className={styles.filterButton}
                            >
                                Artistes
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
                        <div className={styles.activeFilters}>
                            {Object.entries(filters).map(([key, value]) => {
                                if (!value) return null;

                                const labelFn =
                                    filterLabels[key as keyof Filters];

                                if (!labelFn) return null;

                                return (
                                    <Tag
                                        key={key}
                                        closable
                                        onClose={() => {
                                            const newFilters = { ...filters };
                                            delete newFilters[
                                                key as keyof Filters
                                            ];
                                            setFilters(newFilters);
                                            applyFilters(newFilters);
                                        }}
                                        className={styles.tags}
                                    >
                                        {labelFn(value as never)}
                                    </Tag>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.productsContainer}>{products}</div>
                </div>
            </div>
        </div>
    );
}

export default Products;
