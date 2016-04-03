import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
} from 'angular2/testing';
import {Component} from 'angular2/core';
import {AuthPage} from './auth';
import {DOM} from "angular2/src/platform/dom/dom_adapter";

export function main() {
  describe('auth component', () => {
    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><auth></auth></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            let authDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;

            expect(DOM.querySelectorAll(authDOMEl, 'h1')[0].textContent).toEqual('Howdy!');
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  directives: [AuthPage]
})
class TestComponent {}
