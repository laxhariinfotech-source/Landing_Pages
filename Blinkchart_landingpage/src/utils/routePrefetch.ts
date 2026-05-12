let hasPrefetched = false;

export const prefetchKeyRoutes = (): void => {
  if (hasPrefetched) {
    return;
  }

  hasPrefetched = true;

  void Promise.all([
    import("../pages/pricing-page/Pricing"),
    import("../pages/Feature-page/Feature"),
    import("../pages/HowItWorks"),
    import("../pages/JoinWaitlist"),
    import("../pages/BlogDetail"),
  ]);
};
