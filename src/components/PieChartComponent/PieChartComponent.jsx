import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import styles from "./PieChartComponent.module.css";

const COLOR_BY_NAME = {
  Terminées: "#3ec23a",
  "En cours": "#006af5",
  "Pas commencé": "#e02c2c",
};

const CustomPieSlice = (props) => {
  const { name, ...rest } = props;
  const sliceColor = COLOR_BY_NAME[name];
  return <Sector {...rest} fill={sliceColor} />;
};

function legendDotColor(name) {
  if (name === "Terminées") {
    return styles.greenDot;
  } else if (name === "En cours") {
    return styles.blueDot;
  } else {
    return styles.redDot;
  }
}

const Legend = ({ data }) => {
  return (
    <div className={styles.legendContainer}>
      {data.map((item) => (
        <div key={item.name} className={styles.legendDiv}>
          <span className={legendDotColor(item.name)} />
          <div className={styles.textFlex}>
            <span>
              <span className={styles.legendName}>{item.name}: </span>
              {item.percent}%
            </span>
            <span className={styles.legendDetails}>
              ({item.value} série{item.value > 1 ? "s" : ""})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const PieChartComponent = ({ data }) => {
  const isMobile = window.innerWidth < 768;

  const validData = data.filter((item) => item.value > 0);
  const total = validData.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercent = validData.map((item) => ({
    ...item,
    percent: total > 0 ? Math.round((item.value / total) * 100) : 0,
  }));

  return (
    <div>
      <ResponsiveContainer
        width="100%"
        height={220}
        className={styles.respContainer}
      >
        <PieChart>
          <Pie
            data={dataWithPercent}
            cx="50%"
            cy="50%"
            labelLine={!isMobile}
            outerRadius={isMobile ? 90 : 100}
            dataKey="value"
            nameKey="name"
            shape={<CustomPieSlice />}
          />
        </PieChart>
      </ResponsiveContainer>
      <Legend data={dataWithPercent} />
    </div>
  );
};

export default PieChartComponent;
