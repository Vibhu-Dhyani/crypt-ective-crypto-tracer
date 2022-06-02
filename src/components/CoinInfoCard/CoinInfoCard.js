import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../../Config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "../SelectButton/SelectButton";
import { chartDays } from "../../Config/data";
import { CryptoState } from "../../CryptoContext";

const CoinInfoCard = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container:{
      marginLeft:"-65px"
    }
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData | (flag === false) ? (
          <CircularProgress
            style={{ color: "#66FCF1", marginTop: "10px", marginLeft: "150px" }}
            size={100}
           
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12} PM`
                      : `${date.getHours()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#66FCF1",
                    borderWidth: 0.6,
                    backgroundColor: "transparent",
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                scales: {
                  xAxes: [
                    {
                      display: false,
                    },
                  ],
                  yAxes: [
                    {
                      display: false,
                    },
                  ],
                },
              }}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfoCard;
