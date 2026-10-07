import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Como a notificação aparece quando o app está ABERTO (por padrão o Expo esconderia).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // SDKs mais antigos
    shouldShowBanner: true,  // SDKs mais novos
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Pede permissão (Android 13+ e iOS) e cria o canal do Android. Devolve true/false.
export async function prepararNotificacoes() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Agendamentos',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  const atual = await Notifications.getPermissionsAsync();
  if (atual.granted) return true;
  const pedido = await Notifications.requestPermissionsAsync();
  return pedido.granted;
}

// Push imediato: confirmação do agendamento.
export function dispararConfirmacao(titulo, mensagem) {
  return Notifications.scheduleNotificationAsync({
    content: { title: titulo, body: mensagem, sound: true },
    trigger: null, // null = agora
  });
}

// Push agendado para uma data futura: lembrete. Devolve o id para poder cancelar depois.
export function agendarLembrete(titulo, mensagem, quando) {
  return Notifications.scheduleNotificationAsync({
    content: { title: titulo, body: mensagem, sound: true },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: new Date(quando),
      channelId: 'default',
    },
  });
}

export function cancelarLembrete(id) {
  return Notifications.cancelScheduledNotificationAsync(id);
}

export function cancelarTodosLembretes() {
  return Notifications.cancelAllScheduledNotificationsAsync();
}
