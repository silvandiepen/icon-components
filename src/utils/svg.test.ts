import { fixJsx } from './svg';

describe('fixJsx', () => {
  it('should convert SVG attributes to JSX', () => {
    const svg = '<circle fill:rule="evenodd" />';
    const expected = '<circle fillRule="evenodd" />';

    const result = fixJsx(svg);

    expect(result).toBe(expected);
  });

  it('should not change attributes without ":"', () => {
    const svg = '<circle fill="black" />';
    const expected = '<circle fill="black" />';

    const result = fixJsx(svg);

    expect(result).toBe(expected);
  });

  it('should handle multiple attributes', () => {
    const svg = '<circle fill:rule="evenodd" stroke:width="2" />';
    const expected = '<circle fillRule="evenodd" strokeWidth="2" />';

    const result = fixJsx(svg);

    expect(result).toBe(expected);
  });
});