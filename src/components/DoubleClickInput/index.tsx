import React, {useEffect, useRef, useState} from "react";
import {Input, InputRef} from "antd";

type ClickInputType = {
  value: string;
  onChange: (value: string) => void;
}

export default ({
                  value,
                  onChange = (value: string) => {
                  }
                }: ClickInputType): React.ReactElement => {
  const [state, setState] = useState(false);
  const [val, setVal] = useState(value);
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (state) {
      inputRef.current?.focus({
        cursor: 'all',
      });
    }
  }, [state]);
  return <div style={{minWidth: 20, height: 22}} onClick={() => {
    setState(true)
  }}>
    {
      state ? <Input defaultValue={val}
                     ref={inputRef}
                     size={"small"}
                     onBlur={() => {
                       setState(false)
                     }}
                     onChange={(value) => {
                       setVal(value.target.value)
                       onChange(value.target.value)
                     }}/> :
        <span>{val}</span>
    }
  </div>
};
