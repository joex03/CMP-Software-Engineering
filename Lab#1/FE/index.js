function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit',function(event){
  createEmployee()
});

// TODO
// add event listener to delete button
document.getElementById('dataTable').addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
      deleteEmployee(event.target);
    }
});

// TODO
function createEmployee (){
  console.log(" Debug: createEmployee() function called");
  // get data from input field
  const id=document.getElementById('id').value;
  const name=document.getElementById('name').value;
  console.log("id",id);
  console.log("name",name);

  // send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }), 
  })
    .then(response => response.json())
    .then(data => {
      console.log("Backend Response:", data); 
  // call fetchEmployees
      fetchEmployees(); 
    })
    .catch(error => console.error('Error creating employee:', error))

}


// TODO
function deleteEmployee(button) {
  if (!button) return console.error('Error: No button found');
  // get id
  // send id to BE
  const row = button.closest('tr');
  if (!row) return console.error('Error: Row not found');

  const id = row.cells[0].textContent.trim();
  if (!id) return console.error('Error: Employee ID not found');

  console.log("Debug: deleteEmployee() called for ID:", id);

  fetch(`http://localhost:3000/api/v1/employee/${id}`, { 
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(() => {
      console.log('Employee deleted successfully');
      // call fetchEmployees
      fetchEmployees();
    })
    .catch(error => console.error('Error deleting employee:', error));
}


fetchEmployees()
