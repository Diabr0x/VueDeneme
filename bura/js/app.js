document.addEventListener('DOMContentLoaded', () => {
    const nameForm = document.getElementById('nameForm');
    const nameTable = document.getElementById('nameTable').getElementsByTagName('tbody')[0];
    const menuIcon = document.getElementById('menuIcon');
    const sidebar = document.getElementById('sidebar');

    nameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;

        const newRow = nameTable.insertRow();
        const firstNameCell = newRow.insertCell(0);
        const lastNameCell = newRow.insertCell(1);

        firstNameCell.textContent = firstName;
        lastNameCell.textContent = lastName;

        nameForm.reset();
    });

    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
});