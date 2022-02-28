import { PartComponent } from "./partComponent";

export class ProposalMasterModel{
    ProposalID: number;
    ProposalNumber: string;
    ProposalType: string;
    TeamCode: string;
    CreatedBy: string;
    CreatedDate: Date;
    LastUpdatedBy: string;
    LastUpdatedDate: Date;
    Remarks: string;
    PartList: any = [];
    InternalSupplierPart: string; 
    sPartList: string;
    PartC: PartComponent[] = [];
    ProposalMasterModel(){
        this.ProposalID = null;
        this.ProposalNumber = null;
        this.ProposalType = null;
        this.TeamCode = null;
        this.CreatedBy = null;
        this.CreatedDate = null;
        this.LastUpdatedBy = null;
        this.LastUpdatedDate = null;
        this.PartList = null;
        this.sPartList = null;
        this.PartC = null;
        this.InternalSupplierPart = null;

    }
}