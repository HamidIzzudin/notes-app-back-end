// mengimpor dotenv dan menjalankan konfigurasinya
import 'dotenv/config';

import server from './server/index.js';

const port = process.env.PORT;
const host = process.env.HOST;

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});

export default server;