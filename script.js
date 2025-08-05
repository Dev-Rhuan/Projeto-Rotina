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
                    <div class="day-header ${tipo}">${dia}</div>
                    ${atividade.map((a, i) => `
                        <div class="activity priority-${a.prioridade || ''}">
                            <input type="checkbox" class="checkbox" id="${dia}-atividade-${i}">
                            <label for="${dia}-atividade-${i}">${a.texto}</label>
                        </div>
                    `).join('')}
                `;

        weekGrid.appendChild(dayCard);
    });
}

function alternarEscala() {
    escalaAtual = escalaAtual === 0 ? 1 : 0;
    criarSemana();
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

// Salvar estado no localStorage (simulado com variáveis)
let savedData = {};

document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        // Simular salvamento local
        console.log('Atividade marcada:', this.closest('tr').cells[0].textContent);
    });
});