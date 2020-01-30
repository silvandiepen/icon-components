const svgtojsx = require("svg-to-jsx");
const { kebabCase, PascalCase, fileName } = require("./helpers.js");

const BUILD = {};

BUILD.SPEC = async (fileData, options) => {
	const file = `import { Icon } from './${kebabCase(fileName(fileData.name))}';

    describe('${options.prefix ? options.prefix : "icon-"}${kebabCase(
		fileName(fileData.name)
	)}', () => {
        it('builds', () => {
        expect(new Template()).toBeTruthy();
        });
    });
    `;
	return file;
};

BUILD.E2E = async (fileData, options) => {
	const file = `import { newE2EPage } from '@stencil/core/testing';

    describe('icon-${kebabCase(fileName(fileData.name))}', () => {
        it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<${
					options.prefix ? options.prefix : "icon-"
				}${kebabCase(fileName(fileData.name))}></${
		options.prefix ? options.prefix : "icon-"
	}${kebabCase(fileName(fileData.name))}>');
    
        const element = await page.find('${
					options.prefix ? options.prefix : "icon-"
				}${kebabCase(fileName(fileData.name))}');
        expect(element).toHaveClass('hydrated');
        });
    });
`;
	return file;
};

BUILD.CSS = async (fileData, options) => {
	const file = `:host {
    display: block;
    width: var(--icon-width,20px);
    height: var(--icon-height,20px);
}
svg{
    fill: var(--icon-color);
}
`;
	return file;
};

BUILD.TSX = async (fileData, options) => {
	return await svgtojsx(fileData.data).then(function(jsx) {
		const currentFileName = `${
			options.prefix ? options.prefix : "icon-"
		}${kebabCase(fileName(fileData.name))}`;
		const file = `import { Component, Element, h, Host, Prop } from '@stencil/core';
    
@Component({
  tag: '${currentFileName}',
  styleUrl: '${kebabCase(fileName(fileData.name))}.css'
})


export class ${PascalCase(currentFileName)} {

    @Prop() width: any;
    @Prop() height: any = this.width;
    @Prop() color: string;
  
    @Element() IconElement: SVGSVGElement;

    private SvgIcon: SVGSVGElement;

    componentDidLoad(){
        this.SvgIcon = this.IconElement.querySelector('svg');
    }
    
    render() {
    
    // Set Style Props
    if(this.width) this.SvgIcon.style.setProperty('icon-width', this.width);
    if(this.height) this.SvgIcon.style.setProperty('icon-height', this.height);
    if(this.color) this.SvgIcon.style.setProperty('icon-fill', this.color);

    return (
        <Host>
            ${jsx}
        </Host>);
  }
}
`;
		return file;
	});
};

module.exports = BUILD;
