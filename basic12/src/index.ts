import App from './app';

const appDiv = document.querySelector('.app')! as HTMLDivElement;

const app = new App(appDiv);
app.render();
