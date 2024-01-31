function Header() {
  return (
    <>
      <header className="primary-header content-grid">
        <div className="primary-header__layout breakout">
          <a href="#" className="logo"><strong>SCUM Loot Tweaker</strong></a>
          <nav>
            <ul>
              <li><a href="#" className="not-available">Spawners</a></li>
              <li><a href="#" className="not-available">Parameters</a></li>
              <li><a href="#" className="not-available">Nodes</a></li>
              <li><a href="#" className="not-available">Changelog</a></li>
              <li><a href="#" className="button not-available">Account</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header;
