
@NgModule({
  imports: [
    StoreModule.forRoot(EchoesReducers, { metaReducers }),
    // StoreRouterConnectingModule,
    ...optionalImports
  ],
  declarations: [],
  exports: [],
  providers: [
    ...EchoesActions
    // { provide: RouterStateSerializer, useClass: NavigationSerializer }
  ]
})
export class CoreStoreModule { }