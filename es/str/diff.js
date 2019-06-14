"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 去掉相同的头部
function cutHead(head, srcStr) {
    const cutHeadStr = srcStr.slice(0, head.length);
    if (head === cutHeadStr) {
        return srcStr.slice(head.length - 1);
    }
}
exports.cutHead = cutHead;
