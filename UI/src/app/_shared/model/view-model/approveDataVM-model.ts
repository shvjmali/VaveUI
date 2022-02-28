import { Approver } from '../approver-model';
import { ViewPartCode } from '../viewPartCode-model';

export class ApproveDataVM {
  approverModel: any;
  selectedList: any[];
  unSelectedList: any[];
  ApproveDataVM() {
    this.approverModel = new Approver();
    this.selectedList = new Array<ViewPartCode>();
    this.unSelectedList = new Array<ViewPartCode>();
  }
}
