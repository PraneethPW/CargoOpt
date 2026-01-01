import { useState } from "react";
import { ShipForm } from "../components/forms/ShipForm";
import { Stowage3DViewer } from "../components/visualization/Stowage3DViewver";
import type { StowageRequest, StowageResponse } from "../types/stowage";
import { optimizeStowage } from "../api/stowageApi";

export function StowagePage() {
  const [ship, setShip] = useState<StowageRequest["ship"] | null>(null);
  const [result, setResult] = useState<StowageResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (req: StowageRequest) => {
    setLoading(true);
    setShip(req.ship);
    try {
      const data = await optimizeStowage(req);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="stowage-page"
      style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2rem" }}
    >
      <ShipForm onSubmit={handleSubmit} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {loading && <p>Optimizing...</p>}
        {ship && result && (
          <>
            <p>
              Utilization: {(result.utilization * 100).toFixed(2)}
              %
            </p>
            <a
              href={`https://cargoopt-production.up.railway.app${result.report_url}`}
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
              <Stowage3DViewer ship={ship} placements={result.placements} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
