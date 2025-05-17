"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  GiftIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CameraIcon,
  MapPinIcon,
  HeartIcon,
  ChevronDoubleDownIcon,
  CheckCircleIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const APP_NAME = "SmartCart";

interface TypingEffectProps {
  texts: string[];
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ texts, className }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const word = texts[wordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(word.substring(0, displayedText.length + 1));
        setTypingSpeed(100);

        if (displayedText === word) {
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        setDisplayedText(word.substring(0, displayedText.length - 1));
        setTypingSpeed(75);

        if (displayedText === "") {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typingSpeed, texts, wordIndex]);

  return <span className={className}>{displayedText}</span>;
};

const useIntersectionObserver = () => {
  useEffect(() => {
    interface IntersectionObserverEntryWithTarget
      extends IntersectionObserverEntry {
      target: Element;
    }

    const callback = (entries: IntersectionObserverEntryWithTarget[]): void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);
};

export default function HomePage() {
  useIntersectionObserver();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<
    { name: string; quantity: number }[]
  >([]);
  const [showRecipeInput, setShowRecipeInput] = useState(false);
  const [recipeURL, setRecipeURL] = useState("");
  const [filters, setFilters] = useState({
    canadian: false,
    vegetarian: false,
    glutenFree: false,
    kosher: false,
    halal: false,
    vegan: false,
    dairyFree: false,
  });

  // Function to add items to cart
  const addItemToCart = () => {
    if (searchQuery.trim() === "") return;

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // Add new item if it doesn't exist
      setCartItems([...cartItems, { name: searchQuery, quantity: 1 }]);
    }

    // Clear search field after adding
    setSearchQuery("");
  };

  // Function to update item quantity
  const updateQuantity = (index: number, change: number) => {
    const updatedCart = [...cartItems];
    const newQuantity = updatedCart[index].quantity + change;

    if (newQuantity <= 0) {
      // Remove item if quantity becomes zero or negative
      updatedCart.splice(index, 1);
    } else {
      // Otherwise update the quantity
      updatedCart[index].quantity = newQuantity;
    }

    setCartItems(updatedCart);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      name: "Multi-Store Optimizer",
      description:
        "You decide the number of stops. We map out the most cost-effective routes.",
      icon: MapPinIcon,
      color: "from-teal-400 to-teal-600",
    },
    {
      name: "Real-Time Price Hunter",
      description:
        "Our system constantly scans major Canadian grocers for up-to-the-minute deals.",
      icon: MagnifyingGlassIcon,
      color: "from-green-400 to-green-600",
    },
    {
      name: "Recipe & Image Scan",
      description:
        "Snap a photo or paste a recipe link. We'll instantly populate your shopping list.",
      icon: CameraIcon,
      color: "from-lime-400 to-lime-600",
    },
    {
      name: "Dietary Filters",
      description: "Tailor your grocery search to match dietary needs.",
      icon: ShieldCheckIcon,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      name: "UNSDG 2 Impact",
      description:
        "Your savings helps advance United Nations Sustainable Development Goal 2: Zero Hunger",
      icon: HeartIcon,
      color: "from-cyan-400 to-cyan-600",
    },
    {
      name: "Give Back Your Savings",
      description:
        "Optionally, donate a portion of your saved money to a meaningful charity.",
      icon: GiftIcon,
      color: "from-green-400 to-green-600",
    },
  ];

  const howItWorksSteps = [
    {
      title: "1. List Your Groceries",
      description:
        "Type, scan a recipe, or upload an image to populate your shopping list.",
      icon: ShoppingBagIcon,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "2. Smart Optimization Engine",
      description:
        "Generative AI parses your list and applies filters. Then, a custom algorithm compares store prices to build your most cost-effective cart.",
      icon: ShieldCheckIcon,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "3. Uncover Max Savings",
      description:
        "Receive your optimized shopping plan, with stores, prices, and total savings.",
      icon: SparklesIcon,
      color: "from-green-400 to-green-600",
    },
  ];

  const heroDynamicWords = ["Smarter", "Cheaper", "Greener"];

  return (
    <div className={showPopup ? "overflow-hidden" : ""}>
      {" "}
      {/* Popup component */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm "
            onClick={() => setShowPopup(false)}
          ></div>

          <div className="flex flex-col md:flex-row gap-4 max-w-[95%] relative z-10">
            {/* Filters Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform transition-all animate-fade-in-up md:w-72">
              <h3 className="font-semibold text-emerald-800 mb-3 text-lg">
                Dietary Preferences
              </h3>
              <div className="space-y-2">
                {[
                  { id: "canadian", label: "Canadian Products" },
                  { id: "vegetarian", label: "Vegetarian" },
                  { id: "glutenFree", label: "Gluten Free" },
                  { id: "halal", label: "Halal" },
                  { id: "kosher", label: "Kosher" },
                  { id: "vegan", label: "Vegan" },
                  { id: "dairyFree", label: "Dairy Free" },
                ].map((filter) => (
                  <div key={filter.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={filter.id}
                      checked={filters[filter.id as keyof typeof filters]}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          [filter.id]: e.target.checked,
                        });
                      }}
                      className="rounded border-gray-300 text-green-500 focus:ring-green-400 h-4 w-4 checked:bg-green-500 accent-green-500"
                    />
                    <label htmlFor={filter.id} className="ml-2 text-gray-700">
                      {filter.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Cart Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-auto transform transition-all animate-fade-in-up">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Popup Title */}
              <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
                What's In Your Cart?
              </h2>

              {/* Search Bar */}
              <div className="flex items-center mb-4 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addItemToCart();
                  }}
                  placeholder="Search grocery items..."
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={addItemToCart}
                  className="absolute right-3 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Upload and Recipe URL buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  className="flex-1 cursor-pointer bg-emerald-100 text-emerald-800 font-medium py-2 px-4 rounded-lg hover:bg-emerald-200 transition-colors flex items-center justify-center"
                  onClick={() => {
                    setCartItems([
                      ...cartItems,
                      { name: "Tomatoes", quantity: 2 },
                      { name: "Onions", quantity: 1 },
                      { name: "Garlic", quantity: 1 },
                    ]);
                  }}
                >
                  <CameraIcon className="w-5 h-5 mr-2" />
                  Upload a picture
                </button>
                <button
                  className="flex-1 cursor-pointer bg-emerald-100 text-emerald-800 font-medium py-2 px-4 rounded-lg hover:bg-emerald-200 transition-colors flex items-center justify-center"
                  onClick={() => setShowRecipeInput(!showRecipeInput)}
                >
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Recipe URL
                </button>
              </div>

              {/* Recipe URL Input */}
              {showRecipeInput && (
                <div className="mb-6 animate-fade-in">
                  <div className="flex items-center relative">
                    <input
                      type="text"
                      value={recipeURL}
                      onChange={(e) => setRecipeURL(e.target.value)}
                      placeholder="Paste recipe URL here..."
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && recipeURL.trim() !== "") {
                          // Add the recipe URL to cart
                          const shortened = recipeURL
                            .replace(/^https?:\/\//, "")
                            .split("/")[0];
                          setCartItems([
                            ...cartItems,
                            { name: `Recipe: ${shortened}`, quantity: 1 },
                          ]);
                          setRecipeURL("");
                          setShowRecipeInput(false);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (recipeURL.trim() !== "") {
                          // Add the recipe URL to cart
                          const shortened = recipeURL
                            .replace(/^https?:\/\//, "")
                            .split("/")[0];
                          setCartItems([
                            ...cartItems,
                            { name: `Recipe: ${shortened}`, quantity: 1 },
                          ]);
                          setRecipeURL("");
                          setShowRecipeInput(false);
                        }
                      }}
                      className="absolute right-3 text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Cart Items */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-60 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-500 italic">
                    Your cart is empty. Start by searching for items above.
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="w-8 h-8 cursor-pointer rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="w-8 h-8 cursor-pointer rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            const updatedCart = [...cartItems];
                            updatedCart.splice(index, 1);
                            setCartItems(updatedCart);
                          }}
                          title="Remove item"
                          className="w-8 h-8 cursor-pointer rounded-full bg-red-100 text-red-800 flex items-center justify-center hover:bg-red-200 transition-colors mr-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Calculate Button */}
              <button
                className="w-full cursor-pointer bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                onClick={() => {
                  if (cartItems.length > 0) {
                    // Here you would implement the actual calculation logic
                    // For now, just show a confirmation that would lead to results
                    alert(
                      `Calculating best prices for ${cartItems.length} items...`
                    );
                    // In a real implementation, you might route to a results page
                    // or show a loading state while calculating
                  } else {
                    alert("Please add items to your cart first");
                  }
                }}
                disabled={cartItems.length === 0}
              >
                <SparklesIcon className="w-5 h-5 mr-2" />
                CALCULATE
              </button>
            </div>
          </div>
        </div>
      )}
      <Head>
        <title>{APP_NAME}</title>
        <meta
          name="description"
          content={`Revolutionize your grocery shopping with ${APP_NAME}. Find the absolute cheapest cart across Canadian stores and fight food inflation. Supports UNSDG 2.`}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          scrollPosition > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2 group">
                <img
                  src="/logo.png"
                  alt="SmartCart Logo"
                  className="w-13 h-13 transform group-hover:rotate-[20deg] transition-all duration-500 ease-bounce"
                />
                <span
                  className={`text-2xl md:text-3xl font-extrabold transition-all duration-500 ${
                    scrollPosition > 50
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent"
                      : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 animate-gradient-shift"
                  }`}
                >
                  {APP_NAME}
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setShowPopup(true)}
                className="relative overflow-hidden ml-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg
                hover:shadow-emerald-500/30 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:translate-y-[-2px] group btn-shimmer p-4!"
              >
                <span className="flex items-center relative z-10">
                  <MagnifyingGlassIcon className="w-6 h-6 transform group-hover:scale-125 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(255_255_255_/_0.15)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10 pt-24 pb-12">
          <div className="relative inline-block mb-8">
            <div className="relative inline-flex rounded-full bg-gradient-to-br from-emerald-400/20 to-green-400/10 p-4 backdrop-blur-sm mb-6 animate-float group transform hover:scale-105 transition-all duration-500">
              <ShoppingBagIcon className="w-16 h-16 md:w-20 md:h-20 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
              <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-xl animate-subtle-pulse">
                <SparklesIcon className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4 flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight animate-hero-text-pop text-white">
              Shop{" "}
              <span className="relative inline-block">
                <TypingEffect
                  texts={heroDynamicWords}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 animate-gradient-shift"
                />
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded opacity-70"></span>
              </span>
              . <span className="block sm:inline">Not Harder.</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-emerald-100/90 font-light leading-relaxed animate-heroTextPop animation-delay-1000">
              {APP_NAME} scours Canadian grocery stores to find you the{" "}
              <strong className="font-semibold text-white relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-emerald-400/50">
                absolute lowest prices
              </strong>
              , helping you save big and eat healthy.
            </p>

            <div className="hidden md:flex items-center">
              {" "}
              <button
                onClick={() => setShowPopup(true)}
                className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl relative overflow-hidden ml-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-7 px-12 rounded-full shadow-lg
                hover:shadow-emerald-500/30 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:translate-y-[-2px] group btn-shimmer"
              >
                <span className="flex items-center relative z-10">
                  Start Saving
                  <ArrowRightIcon className="w-6 h-6 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 translate-y-5 -translate-x-1/2 animate-fade-in animation-delay-1000">
            <Link
              href="#features"
              className="group flex flex-col items-center space-y-2 transition-colors duration-300"
              aria-label="Scroll to learn more"
            >
              <span className="text-sm font-medium text-white">
                Scroll to learn more
              </span>
              <ChevronDoubleDownIcon className="w-6 h-6 text-white group-hover:animate-none group-hover:translate-y-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </header>
      {/* Problem Statement */}
      <section id="problem" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-6 animate-on-scroll animate-fade-in-down">
              <HeartIcon className="w-8 h-8 text-emerald-600" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6 animate-on-scroll animate-fade-in-up">
              Tired of Pricey Groceries?
            </h2>

            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12 animate-on-scroll animate-fade-in-up animation-delay-200">
              Groceries are getting more expensive, and it can feel impossible
              to keep up. SmartCart helps you shop smarter, save money, and
              stress less. We believe everyone deserves affordable food, and
              together we're helping make that a reality, supporting <br />
              <strong className="text-emerald-700">UNSDG 2: Zero Hunger</strong>
              .
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-on-scroll animate-fade-in-up animation-delay-300">
              {[
                {
                  icon: CurrencyDollarIcon,
                  text: "Real Savings",
                  description: "Average 32% reduction in grocery bills",
                  color: "from-emerald-500 to-emerald-700",
                },
                {
                  icon: SparklesIcon,
                  text: "Smarter Choices",
                  description: "AI-powered price comparison across stores",
                  color: "from-teal-500 to-teal-700",
                },
                {
                  icon: GiftIcon,
                  text: "Community Impact",
                  description: "Support food security initiatives",
                  color: "from-green-500 to-green-700",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl border border-emerald-100 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${item.color} p-3 shadow-lg`}
                  >
                    <item.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-emerald-900 mb-2">
                    {item.text}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-24 bg-emerald-900 text-white overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-[#d8f9e6]/30 rounded-full mb-6 animate-on-scroll animate-fade-in-down">
              <CheckCircleIcon className="w-8 h-8 text-emerald-300" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-on-scroll animate-fade-in-up">
              How {APP_NAME} Works Its Magic
            </h2>

            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto animate-on-scroll animate-fade-in-up animation-delay-200">
              Grocery savings in three simple, powerful steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div
                key={step.title}
                className="text-center relative animate-on-scroll animate-fade-in-up"
                style={{ animationDelay: `${0.3 + index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  {/* Connection line between steps */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden text-xl md:block absolute top-1/3 -right-4 w-8 h-0.5 z-0 text-emerald-700">
                      {"->"}
                    </div>
                  )}

                  <div
                    className={`bg-gradient-to-br ${step.color} text-white rounded-2xl p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative`}
                  >
                    <step.icon className="w-12 h-12" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">
                  {step.title}
                </h3>

                <p className="text-emerald-100 text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="relative py-24 bg-gradient-to-b from-white via-emerald-50 to-emerald-100 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(16_185_129_/_0.04)_1px,_transparent_0)] bg-[length:32px_32px]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-6 animate-on-scroll animate-fade-in-down">
              <StarIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6 animate-on-scroll animate-fade-in-up">
              Why Choose {APP_NAME}?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <div
                key={feature.name}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl border border-emerald-100 transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <div
                  className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mx-auto`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-emerald-900 mb-2 text-center">
                  {feature.name}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
