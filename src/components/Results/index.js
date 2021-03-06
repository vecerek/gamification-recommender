import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Result from './components/Result';
import Sidebar from '../GetStarted/components/Sidebar';
import DetailsDrawer from './components/DetailsDrawer';
import * as actions from '../../actions/Results';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  resultsContainer: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'column',
    overflow: 'auto',
    padding: '50px',
    paddingTop: '15px',
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 15px - 50px)',
      padding: '50px calc((100% - 1180px) / 2)',
    },
  },
  title: {
    fontSize: '2.5rem',
    margin: '30px 0',
    textAlign: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '35px',
    width: '100%',
  },
  btn: {
    margin: theme.spacing.unit,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

class Results extends React.Component {
  state = {
    showConfiguration: false,
  }

  componentWillMount() {
    const { dispatch, isConfigured } = this.props;

    if (!isConfigured) {
      return dispatch(push('/get-started'));
    }

    dispatch(actions.recommendFrameworks());
  }

  switchConfiguration = () => {
    this.setState(prevState => ({
      showConfiguration: !prevState.showConfiguration
    }));
  };

  render() {
    const { classes, recommendations } = this.props;
    const { showConfiguration } = this.state;

    return (
      <React.Fragment>
        <div className={classes.container}>
          <div className={classes.resultsContainer}>
            <Typography
              className={classes.title}
              variant="h1"
              display="block"
            >
              Recommended Gamification Design Frameworks
            </Typography>
            <div className={classes.toolbar}>
              <Button
                size="small"
                className={classes.btn}
                href="/"
              >
                <BackIcon className={classes.icon} />
                Back to home
              </Button>
              {!showConfiguration &&
                <Button
                  size="small"
                  className={classes.btn}
                  onClick={this.switchConfiguration}
                >
                  <EditIcon className={classes.icon} style={{ fontSize: 18 }} />
                  Edit requirements
                </Button>
              }
            </div>
            <Grid container spacing={24}>
              {recommendations.map(recommendation =>
                <Grid item xs={12} sm={6} md={4} key={recommendation.other.id}>
                  <Result data={recommendation} />
                </Grid>
              )}
            </Grid>
          </div>
          {showConfiguration &&
            <Sidebar
              realTimeEvaluation
              onClose={this.switchConfiguration}
            />
          }
        </div>
        <DetailsDrawer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  recommendations: state.results.recommendations,
  isConfigured: state.getStarted.userDefinedFramework.features.length !== 0,
});

Results.propTypes = {
  recommendations: PropTypes.array,
};

export default connect(mapStateToProps)(withStyles(styles)(Results));
