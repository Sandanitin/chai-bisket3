"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Utensils,
  Leaf,
  Coffee,
  Sandwich,
  Sprout,
  ShoppingCart,
  Facebook,
  ShoppingBag,
  Truck,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import Menu from "@/components/Menu";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import LocationSection from "@/components/LocationSection";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

/**
 * Chai Bisket — Single‑file Landing Page
 * Tech: Next.js + Tailwind + local UI + Framer Motion
 */

const heroBg = `
  radial-gradient(1200px 600px at 10% -10%, rgba(255, 214, 153, 0.35), transparent 60%),
  radial-gradient(1000px 500px at 90% 0%, rgba(189, 255, 200, 0.30), transparent 60%),
  linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.75))
`;

const bananaLeafSvg = (
  <svg
    className="absolute inset-0 w-full h-full opacity-30"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern
        id="leafs"
        width="200"
        height="200"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M20,100 C60,20 140,20 180,100 C140,180 60,180 20,100 Z"
          fill="none"
          stroke="#3BAA6B"
          strokeWidth="1.2"
        />
        <path
          d="M20,100 C60,60 140,60 180,100"
          fill="none"
          stroke="#74C69D"
          strokeWidth="0.8"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#leafs)" />
  </svg>
);

const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`relative py-12 md:py-16 scroll-mt-24 ${className}`}
  >
    {children}
  </section>
);

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// Local inline SVG artwork (data URIs) so no external requests are needed
const toDataUri = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
const art = {
  heroChai:
    toDataUri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#fde68a' offset='0'/><stop stop-color='#a7f3d0' offset='1'/></linearGradient></defs>
    <rect fill='url(#g)' width='1200' height='900'/>
    <g fill='none' stroke='#059669' stroke-width='14'><rect x='280' y='240' rx='32' width='480' height='340'/><path d='M760 320 h80 a80 80 0 0 1 0 160 h-80'/></g>
    <g stroke='#10b981' stroke-width='6'><path d='M420 220 c40 -60 40 -60 0 -120'/><path d='M500 220 c40 -60 40 -60 0 -120'/><path d='M580 220 c40 -60 40 -60 0 -120'/></g>
    <text x='60' y='840' font-family='sans-serif' font-size='48' fill='#065f46'>Masala Chai</text>
  </svg>`),
  thumb1: toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><rect width='800' height='600' fill='#fff7ed'/><circle cx='400' cy='320' r='180' fill='#fde68a' stroke='#f59e0b' stroke-width='10'/><ellipse cx='400' cy='360' rx='220' ry='60' fill='none' stroke='#16a34a' stroke-width='8'/></svg>`
  ),
  thumb2: toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><rect width='800' height='600' fill='#ecfeff'/><path d='M160 380 q240 -220 480 0' fill='#fcd34d' stroke='#f59e0b' stroke-width='10'/><path d='M160 380 q240 120 480 0' fill='#16a34a' opacity='0.25'/></svg>`
  ),
  thumb3: toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><rect width='800' height='600' fill='#f0fdf4'/><rect x='220' y='260' width='360' height='120' rx='60' fill='#fff' stroke='#10b981' stroke-width='8'/></svg>`
  ),
  // Local images for menu items (Next.js public folder)
  iraniChai: "/images/iran%20chaai.png",
  biscuits: "/images/osimania%20biskets.png",
  biryani: "/images/Hyderabadi%20Biryani.jpg",
  bunMaska: "/images/Bun%20Maska.jpg",
  vadaPav: "/images/Vada%20Pav.jpg",
  chicken65: "/images/Chicken%2065.jpg",
  monuments: toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'><rect width='1200' height='900' fill='#ecfeff'/><path d='M160 700 h240 v-200 h-240 z' fill='#a7f3d0'/><path d='M520 700 h200 v-240 l-100 -80 -100 80 z' fill='#fef3c7'/><path d='M820 700 h220 v-160 h-220 z' fill='#fde68a'/></svg>`
  ),
  gallery: [
    "/images/iran chaai.png",
    "/images/osimania biskets.png",
    "/images/Hyderabadi Biryani.jpg",
    "/images/Bun Maska.jpg",
    "/images/Vada Pav.jpg",
    "/images/Chicken 65.jpg",
    "/images/iran chaai.png",
    "/images/osimania biskets.png",
  ],
};

const heroBanners = [
  {
    src: "/images/hero_chai_banner.png",
    alt: "Traditional Irani Chai & Osmania Biscuits",
  },
  {
    src: "/images/hero_biryani_banner.png",
    alt: "Authentic Hyderabadi Biryani",
  },
  { src: "/images/hero_snacks_banner.png", alt: "Indian Street Food Delights" },
];

const Placeholder = ({ label = "Image" }: { label?: string }) => (
  <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#050302] via-[#120a07] to-[#050302] text-[#f5eddc]">
    <div className="text-center p-4">
      <div className="text-xs uppercase tracking-wide opacity-70">{label}</div>
      <div className="text-2xl font-extrabold">Chai Bisket</div>
    </div>
  </div>
);

const SafeImage = ({
  src,
  alt,
  className = "",
  label,
}: {
  src: string;
  alt?: string;
  className?: string;
  label?: string;
}) => {
  const [broken, setBroken] = React.useState(false);
  return (
    <div className={className}>
      {!broken ? (
        <img
          src={src}
          alt={alt || ""}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
          onError={() => {
            console.error(`Image failed to load: ${src}`);
            setBroken(true);
          }}
        />
      ) : (
        <Placeholder label={label || alt} />
      )}
    </div>
  );
};
// --- Contact Form for "Write to Us" section ---
function WriteToUsForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const firstName = String(fd.get("firstName") || "");
    const lastName = String(fd.get("lastName") || "");
    const email = String(fd.get("email") || "");
    const phone = String(fd.get("phone") || "");
    const message = String(fd.get("message") || "");

    // Create email subject and body
    const subject = encodeURIComponent(
      `Contact Form Submission from ${firstName} ${lastName}`
    );
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `Message:\n${message}`
    );

    // Open default email client
    window.location.href = `mailto:Support@chaibisketeats.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="firstName"
          className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
          placeholder="Last Name"
          required
        />
      </div>
      <input
        name="email"
        type="email"
        className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
        placeholder="Email Address"
        required
      />
      <input
        name="phone"
        type="tel"
        className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
        placeholder="Phone Number"
        required
      />
      <input
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <textarea
        name="message"
        rows={5}
        className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
        placeholder="Your Message"
        required
      />
      <Button
        type="submit"
        className="bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a]"
      >
        Submit
      </Button>
    </form>
  );
}

// --- Catering Quote Form ---
function CateringQuoteForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const phone = String(fd.get("phone") || "");
    const eventType = String(fd.get("eventType") || "");
    const eventDate = String(fd.get("eventDate") || "");
    const guests = String(fd.get("guests") || "");
    const message = String(fd.get("message") || "");

    // Create email subject and body
    const subject = encodeURIComponent(`Catering Quote Request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Event Type: ${eventType}\n` +
        `Event Date: ${eventDate}\n` +
        `Number of Guests: ${guests}\n\n` +
        `Additional Details:\n${message}`
    );

    // Open default email client
    window.location.href = `mailto:catering@chaibisket.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <input
        name="name"
        className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
        placeholder="Full Name"
        required
      />
      <input
        name="email"
        type="email"
        className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
        placeholder="Email Address"
        required
      />
      <input
        name="phone"
        type="tel"
        className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
        placeholder="Phone Number"
        required
      />
      <select
        name="eventType"
        className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
        required
      >
        <option value="">Select Event Type</option>
        <option value="Birthday">Birthday</option>
        <option value="Corporate">Corporate Event</option>
        <option value="Wedding">Wedding</option>
        <option value="Other">Other</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="eventDate"
          type="date"
          className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
          required
        />
        <input
          name="guests"
          type="number"
          min="1"
          className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
          placeholder="Number of Guests"
          required
        />
      </div>
      <textarea
        name="message"
        rows={4}
        className="border border-[#2d1a11] bg-[#050302] text-[#f5eddc] placeholder:text-[#f5eddc]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c87534]"
        placeholder="Tell us about your event..."
        required
      />
      <Button
        type="submit"
        className="bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a]"
      >
        Get a Catering Quote
      </Button>
    </form>
  );
}

// Testimonials Carousel Component
function TestimonialsCarousel() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Food Blogger",
      rating: 5,
      text: "The Hyderabadi Biryani here is the closest I've found to my grandmother's recipe. Authentic flavors that transport you straight to the streets of Hyderabad.",
    },
    {
      name: "Rahul Mehta",
      role: "Local Resident",
      rating: 5,
      text: "Their Irani Chai paired with Osmania biscuits is my daily ritual. The perfect start to any day, reminding me of the chai stalls back home in Mumbai.",
    },
    {
      name: "Anita Desai",
      role: "Catering Client",
      rating: 5,
      text: "We hired Chai Bisket for our corporate event and they exceeded expectations. The live biryani station was a huge hit, and the service was impeccable!",
    },
    {
      name: "Vikram Singh",
      role: "Regular Customer",
      rating: 5,
      text: "Every visit feels like coming home. The warm hospitality and authentic flavors make this my favorite spot in town for Indian cuisine.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      items.push({ ...testimonials[index], originalIndex: index });
    }
    return items;
  };

  return (
    <Container>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#f5eddc] mb-4">
          What Our Customers Say
        </h2>
        <p className="text-[#f5eddc]/80 max-w-2xl mx-auto">
          Don&apos;t just take our word for it — hear from our cherished
          customers
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Main carousel */}
        <div className="relative h-80 md:h-96 mb-6 md:mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            {getVisibleTestimonials().map((testimonial, index) => {
              const position = index - 1;
              const isActive = position === 0;
              const isLeft = position === -1;
              const isRight = position === 1;

              return (
                <div
                  key={`${testimonial.originalIndex}-${currentIndex}`}
                  className={`absolute transition-all duration-500 ease-in-out ${
                    isActive
                      ? "z-20 scale-100 opacity-100 translate-x-0"
                      : isLeft
                      ? "z-10 scale-85 opacity-60 -translate-x-3/4 md:-translate-x-1/2"
                      : isRight
                      ? "z-10 scale-85 opacity-60 translate-x-3/4 md:translate-x-1/2"
                      : "z-0 scale-75 opacity-0"
                  }`}
                >
                  <Card
                    className={`w-72 md:w-96 h-72 md:h-80 border-2 ${
                      isActive
                        ? "border-[#f0a35c]/30 shadow-2xl bg-[#120a07]"
                        : "border-transparent bg-[#120a07]"
                    } transition-all duration-300`}
                  >
                    <CardContent className="p-4 md:p-6 h-full flex flex-col justify-between space-y-3 md:space-y-4">
                      <div className="space-y-3 md:space-y-4">
                        <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#f0a35c]/30 absolute top-3 right-3 md:top-4 md:right-4" />
                        <div className="flex items-center justify-center gap-1">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 md:w-5 md:h-5 fill-[#f0a35c] text-[#f0a35c]"
                              />
                            )
                          )}
                        </div>
                        <blockquote
                          className={`text-[#f5eddc] italic leading-relaxed ${
                            isActive
                              ? "text-sm md:text-lg"
                              : "text-xs md:text-base"
                          } transition-all duration-300`}
                        >
                          <p>&ldquo;{testimonial.text}&rdquo;</p>
                        </blockquote>
                      </div>
                      <div className="pt-3 md:pt-4 border-t border-[#2d1a11]">
                        <div className="font-semibold text-[#f5eddc] text-sm md:text-base">
                          {testimonial.name}
                        </div>
                        <p className="text-xs md:text-sm text-[#f0a35c]">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between gap-2 md:gap-4 px-2 md:px-0">
          <button
            onClick={prevSlide}
            className="p-2 md:p-3 rounded-full bg-[#120a07] hover:bg-[#1a100b] border border-[#2d1a11] transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnimating}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-[#f0a35c]" />
          </button>

          {/* Dots indicator */}
          <div className="flex gap-1.5 md:gap-2 justify-center flex-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#f0a35c] w-4 md:w-8"
                    : "bg-[#f0a35c]/30 hover:bg-[#f0a35c]/50 w-2 md:w-3"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 md:p-3 rounded-full bg-[#120a07] hover:bg-[#1a100b] border border-[#2d1a11] transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnimating}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-[#f0a35c]" />
          </button>
        </div>
      </div>
    </Container>
  );
}

export default function Page() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeBanner, setActiveBanner] = useState(0);

  // Get cart count from localStorage
  const getCartCount = () => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          return cart.reduce(
            (total: number, item: { quantity: number }) =>
              total + item.quantity,
            0
          );
        } catch (e) {
          return 0;
        }
      }
    }
    return 0;
  };

  // Add item to cart
  const addToCart = (itemId: number, itemName?: string) => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      let cart = [];

      if (savedCart) {
        try {
          cart = JSON.parse(savedCart);
        } catch (e) {
          cart = [];
        }
      }

      // Check if item already exists in cart
      const existingItem = cart.find(
        (item: { id: number }) => item.id === itemId
      );

      if (existingItem) {
        // Update quantity
        cart = cart.map((item: { id: number; quantity: number }) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item
        cart.push({ id: itemId, quantity: 1 });
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count
      setCartCount(getCartCount());

      // Dispatch event to notify other components
      window.dispatchEvent(
        new CustomEvent("cartUpdated", { detail: { cart } })
      );

      // Show toast notification
      toast.success(`${itemName || "Item"} added to cart!`);
    }
  };

  // Check login status
  const checkLoginStatus = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const userData = JSON.parse(user);
          setIsLoggedIn(true);
          setUserName(userData.name || "");
        } catch (e) {
          setIsLoggedIn(false);
          setUserName("");
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    }
  };

  // Update cart count and login status on component mount and when localStorage changes
  useEffect(() => {
    setIsClient(true);
    setCartCount(getCartCount());
    checkLoginStatus();
    const bannerInterval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % heroBanners.length);
    }, 3000);

    // Listen for storage changes (in case cart is updated in another tab)
    const handleStorageChange = () => {
      setCartCount(getCartCount());
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    // Listen for cart updates from Menu component
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    // Also check for changes periodically
    const interval = setInterval(() => {
      setCartCount(getCartCount());
      checkLoginStatus();
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      clearInterval(interval);
      clearInterval(bannerInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050302] text-[#f5eddc]">
      {/* Use the Navbar component */}
      <Navbar cartCount={cartCount} />

      {/* HERO */}
      <Section
        id="home"
        className="relative overflow-hidden min-h-[650px] flex items-center py-20"
      >
        <div className="absolute inset-0">
          {heroBanners.map((banner, index) => (
            <div
              key={banner.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/65 to-[#050302]/95" />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-[#f5eddc]/80 bg-[#120a07]/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6 border border-[#f5eddc]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0a35c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f0a35c]"></span>
              </span>
              Now serving in Cumming, GA
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight tracking-tight text-[#f5eddc] drop-shadow-[0_6px_25px_rgba(0,0,0,0.45)]">
              Biryani is an
              <span className="relative inline-block px-2">
                <span className="relative z-10 text-[#f0a35c]">emotion</span>
                <span className="absolute inset-x-0 bottom-1 h-[12px] bg-[#f0a35c]/20 -z-0"></span>
              </span>
              — Chai is the
              <span className="relative inline-block px-2">
                <span className="relative z-10 text-[#f0a35c]">mood</span>
                <span className="absolute inset-x-0 bottom-1 h-[12px] bg-[#f0a35c]/20 -z-0"></span>
              </span>
            </h1>

            <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-[#f5eddc]/85 max-w-2xl leading-relaxed">
              Chai Bisket is more than a restaurant — it&apos;s a feeling. A
              warm reminder of home, of evenings spent over chai with friends,
              of festivals filled with biryani, laughter and family. Inspired by
              the soulful streets of India, we created Chai Bisket to bring
              those memories to life here in Cumming.
              <span className="block mt-3 text-[#f0a35c]/90 font-medium">
                Welcome to a place where your heart and taste buds feel at home.
              </span>
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                className="py-5 sm:py-6 px-6 sm:px-8 text-base font-medium rounded-full shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
                size="lg"
                asChild
              >
                <a
                  href="#menu"
                  className="flex items-center justify-center sm:justify-start gap-2"
                >
                  <Utensils className="h-5 w-5" />
                  Explore Our Menu
                </a>
              </Button>
              <Button
                variant="outline"
                className="py-5 sm:py-6 px-6 sm:px-8 text-base font-medium rounded-full transition-all duration-300 hover:bg-transparent"
                size="lg"
                asChild
              >
                <a
                  href="#menu"
                  className="flex items-center justify-center sm:justify-start gap-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Pickup
                </a>
              </Button>
              <Button
                variant="outline"
                className="py-5 sm:py-6 px-6 sm:px-8 text-base font-medium rounded-full transition-all duration-300 hover:bg-transparent"
                size="lg"
                asChild
              >
                <a
                  href="/cart"
                  className="flex items-center justify-center sm:justify-start gap-2"
                >
                  <Truck className="h-5 w-5" />
                  Delivery
                </a>
              </Button>
            </div>

            <div className="mt-6">
              <Button
                className="py-4 px-6 text-base font-medium rounded-full shadow-lg bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a] transition-all duration-300 transform hover:scale-105"
                size="lg"
                asChild
              >
                <a
                  href="#specials"
                  className="flex items-center justify-center gap-2"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  Today&apos;s Special
                </a>
              </Button>
            </div>
          </motion.div>
        </Container>

        {/* Scroll indicator - hidden on mobile */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-[#f5eddc]/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-[#f5eddc]/70 rounded-full animate-scroll"></div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes scroll {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            50% {
              transform: translateY(10px);
              opacity: 0.5;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-scroll {
            animation: scroll 2s infinite;
          }
        `}</style>
      </Section>

      {/* MARQUEE - Hidden on mobile, visible on md screens and up */}
      {/* <div className="hidden md:block relative overflow-hidden bg-[#120a07]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#120a07] via-transparent to-[#120a07] z-10" />
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] py-3 text-sm font-medium text-[#f5eddc]/80 md:animate-[marquee_30s_linear_infinite]">
          <span className="mx-4 md:mx-8">Irani CHAI</span>
          <span className="mx-4 md:mx-8">Osmania Biscuits</span>
          <span className="mx-4 md:mx-8">Hyderabadi Biryani</span>
          <span className="mx-4 md:mx-8">Samosa & Cutlets</span>
          <span className="mx-4 md:mx-8">Bun Maska</span>
          <span className="mx-4 md:mx-8">Vada Pav</span>
          <span className="mx-4 md:mx-8">Chicken 65</span>
          <span className="mx-4 md:mx-8">Kulfi & Falooda</span> */}

      {/* Duplicate items for seamless loop - hidden on mobile */}
      {/* <span className="hidden md:inline-block mx-4 md:mx-8">
            Irani CHAI
          </span>
          <span className="hidden md:inline-block mx-4 md:mx-8">
            Osmania Biscuits
          </span>
          <span className="hidden md:inline-block mx-4 md:mx-8">
            Hyderabadi Biryani
          </span>
          <span className="hidden md:inline-block mx-4 md:mx-8">
            Samosa & Cutlets
          </span>
          <span className="hidden md:inline-block mx-4 md:mx-8">Bun Maska</span>
          <span className="hidden md:inline-block mx-4 md:mx-8">Vada Pav</span>
          <span className="hidden md:inline-block mx-4 md:mx-8">
            Chicken 65
          </span>
          <span className="hidden md:inline-block mx-4 md:mx-8">
            Kulfi & Falooda
          </span>
        </div>
      </div> */}

      <div className="relative overflow-hidden bg-[#120a07]">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#120a07] via-transparent to-[#120a07] z-10" />

        {/* marquee wrapper */}
        <div className="flex w-max animate-[marquee_15s_linear_infinite] py-2 text-xs sm:text-sm font-medium text-[#f5eddc]/80 md:py-3 md:animate-[marquee_30s_linear_infinite]">
          {/* Set 1 */}
          <div className="flex whitespace-nowrap">
            <span className="mx-3 sm:mx-6">Irani CHAI</span>
            <span className="mx-3 sm:mx-6">Osmania Biscuits</span>
            <span className="mx-3 sm:mx-6">Hyderabadi Biryani</span>
            <span className="mx-3 sm:mx-6">Samosa & Cutlets</span>
            <span className="mx-3 sm:mx-6">Bun Maska</span>
            <span className="mx-3 sm:mx-6">Vada Pav</span>
            <span className="mx-3 sm:mx-6">Chicken 65</span>
            <span className="mx-3 sm:mx-6">Kulfi & Falooda</span>
          </div>

          {/* Set 2 (duplicate for perfect loop) */}
          <div className="flex whitespace-nowrap">
            <span className="mx-3 sm:mx-6">Irani CHAI</span>
            <span className="mx-3 sm:mx-6">Osmania Biscuits</span>
            <span className="mx-3 sm:mx-6">Hyderabadi Biryani</span>
            <span className="mx-3 sm:mx-6">Samosa & Cutlets</span>
            <span className="mx-3 sm:mx-6">Bun Maska</span>
            <span className="mx-3 sm:mx-6">Vada Pav</span>
            <span className="mx-3 sm:mx-6">Chicken 65</span>
            <span className="mx-3 sm:mx-6">Kulfi & Falooda</span>
          </div>
        </div>
      </div>

      {/* TODAY'S SPECIAL */}
      <Section id="specials" className="bg-[#0b0503]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#f5eddc] mb-4">
              Today&apos;s Special
            </h2>
            <p className="text-[#f5eddc]/80 max-w-2xl mx-auto">
              Discover our chef&apos;s special creations for the day, crafted
              with the finest ingredients and authentic flavors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Special Item 1 */}
            <div className="bg-[#120a07] rounded-2xl overflow-hidden border border-[#2d1a11] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="/images/Hyderabadi Biryani.jpg"
                  alt="Special Hyderabadi Biryani"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#f5eddc]">
                    Hyderabadi Biryani
                  </h3>
                  <span className="text-amber-200 font-bold">$12.99</span>
                </div>
                <p className="text-[#f5eddc]/80 mb-4">
                  Authentic dum biryani with tender meat and fragrant basmati
                  rice.
                </p>
                <Button
                  onClick={() => addToCart(15, "Hyderabadi Biryani")}
                  className="w-full bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a]"
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Special Item 2 */}
            <div className="bg-[#120a07] rounded-2xl overflow-hidden border border-[#2d1a11] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="/images/iran chaai.png"
                  alt="Special Irani Chai"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#f5eddc]">
                    Irani Chai
                  </h3>
                  <span className="text-amber-200 font-bold">$3.99</span>
                </div>
                <p className="text-[#f5eddc]/80 mb-4">
                  Traditional strong tea with spices, served with Osmania
                  biscuits.
                </p>
                <Button
                  onClick={() => addToCart(4, "Irani Chai")}
                  className="w-full bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a]"
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Special Item 3 */}
            <div className="bg-[#120a07] rounded-2xl overflow-hidden border border-[#2d1a11] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src="/images/Chicken 65.jpg"
                  alt="Special Chicken 65"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#f5eddc]">
                    Chicken 65
                  </h3>
                  <span className="text-amber-200 font-bold">$9.99</span>
                </div>
                <p className="text-[#f5eddc]/80 mb-4">
                  Spicy deep-fried chicken with authentic South Indian spices.
                </p>
                <Button
                  onClick={() => addToCart(13, "Chicken 65")}
                  className="w-full bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a]"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* MENU SECTION */}
      <Section id="menu" className="bg-[#0b0503]">
        <Menu onCartUpdate={() => setCartCount(getCartCount())} />
      </Section>

      {/* GALLERY */}
      <Section id="moments" className="bg-[#120a07]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Moments & Mood
            </h2>
            <p className="mt-3 text-[#f5eddc]/70">
              Swipe through the vibe — tag us{" "}
              <span className="font-semibold text-[#f0a35c]">
                <a
                  href="https://instagram.com/chaibisket_eats"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#f0a35c] hover:underline hover:text-[#e0924b] transition-colors"
                >
                  @chaibisket_eats
                </a>
              </span>{" "}
              on Instagram to get featured!
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {art.gallery.map((src, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-2xl"
              >
                <SafeImage
                  src={src}
                  alt={`Chai Bisket gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" className="border-[#f5eddc]/40">
              <a
                href="https://instagram.com/chaibisket_eats"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Instagram className="mr-2 h-4 w-4" />
                Follow @chaibisket_eats
              </a>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Floating Catering Button - Mobile Only */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Link
          href="/cart"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#c87534] to-[#8a4b24] text-[#120a06] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="View Cart"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#f5eddc] text-[#120a06] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#120a06]">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* TESTIMONIALS */}
      <Section id="testimonials" className="bg-[#0b0503]">
        <TestimonialsCarousel />
      </Section>

      {/* LOCATION SECTION */}
      <Section id="location" className="bg-[#120a07]">
        <LocationSection />
      </Section>

      {/* CONTACT & CATERING SECTION */}
      <Section id="write-to-us" className="bg-[#0b0503]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#f5eddc] mb-4">
              Get in Touch
            </h2>
            <p className="text-[#f5eddc]/80 max-w-2xl mx-auto">
              Have a question or planning an event? We&apos;re here to help make
              your experience memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Write to Us Form */}
            <Card className="rounded-3xl bg-[#120a07] border-[#2d1a11]">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#f5eddc]">
                  Write to Us
                </CardTitle>
                <br />
                <p className="text-[#f5eddc]/70 text-sm mt-2">
                  Questions, feedback, or just want to say hi?
                </p>
                <br />
              </CardHeader>
              <CardContent>
                <WriteToUsForm />
              </CardContent>
            </Card>

            {/* Catering Quote Form */}
            <Card
              id="catering-card"
              className="scroll-mt-24 rounded-3xl bg-[#120a07] border-[#2d1a11] h-fit"
            >
              <CardHeader className="pt-4 pb-1">
                <CardTitle className="text-2xl font-serif text-[#f5eddc]">
                  Hosting a Party?
                </CardTitle>
                <br />
                <p className="text-[#f5eddc]/70 text-sm mt-1">
                  From chai counters to biryani bars — we cater birthdays,
                  office events, and desi celebrations.
                </p>
                <ul className="text-[#f5eddc]/70 text-sm mt-1 mb-3 space-y-1">
                  <li>• Customizable menus</li>
                  <li>• Bulk chai, biscuits & snacks</li>
                  <li>• On-site live stations</li>
                </ul>
              </CardHeader>
              <CardContent className="px-6 pt-0 pb-0">
                <Button
                  onClick={() => {
                    const message = encodeURIComponent(
                      "Hi! I'd like to get a catering quote for my event. Please contact me with details and pricing."
                    );
                    window.open(
                      `https://wa.me/19432040168?text=${message}`,
                      "_blank"
                    );
                  }}
                  className="w-full bg-gradient-to-r from-[#f0a35c] to-[#d97a3a] hover:from-[#f5b97a] hover:to-[#e08a4a]"
                >
                  Get catering quote
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Support Email */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#f5eddc]/60">
              Or email us directly at{" "}
              <a
                href="mailto:Support@chaibisketeats.com"
                className="text-[#f0a35c] hover:underline font-medium"
              >
                Support@chaibisketeats.com
              </a>
            </p>
          </div>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer className="bg-[#120a07] text-[#f5eddc] border-t border-[#2d1a11]">
        <Container className="py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-14 w-14 rounded-full border border-[#2d1a11] overflow-hidden bg-[#120a07] flex items-center justify-center">
                <Image
                  src="/images/logo.jpg"
                  alt="Chai Bisket"
                  width={56}
                  height={56}
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <div className="text-xl font-semibold">CHAI BISKET</div>
                <div className="text-xs font-serif italic tracking-widest text-[#f0a35c] block text-right">
                  Indian Eatery
                </div>
              </div>
            </div>
            <p className="mt-3 text-[#f5eddc]/70 text-sm max-w-sm leading-relaxed">
              Welcome to your new adda in Cumming - a vibrant celebration of
              India in every flavor. We cook with passion, season with nostalgia
              and serve with love so that each bite feels like home, no matter
              how far you&nbsp;are&nbsp;from&nbsp;it.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-3">Quick Links</div>
            <ul className="space-y-2 text-[#f5eddc]/70 text-sm">
              <li>
                <a href="#menu" className="hover:text-[#ffd9a0]">
                  Menu
                </a>
              </li>
              <li>
                <a href="#moments" className="hover:text-[#ffd9a0]">
                  Moments
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#ffd9a0]">
                  Location & Hours
                </a>
              </li>
              <li>
                <a href="#catering-card" className="hover:text-[#ffd9a0]">
                  Catering
                </a>
              </li>
              <li>
                <a href="#write-to-us" className="hover:text-[#ffd9a0]">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Find Us</div>
            <div className="text-sm text-[#f5eddc]/70 flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1" /> 911 Market Pl Blvd, Suite L,
              Cumming, GA 30041
            </div>
            <div className="text-sm text-[#f5eddc]/70 mt-2 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a
                href="tel:+19432040168"
                className="hover:text-[#f5eddc] transition-colors"
              >
                +1 (943) 204-0168
              </a>
            </div>

            <div className="mt-3">
              <a
                href="https://instagram.com/chaibisket_eats"
                target="_blank"
                rel="noreferrer"
                className="text-[#f5eddc] hover:text-[#ffd9a0] inline-block"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#f5eddc] hover:text-[#ffd9a0] inline-block"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </Container>
        <div className="border-t border-[#2d1a11]">
          <Container className="py-4 text-xs text-[#f5eddc]/60 flex flex-wrap items-center justify-between">
            <div className="flex gap-4">
              <span>
                © {new Date().getFullYear()} Chai Bisket. All rights reserved.
              </span>
              <div className="flex gap-4 border-l border-[#f5eddc]/20 pl-4">
                <Link href="/terms" className="hover:text-[#f5eddc]">
                  Terms of Use
                </Link>
                <Link href="/privacy" className="hover:text-[#f5eddc]">
                  Privacy Policy
                </Link>
              </div>
            </div>
            <span>Made with ❤ Chai Bisket.</span>
          </Container>
        </div>
      </footer>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
      `}</style>
    </div>
  );
}

export const runtime = "nodejs";
export const preferredRegion = "auto";
