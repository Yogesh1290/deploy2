import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [token, setToken] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [error, setError] = useState("");

  const handleDeploy = async () => {
    setDeploymentUrl("");
    setError("");

    if (!token || !projectName) {
      setError("Please enter both the Vercel token and project name.");
      return;
    }

    try {
      const response = await axios.post("/api/deploy", { token, projectName });
      setDeploymentUrl(response.data.url);
    } catch (err) {
      setError(err.response?.data?.error || "Deployment failed.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h1>🚀 Deploy to Vercel</h1>
      <input
        type="text"
        placeholder="Enter Vercel Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Enter Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleDeploy} style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
        Deploy
      </button>

      {deploymentUrl && (
        <p style={{ marginTop: "20px" }}>
          ✅ Deployment started: <a href={`https://${deploymentUrl}`} target="_blank">{deploymentUrl}</a>
        </p>
      )}
      {error && <p style={{ color: "red", marginTop: "20px" }}>🚨 {error}</p>}
    </div>
  );
}
