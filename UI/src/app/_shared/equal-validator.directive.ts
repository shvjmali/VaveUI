import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
// tslint:disable-next-line:directive-class-suffix
export class EqualValidator implements Validator {
    constructor(@Attribute('validateEqual') public validateEqual: string,
    @Attribute('reverse') public reverse: string) {
    }

    private get isReverse() {
        // tslint:disable-next-line:curly
        if (!this.reverse) return false;
        return this.reverse === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        const v = c.value;

        // control vlaue
        const e = c.root.get(this.validateEqual);

        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                validateEqual: false
            }
        }

        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['validateEqual'];
            // tslint:disable-next-line:curly
            if (!Object.keys(e.errors).length) e.setErrors(null);
        }

        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validateEqual: false });
        }

        return null;
    }
}
