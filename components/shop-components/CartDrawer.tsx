"use client";
import Image from "next/image";
import { ShoppingBag, X } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/types/product";

interface CartDrawerProps {
  cart: string[];
  cartOpen: boolean;
  products: Product[];
  onOpen: () => void;
  onClose: () => void;
  onRemove: (_id: string) => void;
}

export function CartDrawer({
  cart,
  cartOpen,
  products,
  onOpen,
  onClose,
  onRemove,
}: CartDrawerProps) {
  const cartItems = products.filter((p) => cart.includes(p._id));
  const total = cartItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <>
      {/* Cart FAB */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={onOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              background: "var(--charcoal)",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontFamily: "DM Sans",
              fontSize: "0.85rem",
              position: "relative",
              borderRadius: 9999,
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            }}
          >
            <ShoppingBag size={16} />
            Cart
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "var(--sage)",
                color: "var(--charcoal)",
                fontSize: "0.65rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cart.length}
            </span>
          </button>
        </motion.div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <>
          <div
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 200,
            }}
          />
          <div
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              bottom: 0,
              width: 400,
              background: "white",
              zIndex: 201,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                padding: "24px",
                borderBottom: "1px solid var(--off-white)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.5rem",
                  color: "var(--charcoal)",
                }}
              >
                Your Cart ({cart.length})
              </h3>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              {cartItems.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "48px 0",
                    color: "var(--text-muted)",
                    fontFamily: "DM Sans",
                  }}
                >
                  Your cart is empty.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      gap: 14,
                      marginBottom: 20,
                      paddingBottom: 20,
                      borderBottom: "1px solid var(--off-white)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 64,
                        height: 64,
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.images?.[0]}
                        alt={item.name}
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--charcoal)",
                          marginBottom: 4,
                        }}
                      >
                        {item.name}
                        {/* <span> */}
                      </div>
                      <div
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.85rem",
                          color: "var(--sage-dark)",
                          marginBottom: 8,
                        }}
                      >
                        <span className="text-[0.8rem]">KES</span>{" "}
                        {item.price.toLocaleString()}
                      </div>
                      <button
                        onClick={() => onRemove(item._id)}
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.72rem",
                          color: "var(--text-muted)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div
              style={{
                padding: "20px 24px",
                borderTop: "1px solid var(--off-white)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                  }}
                >
                  Total (excl. tax)
                </span>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                  }}
                >
                  KES {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() =>
                  alert(
                    "Checkout coming soon! Please contact us for purchase orders.",
                  )
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "var(--charcoal)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "DM Sans",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                }}
              >
                Proceed to Checkout
              </button>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                Professional installation available — contact us for a full
                project quote.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
