export default function Navbar() {
  return (
    <div style={styles.nav}>
      <h1 style={styles.logo}>MGS</h1>
    </div>
  )
}

const styles = {
  nav: {
    background: "#000",
    padding: "15px 30px",
    borderBottom: "2px solid red",
    display: "flex",
    alignItems: "center"
  },
  logo: {
    color: "red",
    margin: 0,
    fontSize: "28px",
    letterSpacing: "3px"
  }
}