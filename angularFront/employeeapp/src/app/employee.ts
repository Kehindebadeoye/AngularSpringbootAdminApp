export class Employee {
id: number;
name: string;
email: string;
jobTitle: string;
phone: string;
imageUrl: string;
employeeCode: string;

constructor(id =0, name="", jobTitle = "", email="", phone="",imageUrl="",employeeCode=""){
    this.id= id;
    this.name = name;
    this.jobTitle = jobTitle;
    this.phone = phone;
    this.email = email;
    this.imageUrl = imageUrl;
    this.employeeCode = employeeCode;
}

}
