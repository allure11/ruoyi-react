const isObject = (item: any) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
/**
 * 深拷贝对象
 * @param obj
 */
const deepClone = (obj: any) => {
  if (!isObject(obj)) {
    return obj;
  }
  let cloneObj = new obj.constructor();
  for (let key in obj) {
    if (isObject(obj[key])) {
      cloneObj[key] = deepClone(obj[key]);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
}

/**
 * 深拷贝数组
 * @param arr
 */
const deepCloneArray = <T>(arr: T[]) => {
  return arr.map(item => isObject(item) ? deepClone(item) : item);
}

/**
 * columns 头部添加
 * @param columns
 * @param addColumns
 */
export const beforeAdd = <T>(columns: T[], addColumns: T[]) => {
  const array = [...addColumns];
  array.push(...deepCloneArray(columns));
  return array as T[];
}

/**
 * columns 尾部添加
 * @param columns
 * @param addColumns
 */
export const afterAdd = <T>(columns: T[], addColumns: T[]) => {
  const array = [...columns];
  array.push(...deepCloneArray(addColumns));
  return array as T[];
}

/**
 * 获取表格数据相同行合并的 rowSpan
 * @param data 表格数据
 * @param rowKey 需要合并的字段
 */
export const getRowSpan = ({
                             data = [],
                             rowKey = '',
                           }: {
                             data: any[],
                             rowKey: string
                           }
) => {
  if (!data?.length || rowKey === '') return data;
  let span = {
    index: 0,
    value: '',
    sequence: 0,
    rowSpan: 1,
  }
  data.forEach((item: any, rowIndex: number) => {
    if (span.value === item[rowKey] && span.sequence === item.stepSequence) {
      item.rowSpan = 0;
      span.rowSpan += 1;
    } else {
      if (rowIndex !== 0) {
        data[span.index].rowSpan = span.rowSpan;
        span.rowSpan = 1;
      }
      span.value = item[rowKey];
      span.sequence = item.stepSequence;
      span.index = rowIndex;
    }
  });
  data[span.index].rowSpan = span.rowSpan

  console.log(data)
  return data;
}
