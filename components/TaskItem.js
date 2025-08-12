export default {
  // Declara as propriedades que este componente espera receber do componente pai.
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  
  // Estado local do componente.
  data() {
    return {
      isEditing: false,
      originalText: '', // Para guardar o texto original durante a edição
    };
  },

  // Métodos específicos deste componente.
  methods: {
    // Comunica ao componente pai que esta tarefa deve ser excluída.
    deleteTask() {
      this.$emit('delete', this.task.id);
    },
    
    // Comunica ao componente pai que o estado 'completed' deve ser alternado.
    toggleComplete() {
      this.$emit('toggle-complete', this.task);
    },

    // Ativa o modo de edição.
    editTask() {
        if (this.task.completed) return; // Não edita tarefas concluídas
        this.originalText = this.task.text; // Salva o texto original
        this.isEditing = true;
        // Foco será dado no próximo ciclo de renderização do DOM
        this.$nextTick(() => {
            this.$refs.editInput.focus();
        });
    },

    // Salva a edição e comunica ao pai.
    saveEdit() {
        if (!this.isEditing) return;
        
        const newText = this.$refs.editInput.value.trim();
        if (newText === '') {
            // Se o texto for vazio, restaura o original
            this.$refs.editInput.value = this.originalText;
        }

        this.isEditing = false;
        // Emite um evento 'save' com o objeto da tarefa atualizado
        this.$emit('save', { ...this.task, text: newText || this.originalText });
    },
    
    // Cancela a edição.
    cancelEdit() {
        this.isEditing = false;
        // Não precisa emitir evento, pois nenhuma alteração foi feita.
    },
  },
  
  // Template HTML para um único item da lista.
  template: `
    <li :class="{ 'completed': task.completed }">
      <div
          class="task-checkbox"
          :class="{ 'checked': task.completed }"
          @click="toggleComplete"
          role="checkbox"
          :aria-checked="task.completed"
          tabindex="0"
          @keydown.space.prevent="toggleComplete"
      ></div>

      <input 
          v-if="isEditing" 
          type="text" 
          class="edit-input"
          :value="task.text"
          ref="editInput"
          @keyup.enter="saveEdit"     
          @keyup.esc="cancelEdit"
          @blur="saveEdit"
      >
      <span v-else class="task-text" @click="toggleComplete">{{ task.text }}</span>

      <div class="task-actions">
        <button v-if="isEditing" class="save-btn" @click="saveEdit" aria-label="Salvar edição da tarefa">
          <svg viewBox="0 0 24 24"><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"></path></svg>
        </button>
        <button v-else class="edit-btn" @click="editTask" aria-label="Editar tarefa">
          <svg viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6.02 20.71,5.63L18.37,3.29C17.98,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path></svg>
        </button>
        <button class="delete-btn" @click="deleteTask" aria-label="Excluir tarefa">X</button>
      </div>
    </li>
  `
};