export class AccessPermission {
  firstName: string;
  lastName: string;
  costCenterCode: string;
  department: string;
  jobTitle: string;
  location: string;
  userName: string;
  roleName: string;
  plantCode: string;
  userId: string;
  isSave: boolean;
  isActive: boolean;
  hODID: string;
  existsValue: boolean;
  // role: string;
  AccessPermission() {
      this.firstName = null;
      this.lastName = null;
      this.costCenterCode = null;
      this.department = null;
      this.jobTitle = null;
      this.location = null;
      this.userName = null;
      this.roleName = null;
      this.plantCode = null;
      this.userId = null;
      this.isSave = false;
      this.isActive = false;
      this.hODID = null;
      this.existsValue = null;
      // this.role = null;
  }
}
