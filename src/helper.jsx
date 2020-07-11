import { matchPath } from 'react-router-dom';

export const getSelectedKeys = (routes, location, parentPath = '') => {
    let selectedKeys = [];

    routes.forEach(route => {
        const currentPath = parentPath + route.path;

        const match = matchPath(location.pathname, {
            path: currentPath,
            exact: route.exact || false,
            strict: route.strict || false
        });

        if (match) {
            selectedKeys.push(route.key);
        }

        const subitem = route.submenu || route.group;

        if (subitem) {
            selectedKeys = [
                ...selectedKeys,
                ...getSelectedKeys(subitem, location, route.group ? parentPath : currentPath)
            ];
        }
    });

    return selectedKeys;
}

export const getActiveRoutes = (routes, location, parentPath = '') => {
    let activeRoutes = [];

    routes.forEach(route => {
        const currentPath = parentPath + route.path;

        const match = matchPath(location.pathname, {
            path: currentPath,
            exact: route.exact || false,
            strict: route.strict || false
        });

        route.currentPath = currentPath;

        if (match) {
            activeRoutes.push(route);
        }

        const subitem = route.submenu || route.group;

        if (subitem) {
            activeRoutes = [
                ...activeRoutes,
                ...getActiveRoutes(subitem, location, route.group ? parentPath : currentPath)
            ];
        }
    });

    return activeRoutes;
}
