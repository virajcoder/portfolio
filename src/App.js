import React from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectMode, setMode } from "./app/appSlice";
import {
  setProjects,
  setMainProjects,
  selectProjects,
} from "./app/projectsSlice";
import { useGetUsersQuery, useGetProjectsQuery } from "./app/apiSlice";
import PropTypes from "prop-types";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import AppFallback from "./components/AppFallback";
import GlobalStyles from "./components/GlobalStyles";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { footerTheme, navLogo } from "./config";
import { getStoredTheme, getPreferredTheme, setTheme } from "./utils";


const propTypes = {
  filteredProjects: PropTypes.arrayOf(PropTypes.string),
  projectCardImages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.node.isRequired,
    })
  ),
};

const App = ({ projectCardImages = [], filteredProjects = [] }) => {
  const theme = useSelector(selectMode);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const { data: projectsData } = useGetProjectsQuery();
  let content;

 
  React.useEffect(() => {
    const tempData = [];
    if (projectsData !== undefined && projectsData.length !== 0) {
      projectsData.forEach((element) => {
        const tempObj = {
          id: null,
          homepage: null,
          description: null,
          image: null,
          name: null,
          html_url: null,
        };
        tempObj.id = element.id;
        tempObj.homepage = element.homepage;
        tempObj.description = element.description;
        tempObj.name = element.name;
        tempObj.html_url = element.html_url;
        tempData.push(tempObj);
      });
      if (
        projectCardImages !== (undefined && null) &&
        projectCardImages.length !== 0
      ) {
        projectCardImages.forEach((element) => {
          tempData.forEach((ele) => {
            if (element.name.toLowerCase() === ele.name.toLowerCase()) {
              ele.image = element.image;
            }
          });
        });
      }
      dispatch(setProjects(tempData));
    }
  }, [projectsData, projectCardImages, dispatch]);

 
  React.useEffect(() => {
    if (projects.length !== 0) {
      if (
        filteredProjects !== (undefined && null) &&
        filteredProjects.length !== 0
      ) {
        const tempArray = projects.filter((obj) =>
          filteredProjects.includes(obj.name)
        );
        tempArray.length !== 0
          ? dispatch(setMainProjects([...tempArray]))
          : dispatch(setMainProjects([...projects.slice(0, 3)]));
      } else {
        dispatch(setMainProjects([...projects.slice(0, 3)]));
      }
    }
  }, [projects, filteredProjects, dispatch]);

  
  const setThemes = React.useCallback(
    (theme) => {
      if (theme) {
        dispatch(setMode(theme));
        setTheme(theme);
      } else {
        dispatch(setMode(getPreferredTheme()));
        setTheme(getPreferredTheme());
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    setThemes();
  }, [setThemes]);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setThemes();
      }
    });

  if (isLoading) {
    content = (
      <Container className="d-flex vh-100 align-items-center">
        <Loading />
      </Container>
    );
  } else if (isSuccess) {
    content = (
      <>
        <Element name={"Home"} id="home">
          <NavBar Logo={navLogo} callBack={(theme) => setThemes(theme)} />
        </Element>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/All-Projects" element={<AllProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer mode={footerTheme} />
      </>
    );
  } else if (isError) {
    content = (
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        <h2>
          {error.status !== "FETCH_ERROR"
            ? `${error.status}: ${error.data.message} - check githubUsername in src/config.js`
            : `${error.status} - check URLs in  src/app/apiSlice.js`}
        </h2>
      </Container>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      <HashRouter future={{ v7_startTransition: true }}>
        <ThemeProvider theme={{ name: theme }}>
          <ScrollToTop />
          <GlobalStyles />
          {content}
        </ThemeProvider>
      </HashRouter>
    </ErrorBoundary>
  );
};

App.propTypes = propTypes;


export default App;
