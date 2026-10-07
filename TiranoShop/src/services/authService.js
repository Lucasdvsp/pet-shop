import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

import { auth } from '../firebase';

// Telas interessadas em saber quando o nome do usuário (displayName) é salvo.
// Necessário porque o updateProfile roda DEPOIS do login automático do cadastro.
const ouvintesPerfil = new Set();

// CADASTRO: cria a conta, salva o nome no perfil e já deixa o usuário logado.
export async function cadastrar(nome, email, senha) {
  const credencial = await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(credencial.user, { displayName: nome });
  ouvintesPerfil.forEach((callback) => callback(credencial.user));
  return credencial;
}

// LOGIN: confere e-mail e senha de uma conta existente.
export function entrar(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

// LOGOUT: encerra a sessão do usuário atual.
export function sair() {
  return signOut(auth);
}

// Avisa sempre que o usuário entra ou sai (usado no route.js).
export function observarUsuario(callback) {
  return onAuthStateChanged(auth, callback);
}

// Avisa quando o perfil (nome) do usuário é atualizado após o cadastro.
export function observarPerfil(callback) {
  ouvintesPerfil.add(callback);
  return () => {
    ouvintesPerfil.delete(callback);
  };
}

// Traduz os códigos de erro do Firebase para mensagens em português.
export function traduzirErro(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado.';
    case 'auth/invalid-email':
      return 'O e-mail informado é inválido.';
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'E-mail ou senha incorretos.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um pouco e tente de novo.';
    case 'auth/network-request-failed':
      return 'Sem conexão com a internet.';
    case 'auth/operation-not-allowed':
      return 'Login por e-mail e senha não está ativado no Firebase.';
    default:
      return 'Ocorreu um erro. Tente novamente.';
  }
}