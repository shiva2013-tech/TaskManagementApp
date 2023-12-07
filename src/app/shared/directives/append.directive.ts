import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Task } from '../../_interfaces/task.model';
@Directive({
  selector: '[appAppend]'
})
export class AppendDirective implements OnChanges {
  @Input('appAppend') taskParam: Task;
  constructor(private element: ElementRef, private renderer: Renderer2) { }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.taskParam.currentValue){
      const accNum = changes.taskParam.currentValue.accounts.length;
      const span = this.renderer.createElement('span');
      const text = this.renderer.createText(` (${accNum}) accounts`);
      this.renderer.appendChild(span, text);
      this.renderer.appendChild(this.element.nativeElement, span);
    }
  }
}