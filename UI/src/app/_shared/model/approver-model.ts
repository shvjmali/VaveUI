export class Approver {
  id: string;
  partCodeId: number;
  action_On: any;
  action: string;
  action_By: string;
  remarks: string;
  nextApproverRole: string;
  currentApproverRole: string;
  rejectedCount: number;
  role: string;
  name: string;
  currentRole: string;

  Approver() {
    this.partCodeId = null;
    this.rejectedCount = null;
    this.id = null;
    this.action_On = null;
    this.action = null;
    this.action_By = null;
    this.remarks = null;
    this.nextApproverRole = null;
    this.currentApproverRole = null;
    this.role = null;
    this.name = null;
    this.currentRole = null;
  }
}
