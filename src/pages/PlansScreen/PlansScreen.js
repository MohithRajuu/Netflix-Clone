import React, { useEffect, useState } from 'react';
import './PlansScreen.css';
import db from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/counter/userSlice';
import { loadStripe } from '@stripe/stripe-js';

const PlansScreen = () => {

    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubsription] = useState(null);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubsription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
    }, [user.uid])

    useEffect(() => {
        db.collection('products').where("active", "==", true)
        .get().then(querySnapshot => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ("prices").get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);
        })
    }, [])
    
    const loadCheckout = async (priceId) => {
        const docRef = await db
        .collection('customers')
        .doc(user.uid)
        .collection('checkout_sessions')
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if(error) {
                alert(`An error occured: ${error.message}`);
            }

            if(sessionId){
                const stripe = await loadStripe('pk_test_51Iv3i0SIjm7RGu6bEWOsCAzGPpsHOUWy6LRR5quPiBLapBgluRBJeH2bHJOjGhHbidLL50CsxYkdTT3PAB1XjJ9j00All37Fgy');
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }
    console.log(subscription);
    return (
        <div className="plansScreen">
            <br />
            {subscription && <p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                // add logic to check if user subscription is active
                console.log(productData.name)
                console.log(subscription?.role)
                let isCurrentPackage = false;
                if(productData.name === subscription?.role){
                    isCurrentPackage = true;
                };
                return(
                    <div key = {productId}>
                        <div className={`${isCurrentPackage && "plansScreen__plan__disabled"} plansScreen__plan`}>
                            <div className="plansScreen__info">
                                <h5>{productData.name}</h5>
                                <h6>{productData.description}</h6>
                            </div>

                            <button onClick={() => 
                                    !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                                {isCurrentPackage ? 'Current Plan' : 'Subscribe'}
                            </button>
                        </div>  
                    </div>
                
                );
            })}
        
        </div>
    
  
)};

export default PlansScreen;
