import firebase from "firebase/compat"
import { Post } from "./post"

export function convertSnaps<T>(changes: firebase.firestore.QuerySnapshot<Post>)  {

    return <T[]> changes.docs.map(snap => {
        return {
            id: snap.id,
            ...<any>snap.data()
        }
    })

}