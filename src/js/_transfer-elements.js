import TransferElements from './vendors/transfer-elements.esm.min.js';

export function transferElementsInit() {

    const productDetail = document.querySelector('.product-detail');
    if (productDetail) {

        const productDetailSlider = document.querySelector('.product-detail__slider');
        const forProductDetailSlider = document.querySelector('.product-detail__desktop-row-item .product-detail__row:nth-child(1)');
        if (productDetailSlider && forProductDetailSlider) 
        {
            new TransferElements({
                sourceElement: productDetailSlider,
                breakpoints: {
                    768: {
                        targetElement: forProductDetailSlider
                    }
                }
            });
        }

        const productDetailShops = document.querySelector('.product-detail__shops');
        const forProductDetailShops = document.querySelector('.product-detail__desktop-row-item .product-detail__row:nth-child(2)');
        if (productDetailShops && forProductDetailShops) 
        {
            new TransferElements({
                sourceElement: productDetailShops,
                breakpoints: {
                    768: {
                        targetElement: forProductDetailShops
                    }
                }
            });
        }

        if (forProductDetailShops) {
            new TransferElements({
                sourceElement: forProductDetailShops,
                breakpoints: {
                    768: {
                        targetElement: productDetail
                    }
                }
            });
        }

        if (forProductDetailSlider) {
            new TransferElements({
                sourceElement: forProductDetailSlider,
                breakpoints: {
                    768: {
                        targetElement: productDetail
                    }
                }
            });
        }
    }
}