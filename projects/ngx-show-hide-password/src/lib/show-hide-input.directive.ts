import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowHideService } from './show-hide.service';

@Directive({
  selector: 'input[showHideInput]'
})
export class ShowHideInputDirective implements OnInit, OnDestroy {
  private subscription: Subscription;
  private id: string;

  constructor(
    private service: ShowHideService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.id = this.el.nativeElement.getAttribute('id');
    if (!this.id) {
      throw new Error(`No attribute [id] found.`);
    }
    this.service.setShow(this.id, this.el.nativeElement.type !== 'password');
  }

  ngOnInit(): void {
    this.service
      .getObservable(this.id)
      .subscribe(show =>
        this.renderer.setAttribute(this.el.nativeElement, 'type', show ? 'text' : 'password')
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
