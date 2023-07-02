export const getClickCoords = (event: MouseEvent) => {
    if (event.target === null) {
        return [];
    }
    const e = (event.target as HTMLElement).closest('svg') as SVGElement;
    const dim = e.getBoundingClientRect();
    const x = event.clientX - dim.left - 5;
    const y = event.clientY - dim.top - 5;
    return [x, y];
};
