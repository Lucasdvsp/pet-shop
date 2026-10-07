import { createContext, useContext, useEffect, useState } from 'react';
import { SERVICOS } from '../services/servicos';
import {
  prepararNotificacoes,
  dispararConfirmacao,
  agendarLembrete,
  cancelarLembrete,
  cancelarTodosLembretes,
} from '../services/notificacoesService';

// Quanto tempo ANTES do horário o lembrete é enviado.
const ANTECEDENCIA_MIN = 60;

const AgendamentosContext = createContext(null);

export function AgendamentosProvider({ children }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);
  const [agora, setAgora] = useState(Date.now());

  // Pede a permissão logo que o app abre.
  useEffect(() => {
    prepararNotificacoes().catch(() => {});
  }, []);

  // Relógio: faz o lembrete aparecer na aba quando chegar a hora dele.
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  async function adicionar(novo) {
    const id = Date.now().toString();
    const config = SERVICOS[novo.servico];
    const criadoEm = Date.now();
    const resumo = `${config.nome} de ${novo.pet} em ${novo.data} às ${novo.horario}`;

    const novasNotificacoes = [{
      id: `${id}-confirmacao`,
      agendamentoId: id,
      tipo: 'confirmacao',
      titulo: 'Agendamento confirmado ✅',
      mensagem: `${resumo}.`,
      exibirEm: criadoEm,
      lida: false,
    }];

    // Push de confirmação (imediato)
    dispararConfirmacao('Agendamento confirmado ✅', `${resumo}.`).catch(() => {});

    // Push de lembrete (só se ainda der tempo de avisar antes)
    let lembreteId = null;
    const lembreteEm = novo.quando - ANTECEDENCIA_MIN * 60000;
    if (lembreteEm > criadoEm + 5000) {
      const msg = `Falta 1 hora: ${resumo}.`;
      try {
        lembreteId = await agendarLembrete('Lembrete de agendamento ⏰', msg, lembreteEm);
      } catch (e) {}
      novasNotificacoes.push({
        id: `${id}-lembrete`,
        agendamentoId: id,
        tipo: 'lembrete',
        titulo: 'Lembrete de agendamento ⏰',
        mensagem: msg,
        exibirEm: lembreteEm, // só aparece na aba quando chegar essa hora
        lida: false,
      });
    }

    setAgendamentos((lista) =>
      [...lista, { ...novo, id, lembreteId }].sort((a, b) => a.quando - b.quando)
    );
    setNotificacoes((lista) => [...lista, ...novasNotificacoes]);
  }

  function cancelar(agendamento) {
    if (agendamento.lembreteId) cancelarLembrete(agendamento.lembreteId).catch(() => {});
    setAgendamentos((lista) => lista.filter((a) => a.id !== agendamento.id));
    // O lembrete deixa de existir; a confirmação fica no histórico.
    setNotificacoes((lista) =>
      lista.filter((n) => !(n.agendamentoId === agendamento.id && n.tipo === 'lembrete'))
    );
  }

  function marcarTodasComoLidas() {
    setNotificacoes((lista) =>
      lista.map((n) => (n.exibirEm <= Date.now() ? { ...n, lida: true } : n))
    );
  }

  // Chamado no logout: apaga tudo e cancela os pushes pendentes.
  function limpar() {
    cancelarTodosLembretes().catch(() => {});
    setAgendamentos([]);
    setNotificacoes([]);
  }

  // Só as que já "chegaram", da mais nova para a mais antiga.
  const visiveis = notificacoes
    .filter((n) => n.exibirEm <= agora)
    .sort((a, b) => b.exibirEm - a.exibirEm);
  const naoLidas = visiveis.filter((n) => !n.lida).length;

  return (
    <AgendamentosContext.Provider
      value={{ agendamentos, adicionar, cancelar, notificacoes: visiveis, naoLidas, marcarTodasComoLidas, limpar }}
    >
      {children}
    </AgendamentosContext.Provider>
  );
}

export function useAgendamentos() {
  return useContext(AgendamentosContext);
}
