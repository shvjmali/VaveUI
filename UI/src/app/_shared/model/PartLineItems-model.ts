export class PartCodeAllocationLineItem {
  id: number;
  srNo: string;
  partCodeId: number;
  yazakiSpecific: string;
  partCodeNumber: string;
  controlCode: number;
  description: string;
  materialType: string;
  materialGroup: string;
  uom: string;
  category: string;
  subCategory: string;
  purchaseGroup: string
  supplierPartNo: string;
  assetCode: string;
  finalAssetCode: string;
  remark: string;
  valuationClass: string;
  plant: number;
  status: number;
  errorMessage: string[];
  PartCodeAllocationLineItem() {
     this.id = null;
     this.partCodeId = null;
     this.valuationClass = null;
     this.plant = null;
     this.yazakiSpecific = null;
     this.partCodeNumber = null;
     this.controlCode = null;
     this.description = null;
     this.materialType = null;
     this.materialGroup = null;
     this.uom = null;
     this.category = null;
     this.subCategory = null;
     this.purchaseGroup = null;
     this.supplierPartNo = null;
     this.assetCode = null;
     this.finalAssetCode = null;
     this.remark = null;
     this.status = null;
     this.errorMessage = new Array<string>();
    }
  }
