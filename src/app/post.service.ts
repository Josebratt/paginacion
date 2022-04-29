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

  constructor( private afs: AngularFirestore) {}

  getPosts(pageNumber: any): Observable<Post[]>{    
    return this.getPostCollection(pageNumber).get().pipe(
      map( changes => convertSnaps<Post>(changes)
        // {
        // return changes.map( e => {
        //   const data = e.payload.doc.data() as Post;
        //   data.id = e.payload.doc.id;      
        //   return {...data};
        // })
      //})
    ))
  }

  getPostCollection(pageNumber: any): AngularFirestoreCollection<Post> {
    console.log('3',pageNumber);
    return  this.afs.collection<Post>('posts', ref => ref.orderBy('created_date', 'desc') .limit(3));
  }

  

}
