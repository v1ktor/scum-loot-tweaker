import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { NavigationPath } from "../../data/navigationPath.ts";

function useActiveMatch(path: string) {
  const resolvedPath = useResolvedPath(path);

  return useMatch({ path: resolvedPath.pathname, end: true });
}

export function Header() {
  const isSpawnersActive = useActiveMatch(NavigationPath.Spawners);
  const isParametersActive = useActiveMatch(NavigationPath.Parameters);
  const isNodesActive = useActiveMatch(NavigationPath.Nodes);
  const isChangelogActive = useActiveMatch(NavigationPath.Changelog);

  return (
    <>
      <header className="primary-header content-grid">
        <div className="primary-header__layout breakout">
          <Link to="/" className="logo"><strong>SCUM Loot Tweaker</strong></Link>
          <nav>
            <ul>
              <li><Link className={isSpawnersActive ? 'nav-active' : ''} to={NavigationPath.Spawners}>Spawners</Link></li>
              <li><Link className={isNodesActive ? 'nav-active' : ''} to={NavigationPath.Nodes}>Nodes</Link></li>
              <li><Link className={isParametersActive ? 'nav-active' : ''} to={NavigationPath.Parameters}>Parameters</Link></li>
              <li><Link className={isChangelogActive ? 'nav-active' : ''} to={NavigationPath.Changelog}>Changelog</Link></li>
              <li><Link to="#" className="button not-available">Account</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
