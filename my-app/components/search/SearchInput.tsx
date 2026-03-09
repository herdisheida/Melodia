import styles from "./SearchInput.module.css";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className={styles.container}>
      {/* <h3>Browse Songs</h3> */}

      {/* TODO: Implement so that it only changes when press enter */}
      <input
        type="text"
        placeholder="Search songs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        className={styles.input}
      />
    </div>
  );
}
