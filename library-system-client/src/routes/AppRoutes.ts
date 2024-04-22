export const AppRoutes = {
  authentication: {
    login: "/",
    signup: "/signup",
  },
  home: {
    index: "/home",
  },
  author: {
    index: "/author",
    create: "/author/create",
    update: {
      template: "/author/:id",
      route: (id: number) => {
        return `/author/${id}`;
      },
    },
    get: {
      template: "/author/{:id}",
      route: (id: number) => {
        return `/author/${id}`;
      },
    },
  },
  book: {
    index: "/book",
    create: "/book/create",
    update: {
      template: "/book/:id",
      route: (id: number) => {
        return `/book/${id}`;
      },
    },
    get: {
      template: "/book/{:id}",
      route: (id: number) => {
        return `/book/${id}`;
      },
    },
  },
};
