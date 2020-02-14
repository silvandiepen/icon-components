import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: '<%= title %>',
  styleUrl: '<%= title_lowercase %>.css'
})

export class <%= title %> {

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
            <%- data %>
        </Host>);
  }
}