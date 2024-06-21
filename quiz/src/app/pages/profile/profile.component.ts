
import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Input} from '@angular/core';
import { IUser } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { ActionRendererComponent } from '../action-renderer/action-renderer.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  rowData: any[] = [];
  private apiUrl = 'http://localhost:3000/api/users';

  frameworkComponents :any
  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    this.frameworkComponents = {
      actionCellRenderer: ActionRendererComponent
    };
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.rowData = users;
        console.log(this.rowData);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  columnDefs : ColDef[]= [
    {
      headerName: 'Sr. No',
      valueGetter: 'node.rowIndex + 1',
      sortable: false,
      filter: false,
      floatingFilter:true,
      width: 80
    },
    { headerName: 'ID', field: '_id', sortable: true, filter: true, floatingFilter:true },
    { headerName: 'Username', field: 'userName', sortable: true, filter: true, floatingFilter:true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true , floatingFilter:true},
    { headerName: 'Role', field: 'role', sortable: true, filter: true , floatingFilter:true},
    {
      headerName: 'Profile Picture',
      field: 'profilePic',
      sortable: true,
      floatingFilter:true,
      filter: true,
      cellRenderer: (params: any) => {
        return `<img src="${params.value}" style="height: 50px; width: 50px; border-radius: 50%"/>`;
      },
      
    },
    {
      headerName: 'Actions',
      cellRenderer: 'actionCellRenderer',
      cellRendererParams: {
        onEdit: (userId: string) => this.editUser(userId),
        onDelete: (id: number) => this.deleteUser(id),
      }
    }
    
  ];



  defaultColDef : ColDef= {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable:true,
    filter: true
  };

  paginationPageSize=  10;
  domLayout = 'autoHeight';

 

  editUser(id:string): void{
    console.log("edit button clicked", id);
    this.router.navigate([`users/edit`, id]);
  }

  deleteUser(id:number) {
    console.log("delete button clicked",id);
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(
        () => {
          this.loadUsers();
          console.log(id, 'deleted');
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }
}


