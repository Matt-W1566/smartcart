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

  const [cartOptions, setCartOptions] = useState<CartOption[]>([
    {
      numberOfStores: 1,
      stores: [
        {
          storeName: "Walmart",
          location: "123 Main St",
          items: [
            { name: "Bananas", price: 2.99, originalPrice: 3.49 },
            { name: "Milk", price: 3.99, originalPrice: 4.49 },
            { name: "Bread", price: 2.49, originalPrice: 2.99 },
          ],
        },
      ],
      totalOriginal: 10.97,
      totalOptimized: 9.47,
      totalSavings: 1.5,
    },
    {
      numberOfStores: 2,
      stores: [
        {
          storeName: "Walmart",
          location: "123 Main St",
          items: [
            { name: "Bananas", price: 2.99, originalPrice: 3.49 },
            { name: "Bread", price: 2.49, originalPrice: 2.99 },
          ],
        },
        {
          storeName: "Target",
          location: "456 Oak Ave",
          items: [{ name: "Milk", price: 3.79, originalPrice: 4.49 }],
        },
      ],
      totalOriginal: 10.97,
      totalOptimized: 9.27,
      totalSavings: 1.7,
    },
    {
      numberOfStores: 3,
      stores: [
        {
          storeName: "Walmart",
          location: "123 Main St",
          items: [{ name: "Bananas", price: 2.99, originalPrice: 3.49 }],
        },
        {
          storeName: "Target",
          location: "456 Oak Ave",
          items: [{ name: "Milk", price: 3.79, originalPrice: 4.49 }],
        },
        {
          storeName: "Kroger",
          location: "789 Pine St",
          items: [{ name: "Bread", price: 2.29, originalPrice: 2.99 }],
        },
      ],
      totalOriginal: 10.97,
      totalOptimized: 9.07,
      totalSavings: 1.9,
    },
  ]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 pt-24 pb-20 px-6">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-down">
                Your Optimized Shopping Cart
              </h1>
              <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
                Choose your preferred shopping option below
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-6 py-12">
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
                    </div>

                    <div className="space-y-4 mb-6">
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
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-emerald-900 mb-6">
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
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {store.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                          >
                            <span>{item.name}</span>
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
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-emerald-900">
                              Make a Difference
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
                      {/* Description */}
                      <p className="text-emerald-800 text-lg mb-8 relative">
                        Help fight food insecurity by donating a portion of your
                        savings to local food banks.
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
                      {/* Action Button */}
                      <button
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
