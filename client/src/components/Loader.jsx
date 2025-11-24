import React from "react";

export default function Loader({ message }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
      <p className="text-gray-700 text-lg">{message}</p>
    </div>
  );
}
