import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useState,
} from "react";
import { FREE_SHIPPING_THRESHOLD } from "../data/products";

const CartContext = createContext(null);

function key(item) {
  return `${item.productId}__${item.wcVariationId ?? ""}__${item.model || ""}__${item.color || ""}`;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const k = key(action.payload);
      const existing = state.items.find((i) => key(i) === k);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            key(i) === k
              ? { ...i, quantity: i.quantity + (action.payload.quantity ?? 1) }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity ?? 1 },
        ],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => key(i) !== action.payload),
      };
    case "UPDATE_QTY": {
      if (action.payload.quantity < 1)
        return {
          ...state,
          items: state.items.filter((i) => key(i) !== action.payload.itemKey),
        };
      return {
        ...state,
        items: state.items.map((i) =>
          key(i) === action.payload.itemKey
            ? { ...i, quantity: action.payload.quantity }
            : i,
        ),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [open, setOpen] = useState(false);

  const addItem = useCallback((item) => {
    dispatch({ type: "ADD", payload: item });
    setOpen(true);
  }, []);

  const removeItem = useCallback((itemKey) => {
    dispatch({ type: "REMOVE", payload: itemKey });
  }, []);

  const updateQty = useCallback((itemKey, quantity) => {
    dispatch({ type: "UPDATE_QTY", payload: { itemKey, quantity } });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingGap = Math.max(0, FREE_SHIPPING_THRESHOLD - totalAmount);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalAmount,
        shippingGap,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        open,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function cartItemKey(item) {
  return `${item.productId}__${item.wcVariationId ?? ""}__${item.model || ""}__${item.color || ""}`;
}
