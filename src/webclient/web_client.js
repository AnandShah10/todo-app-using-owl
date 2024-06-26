/** @odoo-module **/

// import { Component, useState, useSubEnv } from "@odoo/owl";
const { Component ,useState, useSubEnv,xml } = owl;
import { Navbar } from "./navbar.js";
import { Todo } from "../todo/todo.js";
import { TodoStore } from "../todo/todo_store.js";

export class WebClient extends Component {
    static template = xml`<t t-name="todo_app.WebClient">
  <Navbar apps="apps" currentApp="state.currentApp.id" selectApp.bind="selectApp"/>
  <t t-component="state.currentApp.Component"/>
</t>`;
    static components = { Navbar };

    setup()
    {
         this.apps = [
      { id: "todo", name: "Todo", Component: Todo },
        ];
    this.state = useState({
      currentApp: this.apps[0],
    });
    const todoStore = useState(new TodoStore());
    useSubEnv({ todoStore });
    // Request notification permission
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
          if (permission === "granted") {
              console.log("Notification permission granted.");
          } else {
              console.log("Notification permission denied.");
          }
          setInterval(() => this.checkForOverdueTasks(todoStore), 86400000);      });
  }
    }
    selectApp(appId)
    {
        const newApp = this.apps.find((app)=>app.id === appId);
        this.state.currentApp = newApp;
    }
}