import TaskItem from './TaskItem.js';

export default {
  // Registra os componentes filhos que serão usados neste template
  components: {
    TaskItem,
  },
  
  // O estado inicial da aplicação
  data() {
    return {
      tasks: [],
      newTaskText: '',
      isDarkMode: false,
      currentTime: '',
      clockInterval: null,
    };
  },
  
  // Propriedades computadas
  computed: {
    themeButtonText() {
      return this.isDarkMode ? 'Modo Claro' : 'Dark Mode';
    },
  },
  
  // Observadores de propriedades
  watch: {
    isDarkMode(newVal) {
      if (newVal) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    },
  },
  
  // Métodos da aplicação
  methods: {
    addTask() {
      const text = this.newTaskText.trim();
      if (text === '') return;
      const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        editing: false,
      };
      this.tasks.unshift(newTask);
      this.newTaskText = '';
      this.saveTasks();
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.saveTasks();
    },
    toggleTaskCompleted(task) {
        if (task.editing) return;
        task.completed = !task.completed;
        this.saveTasks();
    },
    handleSave(taskToSave) {
        const task = this.tasks.find(t => t.id === taskToSave.id);
        if (task) {
            task.text = taskToSave.text;
            task.editing = false;
            this.saveTasks();
        }
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.saveTheme();
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    saveTheme() {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    },
    loadState() {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode = savedTheme === 'dark';

      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        try {
          this.tasks = JSON.parse(savedTasks).map(task => ({ ...task, editing: false }));
        } catch (e) {
          console.error("Erro ao carregar tarefas do localStorage:", e);
          this.tasks = [];
        }
      }
    },
    updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      this.currentTime = `${hours}:${minutes}:${seconds}`;
    },
  },
  
  // Ganchos de ciclo de vida
  mounted() {
    this.loadState();
    this.updateClock();
    this.clockInterval = setInterval(this.updateClock, 1000);
  },
  beforeUnmount() {
    clearInterval(this.clockInterval);
  },

  // Template HTML do componente App
  template: `
    <div class="header">
        <h1>Minha Lista de Tarefas</h1>
        <button id="theme-toggle-btn" @click="toggleTheme">
            {{ themeButtonText }}
        </button>
    </div>

    <div class="input-area">
        <form @submit.prevent="addTask">
            <input type="text" id="task-input" placeholder="Adicionar nova tarefa..." v-model="newTaskText">
            <button id="add-task-btn" type="submit">Adicionar</button>
        </form>
    </div>

    <ul id="task-list" v-if="tasks.length > 0">
        <task-item 
            v-for="task in tasks" 
            :key="task.id" 
            :task="task"
            @delete="deleteTask"
            @toggle-complete="toggleTaskCompleted"
            @save="handleSave"
        ></task-item>
    </ul>

    <div class="clock-container">
        <div class="clock-display">
            <svg class="clock-icon" viewBox="0 0 24 24"><path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"></path></svg>
            <span>{{ currentTime }}</span>
        </div>
    </div>
  `
};