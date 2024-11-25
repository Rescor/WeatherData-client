import styles from './WidgetArea.module.css';

export default function WidgetArea(props) {

  return <div className={styles.widget_area}>
    {props.children}
  </div>
}
