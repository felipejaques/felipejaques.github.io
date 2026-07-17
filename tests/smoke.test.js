/**
 * Smoke test to verify the test environment is configured correctly.
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

describe('Test Environment', () => {
  it('should have jsdom environment available', () => {
    expect(typeof document).toBe('object');
    expect(typeof window).toBe('object');
  });

  it('should support fast-check property testing', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return typeof n === 'number';
      })
    );
  });

  it('should be able to require scripts/main.js exports', () => {
    const main = require('../scripts/main.js');
    expect(main.renderProjectCard).toBeDefined();
    expect(main.renderProjects).toBeDefined();
    expect(main.getActiveSection).toBeDefined();
    expect(main.toggleMobileMenu).toBeDefined();
    expect(main.projects).toBeDefined();
  });
});
