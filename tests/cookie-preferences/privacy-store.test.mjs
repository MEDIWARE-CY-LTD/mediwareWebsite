import test from 'node:test';
import assert from 'node:assert/strict';
import { STORAGE_KEY, POLICY_VERSION, RETENTION_MS, readPreference, savePreference, clearPreference } from '../../assets/privacy-store.mjs';

const now = 1_800_000_000_000;
function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

test('no stored decision does not imply acceptance', () => {
  assert.equal(readPreference(memoryStorage(), now), null);
});
for (const choice of ['accepted', 'essential']) {
  test(`${choice} survives navigation and expires after 180 days`, () => {
    const storage = memoryStorage();
    assert.equal(savePreference(storage, choice, now), true);
    assert.deepEqual(readPreference(storage, now + 1000), {
      version: POLICY_VERSION, choice, expiresAt: now + RETENTION_MS,
    });
    assert.equal(readPreference(storage, now + RETENTION_MS), null);
    assert.equal(storage.getItem(STORAGE_KEY), null);
  });
}

test('malformed, obsolete, unknown, and unrealistic records do not grant consent', () => {
  for (const raw of [
    'not json', 'null', '{}',
    JSON.stringify({ version: 0, choice: 'accepted', expiresAt: now + 1000 }),
    JSON.stringify({ version: POLICY_VERSION, choice: 'unknown', expiresAt: now + 1000 }),
    JSON.stringify({ version: POLICY_VERSION, choice: 'accepted', expiresAt: 'tomorrow' }),
    JSON.stringify({ version: POLICY_VERSION, choice: 'accepted', expiresAt: now + RETENTION_MS + 1 }),
  ]) {
    const storage = memoryStorage();
    storage.setItem(STORAGE_KEY, raw);
    assert.equal(readPreference(storage, now), null);
  }
});

test('invalid choices cannot replace an existing decision', () => {
  const storage = memoryStorage();
  savePreference(storage, 'essential', now);
  assert.equal(savePreference(storage, 'unknown', now), false);
  assert.equal(readPreference(storage, now).choice, 'essential');
});

test('withdrawal deletes only this site’s privacy preference', () => {
  const storage = memoryStorage();
  storage.setItem('unrelated-key', 'keep');
  savePreference(storage, 'accepted', now);
  assert.equal(clearPreference(storage), true);
  assert.equal(readPreference(storage, now), null);
  assert.equal(storage.getItem('unrelated-key'), 'keep');
});

test('restricted or unavailable storage does not break the page', () => {
  const blocked = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
    removeItem() { throw new Error('blocked'); },
  };
  for (const storage of [blocked, undefined]) {
    assert.equal(readPreference(storage, now), null);
    assert.equal(savePreference(storage, 'accepted', now), false);
    assert.equal(clearPreference(storage), false);
  }
});
