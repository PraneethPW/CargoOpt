import { useState } from "react";
import type {
  ShipInput,
  CargoInput,
  StowageRequest,
  CautionType,
} from "../../types/stowage";

type Props = {
  onSubmit: (req: StowageRequest) => void;
};

// Helper: convert string to number, treating empty as 0
const toNumber = (value: string) =>
  value.trim() === "" ? 0 : Number(value);

type CargoFormState = CargoInput & {
  lengthStr: string;
  widthStr: string;
  heightStr: string;
};

export function ShipForm({ onSubmit }: Props) {
  const [ship, setShip] = useState<ShipInput>({
    length: 100,
    width: 30,
    height: 20,
  });

  const [cargos, setCargos] = useState<CargoFormState[]>([
    {
      id: "cargo-1",
      length: 2,
      width: 2,
      height: 2,
      caution: "fragile",
      lengthStr: "2",
      widthStr: "2",
      heightStr: "2",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedCargos: CargoInput[] = cargos.map((c) => ({
      id: c.id,
      length: toNumber(c.lengthStr),
      width: toNumber(c.widthStr),
      height: toNumber(c.heightStr),
      caution: c.caution,
    }));

    onSubmit({ ship, cargos: normalizedCargos });
  };

  const handleCargoDimChange = (
    idx: number,
    field: "lengthStr" | "widthStr" | "heightStr",
    value: string,
  ) => {
    setCargos((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c)),
    );
  };

  const handleCautionChange = (idx: number, value: CautionType) => {
    setCargos((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, caution: value } : c)),
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700 }}>
      <h2>Ship details</h2>

      {/* Ship dimensions */}
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Length</label>
        <input
          type="number"
          min={0}
          step="any"
          value={ship.length}
          onChange={(e) =>
            setShip((s) => ({ ...s, length: Number(e.target.value) }))
          }
        />
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Width</label>
        <input
          type="number"
          min={0}
          step="any"
          value={ship.width}
          onChange={(e) =>
            setShip((s) => ({ ...s, width: Number(e.target.value) }))
          }
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Height</label>
        <input
          type="number"
          min={0}
          step="any"
          value={ship.height}
          onChange={(e) =>
            setShip((s) => ({ ...s, height: Number(e.target.value) }))
          }
        />
      </div>

      <h3>Cargos</h3>
      {cargos.map((c, idx) => (
        <div
          key={c.id}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr 1fr 1fr 1fr",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <span>
            cargo-
            {idx + 1}
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={c.lengthStr}
            onChange={(e) =>
              handleCargoDimChange(idx, "lengthStr", e.target.value)
            }
            placeholder="Length"
          />
          <input
            type="text"
            inputMode="decimal"
            value={c.widthStr}
            onChange={(e) =>
              handleCargoDimChange(idx, "widthStr", e.target.value)
            }
            placeholder="Width"
          />
          <input
            type="text"
            inputMode="decimal"
            value={c.heightStr}
            onChange={(e) =>
              handleCargoDimChange(idx, "heightStr", e.target.value)
            }
            placeholder="Height"
          />
          <select
            value={c.caution}
            onChange={(e) =>
              handleCautionChange(idx, e.target.value as CautionType)
            }
          >
            <option value="none">None</option>
            <option value="decomposable">Decomposable</option>
            <option value="fragile">Fragile</option>
            <option value="waste">Waste</option>
            <option value="edible">Edible</option>
          </select>
        </div>
      ))}

      <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
        <button
          type="button"
          onClick={() =>
            setCargos((prev) => [
              ...prev,
              {
                id: `cargo-${prev.length + 1}`,
                length: 1,
                width: 1,
                height: 1,
                caution: "none",
                lengthStr: "1",
                widthStr: "1",
                heightStr: "1",
              },
            ])
          }
        >
          Add cargo
        </button>
        <button type="submit">Optimize stowage</button>
      </div>
    </form>
  );
}
