import React, {useState, useEffect} from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";

const Cart = () => {
    const [reload, setReload] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload])

    const loadAllProducts = (products) => {
        if(products.length>0){
            return (
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div key={index} className="col-sm-12 col-md-6 co-12 mb-4" sm>
                                <Card
                                    key={index}
                                    product={product}
                                    removeFromCart={true}
                                    addtoCart={false}
                                    reload={reload}
                                    setReload={setReload}
                                />
                            </div>
                        )
                    })}
                </div>
            );
        } else {
            return (
                <div>
                    <h1>No Products in Cart</h1>
                </div>
            );
        }
    };

    const loadCheckout = () => {
        return (
            <div>
                <h1>Checkout</h1>
            </div>
        );
    };

    return (
        <Base title="Cart Page" description="Welcome to checkout">
            <div className="row text-center">
                <div className="col-6">
                    {loadAllProducts(products)}
                </div>
                <div className="col-6">
                    {products.length > 0 ? (
                        <PaymentB products={products} setReload={setReload}/>
                    ) : (
                        <h3>Please Login or add something in cart</h3>
                    )}
                </div>
            </div>
        </Base>
    );
};

export default Cart;