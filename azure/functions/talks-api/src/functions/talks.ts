import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

type Talk = {
  id: string;
  title: string;
  speaker: string;
  description: string;
  day?: string;
  time?: string;
  duration?: string;
  approved: boolean;
};

type TalksDocument = {
  id: string;
  talks: Talk[];
  updatedAt: string;
};

const TALKS_DOCUMENT_ID = "talks";

function getContainer() {
  const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error("COSMOS_DB_CONNECTION_STRING must be set.");
  }

  const databaseName = process.env.COSMOS_DB_DATABASE_NAME ?? "squadgefest";
  const containerName = process.env.COSMOS_DB_CONTAINER_NAME ?? "talks";
  const client = new CosmosClient(connectionString);

  return client.database(databaseName).container(containerName);
}

async function talksHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const container = getContainer();

    if (request.method === "GET") {
      try {
        const { resource } = await container.item(TALKS_DOCUMENT_ID, TALKS_DOCUMENT_ID).read<TalksDocument>();
        return {
          status: 200,
          jsonBody: resource?.talks ?? [],
        };
      } catch {
        return {
          status: 200,
          jsonBody: [],
        };
      }
    }

    if (request.method === "POST") {
      const talks = (await request.json()) as Talk[];
      if (!Array.isArray(talks)) {
        return {
          status: 400,
          jsonBody: { message: "Expected an array of talks." },
        };
      }

      const document: TalksDocument = {
        id: TALKS_DOCUMENT_ID,
        talks,
        updatedAt: new Date().toISOString(),
      };

      await container.items.upsert(document);
      return { status: 200, jsonBody: { ok: true } };
    }

    return { status: 405, jsonBody: { message: "Method not allowed." } };
  } catch (error) {
    context.error("Talks function failed", error);
    return { status: 500, jsonBody: { message: "Internal server error." } };
  }
}

app.http("talks", {
  methods: ["GET", "POST"],
  authLevel: "function",
  route: "talks",
  handler: talksHandler,
});
