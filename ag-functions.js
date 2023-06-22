const numberToFixedDecimal = (params) => {
  let value = params.value;
  const decimal = 2;
  if (value === null) {
    return "";
  }
  if (
    isNaN(String(value)) ||
    params.colDef?.pivotKeys?.toString().includes?.("Yield")
  ) {
    return value;
  }
  const roundedNum = Math.round(+value * 100) / 100;
  value = roundedNum.toFixed(decimal);

  return value;
  // const f = window.d3.format(`.${decimal}f`);
  // return f(value);
};

const numberProcessCellCallback = (params) => {
  let colDef = params.column.getColDef();
  if (colDef.valueFormatter && !colDef?.pivotKeys?.includes?.("Yield")) {
    return colDef.valueFormatter(params);
  } else {
    return params.value;
  }
};

const getNumberRules = () => ({
  numberType: ({ value, colDef }) => {
    return (
      !isNaN(String(value)) &&
      !colDef?.pivotKeys?.toString().includes?.("Yield")
    );
  },
  numberType1: ({ value, colDef }) => {
    return (
      !isNaN(String(value)) && colDef?.pivotKeys?.toString().includes?.("Yield")
    );
  },
});

const getBordeers = () => ({
  borderBottom: {
    weight: 2,
    lineStyle: "Continuous",
  },
  borderLeft: {
    weight: 2,
    lineStyle: "Continuous",
  },
  borderRight: {
    weight: 2,
    lineStyle: "Continuous",
  },
  borderTop: {
    weight: 2,
    lineStyle: "Continuous",
  },
});

const getExcelConfigurations = () => [
  {
    id: "cell",
    alignment: {
      vertical: "Center",
      wrapText: true,
    },
    borders: getBordeers(),
  },

  {
    id: "title",
    alignment: {
      vertical: "Center",
      horizontal: "Center",
      wrapText: true,
    },
    font: {
      bold: true,
      color: "#FFFFFF",
    },
    interior: {
      color: "#2b8e4f",
      pattern: "Solid",
      patternColor: undefined,
    },
  },
  {
    id: "subtitle",
    alignment: {
      vertical: "Center",
      horizontal: "Center",
    },
    font: {
      bold: true,
      // color: "#FFFFFF",
    },
  },
  {
    id: "subheaders",
    alignment: {
      vertical: "Center",
      horizontal: "Right",
      wrapText: true,
    },
    font: {
      bold: true,
      color: "#033323",
    },
    interior: {
      color: "#FFFFFF",
      pattern: "Solid",
      patternColor: undefined,
    },
  },
  {
    id: "subfooters",
    alignment: {
      vertical: "Center",
      horizontal: "Left",
    },
    font: {
      bold: true,
      color: "#033323",
    },
    interior: {
      color: "#FFFFFF",
      pattern: "Solid",
      patternColor: undefined,
    },
  },
  {
    id: "header",
    font: {
      color: "#033323",
      bold: true,
    },
    alignment: {
      vertical: "Center",
    },
    interior: {
      color: "#e7fdee",
      pattern: "Solid",
      patternColor: undefined,
    },
    borders: getBordeers(),
  },
  {
    id: "area",
    interior: {
      color: "#fed7aa",
      pattern: "Solid",
    },
  },
  {
    id: "yield",
    interior: {
      color: "#fbcfe8",
      pattern: "Solid",
    },
  },
  {
    id: "production",
    interior: {
      color: "#a7f3d0",
      pattern: "Solid",
    },
  },
  {
    id: "numberType",
    numberFormat: {
      format: "0.00",
    },
  },
  {
    id: "numberType1",
    numberFormat: {
      format: "0",
    },
  },
  {
    id: "imcvariation",
    interior: {
      color: "#a7f3d0",
      pattern: "Solid",
    },
  },
  {
    id: "imcother",
    interior: {
      color: "#fbcfe8",
      pattern: "Solid",
    },
  },
];

const getOnlyNumbers = (string, parser) => {
  const numbers = string.match(/\d+/g) || [];

  if (parser) {
    return parser(numbers);
  }

  return numbers;
};

const pageEsitmateNumbers = (numbers = []) => {
  if (numbers.length) {
    if (numbers.length < 3) numbers.unshift(1);

    return Number(
      (numbers?.[1] || "") + (numbers?.[2] || "") + (numbers?.[0] || "")
    );
  }

  return 0;
};

const sortByEsitmates = ({ a, b, dataSource, type = "DESC" }) => {
  const aToNumber = getOnlyNumbers(a, pageEsitmateNumbers);
  const bToNumber = getOnlyNumbers(b, pageEsitmateNumbers);
  const source = getOnlyNumbers(dataSource, pageEsitmateNumbers);
  const positive = type.toLowerCase() === "desc" ? 1 : -1;
  const nagative = type.toLowerCase() === "desc" ? -1 : 1;

  if (source === aToNumber || aToNumber > bToNumber) {
    return source === bToNumber ? positive : nagative;
  } else if (bToNumber > aToNumber || source === bToNumber) {
    return source === aToNumber ? nagative : positive;
  } else {
    return 0;
  }
};

const groupedSum = ({ rowNode }) => {
  return rowNode.allLeafChildren
    .map(({ data: { MandiArivalQuantity = 0 } }) => MandiArivalQuantity)
    .reduce((t, v) => t + v, 0);
};

const parseMandiPrice = ({
  data = [],
  qtyKey = "MandiArivalQuantity",
  priceKey = "MandiWholeSalePrice",
}) =>
  data.map((item) => {
    const multipliedQty = item[qtyKey] * item[priceKey];
    const result = { multipliedQty, qty: item[qtyKey] };

    return {
      ...item,
      multipliedQty,
      result,
    };
  });

const calculateWholeSalePrice = (params) => {
  let values = [];
  const calculateResult = (values) => {
    let result = 0;
    let sumOfMultiplyQty = 0;
    let sumOfQty = 0;
    values.forEach((item) => {
      sumOfMultiplyQty += item.multipliedQty || 0;
      sumOfQty += item.qty || item.MandiArivalQuantity || 0;
    });

    result = sumOfMultiplyQty / sumOfQty;
    return result;
  };

  params.rowNode.allLeafChildren.forEach((item) => {
    values.push(item.data.result);
  });

  return calculateResult(values);
};
