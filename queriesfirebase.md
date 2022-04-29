




// funciona: Queries con snapshotChanges
// Nos muestra tanto el id con los datos de la coleccion
```ts
 this.db.collection('posts').snapshotChanges().subscribe(
  data => {
    const posts: Post[] = data.map(
      snap => {
        return <Post> <unknown>{
          id: snap.payload.doc.id,
          data: snap.payload.doc.data()
        }
      }
    )
    console.log(posts);
    
  } 
)
```

// funciona: Queries con snapshotChanges
// nos muestra el estado del documento que ha sido modificado ej: si esta modificado.
```ts
this.db.collection('posts').stateChanges().subscribe(
        data => {
          const posts: Post[] = data.map(
            snap => {
              return <Post> <unknown>{
                id: snap.payload.doc.id,
                data: snap.payload.doc.data()
              }
            }
          )
          console.log(posts);
          
        } 
      )
```