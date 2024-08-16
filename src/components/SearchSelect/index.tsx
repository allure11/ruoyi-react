import {Select} from "antd";
import {useEffect, useState} from "react";

export default (
  {
    request = async () => [],
    onChange = (value) => {
    },
  }: {
    request: () => Promise<never[]>,
    onChange: (value: any) => void,
    getValue?: () => any
  }
): React.ReactElement => {
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    request().then(res => {
      setOptions(res)
    })
  }, []);

  return (
    <Select options={options} onChange={onChange}></Select>
  )
}
