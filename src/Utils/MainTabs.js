import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Ciicker from "../questions/Clicker";
import TextView from "../text_view/TextView";
import { Container } from "@mui/material";
import WriteQuestion from "../write_question/WriteQuestion";
import VerbsConj from "../verbs_conj/VerbsConj";
import VerbsWrite from "../verbs_conj/VerbsWrite";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MainTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          // aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          centered
        >
          <Tab
            label="Boxes"
            {...a11yProps(0)}
            sx={{ fontSize: "30px", borderBottom: 1, borderColor: "divider" }}
          />
          <Tab
            label="Song View"
            {...a11yProps(1)}
            sx={{ fontSize: "30px", borderBottom: 1, borderColor: "divider" }}
          />
          <Tab
            label="Write"
            {...a11yProps(2)}
            sx={{ fontSize: "30px", borderBottom: 1, borderColor: "divider" }}
          />
          <Tab
            label="Verbs Conj"
            {...a11yProps(3)}
            sx={{ fontSize: "30px", borderBottom: 1, borderColor: "divider" }}
          />
          <Tab
            label="Verbs Write"
            {...a11yProps(4)}
            sx={{ fontSize: "30px", borderBottom: 1, borderColor: "divider" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Ciicker
          terms={props.terms}
          words={props.words}
          show_reorg={props.show_reorg}
          handle_reorg={props.handle_reorg}
          handleLevel={props.handleLevel}
          levelsRange={props.levelsRange}
          handleLevelsRange={props.handleLevelsRange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TextView
          terms={props.terms}
          text={props.text}
          words={props.words}
          show_reorg={props.show_reorg}
          handle_reorg={props.handle_reorg}
          handleLevel={props.handleLevel}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <WriteQuestion
          terms={props.terms}
          text={props.text}
          words={props.words}
          show_reorg={props.show_reorg}
          handle_reorg={props.handle_reorg}
          handleLevel={props.handleLevel}
          levelsRange={props.levelsRange}
          handleLevelsRange={props.handleLevelsRange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <VerbsConj
          terms={props.terms}
          text={props.text}
          words={props.words}
          show_reorg={props.show_reorg}
          handle_reorg={props.handle_reorg}
          handleLevel={props.handleLevel}
          levelsRange={props.levelsRange}
          handleLevelsRange={props.handleLevelsRange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <VerbsWrite
          terms={props.terms}
          text={props.text}
          words={props.words}
          show_reorg={props.show_reorg}
          handle_reorg={props.handle_reorg}
          handleLevel={props.handleLevel}
          levelsRange={props.levelsRange}
          handleLevelsRange={props.handleLevelsRange}
        />
      </CustomTabPanel>
    </Box>
  );
}
