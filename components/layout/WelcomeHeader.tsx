import styles from "../../styles/Components.module.scss";
import { ButtonGithub } from "../../components/layout/ButtonGithub";
import { UploadDatasetButton } from "./UploadDatasetButton";
import { ButtonsRow } from "./ButtonsRow";

export function WelcomeHeader(props: {
  title: React.ReactNode;
}) {
  return (
    <div className={styles.welcomeHeader}>
      {/* <ButtonGithub /> */}
      <div className={styles.title} style={{
        fontWeight:'bold',
        fontSize:'27px'
      }}>{props.title}</div>
      {/* <div className={styles.subtitle}>{props.subtitle}</div> */}
        <button style={{
          float:'right'
        }}>submit</button>
    </div>
  );
}
