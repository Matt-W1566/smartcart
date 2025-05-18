"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface StoreItem {
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  itemId?: string; // Optional ID to track the original item
}

interface StoreCart {
  storeName: string;
  location: string;
  items: StoreItem[];
}

interface CartOption {
  numberOfStores: number;
  stores: StoreCart[];
  totalOriginal: number;
  totalOptimized: number;
  totalSavings: number;
}

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="relative inline-flex rounded-full bg-gradient-to-br from-emerald-400/20 to-green-400/10 p-4 backdrop-blur-sm mb-6 animate-float">
        <SparklesIcon className="w-16 h-16 md:w-20 md:h-20 text-emerald-400" />
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-xl animate-subtle-pulse">
          <CurrencyDollarIcon className="w-7 h-7 text-emerald-600" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-4 animate-pulse">
        Finding Your Best Deals
      </h2>
      <p className="text-emerald-200 text-lg">
        Optimizing your cart across local stores...
      </p>
    </div>
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>
  </div>
);

const ResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationPercentage, setDonationPercentage] = useState(10);
  const [cartOptions, setCartOptions] = useState<CartOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Retrieve cart from localStorage (as used in page.tsx)
    const cartRaw = window.localStorage.getItem("cartItems");
    const filtersRaw = window.localStorage.getItem("dietaryPreferences");
    let cart: { [item: string]: number } = {};
    let dietary: { [filter: string]: boolean } = {};

    if (cartRaw) {      try {
        const parsed = JSON.parse(cartRaw) as { name: string; quantity: number }[];
        for (const entry of parsed) {
          if (entry.name && entry.quantity !== undefined) {
            // Ensure quantity is a number and at least 1
            const numQuantity = typeof entry.quantity === 'number' ? 
              entry.quantity : 
              (typeof entry.quantity === 'string' ? 
                parseInt(entry.quantity) : 1);
            
            cart[entry.name] = Math.max(1, numQuantity);
          }
        }
      } catch (e) {
        console.error("Error parsing cart items:", e);
        // fallback: empty cart
      }
    }

    if (filtersRaw) {
      try {
        dietary = JSON.parse(filtersRaw);
      } catch (e) {
        // fallback: no dietary preferences
      }
    }

    if (Object.keys(cart).length === 0) {
      setError("Your cart is empty. Please add items to your cart and try again.");
      setLoading(false);
      return;
    }

    // Map UI filter names to backend dietary preference names
    const dietaryPreferences = {
      is_canadian: dietary.canadian || false,
      is_vegan: dietary.vegan || false,
      is_vegetarian: dietary.vegetarian || false,
      is_halal: dietary.halal || false,
      is_kosher: dietary.kosher || false,
      gluten_free: dietary.glutenFree || false,
      dairy_free: dietary.dairyFree || false
    };

    // Call the optimizer API
    fetch("/api/optimize-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, dietary: dietaryPreferences })
    })      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to optimize cart");
        const data = await res.json();
        console.log("Cart from localStorage:", cart);
        console.log("API Response:", JSON.stringify(data, null, 2));
        const options = parseApiResult(data);
        console.log("Parsed Options:", JSON.stringify(options, null, 2));
        setCartOptions(options);
        if (options.length === 0) {
          setError("No optimized options could be found for your cart. Try adjusting your items or preferences.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("There was a problem optimizing your cart. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Function to capitalize first letter of each word
  const capitalizeWords = (text: string): string => {
    if (!text) return '';
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };  // Comprehensive function to handle API data parsing
  const parseApiResult = (data: any) => {
    // Transform backend result to CartOption[] for UI
    const options: CartOption[] = [];
    
    // Get the cart from localStorage for quantity fallback
    const cartRaw = window.localStorage.getItem("cartItems");
    let cartWithQuantities: { [itemName: string]: number } = {};
    if (cartRaw) {      try {
        const parsed = JSON.parse(cartRaw) as { name: string; quantity: number }[];
        for (const entry of parsed) {
          // More strict checking for valid entries with quantities
          if (entry.name) {
            // Convert any quantity to a number, default to 1 if invalid
            let numQuantity = 1;
            if (entry.quantity !== undefined) {
              numQuantity = typeof entry.quantity === 'number' ? 
                entry.quantity : 
                (typeof entry.quantity === 'string' ? 
                  parseInt(entry.quantity, 10) : 1);
              
              if (isNaN(numQuantity)) numQuantity = 1;
            }
            
            // Store quantities by lowercase name for case-insensitive lookup
            cartWithQuantities[entry.name.toLowerCase()] = Math.max(1, numQuantity);
          }
        }
        console.log("Cart quantities from localStorage:", cartWithQuantities);
      } catch (e) {
        console.error("Error parsing cart items for quantities:", e);
      }
    }
    
    // Get the highest prices from the highest_single_store
    let highestPriceMap: Record<string, number> = {};
    if (data.highest_single_store && data.highest_single_store.breakdown) {
      const storeKey = Object.keys(data.highest_single_store.breakdown)[0];
      if (storeKey) {
        const items = (data.highest_single_store.breakdown[storeKey] as { items: any[] }).items;
        for (const item of items) {
          highestPriceMap[item.name] = item.price;
        }
      }
    }    // Map store data to our UI format
    const mapStoreData = (storeName: string, breakdown: any) => {
      const typedBreakdown = breakdown as { items: any[]; total: number };
      return {
        storeName: capitalizeWords(storeName),
        location: "",
        items: typedBreakdown.items.map(item => {          // Get the quantity from multiple potential sources with fallbacks
          const lowerCaseName = (item.name || '').toLowerCase();
          const productLowerCaseName = (item.product || '').toLowerCase();
          
          // Enhanced quantity extraction with multiple fallbacks
          let quantity = 1; // Default fallback
          
          // First check the API-provided quantity
          if (typeof item.quantity === 'number' && item.quantity > 0) {
            quantity = item.quantity;
            console.log(`Using API quantity for ${item.name}: ${quantity}`);
          } 
          // Then check cart quantities by item name
          else if (cartWithQuantities[lowerCaseName] && cartWithQuantities[lowerCaseName] > 0) {
            quantity = cartWithQuantities[lowerCaseName];
            console.log(`Using cart quantity from item name for ${item.name}: ${quantity}`);
          }
          // Then check cart quantities by product name
          else if (cartWithQuantities[productLowerCaseName] && cartWithQuantities[productLowerCaseName] > 0) {
            quantity = cartWithQuantities[productLowerCaseName];
            console.log(`Using cart quantity from product name for ${item.name}: ${quantity}`);
          }
          
          // Ensure quantity is at least 1
          quantity = Math.max(1, quantity);
          
          console.log(`Item ${item.name}: API quantity=${item.quantity}, CartQuantity=${cartWithQuantities[lowerCaseName]}, FinalQuantity=${quantity}`);          
          return {
            name: capitalizeWords(item.product || item.name),
            price: item.subtotal || (item.price * quantity),
            originalPrice: highestPriceMap[item.name] 
              ? highestPriceMap[item.name] * quantity 
              : item.price * quantity,
            quantity: quantity,
            itemId: item.name, // Store original item name for reference
          };
        }),
      };
    };
    
    // Add single store option
    if (data.cheapest_single_store && data.cheapest_single_store.breakdown && 
        Object.keys(data.cheapest_single_store.breakdown).length > 0) {
      options.push({
        numberOfStores: 1,
        stores: Object.entries(data.cheapest_single_store.breakdown).map(([storeName, breakdown]) => 
          mapStoreData(storeName, breakdown)
        ),
        totalOriginal: data.highest_single_store ? data.highest_single_store.total : 
          (data.cheapest_single_store.breakdown[Object.keys(data.cheapest_single_store.breakdown)[0]] as { total: number }).total,
        totalOptimized: data.cheapest_single_store.total,
        totalSavings: data.highest_single_store ? 
          data.highest_single_store.total - data.cheapest_single_store.total :
          (data.cheapest_single_store.breakdown[Object.keys(data.cheapest_single_store.breakdown)[0]] as { total: number }).total -
          data.cheapest_single_store.total,
      });
    }
    
    // Add two store option
    if (data.cheapest_two_stores && data.cheapest_two_stores.breakdown && 
        Object.keys(data.cheapest_two_stores.breakdown).length > 0) {
      options.push({
        numberOfStores: 2,
        stores: Object.entries(data.cheapest_two_stores.breakdown).map(([storeName, breakdown]) => 
          mapStoreData(storeName, breakdown)
        ),
        totalOriginal: data.highest_single_store ? data.highest_single_store.total : 
          Object.values(data.cheapest_two_stores.breakdown).reduce((acc: number, b: any) => acc + (b as { total: number }).total, 0),
        totalOptimized: data.cheapest_two_stores.total,
        totalSavings: data.highest_single_store ? 
          data.highest_single_store.total - data.cheapest_two_stores.total :
          Object.values(data.cheapest_two_stores.breakdown).reduce((acc: number, b: any) => acc + (b as { total: number }).total, 0) -
          data.cheapest_two_stores.total,
      });
    }
    
    // Add three store option
    if (data.cheapest_three_stores && data.cheapest_three_stores.breakdown && 
        Object.keys(data.cheapest_three_stores.breakdown).length > 0) {
      options.push({
        numberOfStores: 3,
        stores: Object.entries(data.cheapest_three_stores.breakdown).map(([storeName, breakdown]) => 
          mapStoreData(storeName, breakdown)
        ),
        totalOriginal: data.highest_single_store ? data.highest_single_store.total : 
          Object.values(data.cheapest_three_stores.breakdown).reduce((acc: number, b: any) => acc + (b as { total: number }).total, 0),
        totalOptimized: data.cheapest_three_stores.total,
        totalSavings: data.highest_single_store ? 
          data.highest_single_store.total - data.cheapest_three_stores.total :
          Object.values(data.cheapest_three_stores.breakdown).reduce((acc: number, b: any) => acc + (b as { total: number }).total, 0) -
          data.cheapest_three_stores.total,
      });
    }
    
    return options;
  };

  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    if (typeof window !== "undefined") {
      window.alert(error);
    }
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Header */}          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 pt-24 pb-20 px-6">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-down">
                Your Optimized Shopping Cart
              </h1>
              <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto mb-4">
                Choose Your Preferred Shopping Option Below
              </p>
              <div className="inline-flex items-center bg-emerald-800/50 rounded-lg px-4 py-2 text-emerald-100 text-sm">
                <ShoppingBagIcon className="w-4 h-4 mr-2" />
                <span>{cartOptions.length > 0 && cartOptions[0].stores.reduce((acc, store) => acc + store.items.length, 0)} items in your cart</span>
              </div>
            </div>
          </div>          {/* Main Content */}
          <div className="container mx-auto px-6 py-12">
            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-emerald-800 mb-3">Your Cart Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cartOptions.length > 0 && 
                  // Create a map of unique items with their quantities
                  (() => {
                    const uniqueItems = new Map();
                    
                    // Collect all items across all stores
                    cartOptions[0].stores.forEach(store => {
                      store.items.forEach(item => {
                        const key = item.name.toLowerCase();
                        // If item exists with higher quantity, use that one
                        if (!uniqueItems.has(key) || uniqueItems.get(key).quantity < item.quantity) {
                          uniqueItems.set(key, item);
                        }
                      });
                    });
                    
                    // Convert to array and render
                    return Array.from(uniqueItems.values()).map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-emerald-50 rounded-lg p-3">
                        <span className="font-medium">{item.name}</span>
                        <span className="bg-emerald-100 text-emerald-700 rounded-full px-2 py-1 text-xs font-semibold">
                          {item.quantity} {item.quantity > 1 ? 'units' : 'unit'}
                        </span>
                      </div>
                    ));
                  })()
                }
              </div>
            </div>
            
            {/* Results grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cartOptions.map((option, index) => (
                <div
                  key={index}
                  className={`relative group transition-all duration-500
                    ${
                      selectedOption === index
                        ? "scale-105 z-10"
                        : "opacity-70 hover:opacity-100"
                    }`}
                >
                  <div className="absolute inline-flex items-center justify-center p-3 bg-[#d8f9e6] rounded-full mb-6 animate-on-scroll animate-fade-in-down"></div>
                  <div className="relative p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="text-center mb-6">
                      {" "}
                      <div className="inline-flex items-center justify-center gap-1 p-3 bg-emerald-100 rounded-full mb-4">
                        {[...Array(option.numberOfStores)].map((_, i) => (
                          <BuildingStorefrontIcon
                            key={i}
                            className="w-6 h-6 text-emerald-600"
                          />
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                        {option.numberOfStores} Store
                        {option.numberOfStores > 1 ? "s" : ""}
                      </h3>
                      <p className="text-emerald-600 font-semibold mb-4">
                        Save ${option.totalSavings.toFixed(2)}
                      </p>
                    </div>                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Original Total:</span>
                        <span className="line-through">
                          ${option.totalOriginal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Optimized Total:</span>
                        <span>${option.totalOptimized.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedOption(index)}
                      className={`w-full cursor-pointer mt-4 font-semibold py-3 px-6 rounded-xl
                        transition-all duration-500 flex items-center justify-center group
                        ${
                          selectedOption === index
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105"
                        }`}
                    >
                      {selectedOption === index
                        ? "Selected Option"
                        : "Choose This Option"}
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>{" "}
            {/* Selected Option Details */}
            {selectedOption !== null && selectedOption < cartOptions.length && (
              <div className="mt-12">
                <div className="bg-white rounded-2xl shadow-xl p-8">                  <h2 className="text-2xl font-bold text-emerald-900 mb-6">
                    Your Shopping Plan
                  </h2>
                  {/* Store List */}
                  {cartOptions[selectedOption].stores.map((store, index) => (
                    <div key={index} className="mb-8 last:mb-0">
                      <div className="flex items-center mb-4">
                        <BuildingStorefrontIcon className="w-6 h-6 text-emerald-600 mr-2" />
                        <h3 className="text-xl font-semibold text-emerald-900">
                          {store.storeName}
                        </h3>
                      </div>            <div className="bg-gray-50 rounded-lg p-4">                        {store.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                          >
                            <div className="flex items-center">
                              <span className="font-medium">{item.name}</span>
                              {item.quantity > 1 && (
                                <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                                  × {item.quantity}
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="text-emerald-600 font-medium mr-2">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="text-red-400 line-through text-sm">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}{" "}
                  {/* Donation Section */}
                  <div className="mt-12 overflow-hidden">
                    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-lg relative">
                      {/* Decorative background elements */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                      {/* Header */}
                      <div className="relative flex items-center justify-between mb-8">
                        <div className="flex items-center">
                          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm mr-4">
                            <HeartIcon className="w-8 h-8 text-emerald-600 animate-pulse" />
                          </div>                          <div>
                            <h3 className="text-2xl font-bold text-emerald-900">
                              Make A Difference
                            </h3>
                            <p className="text-emerald-600">
                              Support Your Community
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                          <span className="text-2xl font-bold text-emerald-700">
                            {donationPercentage}%
                          </span>
                        </div>
                      </div>
                      {/* Description */}                      <p className="text-emerald-800 text-lg mb-8 relative">
                        Help Fight Food Insecurity By Donating A Portion Of Your
                        Savings To Local Food Banks.
                      </p>
                      {/* Slider Section */}
                      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm mb-8">
                        {" "}
                        <div className="mb-4">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            value={donationPercentage}
                            onChange={(e) =>
                              setDonationPercentage(parseInt(e.target.value))
                            }
                            className="w-full h-3 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-emerald-700"
                            style={{
                              background: `linear-gradient(to right, #059669 0%, #059669 ${donationPercentage}%, #A7F3D0 ${donationPercentage}%, #A7F3D0 100%)`,
                              borderRadius: "9999px",
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-emerald-600 font-medium">
                          <span>1%</span>
                          <span>25%</span>
                          <span>50%</span>
                          <span>75%</span>
                          <span>100%</span>
                        </div>
                      </div>{" "}
                      {/* Amount Display */}
                      <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm mb-8 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        <div className="relative flex justify-between items-center">
                          <span className="text-emerald-700 font-medium">
                            Your Contribution:
                          </span>
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-emerald-700">
                              $
                            </span>
                            <span className="text-4xl font-bold text-emerald-700">
                              {(
                                (cartOptions[selectedOption].totalSavings *
                                  donationPercentage) /
                                100
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>{" "}
                      {/* Action Button */}                        <button
                        onClick={() => setShowDonationModal(true)}
                        className="w-full cursor-pointer mt-4 font-semibold py-3 px-6 rounded-xl
                        transition-all duration-500 flex items-center justify-center group
                        bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform hover:scale-x-102 hover:scale-y-105"
                      >
                        <span>Donate Now</span>
                        <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsPage;
