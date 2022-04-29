servicio
```ts
@Injectable({ providedIn: 'root' }) // Always 'root' unless you _know_ better!
export class CustomersService {
  public readonly customers$: Observable<Customer[]>;
  public readonly pageinateSub$: BehaviorSubject<Customer | undefined>;

  constructor(private readonly afs: AngularFirestore) {
    this.pageinateSub$ = new BehaviorSubject<Customer | undefined>(undefined);

    this.customers$ = this.pageinateSub$.pipe(
      switchMap((lastVisible?: Customer): Observable<Customer[]> => {
        const query: QueryFn = (ref: CollectionReference): Query => {
          const q = ref.orderBy('name').limit(5);
          if (lastVisible) {
            // Either this:
            return q.startAfter(lastVisible);
            // But more likely this I guess:
            return q.startAfter(lastVisible.ref);
          }
          return q;
        };
        return this.afs.collection<Customer>('customers', query);
      }),
    );
  }
}
```
componente
```html
@Component({
  template: `
<ng-container *ngIf="customers$ | async as customers; else loading">
  <ol>
    <li *ngFor="let customer of customers; trackBy: getCustomerId; last as isLast">
      <pre>For Debugging: {{ customer | json }}</pre>
      <button *ngIf="isLast" (click)="nextPage(customer)">Load Next Page</button>
    </li>
  </ol>
</ng-container>
<ng-template #loading>Loading...</ng-template>
`,
})
```
```ts
export class CustomerListComponent {
  public readonly customers$: Observable<Customer[]>;

  constructor(private readonly service: CustomersService) {
    this.customers$ = this.service.customers$;
  }

  /** Improve performance by using trackBy to identify unique customer objects */
  public getCustomerId(_: number, customer: Customer): string {
    return customer.id;
  }

  /** Tell the service the last visible customer record loaded so it can load the next page. */
  public nextPage(lastVisible: Customer): void {
    this.service.pageinateSub$.next(lastVisible);
  }
}

```