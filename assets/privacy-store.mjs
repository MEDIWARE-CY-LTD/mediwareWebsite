export const STORAGE_KEY = 'mediware-cookie-choice';
export const POLICY_VERSION = 1;
export const RETENTION_MS = 180 * 24 * 60 * 60 * 1000;
const choices = new Set(['accepted', 'essential']);

// Invalid, expired, or inaccessible storage never counts as a saved choice.
export function readPreference(storage, now = Date.now()) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw);
    if (record?.version === POLICY_VERSION && choices.has(record.choice)
        && Number.isFinite(record.expiresAt) && record.expiresAt > now
        && record.expiresAt <= now + RETENTION_MS) return record;
    storage.removeItem(STORAGE_KEY);
  } catch { /* Storage can be disabled by the browser. */ }
  return null;
}

export function savePreference(storage, choice, now = Date.now()) {
  if (!choices.has(choice)) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({
      version: POLICY_VERSION, choice, expiresAt: now + RETENTION_MS,
    }));
    return true;
  } catch { return false; }
}

export function clearPreference(storage) {
  try { storage.removeItem(STORAGE_KEY); return true; }
  catch { return false; }
}
