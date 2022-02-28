export class Report {
  fromDate: Date;
  toDate: Date;
  userId: string;
  location: string
  costCenterCodes: string;
  userRole: string;
  Report() {
this.fromDate = null;
this.toDate = null;
this.location = null;
this.userId = null;
this.costCenterCodes = null;
this.userRole = null;
  }
}
