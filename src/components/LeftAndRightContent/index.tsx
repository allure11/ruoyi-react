import React from "react";
import {Divider, theme} from "antd";
import styles from "./style.less";

type Props = {
  bgColor?: string;
  left: {
    hidden?: boolean;
    title: string;
    content: React.ReactElement;
  };
  right: {
    hidden?: boolean;
    title: string;
    content: React.ReactElement;
  };
}

export default ({left, right, bgColor}: Props): React.ReactElement => {

  const {getDesignToken, useToken} = theme;
  const {token} = useToken();

  return <div className={styles.Content} style={{backgroundColor: bgColor || token.colorBgBase}}>
    {
      left.hidden ? null :
        <div className={styles.item}>
          <h3 className={styles.itemTitle}>{left.title}</h3>
          {left.content}
        </div>
    }
    {
      right.hidden ? null :
        <div className={styles.item}>
          {
            left.hidden ? null : <h3 className={styles.itemTitle}>{right.title}</h3>
          }
          {right.content}
        </div>
    }
  </div>
}
