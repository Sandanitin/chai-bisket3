// "use client";
// export const dynamic = "force-dynamic";

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { ArrowLeft, ShoppingCart, Plus, Minus, X } from "lucide-react";
// import { menuItems } from "@/app/data/menuItems";
// import Image from "next/image";

// // Define types
// type CartItem = {
//   id: number;
//   quantity: number;
//   spiceLevel: number;
// };

// // Reuse shared MenuItem type shape from data file (only fields we care about)
// type MenuItem = (typeof menuItems)[number];

// export default function CartPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [isClient, setIsClient] = useState(false);
//   const [orderType, setOrderType] = useState<"pickup" | "delivery">("delivery");

//   // Initialize cart from localStorage
//   // useEffect(() => {
//   //   setIsClient(true);
//   //   const savedCart = localStorage.getItem("cart");
//   //   if (savedCart) {
//   //     try {
//   //       setCart(JSON.parse(savedCart));
//   //     } catch (e) {
//   //       console.error("Failed to parse cart from localStorage", e);
//   //       setCart([]);
//   //     }
//   //   }
//   // }, []);
//   useEffect(() => {
//     setIsClient(true);
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       try {
//         const parsed = JSON.parse(savedCart);
//         const normalized = parsed.map((item: CartItem) => ({
//           ...item,
//           spiceLevel: item.spiceLevel ?? 3, // default
//         }));
//         setCart(normalized);
//       } catch (e) {
//         console.error("Failed to parse cart from localStorage", e);
//         setCart([]);
//       }
//     }
//   }, []);

//   // Update localStorage when cart changes
//   useEffect(() => {
//     if (isClient) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart, isClient]);

//   const updateSpiceLevel = (id: number, spiceLevel: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) => (item.id === id ? { ...item, spiceLevel } : item))
//     );
//   };

//   // Find menu item by ID
//   const getMenuItem = (id: number) => {
//     return menuItems.find((item) => item.id === id);
//   };

//   // Update item quantity
//   const updateQuantity = (id: number, quantity: number) => {
//     if (quantity < 1) {
//       removeFromCart(id);
//       return;
//     }

//     setCart((prevCart) =>
//       prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

//   // Remove item from cart
//   const removeFromCart = (id: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   // Calculate total
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       const menuItem = getMenuItem(item.id);
//       return total + (menuItem ? menuItem.price * item.quantity : 0);
//     }, 0);
//   };

//   // Handle checkout
//   // Handle checkout
//   const handleCheckout = () => {
//     // Save order type preference
//     localStorage.setItem("orderType", orderType);
//     // Proceed to checkout directly (guest or logged in)
//     router.push("/checkout/success");
//   };

//   if (!isClient) {
//     return (
//       <div className="min-h-screen bg-[#050302] py-8">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="animate-pulse">
//             <div className="h-8 w-32 bg-[#120a07] rounded mb-8"></div>
//             <div className="h-64 bg-[#120a07] rounded-xl"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#050302] text-[#f5eddc] py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <div className="h-12 w-12 rounded-full border border-[#2d1a11] overflow-hidden">
//               <Image
//                 src="/images/logo.jpg"
//                 alt="Chai Bisket"
//                 width={48}
//                 height={48}
//                 className="object-cover"
//               />
//             </div>
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f5eddc]/60">
//                 Chai Bisket
//               </p>
//               <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#f5eddc]">
//                 Your Cart
//               </h1>
//             </div>
//           </div>
//           <Button
//             variant="outline"
//             onClick={() => router.back()}
//             className="flex items-center gap-2 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Menu
//           </Button>
//         </div>

//         <p className="text-[#f5eddc]/70 mb-8">
//           Review your items before checkout
//         </p>

//         {cart.length === 0 ? (
//           <div className="bg-[#120a07] rounded-2xl shadow-sm p-8 text-center border border-[#2d1a11]">
//             <ShoppingCart className="h-16 w-16 text-[#f5eddc]/30 mx-auto mb-4" />
//             <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
//             <p className="text-[#f5eddc]/70 mb-6">
//               Looks like you haven&apos;t added anything to your cart yet
//             </p>
//             <Button
//               onClick={() => router.push("/#menu")}
//               className="bg-[#c87534] hover:bg-[#d8843d] text-[#120a06]"
//             >
//               Browse Menu
//             </Button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <div className="bg-[#120a07] rounded-2xl shadow-sm border border-[#2d1a11] overflow-hidden">
//                 <div className="divide-y divide-[#2d1a11]">
//                   {cart.map((item) => {
//                     const menuItem = getMenuItem(item.id);
//                     if (!menuItem) return null;

//                     return (
//                       <div
//                         key={item.id}
//                         className="p-6 flex flex-col sm:flex-row gap-4"
//                       >
//                         <div className="relative w-full sm:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-[#2d1a11]">
//                           <Image
//                             src={menuItem.image}
//                             alt={menuItem.name}
//                             fill
//                             className="object-cover"
//                             onError={(e) => {
//                               const target = e.target as HTMLImageElement;
//                               target.src = "/placeholder.svg";
//                             }}
//                           />
//                         </div>

//                         <div className="flex-1">
//                           <div className="flex justify-between">
//                             <div>
//                               <h3 className="font-semibold text-[#f5eddc]">
//                                 {menuItem.name}
//                               </h3>
//                               <p className="text-sm text-[#f5eddc]/60 mt-1">
//                                 {menuItem.description}
//                               </p>
//                             </div>
//                             <Button
//                               variant="secondary"
//                               onClick={() => removeFromCart(item.id)}
//                               className="text-[#f5eddc]/50 hover:text-[#ff7f7f]"
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>

//                           <div className="flex items-center justify-between mt-4">
//                             <div className="mt-4">
//                               <label className="block text-sm text-[#f5eddc]/70 mb-2">
//                                 Spice Level:{" "}
//                                 <span className="font-medium text-[#f0a35c]">
//                                   {
//                                     ["Mild", "Medium", "Hot", "Very Hot"][
//                                       item.spiceLevel - 1
//                                     ]
//                                   }
//                                 </span>
//                               </label>

//                               <input
//                                 type="range"
//                                 min={1}
//                                 max={4}
//                                 step={1}
//                                 value={item.spiceLevel}
//                                 onChange={(e) =>
//                                   updateSpiceLevel(
//                                     item.id,
//                                     Number(e.target.value)
//                                   )
//                                 }
//                                 className="w-full accent-[#c87534]"
//                               />

//                               <div className="flex justify-between text-xs text-[#f5eddc]/40 mt-1">
//                                 <span>Mild</span>
//                                 <span>Very Hot</span>
//                               </div>
//                             </div>

//                             <div className="flex items-center border border-[#2d1a11] rounded-lg bg-[#050302]">
//                               <Button
//                                 variant="secondary"
//                                 onClick={() =>
//                                   updateQuantity(item.id, item.quantity - 1)
//                                 }
//                                 className="px-3 py-1 text-[#f5eddc] hover:bg-[#120a07]"
//                               >
//                                 <Minus className="h-4 w-4" />
//                               </Button>
//                               <span className="px-3 py-1 text-[#f5eddc]">
//                                 {item.quantity}
//                               </span>
//                               <Button
//                                 variant="secondary"
//                                 onClick={() =>
//                                   updateQuantity(item.id, item.quantity + 1)
//                                 }
//                                 className="px-3 py-1 text-[#f5eddc] hover:bg-[#120a07]"
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </Button>
//                             </div>

//                             <div className="font-semibold text-[#f0a35c]">
//                               ${(menuItem.price * item.quantity).toFixed(2)}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="bg-[#120a07] rounded-2xl shadow-sm border border-[#2d1a11] p-6 sticky top-8">
//                 <h2 className="text-xl font-semibold text-[#f5eddc] mb-6">
//                   Order Summary
//                 </h2>

//                 {/* Pickup/Delivery Toggle */}
//                 <div className="bg-[#050302] p-1 rounded-xl flex mb-6 border border-[#2d1a11]">
//                   <button
//                     onClick={() => setOrderType("pickup")}
//                     className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
//                       orderType === "pickup"
//                         ? "bg-[#c87534] text-[#120a06] shadow-sm"
//                         : "text-[#f5eddc]/60 hover:text-[#f5eddc]"
//                     }`}
//                   >
//                     Pickup
//                   </button>
//                   <button
//                     onClick={() => setOrderType("delivery")}
//                     className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
//                       orderType === "delivery"
//                         ? "bg-[#c87534] text-[#120a06] shadow-sm"
//                         : "text-[#f5eddc]/60 hover:text-[#f5eddc]"
//                     }`}
//                   >
//                     Delivery
//                   </button>
//                 </div>

//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-[#f5eddc]/70">Subtotal</span>
//                     <span className="font-medium text-[#f5eddc]">
//                       ${calculateTotal().toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-[#f5eddc]/70">Tax</span>
//                     <span className="font-medium text-[#f5eddc]">
//                       ${(calculateTotal() * 0.08).toFixed(2)}
//                     </span>
//                   </div>
//                   {orderType === "delivery" && (
//                     <div className="flex justify-between">
//                       <span className="text-[#f5eddc]/70">Delivery</span>
//                       <span className="font-medium text-[#f5eddc]">$2.99</span>
//                     </div>
//                   )}
//                   <div className="border-t border-[#2d1a11] pt-4 flex justify-between font-semibold text-lg text-[#f5eddc]">
//                     <span>Total</span>
//                     <span>
//                       $
//                       {(
//                         calculateTotal() * 1.08 +
//                         (orderType === "delivery" ? 2.99 : 0)
//                       ).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={handleCheckout}
//                   className="w-full bg-[#c87534] hover:bg-[#d8843d] text-[#120a06] font-medium py-3 rounded-xl"
//                 >
//                   Proceed to Checkout
//                 </Button>

//                 <Button
//                   variant="outline"
//                   onClick={() => router.push("/#menu")}
//                   className="w-full mt-3 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
//                 >
//                   Continue Shopping
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export const runtime = "nodejs";
// export const preferredRegion = "auto";
"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Plus, Minus, X } from "lucide-react";
import { menuItems } from "@/app/data/menuItems";
import Image from "next/image";

// Types
type CartItem = {
  id: number;
  quantity: number;
  spiceLevel: number; // 1–4
};

type MenuItem = (typeof menuItems)[number];

const SPICE_LABELS = ["Mild", "Medium", "Hot", "Very Hot"];

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("delivery");

  // Load cart from localStorage and normalize spiceLevel
  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart) as CartItem[];
        const normalized = parsed.map((item) => ({
          ...item,
          spiceLevel: item.spiceLevel ?? 2,
        }));
        setCart(normalized);
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        setCart([]);
      }
    }
  }, []);

  // Persist cart back to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isClient]);

  const getMenuItem = (id: number): MenuItem | undefined =>
    menuItems.find((item) => item.id === id);

  const updateSpiceLevel = (id: number, spiceLevel: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, spiceLevel } : item))
    );
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => {
      const menuItem = getMenuItem(item.id);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);

  const handleCheckout = () => {
    localStorage.setItem("orderType", orderType);
    router.push("/checkout");
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#050302] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-[#120a07] rounded mb-8"></div>
            <div className="h-64 bg-[#120a07] rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050302] text-[#f5eddc] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border border-[#2d1a11] overflow-hidden">
              <Image
                src="/images/logo.jpg"
                alt="Chai Bisket"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f5eddc]/60">
                Chai Bisket
              </p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#f5eddc]">
                Your Cart
              </h1>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
        </div>

        <p className="text-[#f5eddc]/70 mb-8">
          Review your items before checkout
        </p>

        {cart.length === 0 ? (
          <div className="bg-[#120a07] rounded-2xl shadow-sm p-8 text-center border border-[#2d1a11]">
            <ShoppingCart className="h-16 w-16 text-[#f5eddc]/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-[#f5eddc]/70 mb-6">
              Looks like you haven&apos;t added anything to your cart yet
            </p>
            <Button
              onClick={() => router.push("/#menu")}
              className="bg-[#c87534] hover:bg-[#d8843d] text-[#120a06]"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-[#120a07] rounded-2xl shadow-sm border border-[#2d1a11] overflow-hidden">
                <div className="divide-y divide-[#2d1a11]">
                  {cart.map((item) => {
                    const menuItem = getMenuItem(item.id);
                    if (!menuItem) return null;

                    const MIN = 1;
                    const MAX = 4;
                    const progress =
                      ((item.spiceLevel - MIN) / (MAX - MIN)) * 100;

                    return (
                      <div
                        key={item.id}
                        className="p-6 flex flex-col sm:flex-row gap-4"
                      >
                        <div className="relative w-full sm:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-[#2d1a11]">
                          <Image
                            src={menuItem.image}
                            alt={menuItem.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-[#f5eddc]">
                                {menuItem.name}
                              </h3>
                              <p className="text-sm text-[#f5eddc]/60 mt-1">
                                {menuItem.description}
                              </p>
                            </div>
                            <Button
                              variant="secondary"
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#f5eddc]/50 hover:text-[#ff7f7f]"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4">
                            {/* Spice level */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-[#f5eddc]/70">
                                  Spice Level
                                </span>
                                <span className="text-xs text-[#f0a35c] font-medium">
                                  {SPICE_LABELS[item.spiceLevel - 1]}
                                </span>
                              </div>

                              <input
                                type="range"
                                min={MIN}
                                max={MAX}
                                step={1}
                                value={item.spiceLevel}
                                onChange={(e) =>
                                  updateSpiceLevel(
                                    item.id,
                                    Number(e.target.value)
                                  )
                                }
                                style={{
                                  background: `linear-gradient(to right,
                                    #f97316 ${progress}%,
                                    rgba(255,255,255,0.15) ${progress}%)`,
                                }}
                                className="
                                  w-full h-2 cursor-pointer appearance-none rounded-full
                                  [&::-webkit-slider-thumb]:appearance-none
                                  [&::-webkit-slider-thumb]:h-4
                                  [&::-webkit-slider-thumb]:w-4
                                  [&::-webkit-slider-thumb]:rounded-full
                                  [&::-webkit-slider-thumb]:bg-white
                                  [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(0,0,0,0.35)]
                                  [&::-webkit-slider-thumb]:mt-[-4px]
                                  [&::-moz-range-thumb]:h-4
                                  [&::-moz-range-thumb]:w-4
                                  [&::-moz-range-thumb]:rounded-full
                                  [&::-moz-range-thumb]:bg-white
                                "
                              />

                              <div className="flex justify-between text-xs text-[#f5eddc]/40 mt-1">
                                <span>Mild</span>
                                <span>Very Hot</span>
                              </div>
                            </div>

                            {/* Quantity & price */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border border-[#2d1a11] rounded-lg bg-[#050302]">
                                <Button
                                  variant="secondary"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="px-3 py-1 text-[#f5eddc] hover:bg-[#120a07]"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="px-3 py-1 text-[#f5eddc]">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="secondary"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="px-3 py-1 text-[#f5eddc] hover:bg-[#120a07]"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="font-semibold text-[#f0a35c]">
                                ${(menuItem.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-[#120a07] rounded-2xl shadow-sm border border-[#2d1a11] p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-[#f5eddc] mb-6">
                  Order Summary
                </h2>

                {/* Pickup / Delivery toggle */}
                <div className="bg-[#050302] p-1 rounded-xl flex mb-6 border border-[#2d1a11]">
                  <button
                    onClick={() => setOrderType("pickup")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      orderType === "pickup"
                        ? "bg-[#c87534] text-[#120a06] shadow-sm"
                        : "text-[#f5eddc]/60 hover:text-[#f5eddc]"
                    }`}
                  >
                    Pickup
                  </button>
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      orderType === "delivery"
                        ? "bg-[#c87534] text-[#120a06] shadow-sm"
                        : "text-[#f5eddc]/60 hover:text-[#f5eddc]"
                    }`}
                  >
                    Delivery
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#f5eddc]/70">Subtotal</span>
                    <span className="font-medium text-[#f5eddc]">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#f5eddc]/70">Tax</span>
                    <span className="font-medium text-[#f5eddc]">
                      {(calculateTotal() * 0.08).toFixed(2)}
                    </span>
                  </div>
                  {orderType === "delivery" && (
                    <div className="flex justify-between">
                      <span className="text-[#f5eddc]/70">Delivery</span>
                      <span className="font-medium text-[#f5eddc]">$2.99</span>
                    </div>
                  )}
                  <div className="border-t border-[#2d1a11] pt-4 flex justify-between font-semibold text-lg text-[#f5eddc]">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        calculateTotal() * 1.08 +
                        (orderType === "delivery" ? 2.99 : 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#c87534] hover:bg-[#d8843d] text-[#120a06] font-medium py-3 rounded-xl"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/#menu")}
                  className="w-full mt-3 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const runtime = "nodejs";
export const preferredRegion = "auto";
