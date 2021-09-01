package com.t2dstudio.admin.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.t2dstudio.admin.model.Employee;
import com.t2dstudio.admin.service.EmployeeService;

@Transactional
@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "*")
public class EmployeeResource {
	
	
	private final EmployeeService emloyeeService;
	
	public EmployeeResource(EmployeeService emloyeeService) {
		this.emloyeeService = emloyeeService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Employee>> getAllEmployee(){
		List<Employee> employees = emloyeeService.findAllEmployees();
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}
	@GetMapping("/find/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id ){
		Employee employee = emloyeeService.findEmployeeById(id);
		return new ResponseEntity<>(employee, HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee){
		Employee newEmployee = emloyeeService.addEmployee(employee);
		return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
	}
	@PutMapping("/update")
	public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee){
		Employee updateEmployee = emloyeeService.updateEmployee(employee);
		return new ResponseEntity<>(updateEmployee, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id){
		emloyeeService.deleteEmployee(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
//	@DeleteMapping("/delete/{id}")
//	public ResponseEntity<?> deleteEmployee(@RequestParam("id") Long id){
//		emloyeeService.deleteEmployee(id);
//		return new ResponseEntity<>(HttpStatus.OK);
//	}
}
