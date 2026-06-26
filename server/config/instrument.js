// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";
Sentry.init({
  dsn: "https://9de6e4990c19baf5c34fdc098357a4de@o4511619271491584.ingest.us.sentry.io/4511619308060672",
  integrations: [
    nodeProfilingIntegration(),
  ],
  //Tracing
//   tracesSampleRate: 1.0, //captures 100% of transactions
  });

//Manually call startProfiler and stopProfiler
//to profile the code in between
Sentry.profiler.startProfiler();







  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  }
