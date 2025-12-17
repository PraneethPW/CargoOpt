import { useState } from "react";
import { ContainerForm } from "../components/forms/ContainerForm";
import { Packing3DViewer } from "../components/visualization/Packing3DViewer";
import type { PackingRequest, PackingResponse } from "../types/packing";
import { optimizePacking } from "../api/packingApi";

export function PackingPage() {
  const [container, setContainer] = useState<PackingRequest["container"] | null>(
    null,
  );
  const [result, setResult] = useState<PackingResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (req: PackingRequest) => {
    setLoading(true);
    setContainer(req.container);
    try {
      const data = await optimizePacking(req);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="packing-page"
      style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2rem" }}
    >
      <ContainerForm onSubmit={handleSubmit} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {loading && <p>Optimizing...</p>}
        {container && result && (
          <>
            <p>
              Utilization: {(result.utilization * 100).toFixed(2)}
              %
            </p>
            <a
              href={`https://cargoopt-d0bee956a2ea.herokuapp.com${result.report_url}`}
              target="_blank"
              rel="noreferrer"
            >
              Download report
            </a>
            <div
              style={{
                flex: 1,
                minHeight: "500px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#f3f4f6",
              }}
            >
              <Packing3DViewer
                container={container}
                placements={result.placements}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
