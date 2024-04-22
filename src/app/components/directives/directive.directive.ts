import {AfterViewInit, Directive, TemplateRef, ViewContainerRef} from '@angular/core'

@Directive({
  selector: '[isVisible]',
})

export class DirectiveDirective {

  ngOnInit() {
      window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  ngOnDestroy() {
      window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
   console.log(event)
  };

}
