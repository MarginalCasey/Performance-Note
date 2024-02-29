export interface Route {
  name: string;
  path: string;
  pages?: Route[];
}

const routes: Route[] = [];

export default routes;
