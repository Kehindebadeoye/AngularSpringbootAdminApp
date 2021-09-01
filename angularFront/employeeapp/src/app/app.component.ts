import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employees: Employee[] = []
  employee: Employee = new Employee();
  editEmployee: Employee = new Employee();
  deleteEmployee: Employee = new Employee();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe((response: Employee[]) => {
      this.employees = response;

    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void{
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onDeleteEmployee(id: number): void{
    this.employeeService.deleteEmployee(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
  //creating a modal dynamically which will perform a click function on the page
  //also to ensure the modal works we need to add the JS(bootstrap,jquery and popper) to the script in index.html
  public onOpenModal(employee: Employee, mode: string): void {
    let container = document.getElementById('main-container'); 
    const button = document.createElement('button'); //creating a button......this is required looking at the bootstrap 4 modal
    button.type = 'button'; //changing the button from default submit to button
    button.style.display = 'none'; // chaging the default styling of button to none thereby hidding the button in the UI
    button.setAttribute('data-toggle', 'modal'); //This is also a requirement using the bootstrap modal....data-toggle = modal and data-target will be the id of the class
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    // hidding the button in the div container to perform the click functions
    container?.appendChild(button);
    button.click();
  }

}
