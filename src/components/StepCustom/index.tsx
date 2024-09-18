import React from "react";
import styles from "./style.less"

export type stepItemDataType = {
  title: string;
  statusName?: string;
  status?: boolean;
  textColor?: string;
  icon?: boolean;
  description?: string | React.ReactNode;
}
export type StepsPropsConfig = {
  iconFontSize?: number;
  items: stepItemDataType[];
  style?: React.CSSProperties;
}
export default ({iconFontSize = 0, items = [], style}: StepsPropsConfig): React.ReactElement => {
  return (
    <>
      <div className={styles.steps} style={{...style}}>
        {
          items.map((item, index) => {
            return (
              <div className={styles.stepsItemContent}>
                {index === 0 ? <></> :
                  <div className={styles.stepsItemLine}
                       style={{
                         borderColor: item.status ? undefined : '#ccc',
                         color: item.textColor,
                         height: (style?.height as number || 50) / 2
                       }}>
                    {item.statusName}
                  </div>}
                <div className={styles.stepsNode}>
                  <div className={styles.stepsItem}
                       style={{
                         backgroundColor: item.status ? undefined : '#ccc',
                         height: style?.height
                       }}>
                    <span className={styles.stepsItemTitle}>{item.title}</span>
                  </div>
                  {item.description}
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
}
