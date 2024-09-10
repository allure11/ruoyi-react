import {Select} from "antd";
import {useEffect, useState} from "react";

export default (
  {
    defaultValue = undefined,
    parent = undefined,
    repeat = false,
    readOnly = false,
    hiddenData = [],
    request = async () => [],
    onChange = () => {
    },
  }: {
    parent?: any, //父节点
    defaultValue?: any, //默认值
    hiddenData?: any[], //默认值
    request: (value: any) => Promise<never[]>, //请求方法
    onChange: (value: any, option: any) => void, //选中回调
    getValue?: () => any, //获取值
    repeat?: boolean, //不允许重复
    readOnly?: boolean, // 只读
  }
): React.ReactElement => {
  const [options, setOptions] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState<any[]>(options);
  const [selected, setSelected] = useState<string>('');
  const [pa, setParent] = useState<any>(parent);

  useEffect(() => {
    request(pa).then(res => {
      setOptions(res)
      setShowOptions(res)
    })
  }, []);

  useEffect(() => {
    setShowOptions(repeat ? [...options.filter((o) => o.value !== selected).filter((o) => !hiddenData.includes(o.value))] : options);
  }, [selected, options])

  return <>
    {readOnly ? (options.filter(item => item.value === defaultValue).length > 0 ? options.filter(item => item.value === defaultValue)[0].label : defaultValue) :
      <Select options={showOptions} onChange={(value, option) => {
        setSelected(value);
        onChange(value, option)
      }} defaultValue={defaultValue} style={{width: '100%'}}></Select>}
  </>
}
