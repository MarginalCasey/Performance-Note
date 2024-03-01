export interface Route {
  name: string;
  path: string;
  isVisitable?: boolean;
  pages?: Route[];
}

const routes: Route[] = [
  {
    name: "Core Web Vitals",
    path: "core-web-vitals",
    isVisitable: false,
    pages: [
      {
        name: "Large Contentful Paint (LCP)",
        path: "lcp",
      },
    ],
  },
];

export default routes;
