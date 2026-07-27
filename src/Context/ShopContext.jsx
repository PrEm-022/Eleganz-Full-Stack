import React, { createContext, useState, useEffect } from "react";
import all_product_data from "../Components/Assets/all_products";
import { auth } from "../../Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";


export const ShopContext = createContext(null);

const fallbackProducts = all_product_data.map(product => ({
    ...product,
    new_price: product.new_price * 50,
    old_price: product.old_price * 50
}));

const fallbackOrders = [
  {
    id: "ORD-1720257000000",
    fullName: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 9988776655",
    address: "45, Prestige Enclave",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    paymentMethod: "UPI",
    items: [
      { id: 1, name: "Dark Blue Mens Oversized Fur Jacket", size: "L", quantity: 1, price: 2250 }
    ],
    totalAmount: 2250,
    date: "06/07/2026",
    status: "Delivered"
  },
  {
    id: "ORD-1720258000000",
    fullName: "Ananya Patel",
    email: "ananya@example.com",
    phone: "+91 9876543219",
    address: "12, Green Glen Layout",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    paymentMethod: "Card",
    items: [
      { id: 3, name: "Blue Coloured Stylish Denim Shirt", size: "M", quantity: 2, price: 2000 }
    ],
    totalAmount: 4000,
    date: "06/07/2026",
    status: "Shipped"
  },
  {
    id: "ORD-1720259000000",
    fullName: "Rahul Verma",
    email: "rahul@example.com",
    phone: "+91 9123456780",
    address: "8B, Sector 15",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122001",
    paymentMethod: "COD",
    items: [
      { id: 2, name: "Brown Mens Leather Jacket", size: "XL", quantity: 1, price: 2000 },
      { id: 36, name: "Cute Pink Gown for Girls", size: "S", quantity: 1, price: 4500 }
    ],
    totalAmount: 6500,
    date: "06/07/2026",
    status: "Pending"
  }
];

const fallbackCustomers = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", phone: "+91 9988776655", joined: "12/05/2026" },
  { id: 2, name: "Ananya Patel", email: "ananya@example.com", phone: "+91 9876543219", joined: "18/06/2026" },
  { id: 3, name: "Rahul Verma", email: "rahul@example.com", phone: "+91 9123456780", joined: "01/07/2026" }
];

const ShopContextProvider = (props)=>{  

    const [all_product, setAllProduct] = useState(fallbackProducts);
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState(fallbackOrders);
    const [customers, setCustomers] = useState(fallbackCustomers);
    const [user, setUser] = useState(null);

    const API_BASE = "http://localhost:4000";

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE}/products`);
            if (response.ok) {
                const data = await response.json();
                const formatted = data.map(p => {
                    const originalItem = fallbackProducts.find(item => item.id === Number(p.id));
                    return {
                        ...p,
                        image: originalItem ? originalItem.image : p.image,
                        new_price: p.new_price < 200 ? p.new_price * 50 : p.new_price,
                        old_price: p.old_price < 200 ? p.old_price * 50 : p.old_price
                    };
                });
                setAllProduct(formatted);
            }
        } catch (e) {
            console.log("Using fallback products list");
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${API_BASE}/orders`);
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (e) {
            console.log("Using fallback orders list");
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${API_BASE}/customers`);
            if (response.ok) {
                const data = await response.json();
                setCustomers(data);
            }
        } catch (e) {
            console.log("Using fallback customers list");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchOrders();
        fetchCustomers();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                currentUser.getIdToken().then((token) => {
                    localStorage.setItem("auth-token", token);
                });
            } else {
                localStorage.removeItem("auth-token");
            }
        });
        return () => unsubscribe();
    }, []);

    const addToCart = (itemId, size) => {
        const key = `${itemId}-${size}`;
        setCartItems((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    }

    const removeFromCart = (itemId, size) => {
        const key = `${itemId}-${size}`;
        setCartItems((prev) => {
            const nextCart = { ...prev };
            if (nextCart[key] > 1) {
                nextCart[key] -= 1;
            } else {
                delete nextCart[key];
            }
            return nextCart;
        });
    }

    const clearCart = () => {
        setCartItems({});
    }

    const addProduct = async (newProduct) => {
        const nextId = all_product.length > 0 ? Math.max(...all_product.map(p => p.id)) + 1 : 1;
        const productToAdd = { ...newProduct, id: nextId };

        try {
            const response = await fetch(`${API_BASE}/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productToAdd)
            });
            if (response.ok) {
                fetchProducts();
                return;
            }
        } catch (e) {
            console.log("Add product to server failed");
        }
        setAllProduct(prev => [...prev, productToAdd]);
    };

    const removeProductFromCatalog = async (productId) => {
        try {
            const response = await fetch(`${API_BASE}/products/${productId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchProducts();
                return;
            }
        } catch (e) {
            console.log("Delete product from server failed");
        }
        setAllProduct(prev => prev.filter(product => Number(product.id) !== Number(productId)));
    };

    const addOrder = async (orderInfo) => {
        const nextOrder = {
            ...orderInfo,
            id: `ORD-${Date.now()}`,
            date: new Date().toLocaleDateString(),
            status: "Pending"
        };

        try {
            const response = await fetch(`${API_BASE}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nextOrder)
            });
            if (response.ok) {
                fetchOrders();
                return;
            }
        } catch (e) {
            console.log("Add order to server failed");
        }
        setOrders(prev => [...prev, nextOrder]);
    };

    const addCustomer = async (customerData) => {
        const nextId = customers.length > 0 ? Math.max(...customers.map(c => Number(c.id) || 0)) + 1 : 1;
        const newCustomer = {
            id: nextId,
            name: customerData.name || "Customer",
            email: customerData.email,
            phone: customerData.phone || "",
            joined: new Date().toLocaleDateString()
        };

        try {
            const response = await fetch(`${API_BASE}/customers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCustomer)
            });
            if (response.ok) {
                fetchCustomers();
                return;
            }
        } catch (e) {
            console.log("Add customer to server failed");
        }
        setCustomers(prev => [...prev, newCustomer]);
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await fetch(`${API_BASE}/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                fetchOrders();
                return;
            }
        } catch (e) {
            console.log("Update status to server failed");
        }
        setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status } : order));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const key in cartItems){
            if(cartItems[key] > 0){
                const [itemId] = key.split('-');
                let itemInfo = all_product.find((product)=>Number(product.id)===Number(itemId));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[key];
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = ()=>{
        let totalItem = 0;
        for(const key in cartItems){
            if(cartItems[key] > 0){
                totalItem += cartItems[key];
            }
        }
        return totalItem;
    }

    const contextValue = {
        getTotalCartAmount, 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        getTotalCartItems,
        clearCart,
        orders,
        customers,
        addOrder,
        updateOrderStatus,
        addProduct,
        removeProductFromCatalog,
        user,
        addCustomer
    };


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;