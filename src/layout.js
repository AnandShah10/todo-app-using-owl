/** @odoo-module */

// import { Component } from "@odoo/owl";
const {Component,xml} = owl;
export class Layout extends Component{
    static template= xml` <t t-name="Layout">
        <div class="o-action">
            <div class="o-control-panel d-flex align-items-center">
                <t t-slot="control-panel"/>
            </div>
            <div class="o-content d-flex flex-wrap align-items-justify p-2" t-att-class="props.contentClass">
                <t t-slot="default"/>
            </div>
        </div>
    </t>`;
    static props = {
    slots : Object,
    contentClass : { type : String , optional :true },
    };
}