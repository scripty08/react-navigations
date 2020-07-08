import { Server, IndexController } from '@scripty/server';

const init = async () => {
    let app = new Server();
    await app.addController(new IndexController({ title: '@scripty/navigations' }));
    app.start(3004);
};

init().catch((err) => {
    console.error(err.message);
});
