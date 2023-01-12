import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {

  blogid: any;
  blogObj: any;
  commentData: any;
  private commentService = inject(CommentService);
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.blogid = this.route.snapshot.paramMap.get('blogid');
    this.blogService.getPost(this.blogid).subscribe((res) => { this.blogObj = res; });
    this.commentService.getComments().subscribe((res) => {
      this.commentData = res.filter((x: { postId: any }) => x.postId == this.blogid)
    })
  }
}
