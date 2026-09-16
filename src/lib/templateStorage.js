const STORAGE_PREFIX = 'arb_resume_template_';
export const DEFAULT_TEMPLATE_ID = 'default';

export function getResumeTemplate(documentId) {
  if (!documentId) return DEFAULT_TEMPLATE_ID;
  try {
    return localStorage.getItem(STORAGE_PREFIX + documentId) || DEFAULT_TEMPLATE_ID;
  } catch {
    return DEFAULT_TEMPLATE_ID;
  }
}

export function setResumeTemplate(documentId, templateId) {
  if (!documentId) return;
  try {
    localStorage.setItem(STORAGE_PREFIX + documentId, templateId);
  } catch {
    /* private browsing / storage disabled — fail silently */
  }
}
