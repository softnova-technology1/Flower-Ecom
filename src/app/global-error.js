"use client";

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body>
                <div style={{ 
                    padding: "40px", 
                    textAlign: "center",
                    fontFamily: "system-ui, sans-serif"
                }}>
                    <h2>Something went wrong!</h2>
                    <p>{error?.message || "An unexpected error occurred"}</p>
                    <button 
                        onClick={() => reset()}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            background: "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}

