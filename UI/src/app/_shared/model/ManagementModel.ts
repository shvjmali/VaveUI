import { List } from "underscore";

export class ManagementModel
{
    PartCount: Number;
    ProposalCount: Number;
    AlternateCount: Number;
    InlineCount: Number;
    lPartCTypeWise: ListItem[] = [];
    lProposalTeamWise: ListItem[] = [];
    lProposalTypeWise: ListItem[] = [];
    UnusePartCount: Number;
}

export class ListItem
{
    sText: string;
    nValue: Number;
    public ListItem(){
        this.sText = null;
        this.nValue = null;
    }
} 