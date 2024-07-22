'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import jsPDF from 'jspdf';
import { format, parseISO, isSameDay, isFuture, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { getPaziente, aggiornaPaziente, aggiungiAggiornamento, Paziente, MembroEquipe, getEventiPaziente, Evento, Aggiornamento, generaReportPaziente, generaReportCompletoPaziente, aggiungiEvento, aggiornaEvento } from "@/lib/mockDatabase";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function PatientDetails({ params }: { params: { id: string } }) {
  const [paziente, setPaziente] = useState<Paziente | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('info');
  const [selectedTeamMember, setSelectedTeamMember] = useState<MembroEquipe | null>(null);
  const [selectedChange, setSelectedChange] = useState<Aggiornamento | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [eventi, setEventi] = useState<Evento[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  


  useEffect(() => {
    const fetchedPaziente = getPaziente(parseInt(params.id));
    if (fetchedPaziente) {
      setPaziente(fetchedPaziente);
      const fetchedEventi = getEventiPaziente(fetchedPaziente.id);
      setEventi(fetchedEventi);
    }
  }, [params.id]);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
  }, [eventi]);

  const handleInputChange = (field: keyof Paziente, value: any) => {
    if (paziente) {
      const oldValue = paziente[field];
      setPaziente({ ...paziente, [field]: value });

      const note = prompt("Vuoi aggiungere una nota a questa modifica? (Opzionale)");

      aggiungiAggiornamento(paziente.id, {
        data: new Date().toISOString(),
        utente: "Utente Corrente",
        campo: field.toString(),
        vecchioValore: oldValue?.toString() || '',
        nuovoValore: value.toString(),
        nota: note || ''
      });
    }
  };

  const handleSave = () => {
    if (paziente) {
      aggiornaPaziente(paziente);
      setIsEditing(false);
    }
  };

  const handleRevertChange = (update: Aggiornamento) => {
    if (paziente) {
      const field = update.campo as keyof Paziente;
      handleInputChange(field, update.vecchioValore);
      setSelectedChange(null);
    }
  };

  const handleAskClarification = (update: Aggiornamento) => {
    setEmailContent(`Caro collega,\n\nHo notato che hai apportato una modifica al campo "${update.campo}" per il paziente ${paziente?.nome}.\nPuoi fornirmi ulteriori chiarimenti su questa modifica?\n\nGrazie,\n[Il tuo nome]`);
    setShowEmailModal(true);
  };

  const handleSendEmail = () => {
    // Simulate sending email
    setShowEmailModal(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const generateReport = (type: 'meeting' | 'full') => {
    if (!paziente) return;

    let content = '';
    if (type === 'meeting') {
      const startDate = prompt("Inserisci la data di inizio per il report (YYYY-MM-DD):");
      if (!startDate) return;
      content = generaReportPaziente(paziente.id, startDate);
    } else {
      content = generaReportCompletoPaziente(paziente.id);
    }

    const pdf = new jsPDF();
    pdf.text(content, 10, 10);
    pdf.save(`report_${type}_${paziente.nome}.pdf`);
  };

  const handleAddEvent = (newEvent: Omit<Evento, 'id'>) => {
    const eventWithId = { ...newEvent, id: eventi.length + 1 };
    aggiungiEvento(eventWithId);
    setEventi([...eventi, eventWithId]);
    setIsAddingEvent(false);
  };

  const handleUpdateEvent = (updatedEvent: Omit<Evento, 'id'>) => {
    if (selectedEvent) {
      const eventWithId = { ...updatedEvent, id: selectedEvent.id };
      aggiornaEvento(eventWithId);
      setEventi(eventi.map(e => e.id === selectedEvent.id ? eventWithId : e));
      setSelectedEvent(null);
    }
  };

  const scrollToDate = (date: string) => {
    const element = document.getElementById(`date-${date}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tipoColors: { [key: string]: string } = {
    'Attività Clinica': 'border-blue-300',
    'Attività rivolta ai familiari': 'border-green-300',
    'Attività di supporto': 'border-yellow-300',
  };
  if (!paziente) return <div>Caricamento...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/patients" className="mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{paziente.nome}</h1>
                <p className="text-sm">{paziente.dataNascita}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded-md ${selectedTab === 'info' ? 'bg-blue-500' : 'bg-gray-600'}`}
                onClick={() => setSelectedTab('info')}
              >
                Profilo
              </button>
              <button
                className={`px-3 py-1 rounded-md ${selectedTab === 'timeline' ? 'bg-blue-500' : 'bg-gray-600'}`}
                onClick={() => setSelectedTab('timeline')}
              >
                Timeline
              </button>
              <div className="relative inline-block text-left">
                <button
                  className="px-3 py-1 bg-green-500 rounded-md text-white"
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                >
                  Esporta
                </button>
                {showExportDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          generateReport('meeting');
                          setShowExportDropdown(false);
                        }}
                      >
                        Report per riunione
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          generateReport('full');
                          setShowExportDropdown(false);
                        }}
                      >
                        Report completo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 text-gray-800">
            {selectedTab === 'info' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="md:col-span-2">
                  <Card title="Equipe">
                    <div className="flex space-x-4 overflow-x-auto">
                      {paziente.equipe.map((member) => (
                        <div key={member.id} className="flex-shrink-0 w-24 text-center cursor-pointer" onClick={() => setSelectedTeamMember(member)}>
                          <Image
                            src={member.fotoUrl}
                            alt={member.nome}
                            width={60}
                            height={60}
                            className="rounded-full mx-auto mb-2"
                          />
                          <p className="text-sm font-semibold">{member.nome}</p>
                          <p className="text-xs text-gray-600">{member.ruolo}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card title="Dati">
                    <EditableField
                      label="Diagnosi (con scala ICD11)"
                      value={paziente.diagnosi}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('diagnosi', value)}
                      type="select"
                      options={["F33.1 Disturbo depressivo maggiore, episodio ricorrente, moderato", "F41.1 Disturbo d'ansia generalizzato", "F20.0 Schizofrenia paranoide"]}
                    />
                    <EditableField
                      label="Funzionamento Psicosociale (FPS)"
                      value={paziente.funzionamentoPsicosociale.toString()}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('funzionamentoPsicosociale', parseInt(value))}
                      type="number"
                    />
                    <EditableField
                      label="Terapia Farmacologica in Atto"
                      value={paziente.terapiaFarmacologica}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('terapiaFarmacologica', value)}
                      type="textarea"
                    />
                    <EditableField
                      label="Adesione al trattamento"
                      value={paziente.aderenzaTrattamento}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('aderenzaTrattamento', value)}
                      type="select"
                      options={["Costante", "Discontinua", "Scarsa"]}
                    />
                    <EditableField
                      label="Note adesione al trattamento"
                      value={paziente.noteAderenzaTrattamento}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('noteAderenzaTrattamento', value)}
                      type="textarea"
                    />
                  </Card>

                  <Card title="Rete Familiare e Sociale">
                    <EditableField
                      label="Rete Familiare"
                      value={paziente.reteFamiliare}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('reteFamiliare', value)}
                      type="select"
                      options={["Parzialmente Deficitaria", "Deficitaria", "Sufficiente"]}
                    />
                    <EditableField
                      label="Note rete familiare"
                      value={paziente.noteReteFamiliare}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('noteReteFamiliare', value)}
                      type="textarea"
                    />
                    <EditableField
                      label="Rete Sociale"
                      value={paziente.reteSociale}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('reteSociale', value)}
                      type="select"
                      options={["Parzialmente Deficitaria", "Deficitaria", "Sufficiente"]}
                    />
                    <EditableField
                      label="Note rete sociale"
                      value={paziente.noteReteSociale}
                      isEditing={isEditing}
                      onChange={(value) => handleInputChange('noteReteSociale', value)}
                      type="textarea"
                    />
                  </Card>

                  <Card title="Progettualità individuale">
                    <div>
                      <h3 className="font-semibold mb-2">Obiettivi Generali</h3>
                      {paziente.obiettiviGenerali.map((objective, index) => (
                        <EditableField
                          key={index}
                          value={objective}
                          isEditing={isEditing}
                          onChange={(value) => {
                            const newObjectives = [...paziente.obiettiviGenerali];
                            newObjectives[index] = value;
                            handleInputChange('obiettiviGenerali', newObjectives);
                          }}
                          type="textarea"
                        />
                      ))}
                      {isEditing && (
                        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleInputChange('obiettiviGenerali', [...paziente.obiettiviGenerali, ''])}>
                          + Aggiungi obiettivo
                        </button>
                      )}
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Obiettivi Specifici</h3>
                      {paziente.obiettiviSpecifici.map((objective, index) => (
                        <EditableField
                          key={index}
                          value={objective}
                          isEditing={isEditing}
                          onChange={(value) => {
                            const newObjectives = [...paziente.obiettiviSpecifici];
                            newObjectives[index] = value;
                            handleInputChange('obiettiviSpecifici', newObjectives);
                          }}
                          type="textarea"
                        />
                      ))}
                      {isEditing && (
                        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleInputChange('obiettiviSpecifici', [...paziente.obiettiviSpecifici, ''])}>
                          + Aggiungi obiettivo
                        </button>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Right Column - Change History */}
                <div>
                  <Card title="Cronologia Modifiche">
                    <div className="max-h-screen overflow-y-auto">
                      {paziente.aggiornamenti.map((update: Aggiornamento, index: number) => (
                        <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg shadow cursor-pointer" onClick={() => setSelectedChange(update)}>
                          <p className="text-sm text-gray-600">{new Date(update.data).toLocaleString()}</p>
                          <p className="font-semibold">{update.utente} ha modificato {update.campo}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}

{selectedTab === 'timeline' && (
              <div className="flex h-[calc(100vh-200px)]">
                <div className="w-24 overflow-y-auto border-r border-gray-200">
                {Array.from(new Set(eventi.map(e => e.data.split('-')[1]))).sort().map(month => (                    <button
                      key={month}
                      className="w-full p-2 text-left hover:bg-gray-200 text-sm"
                      onClick={() => scrollToDate(`${eventi[0].data.split('-')[2]}-${month}`)}
                    >
                      {format(parseISO(`2024-${month}-01`), 'MMM')}
                    </button>
                  ))}
                </div>
                <div ref={timelineRef} className="flex-1 overflow-y-auto">
                  <div className="relative">
                    {eventi.map((evento, index) => (
                      <React.Fragment key={evento.id}>
                        {(index === 0 || evento.data !== eventi[index - 1].data) && (
                          <div id={`date-${evento.data}`} className="sticky top-0 bg-white z-10 py-2 px-4 font-bold border-b border-gray-200">
                            {evento.data}
                          </div>
                        )}
<div className={`relative p-4 my-4 border-l-4 ${tipoColors[evento.tipo] || 'border-gray-300'} ml-4`}>                          <h3 className="font-bold">{evento.tipo} - {evento.categoria}</h3>
                          <p>{evento.descrizione}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Membro equipe: {paziente.equipe.find(m => m.id === evento.membroEquipeId)?.nome}
                          </p>
                          <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setSelectedEvent(evento)}
                          >
                            Modifica
                          </button>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Save buttons */}
      <div className="fixed bottom-4 right-4 space-x-2">
        {selectedTab === 'info' && (
          <>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-md ${isEditing ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
            >
              {isEditing ? 'Annulla' : 'Modifica'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Salva
              </button>
            )}
          </>
        )}
        {selectedTab === 'timeline' && (
          <button
            onClick={() => setIsAddingEvent(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Aggiungi Evento
          </button>
        )}
      </div>

      {/* Event Modal */}
      {(selectedEvent || isAddingEvent) && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4">{selectedEvent ? 'Modifica Evento' : 'Aggiungi Evento'}</h2>
          <EventForm
            event={selectedEvent ? { ...selectedEvent } : null}
            onSave={selectedEvent ? handleUpdateEvent : handleAddEvent}
            onCancel={() => {
              setSelectedEvent(null);
              setIsAddingEvent(false);
            }}
            pazienteId={paziente.id}
          />
        </div>
      </div>
    )}
      {/* Change Details Modal */}
      {selectedChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Dettagli Modifica</h2>
            <p className="text-sm text-gray-600">{new Date(selectedChange.data).toLocaleString()}</p>
            <p className="font-semibold">{selectedChange.utente} ha modificato {selectedChange.campo}</p>
            <p className="text-sm text-red-600">Valore precedente: {selectedChange.vecchioValore}</p>
            <p className="text-sm text-green-600">Nuovo valore: {selectedChange.nuovoValore}</p>
            {selectedChange.nota && (
              <p className="text-sm text-gray-600 mt-2">Nota: {selectedChange.nota}</p>
            )}
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleRevertChange(selectedChange)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Annulla Modifica
              </button>
              <button
                onClick={() => handleAskClarification(selectedChange)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Chiedi Chiarimenti
              </button>
              <button
                onClick={() => setSelectedChange(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Composition Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Componi Email</h2>
            <textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="w-full h-64 p-2 border rounded-md text-gray-800" // Added text-gray-800 for visibility
            />
            <div className="mt-4 space-x-2">
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Invia Email
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          Email inviata con successo!
        </div>
      )}

      {/* Team Member Modal */}
      {selectedTeamMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedTeamMember.nome}</h2>
            <p className="text-gray-600 mb-4">{selectedTeamMember.ruolo}</p>

            <h3 className="font-semibold mb-2 text-gray-800">Attività Passate</h3>
            <div className="mb-4">
              {eventi
                .filter(e => e.membroEquipeId === selectedTeamMember.id && new Date(e.data) < new Date())
                .map(evento => (
                  <div key={evento.id} className="mb-2 p-2 bg-gray-100 rounded">
                    <p className="font-semibold">{evento.tipo} - {evento.categoria}</p>
                    <p className="text-sm text-gray-600">{evento.data}</p>
                    <p>{evento.descrizione}</p>
                  </div>
                ))
              }
            </div>

            <h3 className="font-semibold mb-2 text-gray-800">Attività Programmate</h3>
            <div className="mb-4">
              {eventi
                .filter(e => e.membroEquipeId === selectedTeamMember.id && new Date(e.data) >= new Date())
                .map(evento => (
                  <div key={evento.id} className="mb-2 p-2 bg-gray-100 rounded">
                    <p className="font-semibold">{evento.tipo} - {evento.categoria}</p>
                    <p className="text-sm text-gray-600">{evento.data}</p>
                    <p>{evento.descrizione}</p>
                  </div>
                ))
              }
            </div>

            <button
              onClick={() => setSelectedTeamMember(null)}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );

}

interface EventFormProps {
  event: Omit<Evento, 'id'> | null;
  onSave: (event: Omit<Evento, 'id'>) => void;
  onCancel: () => void;
  pazienteId: number;
}

function EventForm({ event, onSave, onCancel, pazienteId }: EventFormProps) {
  const [formData, setFormData] = useState<Omit<Evento, 'id'>>(event || {
    pazienteId,
    data: new Date().toISOString().split('T')[0],
    tipo: '',
    categoria: '',
    descrizione: '',
    membroEquipeId: 0,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data</label>
        <input
          type="date"
          id="data"
          name="data"
          value={formData.data}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        >
          <option value="">Seleziona tipo</option>
          <option value="Attività Clinica">Attività Clinica</option>
          <option value="Attività rivolta ai familiari">Attività rivolta ai familiari</option>
          <option value="Attività di supporto">Attività di supporto</option>
        </select>
      </div>
      <div>
        <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
        <input
          type="text"
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="descrizione" className="block text-sm font-medium text-gray-700">Descrizione</label>
        <textarea
          id="descrizione"
          name="descrizione"
          value={formData.descrizione}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="membroEquipeId" className="block text-sm font-medium text-gray-700">Membro Equipe ID</label>
        <input
          type="number"
          id="membroEquipeId"
          name="membroEquipeId"
          value={formData.membroEquipeId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Annulla</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Salva</button>
      </div>
    </form>
  );
}


function EditableField({ label, value, isEditing, onChange, type = "text", options }: {
  label?: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "select" | "number";
  options?: string[];
}) {
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white";

  if (isEditing) {
    switch (type) {
      case "textarea":
        return (
          <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={inputClass}
              rows={3}
            />
          </div>
        );
      case "select":
        return (
          <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={inputClass}
            >
              {options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case "number":
        return (
          <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={inputClass}
            />
          </div>
        );
      default:
        return (
          <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={inputClass}
            />
          </div>
        );
    }
  } else {
    return (
      <div className="mb-4">
        {label && <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>}
        <p className="bg-gray-100 p-2 rounded-md text-gray-800">{value}</p>
      </div>
    );
  }
}