import { useState, Fragment } from "react";
// import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Switch from "@mui/material/Switch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
export default function TextView(props) {
  const [checked, setChecked] = useState(true);
  let lines = props.text.split("\n");

  let words = [];
  for (let l in lines) {
    words.push(lines[l]);
    words = words.concat(lines[l].split(" "));
    words.push("\n");
  }
  const [open_list, setOpenList] = useState(Array(words.length).fill(false));
  const trans_dict = props.terms.reduce((acc, item) => {
    const [key, value] = item.split(";");
    acc[key] = value.trim();
    return acc;
  }, {});
  const style = { fontSize: "24px" };
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.5rem", // Adjust this value as needed
          },
        },
      },
    },
  });
  function handleWordClick(index, event) {
    let copy_list = open_list;
    copy_list[index] = event;
    setOpenList([...copy_list]);
  }
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));
  return (
    <div>
      <HtmlTooltip
        title={
          <Fragment>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Fragment>
        }
      >
        <Button>HTML</Button>
      </HtmlTooltip>
      <Switch
        onChange={(event) => setChecked(event.target.checked)}
        defaultChecked
      />
      {checked ? (
        <ThemeProvider theme={theme}>
          <div style={style}>
            {words.map((word, index) => (
              <span>
                <Tooltip
                  key={index}
                  open={open_list[index] ?? ""}
                  onClick={(event) => handleWordClick(index, !open_list[index])}
                  onMouseLeave={() => handleWordClick(index, false)}
                  title={
                    trans_dict[word.toLowerCase().replace(/^[,]+|[,]+$/g, "")]
                  }
                  enterDelay={100}
                  leaveDelay={0}
                >
                  <a>
                    {word.indexOf(" ") !== -1 ? (
                      <img
                        className="lines-logo"
                        src={require("../lines.png")}
                      ></img>
                    ) : (
                      word
                    )}
                  </a>{" "}
                </Tooltip>
              </span>
            ))}
          </div>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <div style={style}>
            {words.map((word, index) => (
              <span key={index}>
                <Tooltip
                  open={open_list[index]}
                  onClick={(event) => handleWordClick(index, !open_list[index])}
                  onMouseEnter={() => handleWordClick(index, true)}
                  onMouseLeave={() => handleWordClick(index, false)}
                  title={
                    trans_dict[word.toLowerCase().replace(/^[,]+|[,]+$/g, "")]
                  }
                  enterDelay={100}
                  leaveDelay={0}
                >
                  <a>
                    {word.indexOf(" ") !== -1 ? (
                      <img
                        className="lines-logo"
                        src={require("../lines.png")}
                      ></img>
                    ) : (
                      word
                    )}
                  </a>{" "}
                </Tooltip>
              </span>
            ))}
          </div>
        </ThemeProvider>
      )}
    </div>
  );
}
