const tipOptions = [
  {
    id: "tip-10",
    value: 0.1,
    label: "10%",
  },
  {
    id: "tip-20",
    value: 0.2,
    label: "20%",
  },
  {
    id: "tip-50",
    value: 0.5,
    label: "50%",
  },
];

interface TipPercentageFormProps {
  setTip: React.Dispatch<React.SetStateAction<number>>;
  tip: number;
}
export default function TipPercentageForm({
  setTip,
  tip,
}: TipPercentageFormProps): JSX.Element {
  return (
    <div>
      <h3 className="font-black text-2xl">TIP: </h3>
      <form>
        {tipOptions.map((tipOption) => (
          <div key={tipOption.id} className="flex gap-2">
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
            <input
              id={tipOption.id}
              type="radio"
              name="tip"
              value={tipOption.value}
              onChange={e => setTip(+e.target.value)}
              checked={tipOption.value === tip}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
