"use client";
import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [showcart, setShowCart] = useState(false);
  const [cartitems, setcartitems] = useState([]);
  const [totalprice, settotalprice] = useState(0);
  const [totalquant, settotalquant] = useState(0);
  const [qty, setqty] = useState(1);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    const savedTotalPrice = localStorage.getItem("totalPrice");
    const savedTotalQuant = localStorage.getItem("totalQuant");

    if (savedCartItems) {
      setcartitems(JSON.parse(savedCartItems));
    }
    if (savedTotalPrice) {
      settotalprice(parseFloat(savedTotalPrice));
    }
    if (savedTotalQuant) {
      settotalquant(parseInt(savedTotalQuant, 10));
    }
  }, []);

  // Save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartitems));
    localStorage.setItem("totalPrice", totalprice.toString());
    localStorage.setItem("totalQuant", totalquant.toString());
  }, [cartitems, totalprice, totalquant]);

  let foundproduct;
  let index;

  const add = (product, quantity) => {
    const checkprod = cartitems.find((item) => item._id === product._id);
    settotalprice((prevtotal) => prevtotal + product.price * quantity);
    settotalquant((prevtotalqty) => prevtotalqty + quantity);
    if (checkprod) {
      const updated = cartitems.map((cartprod) => {
        if (cartprod._id === product._id) {
          return {
            ...cartprod,
            quantity: cartprod.quantity + quantity,
          };
        }
        return cartprod; // Return the unchanged item if it doesn't match
      });
      setcartitems(updated);
    } else {
      product.quantity = quantity;
      setcartitems([...cartitems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const togglequant = (id, value) => {
    foundproduct = cartitems.find((item) => item._id === id);
    index = cartitems.findIndex((product) => product._id === id);

    if (value === "inc") {
      const newCartItems = cartitems.map((item, i) => {
        if (i === index) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });
      setcartitems(newCartItems);
      settotalprice((prevtotalprice) => prevtotalprice + foundproduct.price);
      settotalquant((prevtotalqty) => prevtotalqty + 1);
    } else if (value === "dec") {
      if (foundproduct.quantity > 1) {
        const newCartItems = cartitems.map((item, i) => {
          if (i === index) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setcartitems(newCartItems);
        settotalprice((prevtotalprice) => prevtotalprice - foundproduct.price);
        settotalquant((prevtotalqty) => prevtotalqty - 1);
      }
    }
  };

  const incqty = () => {
    setqty((prevqty) => prevqty + 1);
  };
  const decqty = () => {
    setqty((prevqty) => {
      if (prevqty - 1 < 1) {
        return 1;
      }
      return prevqty - 1;
    });
  };
  const onRemove = (product) => {
    const foundproduct = cartitems.find((item) => item._id === product._id);
    if (!foundproduct) return; // Guard against undefined foundproduct

    const newCartItems = cartitems.filter((item) => item._id !== product._id);
    settotalprice(
      (prevtotalprice) =>
        prevtotalprice - foundproduct.price * foundproduct.quantity
    );
    settotalquant((prevtotal) => prevtotal - foundproduct.quantity);
    setcartitems(newCartItems);
  };
  return (
    <context.Provider
      value={{
        showcart,
        setShowCart,
        cartitems,
        setcartitems,
        totalprice,
        settotalprice,
        totalquant,
        settotalquant,
        qty,
        setqty,
        incqty,
        decqty,
        add,
        togglequant,
        onRemove,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useSt_Context = () => useContext(context);
