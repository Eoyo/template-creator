"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cutHead(head, srcStr) {
    const cutHeadStr = srcStr.slice(0, head.length);
    if (head === cutHeadStr) {
        return srcStr.slice(head.length - 1);
    }
}
exports.cutHead = cutHead;
