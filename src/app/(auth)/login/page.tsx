/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { handleLogin } from "./actions";

export default function Login() {
  const [, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await handleLogin(formData);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Tu Correo"
              required
              className="w-full px-3 py-2 mt-1 text-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"></input>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Tu Contraseña"
              required
              className="w-full px-3 py-2 mt-1 text-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"></input>
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          ¿No tienes una cuenta? <a href="/new-account" className="text-indigo-600 hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
}
