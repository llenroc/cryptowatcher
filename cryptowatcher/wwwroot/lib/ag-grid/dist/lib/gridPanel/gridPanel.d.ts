import { BorderLayout } from "../layout/borderLayout";
import { LoggerFactory } from "../logger";
import { KeyboardBinding, KeyboardBindingGroup } from "../constants";
import { BeanStub } from "../context/beanStub";
import { RowContainerComponent } from "../rendering/rowContainerComponent";
export interface RowContainerComponents {
    fullWidth: RowContainerComponent;
    body: RowContainerComponent;
    pinnedLeft: RowContainerComponent;
    pinnedRight: RowContainerComponent;
    floatingTop: RowContainerComponent;
    floatingTopPinnedLeft: RowContainerComponent;
    floatingTopPinnedRight: RowContainerComponent;
    floatingTopFullWidth: RowContainerComponent;
    floatingBottom: RowContainerComponent;
    floatingBottomPinnedLeft: RowContainerComponent;
    floatingBottomPinnedRight: RowContainerComponent;
    floatingBottomFullWith: RowContainerComponent;
}
export declare class GridPanel extends BeanStub {
    private masterSlaveService;
    private gridOptionsWrapper;
    private columnController;
    private rowRenderer;
    private floatingRowModel;
    private eventService;
    private paginationProxy;
    private rangeController;
    private dragService;
    private selectionController;
    private clipboardService;
    private csvCreator;
    private mouseEventService;
    private focusedCellController;
    private $scope;
    private scrollVisibleService;
    private contextMenuFactory;
    private frameworkFactory;
    private layout;
    private logger;
    private requestAnimationFrameExists;
    private scrollLagCounter;
    private scrollLagTicking;
    private eBodyViewport;
    private eRoot;
    private eBody;
    private rowContainerComponents;
    private eBodyContainer;
    private ePinnedLeftColsContainer;
    private ePinnedRightColsContainer;
    private eFullWidthCellViewport;
    private eFullWidthCellContainer;
    private ePinnedLeftColsViewport;
    private ePinnedRightColsViewport;
    private eBodyViewportWrapper;
    private eHeaderContainer;
    private eHeaderOverlay;
    private ePinnedLeftHeader;
    private ePinnedRightHeader;
    private eHeader;
    private eHeaderViewport;
    private eFloatingTop;
    private ePinnedLeftFloatingTop;
    private ePinnedRightFloatingTop;
    private eFloatingTopContainer;
    private eFloatingTopViewport;
    private eFloatingTopFullWidthCellContainer;
    private eFloatingBottom;
    private ePinnedLeftFloatingBottom;
    private ePinnedRightFloatingBottom;
    private eFloatingBottomContainer;
    private eFloatingBottomViewport;
    private eFloatingBottomFullWidthCellContainer;
    private eAllCellContainers;
    private lastLeftPosition;
    private lastTopPosition;
    private bodyHeight;
    private useScrollLag;
    private enableRtl;
    private forPrint;
    private autoHeight;
    private scrollWidth;
    private pinningRight;
    private pinningLeft;
    agWire(loggerFactory: LoggerFactory): void;
    getVerticalPixelRange(): any;
    destroy(): void;
    private onRowDataChanged();
    private showOrHideOverlay();
    getLayout(): BorderLayout;
    private init();
    private addStopEditingWhenGridLosesFocus();
    private addAngularApplyCheck();
    private disableBrowserDragging();
    private addEventListeners();
    private addDragListeners();
    private addMouseEvents();
    private addKeyboardEvents();
    private addBodyViewportListener();
    private getRowForEvent(event);
    private processKeyboardEvent(eventName, keyboardEvent);
    private handlePageScrollingKey(pagingKeyGroup, pagingKey, keyboardEvent);
    private pageHorizontally(pagingKey);
    private pageDiagonally(pagingKey);
    private pageVertically(pagingKey);
    scrollToTop(): void;
    private performScroll(scroll);
    private processMouseEvent(eventName, mouseEvent);
    private onContextMenu(mouseEvent);
    private preventDefaultOnContextMenu(mouseEvent);
    private addShortcutKeyListeners();
    private onCtrlAndA(event);
    private onCtrlAndC(event);
    private onCtrlAndV(event);
    private onCtrlAndD(event);
    private createOverlayTemplate(name, defaultTemplate, userProvidedTemplate);
    private createLoadingOverlayTemplate();
    private createNoRowsOverlayTemplate();
    ensureIndexVisible(index: any): void;
    private getPrimaryScrollViewport();
    getCenterWidth(): number;
    private isHorizontalScrollShowing();
    private isVerticalScrollShowing();
    private isBodyVerticalScrollShowing();
    periodicallyCheck(): void;
    private setScrollShowing();
    private setBottomPaddingOnPinnedRight();
    private setMarginOnFullWidthCellContainer();
    ensureColumnVisible(key: any): void;
    showLoadingOverlay(): void;
    showNoRowsOverlay(): void;
    hideOverlay(): void;
    private getWidthForSizeColsToFit();
    sizeColumnsToFit(nextTimeout?: number): void;
    getBodyContainer(): HTMLElement;
    getDropTargetBodyContainers(): HTMLElement[];
    getBodyViewport(): HTMLElement;
    getDropTargetLeftContainers(): HTMLElement[];
    getDropTargetPinnedRightContainers(): HTMLElement[];
    getHeaderContainer(): HTMLElement;
    getHeaderOverlay(): HTMLElement;
    getRoot(): HTMLElement;
    getPinnedLeftHeader(): HTMLElement;
    getPinnedRightHeader(): HTMLElement;
    private queryHtmlElement(selector);
    private loadTemplate();
    private findElements();
    getRowContainers(): RowContainerComponents;
    private addMouseWheelEventListeners();
    getHeaderViewport(): HTMLElement;
    private centerMouseWheelListener(event);
    genericMouseWheelListener(event: any): boolean;
    private generalMouseWheelListener(event, targetPanel);
    onDisplayedColumnsChanged(): void;
    private onDisplayedColumnsWidthChanged();
    private onScrollVisibilityChanged();
    private setWidthsOfContainers();
    private setPinnedLeftWidth();
    private setPinnedRightWidth();
    private setPinnedContainersVisible();
    setBodyAndHeaderHeights(): void;
    getBodyHeight(): number;
    setHorizontalScrollPosition(hScrollPosition: number): void;
    scrollHorizontally(pixels: number): number;
    private addScrollListener();
    private onBodyScroll();
    private onBodyHorizontalScroll();
    private onBodyVerticalScroll();
    private onVerticalScroll(sourceElement);
    private isBodyVerticalScrollActive();
    private addIEPinFix(onPinnedRightScroll, onPinnedLeftScroll);
    private setLeftAndRightBounds();
    private isUseScrollLag();
    private debounce(callback);
    getBodyViewportScrollLeft(): number;
    setBodyViewportScrollLeft(value: number): void;
    horizontallyScrollHeaderCenterAndFloatingCenter(): void;
    private fakeVerticalScroll(position);
    addScrollEventListener(listener: () => void): void;
    removeScrollEventListener(listener: () => void): void;
}
export interface TestKeyboardBindingGroupsResult {
    trappedKeyboardBinding: KeyboardBinding;
    trappedKeyboardBindingGroup: KeyboardBindingGroup;
}
