import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/utils/analytics.js', import.meta.url), 'utf8')
  .replace(/^import .*;\n/, '')
  .replaceAll('export const ', 'const ');

function setup() {
  let marketing = false;
  const scripts = [];
  const context = vm.createContext({
    process: { env: {} },
    window: {},
    document: {
      createElement: () => ({}),
      head: { appendChild: (script) => scripts.push(script) },
    },
    hasConsent: (category) => category === 'marketing' && marketing,
  });
  vm.runInContext(`${source}\nglobalThis.loadTtq = loadTtq;`, context);
  return { context, scripts, consent: (value) => { marketing = value; } };
}

test('TikTok sends nothing before marketing consent', () => {
  const { context, scripts } = setup();
  assert.equal(context.loadTtq(), undefined);
  assert.equal(context.window.ttq, undefined);
  assert.equal(scripts.length, 0);
});

test('consent loads the supplied pixel once and queues one page view', () => {
  const { context, scripts, consent } = setup();
  consent(true);
  const ttq = context.loadTtq();
  assert.equal(context.loadTtq(), ttq);
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, 'https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=7697605549373947905&lib=ttq');
  assert.equal(ttq.filter(([method]) => method === 'page').length, 1);
  assert.ok(ttq.some(([method]) => method === 'grantConsent'));
  consent(false);
  assert.equal(context.loadTtq(), undefined);
});
