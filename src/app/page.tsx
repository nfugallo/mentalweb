import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#748CAB] to-[#14213D] flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-[#FCFCFC] rounded-lg shadow-xl overflow-hidden md:flex">
        <div className="md:flex-shrink-0 md:w-1/2 bg-[#14213D] flex justify-center items-center p-8">
          <div className="text-center">
            <Image
              src="/logo.svg"
              alt="Logo Mental Web"
              width={200}
              height={200}
              className="mx-auto"
            />
            <h1 className="mt-4 text-3xl font-bold text-[#FCFCFC]">
              Mental Web
            </h1>
          </div>
        </div>
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl font-semibold text-[#14213D] mb-4">
            Ci prendiamo cura di chi si prende cura
          </h2>
          <p className="text-[#14213D] mb-6">
            La nostra piattaforma assiste i professionisti della salute mentale nella gestione delle informazioni dei pazienti,
            nel monitoraggio dei trattamenti e nel miglioramento dell'efficienza complessiva dell'assistenza. Sperimenta il
            futuro della gestione dei casi clinici oggi stesso.
          </p>
          <ul className="text-[#14213D] mb-6">
            <li className="flex items-center mb-2">
              <svg className="h-5 w-5 mr-2 text-[#748CAB]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              Gestione sicura dei dati dei pazienti
            </li>
            <li className="flex items-center mb-2">
              <svg className="h-5 w-5 mr-2 text-[#748CAB]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              Monitoraggio intuitivo dei trattamenti
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-[#748CAB]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              Strumenti completi di reportistica
            </li>
          </ul>
          <Link href="/login" className="inline-block bg-[#14213D] text-[#FCFCFC] font-semibold px-6 py-3 rounded-md hover:bg-[#748CAB] transition-colors duration-300">
            Accedi al Tuo Account
          </Link>
        </div>
      </div>
    </div>
  );
}