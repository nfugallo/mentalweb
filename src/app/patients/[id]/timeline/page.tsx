"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Edit, Filter, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock functions (replace with actual API calls)
const getPaziente = (id) => ({ id, nome: 'John Doe', equipe: [{ id: 1, nome: 'Dr. Smith' }, { id: 2, nome: 'Nurse Johnson' }] });
const getEventiPaziente = (id) => [
  { id: 1, tipo: 'Attività Clinica', categoria: 'Visita Psichiatrica', descrizione: 'Prima visita', data: '2024-07-15', membroEquipeId: 1 },
  { id: 2, tipo: 'Attività rivolta ai familiari', categoria: 'Colloquio Familiare', descrizione: 'Incontro con i genitori', data: '2024-07-18', membroEquipeId: 2 },
];
const aggiungiEvento = (evento) => console.log('Evento aggiunto:', evento);
const aggiornaEvento = (evento) => console.log('Evento aggiornato:', evento);

export default function PatientTimeline({ params }) {
  const patientId = params.id;
  const [patient, setPatient] = useState(null);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [expandedEvents, setExpandedEvents] = useState(new Set());
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchedPatient = getPaziente(patientId);
    const fetchedEvents = getEventiPaziente(patientId);
    setPatient(fetchedPatient);
    setEvents(fetchedEvents);
    setFilteredEvents(fetchedEvents);
  }, [patientId]);

  useEffect(() => {
    if (filterType) {
      setFilteredEvents(events.filter(e => e.tipo === filterType));
    } else {
      setFilteredEvents(events);
    }
  }, [filterType, events]);

  const handleAddEvent = (newEvent) => {
    const eventWithId = { ...newEvent, id: events.length + 1 };
    aggiungiEvento(eventWithId);
    setEvents([...events, eventWithId]);
    setIsAddingEvent(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    aggiornaEvento(updatedEvent);
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setEditingEvent(null);
  };

  const toggleEventExpansion = (eventId) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  if (!patient) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <ChevronLeft size={24} className="cursor-pointer" onClick={() => console.log('Go back')} />
                <h1 className="text-2xl font-bold">{patient.nome} - Timeline</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={filterType}
                  onValueChange={setFilterType}
                  className="bg-white text-gray-800"
                >
                  <option value="">All Events</option>
                  <option value="Attività Clinica">Clinical Activities</option>
                  <option value="Attività rivolta ai familiari">Family Activities</option>
                  <option value="Attività di supporto">Support Activities</option>
                </Select>
                <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
                      <Plus size={20} className="mr-2" /> New Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                    </DialogHeader>
                    <EventForm onSubmit={handleAddEvent} patient={patient} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Timeline Content */}
          <div className="p-6">
            <div className="relative">
              {filteredEvents.map((event, index) => (
                <TimelineEvent
                  key={event.id}
                  event={event}
                  isExpanded={expandedEvents.has(event.id)}
                  onToggleExpand={() => toggleEventExpansion(event.id)}
                  onEdit={() => setEditingEvent(event)}
                  isLast={index === filteredEvents.length - 1}
                  patient={patient}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={editingEvent !== null} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {editingEvent && (
            <EventForm
              event={editingEvent}
              onSubmit={handleUpdateEvent}
              patient={patient}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TimelineEvent({ event, isExpanded, onToggleExpand, onEdit, isLast, patient }) {
  const borderColor = 
    event.tipo === 'Attività Clinica' ? 'border-orange-400' :
    event.tipo === 'Attività rivolta ai familiari' ? 'border-blue-400' :
    'border-purple-400';

  return (
    <div className="mb-8 flex">
      <div className="flex flex-col items-center mr-4">
        <div className={`rounded-full h-8 w-8 flex items-center justify-center ${borderColor} bg-white border-2`}>
          <Calendar size={16} className="text-gray-600" />
        </div>
        {!isLast && <div className="w-0.5 bg-gray-300 h-full mt-2"></div>}
      </div>
      <div className="flex-grow">
        <div className={`p-4 bg-white rounded-lg shadow-md border-l-4 ${borderColor}`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{event.tipo}</h3>
              <p className="text-sm text-gray-600">{event.categoria}</p>
              <p className="text-xs text-gray-500 mt-1">{format(parseISO(event.data), 'MMMM d, yyyy')}</p>
              {isExpanded ? (
                <p className="mt-2 text-gray-700">{event.descrizione}</p>
              ) : (
                <p className="mt-2 text-gray-700">{event.descrizione.slice(0, 100)}...</p>
              )}
              <p className="text-sm text-gray-600 mt-2">
                {patient.equipe.find(m => m.id === event.membroEquipeId)?.nome}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggleExpand}>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventForm({ event, onSubmit, patient }) {
  const [formData, setFormData] = useState(event || {
    tipo: '',
    categoria: '',
    descrizione: '',
    data: format(new Date(), 'yyyy-MM-dd'),
    membroEquipeId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select name="tipo" value={formData.tipo} onValueChange={(value) => handleChange({ target: { name: 'tipo', value } })}>
        <option value="">Select Type</option>
        <option value="Attività Clinica">Clinical Activity</option>
        <option value="Attività rivolta ai familiari">Family Activity</option>
        <option value="Attività di supporto">Support Activity</option>
      </Select>
      <Select name="categoria" value={formData.categoria} onValueChange={(value) => handleChange({ target: { name: 'categoria', value } })}>
        <option value="">Select Category</option>
        {formData.tipo === 'Attività Clinica' && (
          <>
            <option value="Somministrazione di Farmaci">Medication Administration</option>
            <option value="Visita Psichiatrica">Psychiatric Visit</option>
            <option value="Colloquio Psicologico">Psychological Interview</option>
          </>
        )}
        {formData.tipo === 'Attività rivolta ai familiari' && (
          <>
            <option value="Gruppo di Familiari">Family Group</option>
            <option value="Colloquio Familiare">Family Interview</option>
          </>
        )}
        {formData.tipo === 'Attività di supporto' && (
          <>
            <option value="Supporto alle attività quotidiane">Daily Activities Support</option>
            <option value="Supporto Sociale">Social Support</option>
          </>
        )}
      </Select>
      <Textarea
        name="descrizione"
        value={formData.descrizione}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
      />
      <Select 
        name="membroEquipeId" 
        value={formData.membroEquipeId.toString()} 
        onValueChange={(value) => handleChange({ target: { name: 'membroEquipeId', value } })}
      >
        <option value="">Select Team Member</option>
        {patient.equipe.map((member) => (
          <option key={member.id} value={member.id.toString()}>{member.nome}</option>
        ))}
      </Select>
      <Input
        type="date"
        name="data"
        value={formData.data}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">
        {event ? 'Update Event' : 'Add Event'}
      </Button>
    </form>
  );
}