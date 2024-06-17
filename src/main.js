// import { mount, whenReady, loadFile } from "@odoo/owl";
const {mount,whenReady,loadFile} = owl;
import { WebClient } from "./webclient/web_client.js";

// Load all templates
const templates = '';
console.log(templates);
whenReady(() => {
    mount(WebClient, document.getElementById('app'), {
        templates,
        dev: true,
        name: "Todo App : Web Client",
    });
});
