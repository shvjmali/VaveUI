export class LogDetails {
    LogId: number;
    ProposalID: number;
    ProposalNumber: string;
    LogDate: string;
    UserId: string;
    UserName: string;
    PartComponent(){
        this.LogId = null;
        this.ProposalID = null;
        this.ProposalNumber = null;
        this.LogDate = null;
        this.UserId = null;
        this.UserName = null;
    } 
}