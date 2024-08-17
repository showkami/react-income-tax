type Data = {
  minSalary?: number;
  maxSalary?: number;
  standardizedMonthlyRemuneration: number;
};

const data: Data[] = [
  {
    minSalary: undefined,
    maxSalary: 93000,
    standardizedMonthlyRemuneration: 88000,
  },
  {
    minSalary: 93000,
    maxSalary: 101000,
    standardizedMonthlyRemuneration: 98000,
  },
  {
    minSalary: 101000,
    maxSalary: 107000,
    standardizedMonthlyRemuneration: 104000,
  },
  {
    minSalary: 107000,
    maxSalary: 114000,
    standardizedMonthlyRemuneration: 110000,
  },
  {
    minSalary: 114000,
    maxSalary: 122000,
    standardizedMonthlyRemuneration: 118000,
  },
  {
    minSalary: 122000,
    maxSalary: 130000,
    standardizedMonthlyRemuneration: 126000,
  },
  {
    minSalary: 130000,
    maxSalary: 138000,
    standardizedMonthlyRemuneration: 134000,
  },
  {
    minSalary: 138000,
    maxSalary: 146000,
    standardizedMonthlyRemuneration: 142000,
  },
  {
    minSalary: 146000,
    maxSalary: 155000,
    standardizedMonthlyRemuneration: 150000,
  },
  {
    minSalary: 155000,
    maxSalary: 165000,
    standardizedMonthlyRemuneration: 160000,
  },
  {
    minSalary: 165000,
    maxSalary: 175000,
    standardizedMonthlyRemuneration: 170000,
  },
  {
    minSalary: 175000,
    maxSalary: 185000,
    standardizedMonthlyRemuneration: 180000,
  },
  {
    minSalary: 185000,
    maxSalary: 195000,
    standardizedMonthlyRemuneration: 190000,
  },
  {
    minSalary: 195000,
    maxSalary: 210000,
    standardizedMonthlyRemuneration: 200000,
  },
  {
    minSalary: 210000,
    maxSalary: 230000,
    standardizedMonthlyRemuneration: 220000,
  },
  {
    minSalary: 230000,
    maxSalary: 250000,
    standardizedMonthlyRemuneration: 240000,
  },
  {
    minSalary: 250000,
    maxSalary: 270000,
    standardizedMonthlyRemuneration: 260000,
  },
  {
    minSalary: 270000,
    maxSalary: 290000,
    standardizedMonthlyRemuneration: 280000,
  },
  {
    minSalary: 290000,
    maxSalary: 310000,
    standardizedMonthlyRemuneration: 300000,
  },
  {
    minSalary: 310000,
    maxSalary: 330000,
    standardizedMonthlyRemuneration: 320000,
  },
  {
    minSalary: 330000,
    maxSalary: 350000,
    standardizedMonthlyRemuneration: 340000,
  },
  {
    minSalary: 350000,
    maxSalary: 370000,
    standardizedMonthlyRemuneration: 360000,
  },
  {
    minSalary: 370000,
    maxSalary: 395000,
    standardizedMonthlyRemuneration: 380000,
  },
  {
    minSalary: 395000,
    maxSalary: 425000,
    standardizedMonthlyRemuneration: 410000,
  },
  {
    minSalary: 425000,
    maxSalary: 455000,
    standardizedMonthlyRemuneration: 440000,
  },
  {
    minSalary: 455000,
    maxSalary: 485000,
    standardizedMonthlyRemuneration: 470000,
  },
  {
    minSalary: 485000,
    maxSalary: 515000,
    standardizedMonthlyRemuneration: 500000,
  },
  {
    minSalary: 515000,
    maxSalary: 545000,
    standardizedMonthlyRemuneration: 530000,
  },
  {
    minSalary: 545000,
    maxSalary: 575000,
    standardizedMonthlyRemuneration: 560000,
  },
  {
    minSalary: 575000,
    maxSalary: 605000,
    standardizedMonthlyRemuneration: 590000,
  },
  {
    minSalary: 605000,
    maxSalary: 635000,
    standardizedMonthlyRemuneration: 620000,
  },
  {
    minSalary: 635000,
    maxSalary: undefined,
    standardizedMonthlyRemuneration: 650000,
  },
];

// 月額給与に対してStandardizedMonthlyRemunerationを返します
export const getStandardizedMonthlyRemuneration = (salary: number) => {
  for (let range of data) {
    if (
      (range.minSalary === undefined || range.minSalary <= salary) &&
      (range.maxSalary === undefined || salary < range.maxSalary)
    ) {
      return range.standardizedMonthlyRemuneration;
    }
  }
};
