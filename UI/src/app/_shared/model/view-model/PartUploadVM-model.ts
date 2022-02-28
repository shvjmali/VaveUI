import { PartSAPDetails } from '../partSAPDetails-model';
import { ViewPartCode } from '../viewPartCode-model';

export class PartUploadVM {
  PartDetails: ViewPartCode[];
  partSAPDetails: PartSAPDetails[];
  PartUploadVM() {
    this.partSAPDetails = new Array<PartSAPDetails>();
    this.PartDetails = new Array<ViewPartCode>();
  }
}
