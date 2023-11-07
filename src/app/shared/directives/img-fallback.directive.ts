import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]'
})
export class ImgFallbackDirective {
  @Input()
  @HostBinding('src')
  src!: string;

  @Input() appImgFallback!: string;

  @HostListener('error')
  onError() {
    this.src = this.appImgFallback;
  }
}
