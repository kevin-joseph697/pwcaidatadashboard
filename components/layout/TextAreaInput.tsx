import React from "react";
import styles from "../../styles/Components.module.scss";
import { className } from "../../utils/className";

export function TextAreaInput(
  props: React.PropsWithChildren<{
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
  }>
) {
  const ref = React.createRef<HTMLTextAreaElement>();
  const [textAreaValue,setTextAreaValue] = React.useState('')
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.onChange?.(e.target.value);
    },
    [props.onChange]
  );
  const questionFormSubmitted = (e:any)=>{
    if (e.key === 'Enter') {
      // console.log('do validate');
      setTextAreaValue(e.target.value)
    }
  }
  return (
    <div
      className={className(
        styles.textAreaInput,
        props.disabled && styles.disabled
      )}
    >
      <div className={styles.label}>{props.label}</div>
      <textarea ref={ref} onChange={handleChange} value={textAreaValue} />
      <div style={{
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingBottom: '20px'
      }}>
        <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '10px' }}
         placeholder="Ask Your Question"  onKeyDown={questionFormSubmitted}/>
      </div>

      
    </div>
  );
}
