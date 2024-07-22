'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { pazienti } from "@/lib/mockDatabase";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const filteredPatients = pazienti.filter(patient => {
    const matchesSearch = patient.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAge = ageFilter === '' || calculateAge(patient.dataNascita) === parseInt(ageFilter);
    return matchesSearch && matchesAge;
  });

  function calculateAge(dataNascita: string) {
    const today = new Date();
    const birthDate = new Date(dataNascita);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#748CAB] to-[#14213D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#FCFCFC] rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#14213D]">Selezione Paziente</h1>
            <Image
              src="/logo.svg"
              alt="Logo Gestione Casi Sanitari"
              width={50}
              height={50}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Cerca pazienti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="col-span-2 px-3 py-2 bg-white border border-[#748CAB] rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-[#14213D] focus:ring-1 focus:ring-[#14213D] text-[#14213D]"
            />
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-[#748CAB] rounded-md text-sm shadow-sm text-[#14213D]
                         focus:outline-none focus:border-[#14213D] focus:ring-1 focus:ring-[#14213D]"
            >
              <option value="">Filtra per età</option>
              <option value="18">18 anni</option>
              <option value="30">30 anni</option>
              <option value="50">50 anni</option>
              <option value="70">70+ anni</option>
            </select>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-[#748CAB] rounded-md text-sm shadow-sm text-[#14213D]
                         focus:outline-none focus:border-[#14213D] focus:ring-1 focus:ring-[#14213D]"
            >
              <option value="">Filtra per genere</option>
              <option value="M">Maschio</option>
              <option value="F">Femmina</option>
              <option value="A">Altro</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-[#14213D]">{patient.nome}</h2>
                    <p className="text-sm text-[#748CAB]">Data di nascita: {patient.dataNascita}</p>
                    <p className="text-sm text-[#748CAB]">Età: {calculateAge(patient.dataNascita)} anni</p>
                  </div>
                  <div className="space-x-2">
                    <Link href={`/patients/${patient.id}`} className="inline-block px-4 py-2 bg-[#14213D] text-[#FCFCFC] rounded-md hover:bg-[#748CAB] transition-colors duration-200">
                      Profilo
                    </Link>
                    <Link href={`/patients/${patient.id}/timeline`} className="inline-block px-4 py-2 bg-[#748CAB] text-[#FCFCFC] rounded-md hover:bg-[#14213D] transition-colors duration-200">
                      Timeline
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}