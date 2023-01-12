import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogService } from '../services/blog.service';
import { BlogDiaologComponent } from './blog-diaolog/blog-diaolog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogData: Array<any> = [];
  pageSize = 8;
  page = 13;
  public dialog = inject(MatDialog)
  private blogService = inject(BlogService);

  ngOnInit(): void {
    this.blogService.getPosts().subscribe((res) => { this.blogData = res; })
  }
  openDialog(element: any, vieworupdate: any) {
    const dialogRef = this.dialog.open(BlogDiaologComponent, {
      data: { blog: element, isUpdate: vieworupdate }
    });
    dialogRef.afterClosed().subscribe((res) => { this.getBlogList(); })
  }
  getBlogList() {
    this.blogService.getPosts().subscribe((res) => { this.blogData = res; })
  }

}
