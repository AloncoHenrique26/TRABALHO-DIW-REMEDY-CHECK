document.addEventListener('DOMContentLoaded', function() {
    const addMedicationButton = document.getElementById('add-medication-button');
    const medicationModal = document.getElementById('medication-modal');
    const closeButton = document.querySelector('.close-button');
    const medicationForm = document.getElementById('medication-form');
    const medicationList = document.getElementById('medication-list');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Carregar lembretes de medicação do localStorage ao carregar a página
    loadMedications();

    addMedicationButton.addEventListener('click', function() {
        medicationModal.style.display = 'flex';
    });

    closeButton.addEventListener('click', function() {
        medicationModal.style.display = 'none';
    });

    medicationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('medication-name').value;
        const dosage = document.getElementById('dosage').value;
        const time = document.getElementById('time').value;

        const medication = {
            name,
            dosage,
            time
        };

        saveMedication(medication);
        displayMedication(medication);
        medicationModal.style.display = 'none';
        medicationForm.reset();

        // Adicionar função de lembrete
        scheduleReminder(name, dosage, time);

        // Mostrar mensagem de confirmação
        showConfirmationMessage(`O remédio ${name} foi adicionado com sucesso!`);
    });

    function loadMedications() {
        const medications = JSON.parse(localStorage.getItem('medications')) || [];
        medications.forEach(displayMedication);
    }

    function saveMedication(medication) {
        const medications = JSON.parse(localStorage.getItem('medications')) || [];
        medications.push(medication);
        localStorage.setItem('medications', JSON.stringify(medications));
    }

    function displayMedication(medication) {
        const medicationItem = document.createElement('div');
        medicationItem.className = 'medication-item';
        medicationItem.innerHTML = `
            ${medication.name} - ${medication.dosage} - ${medication.time}
            <button class="remove-button" data-name="${medication.name}" data-time="${medication.time}">Remover</button>
        `;
        medicationList.appendChild(medicationItem);

        const removeButton = medicationItem.querySelector('.remove-button');
        removeButton.addEventListener('click', function() {
            removeMedication(medication);
            medicationItem.remove();
        });
    }

    function removeMedication(medication) {
        const medications = JSON.parse(localStorage.getItem('medications')) || [];
        const updatedMedications = medications.filter(m => m.name !== medication.name || m.time !== medication.time);
        localStorage.setItem('medications', JSON.stringify(updatedMedications));
    }

    function showConfirmationMessage(message) {
        confirmationMessage.textContent = message;
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);
    }

    function scheduleReminder(name, dosage, time) {
        const now = new Date();
        const [hours, minutes] = time.split(':').map(Number);

        // Criar um objeto de data para o horário especificado hoje
        const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        // Verificar se o horário já passou para hoje; se sim, agendar para amanhã
        if (reminderTime <= now) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }

        // Calcular o tempo restante até o lembrete
        const timeout = reminderTime - now;

        // Agendar o timeout para mostrar o alerta
        setTimeout(() => {
            alert(`Hora de tomar ${dosage} de ${name}`);

            // Após o alerta, agendar o próximo lembrete para o mesmo horário no próximo dia
            scheduleReminder(name, dosage, time);
        }, timeout);
    }
});
