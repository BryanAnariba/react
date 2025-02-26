import styles from './Alert.module.css';

export default function Alert({ children }: { children: React.ReactNode }) {
  return <div className={styles.alert}>{children}</div>;
}
