// Lets a "Discuss ..." button elsewhere on the page preselect the project type in the contact form.

const PRESELECT = 'inquiry:preselect';

export function preselectInquiry(type) {
  window.dispatchEvent(new CustomEvent(PRESELECT, { detail: type }));
}

export function onInquiryPreselect(handler) {
  const listener = (e) => handler(e.detail);
  window.addEventListener(PRESELECT, listener);
  return () => window.removeEventListener(PRESELECT, listener);
}
