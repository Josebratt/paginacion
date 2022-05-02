import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post';
import { convertSnaps } from './util';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts?: Post[] = [];

  //Save first document in snapshot of items received
  firstInResponse: any = [];

  //Save last document in snapshot of items received
  lastInResponse: any = [];

  //Keep the array of first document of previous pages
  prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  pagination_clicked_count = 0;

  //Disable next and prev buttons
  disable_next: boolean = false;
  disable_prev: boolean = false;

  constructor( private afs: AngularFirestore) {}

  getPost(){
    // this.afs.collection('posts').snapshotChanges().subscribe(
    //   data => {
    //     const posts: Post[] = data.map(
    //       snap => {
    //         return <Post> <unknown>{
    //           id: snap.payload.doc.id,
    //           data: snap.payload.doc.data()
    //         }
    //       }
    //     )
    //     console.log(posts);
        
    //   } 
    // ) 
    this.afs.collection('posts', ref => ref
      .limit(5)
      .orderBy('created_date', 'desc')
    ).snapshotChanges()
      .subscribe((response: any) => {
        if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.firstInResponse = response[0].payload.doc;
        this.lastInResponse = response[response.length - 1].payload.doc;

        
        for (let item of response) {
          this.posts?.push(item.payload.doc.data());
        }

        //Initialize values
        this.prev_strt_at = [];
        this.pagination_clicked_count = 0;
        this.disable_next = false;
        this.disable_prev = false;

        //Push first item to use for Previous action
        // this.push_prev_startAt(this.firstInResponse);
        return this.posts = [];
      }, error => {
      });                   
  }

  getPostColletion(): AngularFirestoreCollection<Post>{
    return this.afs.collection<Post>('posts', ref => ref.orderBy('created_date', 'desc') .limit(2))
  }

}


