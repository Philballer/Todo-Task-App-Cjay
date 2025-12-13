import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  template: '',
})
export class EasySubscribeComponent implements OnDestroy {
  protected destroyed$ = new Subject<void>();

  protected onDestroy(): void {}

  ngOnDestroy(): void {
    this.onDestroy();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
