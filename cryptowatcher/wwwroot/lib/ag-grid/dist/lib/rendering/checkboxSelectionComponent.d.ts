import { Component } from "../widgets/component";
export declare class CheckboxSelectionComponent extends Component {
    private gridOptionsWrapper;
    private eventService;
    private gridApi;
    private columnApi;
    private eCheckedIcon;
    private eUncheckedIcon;
    private eIndeterminateIcon;
    private rowNode;
    private column;
    private visibleFunc;
    constructor();
    private createAndAddIcons();
    private onSelectionChanged();
    private onCheckedClicked();
    private onUncheckedClicked(event);
    private onIndeterminateClicked(event);
    init(params: any): void;
    private showOrHideSelect();
    private createParams();
}
