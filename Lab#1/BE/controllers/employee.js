const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id= req.params.id;
  if(!id){
    return res.status(400).json({message : "Id is required"});
  }
  const output = employee.findIndex(emp => emp.id === id);
  if (output === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employee.splice(output,1);

  return res.status(200).json({ message: "Employee deleted successfully" });

};

// TODO
exports.createEmployee = async (req, res, next) => {
  const id=req.body.id;
  const name=req.body.name;
  if(!id){
    return res.status(400).json({message : "Id is required"});
  }
  if(!name){
    return res.status(400).json({message : "Name is required"});
  }
  if (employee.find(emp => emp.id === id)) {

    return res.status(400).json({ message: "Employee with this ID already exists" });
  }
  const newEmployee = { id: id, name: name };
  employee.push(newEmployee);
  return res.status(201).json({ message: "Employee created successfully" , employee : newEmployee});

};
