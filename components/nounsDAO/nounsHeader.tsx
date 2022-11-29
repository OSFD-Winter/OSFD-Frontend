function NounsHeader() {
  return (
    <div
      style={{
        background: `url("nouns-header.png")`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <nav className="nouns-header-nav">
        <img style={{ height: "75px" }} src="noun-header-logo.svg" alt="" />
      </nav>
      <h1 className="nouns-header-title">
        Create, <br /> Discover
        <br /> and Join
        <br /> <i style={{ fontFamily: "Poppins-Thin" }}>Amazing</i> DAOs
      </h1>
    </div>
  );
}

export default NounsHeader;
