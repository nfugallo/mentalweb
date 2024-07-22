'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#748CAB] to-[#14213D] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-[#FCFCFC] rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <Image
              src="/logo.svg"
              alt="Logo Gestione Casi Sanitari"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h1 className="mt-4 text-2xl font-bold text-[#14213D]">
              Accesso al Sistema
            </h1>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#14213D]">
                Indirizzo Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-[#748CAB] rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-[#14213D] focus:ring-1 focus:ring-[#14213D] text-[#14213D]"
                placeholder="nome@esempio.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#14213D]">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full px-3 py-2 bg-white border border-[#748CAB] rounded-md text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-[#14213D] focus:ring-1 focus:ring-[#14213D] text-[#14213D]"
                  placeholder="Inserisci la tua password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-[#748CAB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-[#748CAB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#14213D] focus:ring-[#748CAB] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#14213D]">
                  Ricordami
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#748CAB] hover:text-[#14213D]">
                  Password dimenticata?
                </a>
              </div>
            </div>
            <div>
              <Link href="/patients" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#FCFCFC] bg-[#14213D] hover:bg-[#748CAB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14213D]">
                Accedi
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}