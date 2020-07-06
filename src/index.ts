import * as cluster from "cluster";
import * as os from "os";
import { app } from "./app";

if (cluster.isMaster) {
  const availableThreads = os.cpus().length;
  const forks =
    process.env.FORK_COUNT !== undefined
      ? parseInt(process.env.FORK_COUNT, 10)
      : availableThreads;
  console.log("Available core threads: ", availableThreads);
  console.log("using threads = ", forks);

  for (let i = 0; i < forks; i++) {
    cluster.fork();
    console.log("A cluster is started");
  }

  cluster.on("exit", (worker: cluster.Worker) => {
    console.log("A worker exited with id: ", worker.id);
    cluster.fork();
  });

} else {
  app.listen(3000, () => {
    console.log("Server is started");
  })
}