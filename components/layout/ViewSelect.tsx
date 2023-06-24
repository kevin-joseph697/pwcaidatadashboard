import React from "react";
import styles from "../../styles/Components.module.scss";


interface ViewSelectProps {
  value: string;
  onChange?: (value: string) => void;
}

export function ViewSelect(props: ViewSelectProps) {
  const handleChange = React.useCallback(
    (value: string) => {
      return () => {
        props.onChange?.(value);
      };
    },
    [props.onChange]
  );

  return (
    <div className={styles.viewSelect}>
      <strong>View: </strong>
      <label>
        <input
          checked={props.value === "DataTable"}
          type="radio"
          name="view"
          onChange={() => {}}
          onClick={handleChange("DataTable")}
          style={{
            accentColor:'#d04a02'
          }}
        />
        Data
      </label>
      <label>
        <input
          checked={props.value === "prompt"}
          type="radio"
          name="view"
          onChange={() => {}}
          onClick={handleChange("prompt")}
          style={{
            accentColor:'#d04a02'
          }}
        />
        Prompt
      </label>
      {/* <label>
        <input
          checked={props.value === "code"}
          type="radio"
          name="view"
          onChange={() => {}}
          onClick={handleChange("code")}
        />
        Code
      </label> */}
      <label>
        <input
          checked={props.value === "dashboard"}
          type="radio"
          name="view"
          onChange={() => {}}
          onClick={handleChange("dashboard")}
          style={{
            accentColor:'#d04a02'
          }}
        />
        Dashboard
      </label>
    </div>
  );
}
