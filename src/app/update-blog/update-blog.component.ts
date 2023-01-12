import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit {
  blogid: any;
  blogObj: any;

  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  })
  ngOnInit(): void {
    this.blogid = this.route.snapshot.paramMap.get('blogid');
    this.blogService.getPost(this.blogid).subscribe((res) => {
      this.blogObj = res;
      this.form.patchValue({
        title: this.blogObj.title,
        body: this.blogObj.body,
      })
    });
  }
  onSubmit() {
    const request = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      imageId: this.blogObj.imageId,
      userId: this.blogObj.userId,
    }
    this.blogService.updatePosts(this.blogObj.id, request).subscribe(res => {
      this.router.navigateByUrl('home');
    })
  }

}
