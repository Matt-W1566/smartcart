import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCamera, FaLink, FaFilter } from "react-icons/fa";

export default function Home() {
  const [item, setItem] = useState("");

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex flex-col items-center px-4 py-12 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-bold mb-4">
          Find the Cheapest Shopping Cart
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Compare grocery prices across stores. Save money. End food insecurity.
        </p>
        <Button
          asChild
          className="mt-6 px-6 py-3 text-lg rounded-2xl shadow-xl"
        >
          <Link href="/search">Start Saving Now</Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-3xl space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search for items (e.g., milk, Compliments bread)"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="flex-grow"
          />
          <Button size="icon" variant="outline">
            <FaSearch className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="secondary" className="flex items-center space-x-2">
            <FaCamera />
            <span>Scan Image</span>
          </Button>
          <Button variant="secondary" className="flex items-center space-x-2">
            <FaLink />
            <span>Recipe Link</span>
          </Button>
          <Button variant="secondary" className="flex items-center space-x-2">
            <FaFilter />
            <span>Filters</span>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/locations">Add Location</Link>
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mt-8 text-left">
          <h2 className="text-2xl font-semibold mb-2">Why Use Our App?</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Find the cheapest store for your shopping list</li>
            <li>Customize your trip: choose 1-stop or multi-stop savings</li>
            <li>Upload pictures or recipe links to auto-generate a cart</li>
            <li>See how much you saved and optionally donate it to charity</li>
            <li>Filter by Canadian products, dietary needs, and more</li>
          </ul>
        </div>
      </motion.div>
    </main>
  );
}
