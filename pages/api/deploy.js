import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, projectName } = req.body;

  if (!token || !projectName) {
    return res.status(400).json({ error: "Missing Vercel token or project name" });
  }

  try {
    // Deploying an empty Next.js project (for simplicity)
    const response = await axios.post(
      "https://api.vercel.com/v13/deployments",
      {
        name: projectName,
        projectSettings: { framework: "nextjs" },
      },
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      }
    );

    return res.status(200).json({ message: "Deployment started", url: response.data.url });
  } catch (error) {
    return res.status(500).json({ error: error.response?.data || "Deployment failed" });
  }
}
