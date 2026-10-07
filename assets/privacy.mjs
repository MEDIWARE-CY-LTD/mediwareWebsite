import { readPreference, savePreference, clearPreference } from './privacy-store.mjs';

const banner = document.querySelector('.cookie-banner');
const dialog = document.querySelector('.cookie-dialog');
const status = document.querySelector('[data-cookie-status]');
let storage;
try { storage = window.localStorage; } catch { /* Private/restricted browser. */ }

if (banner && dialog) {
  banner.hidden = Boolean(readPreference(storage));
  document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => dialog.showModal());
  });
  document.querySelector('[data-cookie-close]').addEventListener('click', () => dialog.close());

  document.querySelectorAll('[data-cookie-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const saved = savePreference(storage, button.dataset.cookieChoice);
      // There are no optional services. Neither choice loads a tracker.
      banner.hidden = true;
      if (dialog.open) dialog.close();
      status.textContent = saved
        ? 'Privacy preference saved. You can change it in Cookie settings.'
        : 'Choice applied to this page. Your browser could not save it for future visits.';
    });
  });
  document.querySelector('[data-cookie-reset]').addEventListener('click', () => {
    const cleared = clearPreference(storage);
    dialog.close();
    banner.hidden = false;
    banner.querySelector('button').focus();
    status.textContent = cleared
      ? 'Saved preference cleared. You can make a new choice.'
      : 'Your browser could not clear storage. You can clear it in your browser settings.';
  });
}
