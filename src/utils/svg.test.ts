import { fixJsx, svgDataOnly, svgOnly } from './svg';

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

describe('svgOnly', () => {
  it('should extract content between <svg> tags', () => {
    const content = `
        <xml></xml>
        <!--- Some Comments -->
          <svg width="100" height="100">
              <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
          </svg>
      `;
    const expected = `<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>`; 
    expect(svgOnly(content)).toEqual(expected);
  });

  it('should return null if <svg> tag is not found', () => {
    const content = '<div>This is not an SVG content</div>';
    expect(svgOnly(content)).toBeNull();
  });

  it('should return null if </svg> tag is not found', () => {
    const content = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />';
    expect(svgOnly(content)).toBeNull();
  });
});
describe('svgDataOnly', () => {
  it('should extract elements between <svg> tags', () => {
    const content = `
        <svg width="100" height="100">
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
        </svg>
    `;
    const expected = '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />';
    expect(svgDataOnly(content)).toEqual(expected);
  });

  it('should return null if <svg> tag is not found', () => {
    const content = '<div>This is not an SVG content</div>';
    expect(svgDataOnly(content)).toBeNull();
  });

  it('should return null if content between <svg> tags is empty', () => {
    const content = '<svg width="100" height="100"></svg>';
    expect(svgDataOnly(content)).toBeNull();
  });
});