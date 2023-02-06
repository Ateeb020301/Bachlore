export const getClosestEdgeAndDistance = (
    elementRef: React.RefObject<HTMLDivElement>,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
): { edge: 'left' | 'right' | 'top' | 'bottom' | 'none'; distance: number } => {
    if (elementRef.current === null) return { edge: 'none', distance: 0 };
    let elemBounding = elementRef.current.getBoundingClientRect();

    let elementLeftEdge = elemBounding.left;
    let elementTopEdge = elemBounding.top;
    let elementRightEdge = elemBounding.right;
    let elementBottomEdge = elemBounding.bottom;

    let distanceToTopEdge = Math.abs(elementTopEdge - (e.pageY - window.scrollY));
    let distanceToBottomEdge = Math.abs(elementBottomEdge - (e.pageY - window.scrollY));
    let distanceToLeftEdge = Math.abs(elementLeftEdge - (e.pageX - window.scrollX));
    let distanceToRightEdge = Math.abs(elementRightEdge - (e.pageX - window.scrollX));

    let min = Math.min(distanceToTopEdge, distanceToBottomEdge, distanceToLeftEdge, distanceToRightEdge);

    switch (min) {
        case distanceToLeftEdge:
            return { edge: 'left', distance: min };
        case distanceToRightEdge:
            return { edge: 'right', distance: min };
        case distanceToTopEdge:
            return { edge: 'top', distance: min };
        case distanceToBottomEdge:
            return { edge: 'bottom', distance: min };
    }
    // hacky fix for typing
    return { edge: 'none', distance: 0 };
};
