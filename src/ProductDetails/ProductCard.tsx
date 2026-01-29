"use client";

import styles from "./ProductCard.module.css";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Empty } from "antd";

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
    description: string;
};

function ProductCard() {
    const params = useParams();
    const [productDetails, setProductDetails] = useState<Product>();
    const [displayImg, setDisplayImg] = useState<string>("")


    useEffect(() => {
        fetch(`http://localhost:9000/products/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setProductDetails(data);
                setDisplayImg(data.photos[0])
            });
    }, []);


        const pictures = productDetails?.photos.map((data, i) => {
        if (productDetails.photos.length === 0) {
            return <Empty description="Aucun produit trouvé" />;
        } else {
            return (
                <img
                    key={i}
                    className={styles.miniImage}
                    alt={productDetails.title}
                    src={data}
                    onClick={()=> setDisplayImg(data)}
                ></img>
            );
        }
    });

    return (
        <div className={styles.main}>
            <div className={styles.headerArea}>
                <Header></Header>
            </div>
            <div className={styles.container}>
                <div className={styles.productContainer}>
                    <div className={styles.imagesAndDescription}>
                        <div className={styles.images}>
                            <div className={styles.imagesMiniatures}>{pictures}</div>
                            <div className={styles.imagesPrincipale}>
                                <img className={styles.imagesDiplay} src={displayImg}></img>
                            </div>
                        </div>
                        <div className={styles.description}>{productDetails?.description}</div>
                    </div>
                    <div className={styles.titleAndRent}>titre</div>
                </div>
                <div className={styles.carouselContainer}>carrousel
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
