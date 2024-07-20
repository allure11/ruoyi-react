import styles from './index.less';

type WrapContentProps = {
  children: React.ReactNode;
};
const WrapContent: React.FC<WrapContentProps> = ({children}) => {
    return (
        <div className={styles.wraper} >{children}</div>
    )
};

export default WrapContent;
