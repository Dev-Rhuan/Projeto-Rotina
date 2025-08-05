const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
let escalaAtual = 0; // 0 = começa com trabalho, 1 = começa com folga

const atividades = {
    trabalhoSemana: [
        { texto: '<span class="hora">05:00</span> - Acordar' },
        { texto: '<span class="hora">06:30</span> - Café da Manhã' },
        { texto: '<span class="hora">09:30</span> - Lanche da Manhã' },
        { texto: '<span class="hora">10:00</span> - ' },
        { texto: '<span class="hora">11:00</span> - ' },
        { texto: '<span class="hora">12:00</span> - Almoço' },
        { texto: '<span class="hora">13:00</span> - ' },
        { texto: '<span class="hora">14:00</span> - ' },
        { texto: '<span class="hora">15:30</span> - Lanche da Tarde' },
        { texto: '<span class="hora">16:00</span> - ' },
        { texto: '<span class="hora">17:00</span> - ' },
        { texto: '<span class="hora">18:00</span> - Jantar' },
        { texto: '<span class="hora">19:20 - 21:45</span> - Faculdade' },
        { texto: '<span class="hora">22:30</span> - Dormir' },
    ],
    trabalhoWeekend: [
        { texto: '<span class="hora">05:00</span> - Acordar' },
        { texto: '<span class="hora">06:30</span> - Café da Manhã' },
        { texto: '<span class="hora">09:30</span> - Lanche da Manhã' },
        { texto: '<span class="hora">10:00</span> - ' },
        { texto: '<span class="hora">11:00</span> - ' },
        { texto: '<span class="hora">12:00</span> - Almoço' },
        { texto: '<span class="hora">13:00</span> - ' },
        { texto: '<span class="hora">14:00</span> - ' },
        { texto: '<span class="hora">15:30</span> - Lanche da Tarde' },
        { texto: '<span class="hora">16:00</span> - ' },
        { texto: '<span class="hora">17:00</span> - ' },
        { texto: '<span class="hora">18:00</span> - Jantar' },
        { texto: '<span class="hora">22:30</span> - Dormir' },
    ],
    folgaSemana: [
        { texto: '<span class="hora">08:00</span> - Acordar' },
        { texto: '<span class="hora">09:30</span> - Academia' },
        { texto: '<span class="hora">10:00</span> - ' },
        { texto: '<span class="hora">11:00</span> - ' },
        { texto: '<span class="hora">12:00</span> - ' },
        { texto: '<span class="hora">13:00</span> - ' },
        { texto: '<span class="hora">14:00</span> - ' },
        { texto: '<span class="hora">15:30</span> - ' },
        { texto: '<span class="hora">16:00</span> - ' },
        { texto: '<span class="hora">17:00</span> - Arrumar p/Faculdade' },
        { texto: '<span class="hora">19:00</span> - Jantar' },
        { texto: '<span class="hora">19:20 - 21:45</span> - Faculdade' },
        { texto: '<span class="hora">22:30</span> - Dormir' },
    ],
    folgaWeekend: [
        { texto: '<span class="hora">09:00</span> - Acordar' },
        { texto: '<span class="hora">10:30</span> - Academia' },
        { texto: '<span class="hora">11:00</span> - ' },
        { texto: '<span class="hora">12:00</span> - ' },
        { texto: '<span class="hora">13:00</span> - ' },
        { texto: '<span class="hora">14:00</span> - ' },
        { texto: '<span class="hora">15:30</span> - ' },
        { texto: '<span class="hora">16:00</span> - ' },
        { texto: '<span class="hora">18:00</span> - Jantar' },
        { texto: '<span class="hora">22:30</span> - Dormir' },
    ]
};

function criarSemana() {
    const weekGrid = document.getElementById('weekGrid');
    weekGrid.innerHTML = '';

    dias.forEach((dia, index) => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        const isWeekend = index >= 5;
        const isTrabalho = (index + escalaAtual) % 2 === 0;

        let tipo, atividade;
        if (isTrabalho) {
            if (isWeekend) {
                tipo = 'trabalho-weekend';
                atividade = atividades.trabalhoWeekend;
            } else {
                tipo = 'trabalho';
                atividade = atividades.trabalhoSemana;
            }
        } else {
            if (isWeekend) {
                tipo = 'folga';
                atividade = atividades.folgaWeekend;
            } else {
                tipo = 'folga';
                atividade = atividades.folgaSemana;
            }
        }

        dayCard.innerHTML = `
                    <div class="day-header ${tipo}">
                        <span class="day-name">${dia}</span>
                        <button class="add-activity-btn" onclick="showAddActivityModal('${dia}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#4caf50" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"/>
                                <path fill="#fff" d="M21,14h6v20h-6V14z"/>
                                <path fill="#fff" d="M14,21h20v6H14V21z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="activities-container" data-day="${dia}">
                        ${atividade.map((a, i) => `
                            <div class="activity priority-${a.prioridade || ''}" draggable="true" data-id="${dia}-atividade-${i}">
                                <div class="activity-content ${a.concluido ? 'completed' : ''}">
                                    <span class="activity-text">${a.texto}</span>
                                </div>
                                <div class="activity-actions">
                                    <button class="action-btn edit-btn" onclick="editActivity(this)" title="Editar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="#64B5F6" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                        </svg>
                                    </button>
                                    <button class="action-btn complete-btn" onclick="toggleComplete(this)" title="Marcar como concluído">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="#81C784" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                        </svg>
                                    </button>
                                    <button class="action-btn delete-btn" onclick="removeActivity(this)" title="Excluir">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="#E57373" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;

        weekGrid.appendChild(dayCard);
    });
}

function alternarEscala() {
    escalaAtual = escalaAtual === 0 ? 1 : 0;
    criarSemana();
    initializeDragAndDrop(); // Reinicializar drag and drop após recriar a semana
}

function resetarSemana() {
    // Reset checkboxes
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset dates
    document.querySelectorAll('input[type="date"]').forEach(dateInput => {
        dateInput.value = '';
    });
}

// Inicializar a semana
criarSemana();

// Adicionar funcionalidade de drag and drop
function initializeDragAndDrop() {
    const activities = document.querySelectorAll('.activity');
    const containers = document.querySelectorAll('.activities-container');

    activities.forEach(activity => {
        activity.addEventListener('dragstart', handleDragStart);
        activity.addEventListener('dragend', handleDragEnd);
    });

    containers.forEach(container => {
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    const container = e.target.closest('.activities-container');
    const draggable = document.querySelector('.dragging');
    
    if (container && draggable) {
        const afterElement = getDragAfterElement(container, e.clientY);
        if (afterElement) {
            container.insertBefore(draggable, afterElement);
        } else {
            container.appendChild(draggable);
        }
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.activity:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function handleDrop(e) {
    e.preventDefault();
}

// Inicializar drag and drop após criar a semana
document.addEventListener('DOMContentLoaded', () => {
    initializeDragAndDrop();
});

// Variáveis globais para o modal
let currentDay = '';

// Funções para o modal de adicionar atividade
function showAddActivityModal(dia) {
    currentDay = dia;
    const modal = document.getElementById('addActivityModal');
    modal.style.display = 'flex';  // Mudado para 'flex' para centralizar o conteúdo
}

function hideAddActivityModal() {
    const modal = document.getElementById('addActivityModal');
    modal.style.display = 'none';
    document.getElementById('activityTime').value = '';
    document.getElementById('activityText').value = '';
}

function addActivity() {
    const time = document.getElementById('activityTime').value;
    const text = document.getElementById('activityText').value;
    
    if (!time || !text) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    // Se estiver editando, atualiza a atividade existente
    if (window.editingActivity) {
        const activityContent = window.editingActivity.querySelector('.activity-text');
        activityContent.innerHTML = `<span class="hora">${time}</span> - ${text}`;
        window.editingActivity = null;
        hideAddActivityModal();
        return;
    }

    const container = document.querySelector(`.activities-container[data-day="${currentDay}"]`);
    const newId = `${currentDay}-atividade-${container.children.length}`;
    
    const newActivity = document.createElement('div');
    newActivity.className = 'activity';
    newActivity.draggable = true;
    newActivity.dataset.id = newId;
    
    newActivity.innerHTML = `
        <input type="checkbox" class="checkbox" id="${newId}">
        <label for="${newId}">
            <span class="hora">${time}</span> - ${text}
        </label>
        <button class="remove-activity-btn" onclick="removeActivity(this)">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                <path fill="#b39ddb" d="M30.6,44H17.4c-2,0-3.7-1.4-4-3.4L9,11h30l-4.5,29.6C34.2,42.6,32.5,44,30.6,44z"></path>
                <path fill="#9575cd" d="M28 6L20 6 14 12 34 12z"></path>
                <path fill="#7e57c2" d="M10,8h28c1.1,0,2,0.9,2,2v2H8v-2C8,8.9,8.9,8,10,8z"></path>
            </svg>
        </button>
    `;

    // Adicionar eventos de drag and drop para a nova atividade
    newActivity.addEventListener('dragstart', handleDragStart);
    newActivity.addEventListener('dragend', handleDragEnd);

    container.appendChild(newActivity);
    hideAddActivityModal();
}

function editActivity(button) {
    const activity = button.closest('.activity');
    const activityContent = activity.querySelector('.activity-text');
    const currentText = activityContent.innerHTML;
    
    // Extrair hora e texto
    const horaMatch = currentText.match(/<span class="hora">(.*?)<\/span> - (.*)/);
    const currentTime = horaMatch[1];
    const currentActivityText = horaMatch[2];

    // Preencher o modal com os valores atuais
    document.getElementById('activityTime').value = currentTime;
    document.getElementById('activityText').value = currentActivityText;

    // Guardar referência à atividade que está sendo editada
    window.editingActivity = activity;

    showAddActivityModal(activity.closest('.activities-container').dataset.day);
}

function toggleComplete(button) {
    const activity = button.closest('.activity');
    const content = activity.querySelector('.activity-content');
    content.classList.toggle('completed');
}

function removeActivity(button) {
    const activity = button.closest('.activity');
    
    // Adicionar animação de fade out
    activity.style.opacity = '0';
    activity.style.transform = 'translateX(20px)';
    
    // Remover após a animação
    setTimeout(() => {
        activity.remove();
    }, 200);
}

// Event listener para fechar o modal quando clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('addActivityModal');
    if (event.target === modal) {
        hideAddActivityModal();
    }
};