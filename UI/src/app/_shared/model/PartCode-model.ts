export class PartCodeAllocation {
id: number;
plantCode: string;
requestedBy: string;
requestedOn: string;
dept: string;
modifiedBy: string;
modifiedOn: string;
status: string;
requestType: string;
cossCenterCode: string;
PartCodeAllocation() {
    this.id = null;
    this.plantCode = null;
    this.requestedBy = null;
    this.requestedOn = null;
    this.dept = null;
    this.modifiedBy = null;
    this.modifiedOn = null;
    this.status = null;
    this.requestType = null;
    this.cossCenterCode = null;
  }
}
