// ##############################
// // // ChartCard styles
// #############################

import {
  card as oCard,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardActions,
  grayColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  primaryColor,
  roseColor,
  defaultBoxShadow,
} from "../rootStyle";

const imageCardStyle = {
  card: {
    ...oCard,
    maxWidth: 900,
    background: "#FFFFFF"
  },
  cardHeader: {
    ...cardHeader,
    margin: "20px 20px 20px 20px",
    padding: "0",
    maxHeight: "350px",
    display: "block",
    // maxHeight: "20vh",
    // width: "auto",
    ...defaultFont,
    transition: "all 0.5s ease-in-out 0s",
    "-webkit-transition": "all 0.5s ease-in-out 0s",
    opacity: 1,
    "&:hover": {
      // opacity: 1,
      "transform": `scale(1.05)`,
      "-webkit-transform": `scale(1.05)`
    }
  },
  media: {
    height: 0,
    "@media (min-width: 960px)": {
      paddingTop: '56.25%'
    },
    paddingTop: '95%'
  },
  img: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    objectFit: 'cover',
  },
  cardSubheader: {
    ...cardHeader,
    ...defaultBoxShadow,
    maxWidth: "auto",
    overflow: "hidden",
    maxHeight: "350px",
    "@media (min-width: 576px)": {
      maxWidth: "576px"
    },
    "@media (min-width: 768px)": {
      maxWidth: "768px"
    },
    "@media (min-width: 992px)": {
      maxWidth: "992px"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1200px"
    }
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardContent: {
    padding: "15px 20px"
  },
  cardTitle: {
    marginTop: "0",
    marginBottom: "5px",
    ...defaultFont,
    fontSize: "2em",
    color: "black"
  },
  cardCategory: {
    marginBottom: "0",
    color: grayColor,
    ...defaultFont,
    fontSize: "0.9em",
    color: grayColor,
  },
  cardActions: {
    ...cardActions,
    padding: "0!important"
  },
  cardStats: {
    // lineHeight: "22px",
    color: grayColor,
    // fontSize: "12px",
    display: "inline-block",
    margin: "0!important",

  },
  cardStatsIcon: {
    position: "relative",
    top: "4px",
    width: "16px",
    height: "16px"
  },
  warningCardStatsIcon: {
    color: warningColor
  },
  primaryCardStatsIcon: {
    color: primaryColor
  },
  dangerCardStatsIcon: {
    color: dangerColor
  },
  successCardStatsIcon: {
    color: successColor
  },
  infoCardStatsIcon: {
    color: infoColor
  },
  roseCardStatsIcon: {
    color: roseColor
  },
  grayCardStatsIcon: {
    color: grayColor
  },
  cardStatsLink: {
    color: primaryColor,
    textDecoration: "none",
    ...defaultFont
  }
};

export default imageCardStyle;
