import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  readonly apiUrl = 'http://localhost:50306/api/';
  readonly photoUrl = 'http://localhost:50306/Photos/';

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'text/plain, */*',
      'Content-Type': 'application/json', // We send JSON
    }),
    responseType: 'text' as 'json',
  };

  constructor(private http: HttpClient) {}

  // Department
  getDepartmentList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'department/GetDepartment');
  }

  addDepartment(dept: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'department/AddDepartment',
      dept,
      this.httpOptions
    );
  }

  updateDepartment(dept: any): Observable<any> {
    return this.http.put<any>(
      this.apiUrl + 'department/UpdateDepartment/',
      dept,
      this.httpOptions
    );
  }

  deleteDepartment(deptId: number): Observable<number> {
    return this.http.delete<number>(
      this.apiUrl + 'department/DeleteDepartment/' + deptId,
      this.httpOptions
    );
  }

  // Employee
  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'employee/GetEmployee');
  }

  addEmployee(emp: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'employee/AddEmployee',
      emp,
      this.httpOptions
    );
  }

  updateEmployee(emp: any): Observable<any> {
    return this.http.put<any>(
      this.apiUrl + 'employee/UpdateEmployee/',
      emp,
      this.httpOptions
    );
  }

  deleteEmployee(empId: number): Observable<number> {
    return this.http.delete<number>(
      this.apiUrl + 'employee/DeleteEmployee/' + empId,
      this.httpOptions
    );
  }

  uploadPhoto(photo: any) {
    this.httpOptions.responseType = 'json';

    return this.http.post(this.apiUrl + 'employee/savefile', photo).pipe(
      tap((data) => {
        this.httpOptions.responseType = 'text' as 'json';
      })
    );
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'employee/GetAllDepartmentNames');
  }
}
