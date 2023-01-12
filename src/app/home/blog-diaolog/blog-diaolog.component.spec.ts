import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDiaologComponent } from './blog-diaolog.component';

describe('BlogDiaologComponent', () => {
  let component: BlogDiaologComponent;
  let fixture: ComponentFixture<BlogDiaologComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogDiaologComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDiaologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
