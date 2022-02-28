export class ProposalMasterDownload {
    ProposalID: number;
    ProposalNumber: string;
    ProposalType:string;
    CreatedBy:string;
    TeamCode:string;
    PartNumber1:number;
    Partnumber2:number;
    Expr1:string;
    Status:string;
    ActionBy:string;
    Remarks:string;
    
    ProposalMasterDownload(){
        this.ProposalID = null;
        this.ProposalNumber = null;
        this.ProposalType = null;
        this.CreatedBy = null;
        this.TeamCode = null;
        this.PartNumber1 = null;
        this.Partnumber2 = null;
        this.Expr1 = null;
        this.Status = null;
        this.ActionBy = null;
        this.Remarks = null;
    }
}