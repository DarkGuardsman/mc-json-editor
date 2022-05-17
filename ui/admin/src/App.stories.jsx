import App from "./App";

export default {
    title: "Application",
    component: App
}

const MockTemplate = (args) =>  <App />

export const Component = MockTemplate.bind({});