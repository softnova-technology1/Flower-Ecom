import Link from "next/link";

export default function NotFound() {
    return (
        <html lang="en">
            <body style={{
                margin: 0,
                padding: 0,
                fontFamily: "system-ui, -apple-system, sans-serif",
                backgroundColor: "#f9f9f9"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    padding: "40px 20px",
                    textAlign: "center"
                }}>
                    <h1 style={{
                        fontSize: "96px",
                        fontWeight: "bold",
                        color: "#c78a3a",
                        margin: "0",
                        lineHeight: "1"
                    }}>
                        404
                    </h1>
                    <h2 style={{
                        fontSize: "32px",
                        marginTop: "30px",
                        marginBottom: "15px",
                        color: "#333",
                        fontWeight: "600"
                    }}>
                        Page Not Found
                    </h2>
                    <p style={{
                        fontSize: "18px",
                        color: "#666",
                        marginBottom: "40px",
                        maxWidth: "500px",
                        lineHeight: "1.6"
                    }}>
                        Sorry, the page you are looking for does not exist or has been moved.
                    </p>
                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            padding: "14px 32px",
                            backgroundColor: "#c78a3a",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "6px",
                            fontSize: "16px",
                            fontWeight: "500",
                            transition: "background-color 0.3s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                        }}
                    >
                        Go Back Home
                    </Link>
                </div>
            </body>
        </html>
    );
}

