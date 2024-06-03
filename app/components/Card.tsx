"use client";

import { useState } from "react";

interface CardProps {
  item: {
    image: string;
    title: string;
    price: number;
    description: string;
  };
}

export default function Card({ item }: CardProps) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full object-cover h-64"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">
            {item.title}
            <p className="text-white bg-red-500 hover:bg-red-600 rounded-md p-2 absolute top-2 right-2 mb-2">
              {item.price} € / day
            </p>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <button className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white">
              {loading ? "Chargement.." : "Acheter"}
            </button>
          </h3>
        </div>
      </div>
    </>
  );
}
