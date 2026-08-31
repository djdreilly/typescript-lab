interface Point2D {
    x: number;
    y: number;
}
export declare class BoundingBox {
    bottomLeft: Point2D;
    topRight: Point2D;
    constructor(a: Point2D, b: Point2D);
    equals(other: any): boolean;
    getWidth(): number;
    getHeight(): number;
    addPoint(p: Point2D): void;
    private setFromPoints;
}
export {};
