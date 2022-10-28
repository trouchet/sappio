export const routerRoutes = (router) => {
	let routes = [];

	for(const r of router.stack) {
		if(r.route && r.route.path) {
			routes.push(r.route.path);			
		}
	}

	return routes;
}