export function getArrowHead(x1, y1, x2, y2, arrowLength = 15, arrowAngle = Math.PI / 6) {
    // Direction of the line
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);

    // Calculate the two arrowhead points
    const x3 = x2 - arrowLength * Math.cos(angle - arrowAngle);
    const y3 = y2 - arrowLength * Math.sin(angle - arrowAngle);

    const x4 = x2 - arrowLength * Math.cos(angle + arrowAngle);
    const y4 = y2 - arrowLength * Math.sin(angle + arrowAngle);

    return { x3, y3, x4, y4 };
}