import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Post } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'paginacion';

  loading = false;

  posts?: Post[];

  lastPageLoaded: any;
  querySnapshot:any;

  constructor(private postService: PostService){
      this.loading = true;
      this.postService.getPosts(this.lastPageLoaded).pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        data => { 
          this.lastPageLoaded = data[data.length -1 ]
          this.posts = data; console.log(this.posts)}
      )
      
      
  }

  cargar(){
    this.loading = true;  
    console.log('1',this.lastPageLoaded);
    this.postService.getPosts(this.lastPageLoaded).pipe(
                      finalize(() => this.loading = false)
    )
    .subscribe(
      data => { 
        this.lastPageLoaded = data[data.length -1 ]
        this.posts = data; console.log(this.posts); 
      }
    )
    
    
  }
}