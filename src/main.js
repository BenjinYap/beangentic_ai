import { mount } from 'svelte'
import './app.css'
import Window from "./Window.svelte";

const app = mount(Window, {
  target: document.getElementById('app'),
})

export default app
