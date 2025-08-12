// Importa a função createApp do Vue (disponível globalmente pela CDN)
const { createApp } = Vue;

// Importa nosso componente principal da aplicação
import App from './components/App.js';

// Cria a instância da aplicação com o componente App e a monta no elemento #app
createApp(App).mount('#app');