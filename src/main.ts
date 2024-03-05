import { createApp } from 'vue'
import 'https://legendaryflower.github.io/turtle/src/style.css'
import App from 'https://legendaryflower.github.io/turtle/src/App.vue'
import { loadGame } from 'src/game/saveload'
import { Quasar, Dark, Dialog } from 'quasar'

import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

Dark.set(true);

loadGame();

const app = createApp(App)

app.use(Quasar, {
    plugins: { Dialog }, // import Quasar plugins and add here
  })

app.mount('#app');
