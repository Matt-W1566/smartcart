"use client";

import React from "react";
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Types for our data structure
interface Item {
  name: string;
  optimizedPrice: number;
  originalPrice: number;
  store: string;
}

interface StoreGroup {
  store: string;
  items: Item[];
}

interface CartOption {
  storeGroups: StoreGroup[];
  originalTotal: number;
  optimizedTotal: number;
  savings: number;
}

// Mock data - Replace this with real data later
const mockCartOptions: CartOption[] = [
  // 1 Store Option
  {
    storeGroups: [
      {
        store: "Walmart",
        items: [
          {
            name: "Bananas",
            optimizedPrice: 3.42,
            originalPrice: 4.25,
            store: "Walmart",
          },
          {
            name: "Milk",
            optimizedPrice: 4.99,
            originalPrice: 5.99,
            store: "Walmart",
          },
          {
            name: "Bread",
            optimizedPrice: 2.49,
            originalPrice: 3.49,
            store: "Walmart",
          },
        ],
      },
    ],
    originalTotal: 63.23,
    optimizedTotal: 53.23,
    savings: 10.0,
  },
  // 2 Store Option
  {
    storeGroups: [
      {
        store: "Walmart",
        items: [
          {
            name: "Bananas",
            optimizedPrice: 3.42,
            originalPrice: 4.25,
            store: "Walmart",
          },
          {
            name: "Milk",
            optimizedPrice: 4.99,
            originalPrice: 5.99,
            store: "Walmart",
          },
        ],
      },
      {
        store: "No Frills",
        items: [
          {
            name: "Bread",
            optimizedPrice: 2.49,
            originalPrice: 3.49,
            store: "No Frills",
          },
          {
            name: "Eggs",
            optimizedPrice: 3.99,
            originalPrice: 4.99,
            store: "No Frills",
          },
        ],
      },
    ],
    originalTotal: 73.23,
    optimizedTotal: 58.89,
    savings: 14.34,
  },
  // 3 Store Option
  {
    storeGroups: [
      {
        store: "Walmart",
        items: [
          {
            name: "Bananas",
            optimizedPrice: 3.42,
            originalPrice: 4.25,
            store: "Walmart",
          },
        ],
      },
      {
        store: "No Frills",
        items: [
          {
            name: "Bread",
            optimizedPrice: 2.49,
            originalPrice: 3.49,
            store: "No Frills",
          },
        ],
      },
      {
        store: "Food Basics",
        items: [
          {
            name: "Milk",
            optimizedPrice: 4.99,
            originalPrice: 5.99,
            store: "Food Basics",
          },
          {
            name: "Eggs",
            optimizedPrice: 3.99,
            originalPrice: 4.99,
            store: "Food Basics",
          },
        ],
      },
    ],
    originalTotal: 83.23,
    optimizedTotal: 63.89,
    savings: 19.34,
  },
];

const PriceComparison = ({
  original,
  optimized,
}: {
  original: number;
  optimized: number;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-red-500 line-through">${original.toFixed(2)}</span>
    <span className="text-emerald-500 font-semibold">
      ${optimized.toFixed(2)}
    </span>
  </div>
);

const StoreSection = ({ storeGroup }: { storeGroup: StoreGroup }) => (
  <div className="mb-6 last:mb-0">
    <h4 className="font-semibold text-lg text-emerald-800 mb-3 flex items-center">
      <BuildingStorefrontIcon className="w-5 h-5 mr-2" />
      {storeGroup.store}
    </h4>
    <div className="space-y-2">
      {storeGroup.items.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center bg-white/50 p-2 rounded-lg"
        >
          <span className="text-gray-700">{item.name}</span>
          <PriceComparison
            original={item.originalPrice}
            optimized={item.optimizedPrice}
          />
        </div>
      ))}
    </div>
  </div>
);

const CartOptionCard = ({
  option,
  index,
}: {
  option: CartOption;
  index: number;
}) => (
  <div className="relative group">
    {/* Gradient border effect */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

    <div
      className="relative p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-emerald-100/50 
                  transition-all duration-500 transform hover:-translate-y-2"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-emerald-800 mb-2">
          Option {index + 1}: {option.storeGroups.length} Store
          {option.storeGroups.length > 1 ? "s" : ""}
        </h3>
        <p className="text-gray-600">
          Visit {option.storeGroups.length} store
          {option.storeGroups.length > 1 ? "s" : ""} to maximize savings
        </p>
      </div>

      <div className="divide-y divide-emerald-100">
        {option.storeGroups.map((storeGroup, idx) => (
          <StoreSection key={idx} storeGroup={storeGroup} />
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-emerald-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Original Total:</span>
          <span className="text-red-500 line-through">
            ${option.originalTotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Optimized Total:</span>
          <span className="text-emerald-500 font-bold">
            ${option.optimizedTotal.toFixed(2)}
          </span>
        </div>
        <div className="bg-emerald-50 p-3 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-emerald-800 font-semibold">
              Total Savings:
            </span>
            <span className="text-emerald-600 font-bold">
              ${option.savings.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          className="w-full cursor-pointer bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl
                         shadow-lg hover:shadow-emerald-500/30 transition-all duration-500 transform hover:scale-105
                         focus:outline-none focus:ring-4 focus:ring-emerald-500/30
                         flex items-center justify-center group"
        >
          Choose This Option
          <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  </div>
);

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(16_185_129_/_0.05)_1px,_transparent_0)] bg-[length:32px_32px]"></div>
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6 animate-fade-in-up">
            Your Optimized Shopping Options
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            We've analyzed prices across stores to find you the best deals.
            Choose the option that works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mockCartOptions.map((option, idx) => (
            <CartOptionCard key={idx} option={option} index={idx} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/search"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300"
          >
            <span>Modify Your List</span>
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
