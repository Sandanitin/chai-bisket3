"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, CreditCard, MapPin, User } from 'lucide-react';
import { menuItems } from '@/app/data/menuItems';

// Define types
type CartItem = {
  id: number;
  quantity: number;
};

// Reuse shared MenuItem type shape from data file (only fields we care about)
type MenuItem = (typeof menuItems)[number];

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('delivery');

  // Form states
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryInstructions: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  // Initialize cart from localStorage
  useEffect(() => {
    setIsClient(true);

    // Check if user is logged in (optional now)
    const user = localStorage.getItem('user');

    // Load order type
    const savedOrderType = localStorage.getItem('orderType');
    if (savedOrderType === 'pickup' || savedOrderType === 'delivery') {
      setOrderType(savedOrderType);
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);

        // If cart is empty, redirect to cart page
        if (parsedCart.length === 0) {
          router.push('/cart');
        }
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
        setCart([]);
        router.push('/cart');
      }
    } else {
      // If no cart exists, redirect to menu
      router.push('/');
    }

    // Load user info
    if (user) {
      try {
        const userData = JSON.parse(user);
        setDeliveryInfo(prev => ({
          ...prev,
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          city: userData.city || '',
          state: userData.state || '',
          zipCode: userData.zipCode || ''
        }));
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
  }, [router]);

  // Find menu item by ID
  const getMenuItem = (id: number) => {
    return menuItems.find(item => item.id === id);
  };

  // Calculate total
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const menuItem = getMenuItem(item.id);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateDeliveryFee = () => {
    return orderType === 'delivery' ? 2.99 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDeliveryFee();
  };

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateDeliveryInfo = () => {
    const errors: Record<string, string> = {};
    if (!deliveryInfo.name.trim()) errors.name = "Name is required";
    if (!deliveryInfo.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(deliveryInfo.email)) errors.email = "Email is invalid";
    if (!deliveryInfo.phone.trim()) errors.phone = "Phone is required";

    // Only validate address if delivery is selected
    if (orderType === 'delivery') {
      if (!deliveryInfo.address.trim()) errors.address = "Address is required";
      if (!deliveryInfo.city.trim()) errors.city = "City is required";
      if (!deliveryInfo.state.trim()) errors.state = "State is required";
      if (!deliveryInfo.zipCode.trim()) errors.zipCode = "ZIP Code is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateDeliveryInfo()) {
      setActiveStep(2);
    }
  };

  // Handle form changes
  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle place order
  const handlePlaceOrder = () => {
    // Get user info
    const user = localStorage.getItem('user');
    let userEmail = '';
    if (user) {
      try {
        const userData = JSON.parse(user);
        userEmail = userData.email || '';
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }

    // Create order object
    const orderItems = cart.map(item => {
      const menuItem = getMenuItem(item.id);
      return {
        id: item.id,
        name: menuItem?.name || '',
        price: menuItem?.price || 0,
        quantity: item.quantity,
      };
    });

    const order = {
      orderId: `ORD-${Date.now()}`,
      userEmail: userEmail || deliveryInfo.email,
      orderDate: new Date().toLocaleString(),
      items: orderItems,
      deliveryInfo: deliveryInfo,
      paymentMethod: 'Cash on Delivery',
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      deliveryFee: calculateDeliveryFee(),
      total: calculateTotal(),
      status: 'Pending',
      deliveryAddress: `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.state} ${deliveryInfo.zipCode}`,
    };

    // Save order to localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Update user loyalty points (1 point per dollar)
      if (user) {
        try {
          const userData = JSON.parse(user);
          const pointsEarned = Math.floor(calculateSubtotal());
          const updatedUser = {
            ...userData,
            loyaltyPoints: (userData.loyaltyPoints || 0) + pointsEarned,
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));

          // Update users array
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userIndex = users.findIndex((u: any) => u.email === userData.email);
          if (userIndex !== -1) {
            users[userIndex].loyaltyPoints = updatedUser.loyaltyPoints;
            localStorage.setItem('users', JSON.stringify(users));
          }
        } catch (e) {
          console.error('Failed to update loyalty points', e);
        }
      }
    } catch (e) {
      console.error('Failed to save order', e);
    }

    // Clear cart
    localStorage.removeItem('cart');

    // Show success message
    setOrderPlaced(true);

    // Redirect to home page after 3 seconds
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#050302] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-[#120a07] rounded mb-8"></div>
            <div className="h-64 bg-[#120a07] rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#050302] py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[#120a07] rounded-2xl shadow-sm p-8 text-center border border-[#2d1a11]">
            <div className="w-16 h-16 bg-[#1a100b] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#c87534]/20">
              <svg className="w-8 h-8 text-[#c87534]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#f5eddc] mb-2">Order Placed Successfully!</h2>
            <p className="text-[#f5eddc]/70 mb-6">Thank you for your order. We&apos;ve sent a confirmation email to your inbox.</p>
            <p className="text-[#f5eddc]/50 text-sm">Redirecting to homepage...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050302] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold text-[#f5eddc] mb-2">Checkout</h1>
        <p className="text-[#f5eddc]/70 mb-8">Complete your order</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Steps */}
          <div className="lg:col-span-2">
            <div className="bg-[#120a07] rounded-2xl shadow-sm border border-[#2d1a11] p-4 md:p-6 mb-6">
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center min-w-fit">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activeStep === step
                      ? 'bg-[#c87534] text-[#120a06]'
                      : activeStep > step
                        ? 'bg-[#1a100b] text-[#c87534] border border-[#c87534]/30'
                        : 'bg-[#1a100b] text-[#f5eddc]/30 border border-[#2d1a11]'
                      }`}>
                      {activeStep > step ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        step
                      )}
                    </div>
                    <div className="ml-2">
                      <div className={`text-xs md:text-sm font-medium whitespace-nowrap ${activeStep === step ? 'text-[#c87534]' : activeStep > step ? 'text-[#c87534]' : 'text-[#f5eddc]/30'
                        }`}>
                        {step === 1 ? 'Delivery' : step === 2 ? 'Payment' : 'Confirm'}
                      </div>
                    </div>
                    {step < 3 && (
                      <div className={`w-4 md:w-16 h-0.5 mx-2 md:mx-4 ${activeStep > step ? 'bg-[#c87534]/50' : 'bg-[#2d1a11]'
                        }`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Delivery Information */}
              {activeStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-[#f5eddc] mb-6 flex items-center gap-2">
                    {orderType === 'pickup' ? (
                      <>
                        <User className="h-5 w-5 text-[#c87534]" />
                        Pickup Information
                      </>
                    ) : (
                      <>
                        <MapPin className="h-5 w-5 text-[#c87534]" />
                        Delivery Information
                      </>
                    )}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {orderType === 'delivery' && (
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={deliveryInfo.name}
                          onChange={handleDeliveryInfoChange}
                          className={`w-full border bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${formErrors.name ? 'border-red-500' : 'border-[#2d1a11]'}`}
                          placeholder="John Doe"
                        />
                        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                      </div>
                    )}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={deliveryInfo.email}
                        onChange={handleDeliveryInfoChange}
                        className={`w-full border bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${formErrors.email ? 'border-red-500' : 'border-[#2d1a11]'}`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={deliveryInfo.phone}
                        onChange={handleDeliveryInfoChange}
                        className={`w-full border bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${formErrors.phone ? 'border-red-500' : 'border-[#2d1a11]'}`}
                        placeholder="(123) 456-7890"
                      />
                      {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                    </div>

                    {orderType === 'delivery' && (
                      <>
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">Address</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={deliveryInfo.address}
                            onChange={handleDeliveryInfoChange}
                            className={`w-full border bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${formErrors.address ? 'border-red-500' : 'border-[#2d1a11]'}`}
                            placeholder="123 Main St"
                          />
                          {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={deliveryInfo.city}
                            onChange={handleDeliveryInfoChange}
                            className={`w-full border bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${formErrors.city ? 'border-red-500' : 'border-[#2d1a11]'}`}
                            placeholder="New York"
                          />
                          {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">State</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={deliveryInfo.state}
                            onChange={handleDeliveryInfoChange}
                            className={`w-full border bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${formErrors.state ? 'border-red-500' : 'border-[#2d1a11]'}`}
                            placeholder="NY"
                          />
                          {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">ZIP Code</label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={deliveryInfo.zipCode}
                            onChange={handleDeliveryInfoChange}
                            className={`w-full border bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534] ${formErrors.zipCode ? 'border-red-500' : 'border-[#2d1a11]'}`}
                            placeholder="10001"
                          />
                          {formErrors.zipCode && <p className="text-red-500 text-xs mt-1">{formErrors.zipCode}</p>}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-[#f5eddc]/80 mb-1">
                      {orderType === 'pickup' ? 'Additional Instructions (Optional)' : 'Delivery Instructions (Optional)'}
                    </label>
                    <textarea
                      id="deliveryInstructions"
                      name="deliveryInstructions"
                      value={deliveryInfo.deliveryInstructions}
                      onChange={handleDeliveryInfoChange}
                      rows={3}
                      className="w-full border border-[#2d1a11] bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
                      placeholder={orderType === 'pickup' ? 'Any special requests...' : 'Leave at front door, ring bell, etc.'}
                    ></textarea>
                  </div>

                  <Button
                    onClick={handleContinueToPayment}
                    className="w-full bg-[#c87534] hover:bg-[#d8843d] text-[#120a06] font-medium py-3 rounded-xl"
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {activeStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-[#f5eddc] mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#c87534]" />
                    Payment Method
                  </h2>

                  <div className="space-y-4 mb-6">
                    {/* Cash Payment Option */}
                    <div className="bg-[#1a100b] border border-[#2d1a11] rounded-xl p-4 cursor-pointer hover:border-[#c87534] transition-colors">
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          defaultChecked
                          className="mt-1 h-4 w-4 text-[#c87534] focus:ring-[#c87534]"
                        />
                        <div className="ml-3 flex-1">
                          <h3 className="text-sm font-medium text-[#f5eddc]">Cash Payment</h3>
                          <div className="mt-2 text-sm text-[#f5eddc]/70">
                            <p>You will pay with cash upon delivery. Please have the exact amount ready.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Online Payment Option */}
                    <div className="bg-[#1a100b] border border-[#2d1a11] rounded-xl p-4 cursor-pointer hover:border-[#c87534] transition-colors">
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          className="mt-1 h-4 w-4 text-[#c87534] focus:ring-[#c87534]"
                        />
                        <div className="ml-3 flex-1">
                          <h3 className="text-sm font-medium text-[#f5eddc]">Online Payment</h3>
                          <div className="mt-2 text-sm text-[#f5eddc]/70">
                            <p>Pay securely online via credit card, debit card, or UPI. You will be redirected to our payment gateway.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep(1)}
                      className="flex-1 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setActiveStep(3)}
                      className="flex-1 bg-[#c87534] hover:bg-[#d8843d] text-[#120a06] font-medium py-3 rounded-xl"
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {activeStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-[#f5eddc] mb-6 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-[#c87534]" />
                    Review Your Order
                  </h2>

                  <div className="border border-[#2d1a11] rounded-xl p-4 mb-6">
                    <h3 className="font-medium text-[#f5eddc] mb-3">Delivery Information</h3>
                    <div className="text-sm text-[#f5eddc]/70">
                      <p>{deliveryInfo.name}</p>
                      <p>{deliveryInfo.email}</p>
                      <p>{deliveryInfo.phone}</p>
                      <p>{deliveryInfo.address}, {deliveryInfo.city}, {deliveryInfo.state} {deliveryInfo.zipCode}</p>
                      {deliveryInfo.deliveryInstructions && (
                        <p className="mt-2"><span className="font-medium">Instructions:</span> {deliveryInfo.deliveryInstructions}</p>
                      )}
                    </div>
                  </div>

                  <div className="border border-[#2d1a11] rounded-xl p-4 mb-6">
                    <h3 className="font-medium text-[#f5eddc] mb-3">Payment Method</h3>
                    <div className="text-sm text-[#f5eddc]/70">
                      <p>Cash Payment</p>
                      <p className="mt-1">Pay with cash upon delivery</p>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#c87534] hover:bg-[#d8843d] text-[#120a06] font-medium py-3 rounded-xl"
                  >
                    Place Order - ${calculateTotal().toFixed(2)}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setActiveStep(2)}
                    className="w-full mt-3 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
                  >
                    Back to Payment
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#120a07] rounded-2xl shadow-sm border border-[#2d1a11] p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-[#f5eddc] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const menuItem = getMenuItem(item.id);
                  if (!menuItem) return null;

                  return (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <div className="font-medium text-[#f5eddc]">{menuItem.name} <span className="text-[#f5eddc]/50">x{item.quantity}</span></div>
                        <div className="text-sm text-[#f5eddc]/50">{menuItem.description}</div>
                      </div>
                      <div className="font-medium text-[#f5eddc]">${(menuItem.price * item.quantity).toFixed(2)}</div>
                    </div>
                  );
                })}

                <div className="border-t border-[#2d1a11] pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#f5eddc]/70">Subtotal</span>
                    <span className="font-medium text-[#f5eddc]">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#f5eddc]/70">Tax</span>
                    <span className="font-medium text-[#f5eddc]">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#f5eddc]/70">Delivery</span>
                    <span className="font-medium text-[#f5eddc]">${calculateDeliveryFee().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#2d1a11] pt-4 flex justify-between font-semibold text-lg text-[#f5eddc]">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const runtime = "nodejs";
export const preferredRegion = "auto";
