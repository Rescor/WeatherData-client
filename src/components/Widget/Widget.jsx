import React from 'react';
import styles from './Widget.module.css';

export default function Widget({ title, children }) {

  return <div className={styles.widget_container}>
    <p className={styles.widget_title}>{title}</p>
    {children}
  </div>
}
