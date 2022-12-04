import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent implements OnInit {
  constructor(private service: ApiserviceService) {}
  @Input() emp: any;
  @Output() closeDialog = new EventEmitter<void>();
  EmployeeID = 0;
  EmployeeName = '';
  Department = '';
  DateOfJoining = '';
  PhotoFileName = '';
  PhotoFilePath = '';
  DepartmentList: any = [];

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;

      this.EmployeeID = this.emp?.EmployeeID ?? 0;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DOJ;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
      this.DateOfJoining = this.DateOfJoining.replace("T00:00:00","");
    });
  }

  addEmployee() {
    var val = {
      EmployeeID: this.emp?.EmployeeID ?? 0,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DOJ: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.service.addEmployee(val).subscribe((res) => {
      this.closeDialog.emit();
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = {
      EmployeeID: this.EmployeeID ?? 0,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DOJ: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.service.updateEmployee(val).subscribe((res) => {
      this.closeDialog.emit();
      alert(res.toString());
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    });
  }
}
