import { createServer, Factory, Model, Response, ActiveModelSerializer } from "miragejs";
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({})
    },
    factories: {
      user: Factory.extend({
        name(i: number) {
          return faker.name.firstName() + " " + faker.name.lastName() + " " + i;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      })
    },
    seeds(server) {
      server.createList('user', 200);
    },
    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);

        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users
          .sort((a, b) => a.created_at < b.created_at ? 1 : -1) // sort by created_at
          // .sort((a, b) => a.name > b.name ? 1 : -1) // sort by name
          .slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        );
      });

      this.get("/users/:id");
      this.post("/users");

      this.namespace = "";
      this.passthrough();
    },
  }
  );
  return server;
}