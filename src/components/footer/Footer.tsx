export function Footer() {
  return (
    <footer className="primary-footer content-grid">
      <div className="primary-footer__layout breakout">
        &copy; {new Date().getFullYear()} <a href="https://discord.gg/8T6q6Xf945" style={{marginLeft: 24}} target="_blank">Discord</a>
      </div>
    </footer>
  )
}
