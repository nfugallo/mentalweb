// src/lib/mockDatabase.ts

export interface MembroEquipe {
  id: number;
  nome: string;
  ruolo: string;
  fotoUrl: string;
}

export interface Aggiornamento {
  id: number;
  data: string;
  utente: string;
  campo: string;
  vecchioValore: string;
  nuovoValore: string;
  nota?: string; // New optional field for notes
}


export interface Paziente {
  id: number;
  nome: string;
  dataNascita: string;
  codiceFiscale: string;
  indirizzo: string;
  telefono: string;
  email: string;
  equipe: MembroEquipe[];
  diagnosi: string;
  reteFamiliare: string;
  noteReteFamiliare: string;
  reteSociale: string;
  noteReteSociale: string;
  funzionamentoPsicosociale: number;
  terapiaFarmacologica: string;
  aderenzaTrattamento: string;
  noteAderenzaTrattamento: string;
  obiettiviGenerali: string[];
  obiettiviSpecifici: string[];
  aggiornamenti: Aggiornamento[];
}

export const pazienti: Paziente[] = [
  {
      id: 1,
      nome: "Marco Bianchi",
      dataNascita: "15-05-1980",
      codiceFiscale: "BNCMRC80E15F205X",
      indirizzo: "Via Roma 123, 20019 Milano",
      telefono: "+39 333 1234567",
      email: "marco.bianchi@email.it",
      equipe: [
          { id: 1, nome: "Dott.ssa Angelina Vignati", ruolo: "Psicoterapeuta", fotoUrl: "/angelina_pic.png" },
          { id: 2, nome: "Dott.ssa Francesca Carli", ruolo: "Infermiera", fotoUrl: "/francesca_pic.png" },
          { id: 3, nome: "Dott.ssa Maria Fusilli", ruolo: "Infermiera", fotoUrl: "/maria_pic.png" },
          { id: 4, nome: "Dott. Angelo Trionfo", ruolo: "Psichiatra", fotoUrl: "/angelo_pic.png" },
      ],
      diagnosi: "F33.1 Disturbo depressivo maggiore, episodio ricorrente, moderato",
      reteFamiliare: "Parzialmente Deficitaria",
      noteReteFamiliare: "Il paziente ha un supporto limitato dalla famiglia immediata. Vive solo, genitori anziani, rapporti sporadici con il fratello.",
      reteSociale: "Deficitaria",
      noteReteSociale: "Il paziente fatica a mantenere relazioni sociali. Ha perso molti contatti a causa della depressione. Attualmente frequenta solo un gruppo di supporto settimanale.",
      funzionamentoPsicosociale: 55,
      terapiaFarmacologica: "Sertralina 50mg 1 cp/die, Alprazolam 0.25mg al bisogno",
      aderenzaTrattamento: "Discontinua",
      noteAderenzaTrattamento: "Il paziente talvolta dimentica di assumere la terapia, soprattutto nei weekend. Necessario monitoraggio e rinforzo dell'importanza dell'aderenza.",
      obiettiviGenerali: [
          "Migliorare l'umore complessivo e ridurre i sintomi depressivi",
          "Potenziare la rete di supporto sociale",
          "Aumentare l'autonomia nelle attività quotidiane"
      ],
      obiettiviSpecifici: [
          "Partecipare a sedute di psicoterapia settimanali",
          "Praticare esercizi di mindfulness quotidianamente per 15 minuti",
          "Partecipare a un'attività di gruppo (es. corso di pittura) entro 3 mesi",
          "Mantenere un diario dell'umore giornaliero"
      ],
      aggiornamenti: [
          {
              id: 1,
              data: "01-06-2024",
              utente: "Dott.ssa Angelina Vignati",
              campo: "Rete Familiare",
              vecchioValore: "Deficitaria",
              nuovoValore: "Parzialmente Deficitaria"
          },
          {
              id: 2,
              data: "15-06-2024",
              utente: "Dott. Angelo Trionfo",
              campo: "Terapia Farmacologica",
              vecchioValore: "Sertralina 50mg 1 cp/die",
              nuovoValore: "Sertralina 50mg 1 cp/die, Alprazolam 0.25mg al bisogno"
          }
      ]
  },
  {
      id: 2,
      nome: "Laura Rossi",
      dataNascita: "22-09-1992",
      codiceFiscale: "RSSLRA92P62L219Z",
      indirizzo: "Corso Vittorio Emanuele 45, 10138 Torino",
      telefono: "+39 345 9876543",
      email: "laura.rossi@email.it",
      equipe: [
          { id: 1, nome: "Dott.ssa Angelina Vignati", ruolo: "Psicoterapeuta", fotoUrl: "/angelina_pic.png" },
          { id: 4, nome: "Dott. Angelo Trionfo", ruolo: "Psichiatra", fotoUrl: "/angelo_pic.png" },
      ],
      diagnosi: "F41.1 Disturbo d'ansia generalizzato",
      reteFamiliare: "Sufficiente",
      noteReteFamiliare: "La paziente vive con il partner che fornisce un buon supporto. Rapporti regolari con i genitori e la sorella minore.",
      reteSociale: "Parzialmente Deficitaria",
      noteReteSociale: "Ha un piccolo gruppo di amici stretti, ma tende a isolarsi nei periodi di maggiore ansia. Difficoltà nelle relazioni lavorative.",
      funzionamentoPsicosociale: 70,
      terapiaFarmacologica: "Paroxetina 20mg 1 cp/die",
      aderenzaTrattamento: "Costante",
      noteAderenzaTrattamento: "La paziente è molto scrupolosa nell'assunzione della terapia e nel seguire le indicazioni terapeutiche.",
      obiettiviGenerali: [
          "Ridurre l'intensità e la frequenza degli episodi ansiosi",
          "Migliorare le capacità di gestione dello stress",
          "Aumentare la partecipazione ad attività sociali e ricreative"
      ],
      obiettiviSpecifici: [
          "Praticare tecniche di rilassamento per 20 minuti al giorno",
          "Partecipare a un corso di yoga o mindfulness entro 2 mesi",
          "Esporre gradualmente a situazioni sociali ansiogene con supporto terapeutico",
          "Tenere un diario dei pensieri ansiosi e delle strategie di coping"
      ],
      aggiornamenti: [
          {
              id: 1,
              data: "10-05-2024",
              utente: "Dott.ssa Angelina Vignati",
              campo: "Funzionamento Psicosociale",
              vecchioValore: "65",
              nuovoValore: "70"
          }
      ]
  }
];

export function getPaziente(id: number): Paziente | undefined {
  return pazienti.find(paziente => paziente.id === id);
}

export function aggiornaPaziente(pazienteAggiornato: Paziente): void {
  const index = pazienti.findIndex(p => p.id === pazienteAggiornato.id);
  if (index !== -1) {
      pazienti[index] = pazienteAggiornato;
  }
}

export function generaReportPaziente(pazienteId: number, dataInizio: string): string {
  const paziente = getPaziente(pazienteId);
  if (!paziente) return "Paziente non trovato";

  const aggiornamentiFiltrati = paziente.aggiornamenti.filter(
    a => new Date(a.data) >= new Date(dataInizio)
  );

  let report = `
    Report Paziente: ${paziente.nome}
    Data: ${new Date().toLocaleDateString()}

    Informazioni Attuali:
    ---------------------
    Diagnosi: ${paziente.diagnosi}
    Funzionamento Psicosociale: ${paziente.funzionamentoPsicosociale}
    Terapia Farmacologica: ${paziente.terapiaFarmacologica}
    Adesione al trattamento: ${paziente.aderenzaTrattamento}

    Modifiche dal ${dataInizio}:
    ---------------------------
    ${aggiornamentiFiltrati.map(a => `
      Data: ${new Date(a.data).toLocaleString()}
      Utente: ${a.utente}
      Campo: ${a.campo}
      Modifica: da "${a.vecchioValore}" a "${a.nuovoValore}"
      ${a.nota ? `Nota: ${a.nota}` : ''}
    `).join('\n')}
  `;

  return report;
}

export function generaReportCompletoPaziente(pazienteId: number): string {
  const paziente = getPaziente(pazienteId);
  if (!paziente) return "Paziente non trovato";

  return `
    Report Completo Paziente: ${paziente.nome}
    Data: ${new Date().toLocaleDateString()}

    Informazioni Personali:
    -----------------------
    Nome: ${paziente.nome}
    Data di Nascita: ${paziente.dataNascita}
    Codice Fiscale: ${paziente.codiceFiscale}
    Indirizzo: ${paziente.indirizzo}
    Telefono: ${paziente.telefono}
    Email: ${paziente.email}

    Diagnosi:
    ---------
    ${paziente.diagnosi}

    Funzionamento Psicosociale (FPS):
    ---------------------------------
    ${paziente.funzionamentoPsicosociale}

    Terapia Farmacologica:
    ----------------------
    ${paziente.terapiaFarmacologica}

    Adesione al Trattamento:
    ------------------------
    ${paziente.aderenzaTrattamento}
    Note: ${paziente.noteAderenzaTrattamento}

    Rete Familiare:
    ---------------
    Stato: ${paziente.reteFamiliare}
    Note: ${paziente.noteReteFamiliare}

    Rete Sociale:
    -------------
    Stato: ${paziente.reteSociale}
    Note: ${paziente.noteReteSociale}

    Obiettivi Generali:
    -------------------
    ${paziente.obiettiviGenerali.map((obj, index) => `${index + 1}. ${obj}`).join('\n')}

    Obiettivi Specifici:
    --------------------
    ${paziente.obiettiviSpecifici.map((obj, index) => `${index + 1}. ${obj}`).join('\n')}

    Equipe:
    -------
    ${paziente.equipe.map(membro => `- ${membro.nome} (${membro.ruolo})`).join('\n')}
  `;
}

export function annullaModifica(pazienteId: number, aggiornamentoId: number): void {
  const paziente = pazienti.find(p => p.id === pazienteId);
  if (!paziente) return;

  const aggiornamento = paziente.aggiornamenti.find(a => a.id === aggiornamentoId);
  if (!aggiornamento) return;

  // Revert the change
  const campo = aggiornamento.campo as keyof Paziente;
  if (campo in paziente) {
    (paziente[campo] as any) = aggiornamento.vecchioValore;
  }

  // Add a new update to reflect the reversion
  aggiungiAggiornamento(pazienteId, {
    data: new Date().toISOString(),
    utente: "Sistema",
    campo: aggiornamento.campo,
    vecchioValore: aggiornamento.nuovoValore,
    nuovoValore: aggiornamento.vecchioValore,
    nota: "Modifica annullata"
  });
}

export function aggiungiAggiornamento(pazienteId: number, aggiornamento: Omit<Aggiornamento, 'id'>): void {
  const paziente = pazienti.find(p => p.id === pazienteId);
  if (paziente) {
    const nuovoAggiornamento = { ...aggiornamento, id: paziente.aggiornamenti.length + 1 };
    paziente.aggiornamenti.unshift(nuovoAggiornamento);
  }
}

export interface Evento {
  id: number;
  pazienteId: number;
  data: string;
  tipo: string;
  categoria: string;
  descrizione: string;
  membroEquipeId: number;
}



export const tipiEvento = [
  "Attività Clinica",
  "Attività rivolta ai familiari",
  "Attività di supporto"
];

export const categorieEvento = {
  "Attività Clinica": ["Somministrazione di Farmaci", "Visita Psichiatrica", "Colloquio Psicologico", "Valutazione Psicometrica"],
  "Attività rivolta ai familiari": ["Gruppo di Familiari", "Colloquio Familiare", "Psicoeducazione Familiare"],
  "Attività di supporto": ["Supporto alle attività quotidiane", "Supporto Sociale", "Accompagnamento Servizi Territoriali"]
};

export const eventi: Evento[] = [
  {
      id: 1,
      pazienteId: 1,
      data: "16-04-2024",
      tipo: "Attività Clinica",
      categoria: "Somministrazione di Farmaci",
      descrizione: "Somministrata dose giornaliera di Sertralina 50mg. Il paziente riferisce lieve miglioramento dell'umore.",
      membroEquipeId: 2
  },
  {
      id: 2,
      pazienteId: 1,
      data: "16-04-2024",
      tipo: "Attività rivolta ai familiari",
      categoria: "Gruppo di Familiari",
      descrizione: "Partecipazione del fratello al gruppo di supporto per familiari. Discusse strategie per migliorare la comunicazione.",
      membroEquipeId: 1
  },
  {
      id: 3,
      pazienteId: 1,
      data: "20-04-2024",
      tipo: "Attività di supporto",
      categoria: "Supporto alle attività quotidiane",
      descrizione: "Assistenza nella pianificazione settimanale delle attività. Enfasi sull'importanza della routine e dell'attività fisica.",
      membroEquipeId: 3
  },
  {
      id: 4,
      pazienteId: 1,
      data: "20-04-2024",
      tipo: "Attività Clinica",
      categoria: "Colloquio Psicologico",
      descrizione: "Sessione focalizzata sulle tecniche di gestione dei pensieri negativi. Il paziente mostra progressi nell'applicazione delle strategie cognitive.",
      membroEquipeId: 1
  },
  {
      id: 5,
      pazienteId: 2,
      data: "18-04-2024",
      tipo: "Attività Clinica",
      categoria: "Visita Psichiatrica",
      descrizione: "Valutazione dell'efficacia della terapia farmacologica. Nessun effetto collaterale significativo riportato. Mantenuta dosaggio attuale.",
      membroEquipeId: 4
  },
  {
      id: 6,
      pazienteId: 2,
      data: "22-04-2024",
      tipo: "Attività di supporto",
      categoria: "Supporto Sociale",
      descrizione: "Accompagnamento al primo incontro del gruppo di supporto per l'ansia. La paziente ha partecipato attivamente alla discussione.",
      membroEquipeId: 1
  },
  {
    id: 7,
    pazienteId: 1,
    data: "25-04-2024",
    tipo: "Attività Clinica",
    categoria: "Valutazione Psicometrica",
    descrizione: "Somministrazione test HAM-D. Punteggio: 18 (depressione moderata).",
    membroEquipeId: 1
  },
  {
    id: 8,
    pazienteId: 1,
    data: "28-04-2024",
    tipo: "Attività di supporto",
    categoria: "Supporto Sociale",
    descrizione: "Accompagnamento al centro diurno. Il paziente ha partecipato ad attività di gruppo.",
    membroEquipeId: 3
  },
  {
    id: 9,
    pazienteId: 1,
    data: "02-05-2024",
    tipo: "Attività Clinica",
    categoria: "Visita Psichiatrica",
    descrizione: "Valutazione andamento terapia. Incrementata dose Sertralina a 75mg/die.",
    membroEquipeId: 4
  },
  {
    id: 10,
    pazienteId: 1,
    data: "05-05-2024",
    tipo: "Attività rivolta ai familiari",
    categoria: "Colloquio Familiare",
    descrizione: "Incontro con il fratello. Discusse strategie per aumentare il coinvolgimento familiare.",
    membroEquipeId: 1
  },
  {
    id: 11,
    pazienteId: 1,
    data: "10-05-2024",
    tipo: "Attività Clinica",
    categoria: "Colloquio Psicologico",
    descrizione: "Sessione focalizzata su tecniche di attivazione comportamentale. Pianificate attività settimanali.",
    membroEquipeId: 1
  },
  {
    id: 12,
    pazienteId: 1,
    data: "15-05-2024",
    tipo: "Attività di supporto",
    categoria: "Supporto alle attività quotidiane",
    descrizione: "Visita domiciliare. Verifica aderenza alla routine giornaliera e assunzione farmaci.",
    membroEquipeId: 2
  },
];

export function getEventiPaziente(pazienteId: number): Evento[] {
  return eventi.filter(evento => evento.pazienteId === pazienteId).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
}

export function aggiungiEvento(evento: Omit<Evento, 'id'>): void {
  const nuovoEvento = { ...evento, id: eventi.length + 1 };
  eventi.push(nuovoEvento);
}

export function aggiornaEvento(eventoAggiornato: Evento): void {
  const index = eventi.findIndex(e => e.id === eventoAggiornato.id);
  if (index !== -1) {
      eventi[index] = eventoAggiornato;
  }
}