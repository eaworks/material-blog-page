import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-blog-diaolog',
  templateUrl: './blog-diaolog.component.html',
  styleUrls: ['./blog-diaolog.component.scss']
})
export class BlogDiaologComponent implements OnInit {
  isUpdate: boolean = false;
  imageUrl: string = "";
  title: string = "";
  body: string = "";
  commentData: any;

  private commentService = inject(CommentService);
  private blogService = inject(BlogService);
  private data: any = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<BlogDiaologComponent>)

  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  })
  constructor() {
    if (this.data.isUpdate) {
      this.isUpdate = true;
      this.form.patchValue({
        title: this.data.blog.title,
        body: this.data.blog.body,
      })

    } else {
      this.imageUrl = this.data.blog.imageId.toString();
      this.title = this.data.blog.title;
      this.body = this.data.blog.body;
    }
  }
  ngOnInit(): void {
    this.commentService.getComments().subscribe((res) => {
      this.commentData = res.filter((x: { postId: any }) => x.postId == this.data.blog.id)
    })
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    const request = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      imageId: this.data.blog.imageId,
      userId: this.data.blog.userId,
    }
    this.blogService.updatePosts(this.data.blog.id, request).subscribe(res => { this.dialogRef.close(); })
  }


}
