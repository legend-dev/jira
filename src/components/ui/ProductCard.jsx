import React, { useRef, useState } from 'react';
import ProductCardImg from './ProductCardImg';
import ProductCardColor from './ProductCardColor';
import ProductCardSize from './ProductCardSize';



export default function ProductCard({product}) {

    const imgRef = useRef();

    const [currentProduct, setCurrentProduct] = useState(product.availableColors[0]); 

    const [currentSize, setCurrentSize] = useState(product.availableSizes[0].id);

    const [currentColor, setCurrentColor] = useState(product.availableColors[0].id);

    const [currentImg, setCurrentImg] = useState(product.availableColors[0].imgs[0].id);

    const handleImgClick = (e, id) => {
        imgRef.current.src = e.target.src;
        setCurrentImg(id);
    }

    const handleColorClick = id => {
       let $product =  product.availableColors.find(color => color.id === id);
       setCurrentProduct($product);
       setCurrentImg($product.imgs[0].id);
       setCurrentColor(id);
    }

    const handleSizeClick = id => setCurrentSize(id);
    


   

    return (
       <>
           <div className="product-card d-flex align-items-center">
                <div className="product-card-img w-50">
                    <div className="sub-imgs">
                        {
                            currentProduct.imgs.map(img => (
                                <ProductCardImg 
                                    key={img.id}
                                    id={img.id} 
                                    src={img.img}
                                    active={currentImg === img.id ? true : false}
                                    handleImgClick={handleImgClick}
                                />
                            ))
                        }
                    </div>
                    <img ref={imgRef} src={currentProduct.imgs[0].img} alt="shoe" className="main-img"/>
                </div>
                <div className="product-card-info w-50">
                    <div className="product-price">${product.price}</div>
                    <div className="product-info">
                        <h2>{product.title}</h2>
                        <span>{product.collection} COLLECTION</span>
                        <h4>Product Info:</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            enim nemo veritatis aliquid
                            eligendi quisquam vero? Esse, aliquid culpa.
                        </p>
                    </div>
                    <div className="product-card-custom">
                        <div className="product-colors d-flex align-items-center">
                            <p>Colors:</p>
                           {
                               product.availableColors.map(color => (
                                    <ProductCardColor 
                                        key={color.id}
                                        id={color.id} 
                                        color={color.color}
                                        active={currentColor === color.id ? true : false}
                                        handleColorClick={handleColorClick}
                                    />
                               ))
                           }
                        </div>
                        <div className="product-sizes d-flex align-items-center">
                            <p>Sizes:</p>
                            {
                                product.availableSizes.map(s => (
                                    <ProductCardSize 
                                        key={s.id} 
                                        id={s.id} 
                                        size={s.size} 
                                        handleSizeClick={handleSizeClick}
                                        active={s.id === currentSize ? true : false}     
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-dark w-50 mb-2 mx-auto">ADD TO CART</button>
                        <p>Add To Whishlist</p>
                    </div>
                </div>
                
           </div>
       </>
    )
}
