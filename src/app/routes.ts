export interface Route {
  name: string;
  path: string;
  pages?: Route[];
}

const routes: Route[] = [
  {
    name: "Core Web Vitals",
    path: "core-web-vitals",
    pages: [
      {
        name: "Large Contentful Paint (LCP)",
        path: "lcp",
      },
    ],
  },
];

export default routes;
