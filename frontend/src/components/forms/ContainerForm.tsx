import { useState } from "react";
import type {
  BoxInput,
  ContainerInput,
  PackingRequest,
  CautionType,
} from "../../types/packing";

type Props = {
  onSubmit: (req: PackingRequest) => void;
};

// Helper: convert string to number, treating empty string as 0
const toNumber = (value: string) =>
  value.trim() === "" ? 0 : Number(value);

type BoxFormState = BoxInput & {
  lengthStr: string;
  widthStr: string;
  heightStr: string;
};

export function ContainerForm({ onSubmit }: Props) {
  const [container, setContainer] = useState<ContainerInput>({
    length: 10,
    width: 5,
    height: 5,
  });

  const [boxes, setBoxes] = useState<BoxFormState[]>([
    {
      id: "box-1",
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

    const normalizedBoxes: BoxInput[] = boxes.map((b) => ({
      id: b.id,
      length: toNumber(b.lengthStr),
      width: toNumber(b.widthStr),
      height: toNumber(b.heightStr),
      caution: b.caution,
    }));

    onSubmit({ container, boxes: normalizedBoxes });
  };

  const handleBoxDimChange = (
    idx: number,
    field: "lengthStr" | "widthStr" | "heightStr",
    value: string,
  ) => {
    setBoxes((prev) =>
      prev.map((b, i) => (i === idx ? { ...b, [field]: value } : b)),
    );
  };

  const handleCautionChange = (idx: number, value: CautionType) => {
    setBoxes((prev) =>
      prev.map((b, i) => (i === idx ? { ...b, caution: value } : b)),
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700 }}>
      <h2>Container details</h2>

      {/* Container dimensions */}
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Length</label>
        <input
          type="number"
          min={0}
          step="any"
          value={container.length}
          onChange={(e) =>
            setContainer((c) => ({ ...c, length: Number(e.target.value) }))
          }
        />
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Width</label>
        <input
          type="number"
          min={0}
          step="any"
          value={container.width}
          onChange={(e) =>
            setContainer((c) => ({ ...c, width: Number(e.target.value) }))
          }
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Height</label>
        <input
          type="number"
          min={0}
          step="any"
          value={container.height}
          onChange={(e) =>
            setContainer((c) => ({ ...c, height: Number(e.target.value) }))
          }
        />
      </div>

      <h3>Boxes</h3>
      {boxes.map((b, idx) => (
        <div
          key={b.id}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr 1fr 1fr 1fr",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <span>
            box-
            {idx + 1}
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={b.lengthStr}
            onChange={(e) =>
              handleBoxDimChange(idx, "lengthStr", e.target.value)
            }
            placeholder="Length"
          />
          <input
            type="text"
            inputMode="decimal"
            value={b.widthStr}
            onChange={(e) =>
              handleBoxDimChange(idx, "widthStr", e.target.value)
            }
            placeholder="Width"
          />
          <input
            type="text"
            inputMode="decimal"
            value={b.heightStr}
            onChange={(e) =>
              handleBoxDimChange(idx, "heightStr", e.target.value)
            }
            placeholder="Height"
          />
          <select
            value={b.caution}
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
            setBoxes((prev) => [
              ...prev,
              {
                id: `box-${prev.length + 1}`,
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
          Add box
        </button>
        <button type="submit">Optimize packing</button>
      </div>
    </form>
  );
}
