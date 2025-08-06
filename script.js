// Constants
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Activity Class
class Activity {
    constructor(time, text, completed = false) {
        this.time = time;
        this.text = text;
        this.completed = completed;
    }

    toHTML() {
        return `<span class="hora">${this.time}</span> - ${this.text}`;
    }
}

// Weekly Schedule Manager
class WeekSchedule {
    constructor() {
        this.currentScale = 0; // 0 = começa com trabalho, 1 = começa com folga
        this.activities = {
            workWeek: [
                new Activity('05:00', 'Acordar'),
                new Activity('06:30', 'Café da Manhã'),
                new Activity('09:30', 'Lanche da Manhã'),
                new Activity('12:00', 'Almoço'),
                new Activity('15:30', 'Lanche da Tarde'),
                new Activity('18:00', 'Jantar'),
                new Activity('19:20 - 21:45', 'Faculdade'),
                new Activity('22:30', 'Dormir'),
            ],
            workWeekend: [
                new Activity('05:00', 'Acordar'),
                new Activity('06:30', 'Café da Manhã'),
                new Activity('09:30', 'Lanche da Manhã'),
                new Activity('12:00', 'Almoço'),
                new Activity('15:30', 'Lanche da Tarde'),
                new Activity('18:00', 'Jantar'),
                new Activity('22:30', 'Dormir'),
            ],
            offWeek: [
                new Activity('08:00', 'Acordar'),
                new Activity('09:30', 'Academia'),
                new Activity('17:00', 'Arrumar p/Faculdade'),
                new Activity('19:00', 'Jantar'),
                new Activity('19:20 - 21:45', 'Faculdade'),
                new Activity('22:30', 'Dormir'),
            ],
            offWeekend: [
                new Activity('09:00', 'Acordar'),
                new Activity('10:30', 'Academia'),
                new Activity('18:00', 'Jantar'),
                new Activity('22:30', 'Dormir'),
            ]
        };
    }

    toggleScale() {
        this.currentScale = this.currentScale === 0 ? 1 : 0;
        this.renderWeek();
        DragAndDrop.initialize();
    }

    getDaySchedule(dayIndex) {
        const isWeekend = dayIndex >= 5;
        const isWork = (dayIndex + this.currentScale) % 2 === 0;

        if (isWork) {
            return isWeekend ? this.activities.workWeekend : this.activities.workWeek;
        }
        return isWeekend ? this.activities.offWeekend : this.activities.offWeek;
    }

    getDayType(dayIndex) {
        const isWeekend = dayIndex >= 5;
        const isWork = (dayIndex + this.currentScale) % 2 === 0;

        if (isWork) {
            return isWeekend ? 'trabalho-weekend' : 'trabalho';
        }
        return 'folga';
    }

    renderWeek() {
        const weekGrid = document.getElementById('weekGrid');
        weekGrid.innerHTML = '';

        DAYS_OF_WEEK.forEach((day, index) => {
            const activities = this.getDaySchedule(index);
            const dayType = this.getDayType(index);
            
            const dayCard = this.createDayCard(day, dayType, activities);
            weekGrid.appendChild(dayCard);
        });
    }

    createDayCard(day, type, activities) {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <div class="day-header ${type}" onclick="UI.toggleActivities(this)">
                <span class="arrow-toggle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10L12 14L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <span class="day-name">${day}</span>
            </div>
            <div class="activities-container" data-day="${day}">
                <button class="add-activity-btn" onclick="event.stopPropagation();UI.showAddActivityModal('${day}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11" fill="#222" stroke="#bbb" stroke-width="2"/>
                        <rect x="11" y="6" width="2" height="12" rx="1" fill="#bbb"/>
                        <rect x="6" y="11" width="12" height="2" rx="1" fill="#bbb"/>
                    </svg>
                </button>
                ${this.renderActivities(activities, day)}
            </div>
        `;
        return dayCard;
    }

    renderActivities(activities, day) {
        return activities.map((activity, index) => `
            <div class="activity" draggable="true" data-id="${day}-atividade-${index}">
                <div class="activity-content${activity.completed ? ' completed' : ''}">
                    <input type="checkbox" class="checkbox" onchange="UI.toggleCompleteCheckbox(this)" ${activity.completed ? 'checked' : ''} />
                    <span class="activity-text">${activity.toHTML()}</span>
                </div>
                ${this.renderActivityActions()}
            </div>
        `).join('');
    }

    renderActivityActions() {
        return `
            <div class="activity-actions">
                <button class="action-btn menu-btn" onclick="UI.toggleMenu(this)" title="Ações">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="12" r="2" fill="#bbb"/>
                        <circle cx="12" cy="12" r="2" fill="#bbb"/>
                        <circle cx="19" cy="12" r="2" fill="#bbb"/>
                    </svg>
                </button>
                <div class="actions-dropdown">
                    <button class="dropdown-item" onclick="UI.editActivityFromMenu(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#bbb" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        <span>Editar</span>
                    </button>
                    <button class="dropdown-item" onclick="UI.removeActivityFromMenu(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#bbb" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        <span>Excluir</span>
                    </button>
                </div>
            </div>
        `;
    }
}

// UI Manager
class UI {
    static schedule = new WeekSchedule();
    static editingActivity = null;
    static currentDay = '';

    static initialize() {
        this.schedule.renderWeek();
        DragAndDrop.initialize();
        this.setupEventListeners();
    }

    static setupEventListeners() {
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.actions-dropdown').forEach(d => d.style.display = 'none');
            document.querySelectorAll('.menu-btn').forEach(m => m.classList.remove('open'));
        });

        window.onclick = (event) => {
            const modal = document.getElementById('addActivityModal');
            if (event.target === modal) {
                this.hideAddActivityModal();
            }
        };
    }

    static showAddActivityModal(day) {
        this.currentDay = day;
        const modal = document.getElementById('addActivityModal');
        modal.style.display = 'flex';
    }

    static hideAddActivityModal() {
        const modal = document.getElementById('addActivityModal');
        modal.style.display = 'none';
        document.getElementById('activityTime').value = '';
        document.getElementById('activityText').value = '';
    }

    static toggleMenu(btn) {
        const dropdown = btn.nextElementSibling;
        const allDropdowns = document.querySelectorAll('.actions-dropdown');
        const allMenus = document.querySelectorAll('.menu-btn');
        
        allDropdowns.forEach(d => { if (d !== dropdown) d.style.display = 'none'; });
        allMenus.forEach(m => { if (m !== btn) m.classList.remove('open'); });
        
        if (btn.classList.contains('open')) {
            btn.classList.remove('open');
            dropdown.style.display = 'none';
        } else {
            btn.classList.add('open');
            dropdown.style.display = 'flex';
            this.adjustDropdownPosition(dropdown);
        }
        event.stopPropagation();
    }

    static adjustDropdownPosition(dropdown) {
        const rect = dropdown.getBoundingClientRect();
        if (rect.left < 0) {
            dropdown.style.right = 'auto';
            dropdown.style.left = '100%';
            dropdown.style.marginRight = '0';
            dropdown.style.marginLeft = '8px';
        }
    }

    static toggleActivities(header) {
        const container = header.nextElementSibling;
        const arrow = header.querySelector('.arrow-toggle');
        
        container.classList.toggle('open');
        arrow.style.transform = container.classList.contains('open') ? 'rotate(90deg)' : 'rotate(0deg)';
    }

    static toggleCompleteCheckbox(checkbox) {
        const content = checkbox.closest('.activity-content');
        content.classList.toggle('completed', checkbox.checked);
        content.classList.toggle('highlighted', checkbox.checked);
    }

    static editActivityFromMenu(btn) {
        this.editActivity(btn.closest('.activity-actions').closest('.activity'));
    }

    static removeActivityFromMenu(btn) {
        this.removeActivity(btn.closest('.activity-actions').closest('.activity'));
    }

    static editActivity(activity) {
        const activityContent = activity.querySelector('.activity-text');
        const match = activityContent.innerHTML.match(/<span class="hora">(.*?)<\/span> - (.*)/);
        
        document.getElementById('activityTime').value = match[1];
        document.getElementById('activityText').value = match[2];
        
        this.editingActivity = activity;
        this.showAddActivityModal(activity.closest('.activities-container').dataset.day);
    }

    static removeActivity(activity) {
        activity.style.opacity = '0';
        activity.style.transform = 'translateX(20px)';
        setTimeout(() => activity.remove(), 200);
    }

    static addActivity() {
        const time = document.getElementById('activityTime').value;
        const text = document.getElementById('activityText').value;
        
        if (!time || !text) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        if (this.editingActivity) {
            const activityContent = this.editingActivity.querySelector('.activity-text');
            activityContent.innerHTML = new Activity(time, text).toHTML();
            this.editingActivity = null;
        } else {
            const container = document.querySelector(`.activities-container[data-day="${this.currentDay}"]`);
            const newActivity = document.createElement('div');
            newActivity.className = 'activity';
            newActivity.draggable = true;
            newActivity.dataset.id = `${this.currentDay}-atividade-${container.children.length}`;
            
            const activity = new Activity(time, text);
            newActivity.innerHTML = `
                <div class="activity-content">
                    <input type="checkbox" class="checkbox" onchange="UI.toggleCompleteCheckbox(this)" />
                    <span class="activity-text">${activity.toHTML()}</span>
                </div>
                ${this.schedule.renderActivityActions()}
            `;

            container.appendChild(newActivity);
            DragAndDrop.addEventListeners(newActivity);
        }
        
        this.hideAddActivityModal();
    }

    static resetWeek() {
        document.querySelectorAll('.checkbox').forEach(checkbox => checkbox.checked = false);
        document.querySelectorAll('input[type="date"]').forEach(dateInput => dateInput.value = '');
        document.querySelectorAll('.activity-content').forEach(content => {
            content.classList.remove('completed', 'highlighted');
        });
    }
}

// Drag and Drop Handler
class DragAndDrop {
    static initialize() {
        const activities = document.querySelectorAll('.activity');
        const containers = document.querySelectorAll('.activities-container');

        activities.forEach(activity => this.addEventListeners(activity));
        containers.forEach(container => {
            container.addEventListener('dragover', this.handleDragOver);
            container.addEventListener('drop', this.handleDrop);
        });
    }

    static addEventListeners(activity) {
        activity.addEventListener('dragstart', this.handleDragStart);
        activity.addEventListener('dragend', this.handleDragEnd);
    }

    static handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
    }

    static handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    static handleDragOver(e) {
        e.preventDefault();
        const container = e.target.closest('.activities-container');
        const draggable = document.querySelector('.dragging');
        
        if (container && draggable) {
            const afterElement = DragAndDrop.getDragAfterElement(container, e.clientY);
            if (afterElement) {
                container.insertBefore(draggable, afterElement);
            } else {
                container.appendChild(draggable);
            }
        }
    }

    static handleDrop(e) {
        e.preventDefault();
    }

    static getDragAfterElement(container, y) {
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
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    UI.initialize();
});

// Expondo funções necessárias globalmente
window.alternarEscala = () => UI.schedule.toggleScale();
window.resetarSemana = () => UI.resetWeek();
window.addActivity = () => UI.addActivity();
window.hideAddActivityModal = () => UI.hideAddActivityModal();
window.toggleMenu = (btn) => UI.toggleMenu(btn);
window.editActivityFromMenu = (btn) => UI.editActivityFromMenu(btn);
window.removeActivityFromMenu = (btn) => UI.removeActivityFromMenu(btn);
window.toggleCompleteCheckbox = (checkbox) => UI.toggleCompleteCheckbox(checkbox);
