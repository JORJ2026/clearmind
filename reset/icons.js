// One consistent line-icon set: 24px grid, round caps, drawn in currentColor.
const paths = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="M5 12.6l4.3 4.3L19 7.6"/>',
  arrowRight: '<path d="M5 12h13.5"/><path d="M13 6.5l5.5 5.5-5.5 5.5"/>',
  arrowLeft: '<path d="M19 12H5.5"/><path d="M11 6.5L5.5 12l5.5 5.5"/>',
  arrowUpRight: '<path d="M7 17L17 7"/><path d="M8.5 7H17v8.5"/>',
  download: '<path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M5 19.5h14"/>',
  spark: '<path d="M12 3.5v17M4.4 8l15.2 8.8M4.4 16l15.2-8.8"/>',
};

export function icon(name, extra = '') {
  return '<svg class="icon icon-' + name + (extra ? ' ' + extra : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + paths[name] + '</svg>';
}

// Question marker: CSS shows one of these depending on open / answered state.
export const indicatorIcons = '<span class="ic ic-plus">' + icon('plus') + '</span>'
  + '<span class="ic ic-check">' + icon('check') + '</span>'
  + '<span class="ic ic-minus">' + icon('minus') + '</span>';
