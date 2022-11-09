function NounsHeader() {
    return (
        <div
            style={{
                background: `url("nouns-header.png") center center no-repeat`,
                backgroundSize: "cover",
                height: "100vh",
            }}
        >
            <h1
                style={{
                    position: "absolute",
                    color: "white",
                    top: "50%",
                    left: "8%",
                    transform: "translateY(-50%)",
                    fontSize: "4rem",
                    fontWeight: "bold",
                    margin: "0"
                }}
            >
                Create, <br /> Discover
                <br /> and Join
                <br /> <i style={{ fontWeight: 400 }}>Amazing</i> DAOs
            </h1>
        </div>
    );
}

export default NounsHeader;
