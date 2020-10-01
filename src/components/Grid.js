import React from "react";
import {connect} from "react-redux";
import StatusRow from "./StatusRow";
import AdditionalInfoRow from "./AdditionalInfoRow";
import ConnectionLost from "./ConnectionLost";
import {Grid as styling} from "../constants/styling";
import threshold from "../constants/threshold";

function Grid(props) {
    if (props.showConnectionLost) 
        return <ConnectionLost/>;
    
    const statusRows = props
        .statuses
        .map((data) => {
            return (<StatusRow
                key={data.name}
                name={data.name}
                value={data.value}
                status={data.status}/>);
        });

    return (
        <div
            key="grid-container"
            style={styling.container.primary}
            className="grid container">
            {statusRows}
            <AdditionalInfoRow/>
        </div>
    );
}

const mapStateToProps = (state) => {
    const latencyProps = {
        name : "LATENCY",
        value : Math.round(state.SpeedTest.latency ?? -1) + "ms",
        status : (state.SpeedTest.latency ?? threshold.Settings.latency.error) >= threshold.Settings.latency.error
            ? "bad"
            : state.SpeedTest.latency > threshold.Settings.latency.warning
                ? "warning"
                : "good"
    };

    const jitterProps = {
        name : "JITTER",
        value : Math.round(state.SpeedTest.jitter ?? -1) + "ms",
        status : (state.SpeedTest.jitter ?? threshold.Settings.jitter.error) >= threshold.Settings.jitter.error
            ? "bad"
            : state.SpeedTest.jitter > threshold.Settings.jitter.warning
                ? "warning"
                : "good"
    };

    const ulProps = {
        name : "UPLOAD",
        value : Math.round(state.SpeedTest.uploadSpeed ?? -1) + "mbit/s",
        status : state.SpeedTest.uploadSpeed <= threshold.Settings.upload.error
            ? "bad"
            : state.SpeedTest.uploadSpeed < threshold.Settings.upload.warning
                ? "warning"
                : "good"
    };

    const dlProps = {
        name : "DOWNLOAD",
        value : Math.round(state.SpeedTest.downloadSpeed ?? -1) + "mbit/s",
        status : state.SpeedTest.downloadSpeed < threshold.Settings.download.error
            ? "bad"
            : state.SpeedTest.downloadSpeed < threshold.Settings.download.warning
                ? "warning"
                : "good"
    };

    return {
        state: state,
        showConnectionLost: !state.OnlineStatus.isOnline,
        statuses: [latencyProps, jitterProps, dlProps, ulProps]
    };
};

export default connect(mapStateToProps)(Grid);