//routes
import Home from "../Home";
import Login from "../Login";
import Registration from "../Registration";
import Dashboard from "../afterLogin/Dashboard";
import ProfileEdit from "../afterLogin/ProfileEdit";
import ProjectSummary from "../afterLogin/ProjectSummary";
import ProfileOverview from "../afterLogin/ProfileOverview";
import Chat from "../afterLogin/Chat";
import InterestedMakers from "../afterLogin/InterestedMakers";
import FinishedProjects from "../afterLogin/FinishedProjects/FinishedProjects";

//components
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainTemplate from "../components/MainTemplate";
import AuthorizationManager from "../components/MainTemplate";
import Routing from "../router";

//contexts
import Contexts from "./ContextManager";
import { UserAuthContext, UserAuthConsumer } from "./ContextManager";

//json
import clientData from "../assets/json/clientData.json";

//material-ui
import MaskedInput from "react-text-mask";
import {
  Button,
  Input,
  Toolbar,
  MenuItem,
  Paper,
  Select,
  FormHelperText,
  IconButton,
  TextField,
  FilledInput,
  InputAdornment,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
  Slider,
  Radio,
  RadioGroup
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";

import Cookies from "universal-cookie";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

//import { Visibility, VisibilityOff } from "@material-ui/icons";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faChevronDown,
  faChevronLeft,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

//libraries
import axios from "axios";
import Classnames from "classnames";
import {
  Link,
  Redirect,
  Switch,
  Route,
  BrowserRouter,
  useHistory
} from "react-router-dom";
import Moment from "react-moment";

const cookies = new Cookies();

export {
  Home,
  Login,
  Registration,
  Dashboard,
  ProfileEdit,
  ProfileOverview,
  ProjectSummary,
  Chat,
  InterestedMakers,
  FinishedProjects
};
export { Footer, Header, AuthorizationManager, MainTemplate, Routing };
export { Contexts, UserAuthConsumer, UserAuthContext };
export { clientData };
export {
  Button,
  Input,
  Select,
  FormHelperText,
  Toolbar,
  Paper,
  MenuItem,
  IconButton,
  TextField,
  FilledInput,
  InputAdornment,
  InputLabel,
  FormControl,
  Typography,
  Slider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  MaskedInput,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DateFnsUtils
};
export {
  FontAwesomeIcon,
  faFacebook,
  faTwitter,
  faChevronDown,
  faChevronLeft,
  faEye,
  faEyeSlash
};
export {
  axios,
  cookies,
  Classnames,
  Link,
  Redirect,
  Route,
  Switch,
  BrowserRouter,
  useHistory,
  Moment
};
