import { from, Observable } from 'rxjs';

export function fromFbPromise(promise: Promise<firebase.firestore.DocumentReference | void>): Observable<boolean> {
  return from(promise
    .then((result) =>
      //  result.path
      true
    )
    .catch((e) => {
      console.log('Error in promiseParsered ', e);
      return false
    }));
}