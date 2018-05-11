import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
// import server from '../services/server';

// Only require those which are needed in the current component
import MapComponent from './mapComponent';
import Metrics from '../metrics/metrics';
import MetricSelectionComponent from './metricSelectionComponent';
import MetricStatisticsComponent from './metricStatisticsComponent';

const metrics = new Metrics();

/**
  * The layout component of Codepods Demographics
  */
class CodepodsDemographicsComponent extends Component {
    /**
    * @constructor
    * @param {object} props
    */
    constructor(props) {
        super(props);

        // this.apiEndpoints = {
        //     crime: this.fetchCrimeData,
        //     // income: this.notImplemented,
        //     // commute: this.notImplemented
        // }

        this.state = {
            metricLabel: '',
            metricName: '',
            metricData: [],
            fetchingData: false,
            metricInfo: '',
        };
    }

    // toggleFetchingData = () => {
    //     this.setState({
    //         fetchingData: !this.state.fetchingData,
    //     })
    // }

    // fetchMetricData = async (metricName, bounds) => {

    //     // Not a good way to handle this, but I'll leave it for now
    //     if (this.state.fetchingData) {
    //         console.log('Currently fetching data');
    //         return null;
    //     }

    //     if (!this.apiEndpoints[this.state.metricName]) {
    //         console.log(`No fetch function for ${this.state.metricName}`);
    //         return null;
    //     }
    //     try {
    //         this.toggleFetchingData();
    //         const metricData = await (this.apiEndpoints[this.state.metricName])(bounds);
    //         this.toggleFetchingData();
    //         return metricData.data.response;
    //     } catch(err) {
    //         this.setState({
    //             fetchingData: false
    //         });
    //         return [];
    //     }
    // }

    onMetricChange = (metricLabel, data) => {
        console.log("Metric change", data.value);
        if (this.state.metricName) {
            // Remove any existing data
            metrics.clearData(this.state.metricName);
        }
        this.setState({
            metricLabel,
            metricName: data.value,
        });
        
    }

    // onMapChange = async (bounds) => {
    //     console.log("Map Change", bounds);
    //     const metricData = await this.fetchMetricData(this.state.metricName, bounds);
    //     if (metricData) {
    //         this.setState({
    //             metricData: metricData
    //         });
    //     }
    // }

    onMarkerClick = (data) => {
        this.setState({
            metricInfo: data
        })
    }

    render() {
        return (
            <div>
                <MetricSelectionComponent onMetricChangeCallback={this.onMetricChange} />
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <MapComponent metrics={metrics} onMarkerClickCallback={this.onMarkerClick} metricName={this.state.metricName} />
                        </Grid.Column>
                        <Grid.Column>
                            <MetricStatisticsComponent metricStatistics={
                                {
                                    metricLabel: this.state.metricLabel,
                                    metricName: this.state.metricName,
                                    metricInfo: this.state.metricInfo,
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default CodepodsDemographicsComponent;