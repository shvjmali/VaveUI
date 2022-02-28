import { PartCodeAllocation } from '../PartCode-model';
import { PartCodeAllocationLineItem } from '../PartLineItems-model';

export class PartCodeAllocationVM {
  partCodeAllocation: PartCodeAllocation;
  partCodeAllocationLineItem: PartCodeAllocationLineItem[];

  PartCodeAllocationVM() {
    this.partCodeAllocation = new PartCodeAllocation();
    this.partCodeAllocationLineItem = new Array<PartCodeAllocationLineItem>();
  }
}
