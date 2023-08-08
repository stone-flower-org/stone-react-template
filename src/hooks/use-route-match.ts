import { matchPath, useLocation } from 'react-router-dom';

export const useRouteMatch = (patterns: string[]) => {
  const { pathname } = useLocation();
  for (const pattern of patterns) {
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) return possibleMatch;
  }
};