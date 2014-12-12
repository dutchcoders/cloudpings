/** @jsx React.DOM */
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// https://cloud.google.com/compute/docs/zones
// http://azure.microsoft.com/en-us/regions/
//
var nodes = {
    aws: { 
        i:0,
        beacons: [
          {name: "Asia Pacific (Tokyo)", url: "http://ap-northeast-1.aws.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "Asia Pacific (Singapore)", url: "http://ap-southeast-1.aws.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null,active: false, error: null},
          {name: "Asia Pacific (Sydney", url: "http://ap-southeast-2.aws.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "EU (Frankfurt)", url: "http://eu-central-1.aws.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "EU (Ireland)", url: "http://eu-west-1.aws.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "South America (Sao Paulo)", url: "http://sa-east-1.aws.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "US East (N. Virginia)", url: "http://us-east-1.aws.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "US West (N. California)", url: "http://us-west-1.aws.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "US West (Oregon)", url: "http://us-west-2.aws.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
        ]
    },
    gce: {
        i:0,
        beacons: [
          {name: "US Central", url: "http://us-central1.gce.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "Europe West", url: "http://europe-west1.gce.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null,active: false, error: null},
          {name: "Asia East", url: "http://asia-east1.gce.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
        ]
    },
    azure: {
        i:0,
        beacons: [
          {name: "Central US", url: "http://central-us.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "East US", url: "http://east-us.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null,active: false, error: null},
          {name: "East US 2", url: "http://east-us2.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null,active: false, error: null},
          {name: "South Central US", url: "http://south-central-us.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "West US", url: "http://west-us.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "North Europe", url: "http://north-europe.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "West Europe", url: "http://west-europe.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "East Asia", url: "http://east-asia.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "Southeast Asia", url: "http://southeast-asia.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
          {name: "Japan West", url: "http://japan-west.azure.cloudpings.com/ping", startTime: null, time: [], min: null, max: null, average: null, active: false, error: null},
        ]
    }
};

var Ping = React.createClass({
      propTypes: {
        ping: React.PropTypes.object.isRequired
      },
    render: function() {
        var className = (0==this.props.i%2) ? 'row1' : 'row2';
        var spinner =  this.props.ping.active ? "ri ri-spin" : "";

        if (this.props.ping.error) {
            return <tr className={className}>
                            <td className="name">{this.props.ping.name} <i className={spinner}></i></td>
                            <td className="latency">
                                <ReactCSSTransitionGroup transitionName="example">
                                <span>{this.props.ping.error}</span>
                                </ReactCSSTransitionGroup>
                            </td>

                    </tr>
        }

        return <tr className={className}>
                        <td className="name">{this.props.ping.name} <i className={spinner}></i></td>
                        <td className="latency">
                            <ReactCSSTransitionGroup transitionName="example">
                            <span>{this.props.ping.time.length > 0  ? this.props.ping.time[this.props.ping.time.length - 1] + "ms" : "-"}</span>
                            </ReactCSSTransitionGroup>
                        </td>
                        <td className="latency">
                            <span>{this.props.ping.min ? this.props.ping.min + "ms" : "-"}</span>
                        </td>
                        <td className="latency">
                            <span>{this.props.ping.max ? this.props.ping.max + "ms" : "-"}</span>
                        </td>
                        <td className="latency">
                            <span>{this.props.ping.average ? Math.round(this.props.ping.average) + "ms" : "-"}</span>
                        </td>
                </tr>
    }
});

var PingList = React.createClass({
    propTypes: {
    },
    getInitialState: function() {
        return { i:0, tab: "aws" };
    },
    componentDidMount: function(){
        console.debug("handle enter", this.props.nodes);
        this.timer = setTimeout(this.tick, 500);
    },
    componentWillUnmount: function(){
        console.debug("handle leave", this.props.nodes);
        clearInterval(this.timer);
    },    
    tick: function() {
        var self = this;

        var tab = this.state.tab;
        var node = self.props.nodes[tab].beacons[self.props.nodes[tab].i];

        if (typeof node === "undefined") {
            self.timer = setTimeout(self.tick, 400);
            return
        }

        node.active = true;

        var startTime = new Date();

        jQuery.get(node.url, {}, function(data) {
            node.error = null;
            var endTime = new Date();
            var n = (endTime - startTime);
            console.debug( node.url, endTime, startTime, n);
            
            node.min = (node.min?Math.min(node.min, n):n)
            node.max = (node.max?Math.max(node.max, n):n)
            node.average = (node.average?((node.average + n) / 2): n)
            node.time.push(n);
        }).fail(function(error) {
            console.debug(error);
            node.error = error.statusText + "(" + error.status+ ")";
        }).always(function() {
            node.active = false;

            self.setState({nodes: self.props.nodes})

            // next check
            self.props.nodes[tab].i = (self.props.nodes[tab].i+1)%self.props.nodes[tab].beacons.length;

            self.timer = setTimeout(self.tick, 400);
        });

    },
    onClick: function(e, id) {
        // var tab = e.target.dataset.tab;
        this.setState({ i: 0, tab: e.target.dataset.cloud });
        e.preventDefault();
    },
    render: function() {
        var activeTab = this.state.tab;
        var pingNodes = this.props.nodes[activeTab].beacons.map(function (ping, i) {
              return (
                <Ping i={i} ping={ping}>
                </Ping>
              );
            });

        return <div>
                    <ul className="text-center list-unstyled">
                            <li className={ this.state.tab == 'aws' ? 'ui-state-active active': '' } onClick={this.onClick} ><a data-cloud="aws" href="aws">Amazon EC2</a></li>
                            <li className={ this.state.tab == 'azure' ? 'ui-state-active active': '' } onClick={this.onClick} ><a data-cloud="azure" href="azure">Microsoft Azure</a></li>
                            <li className={ this.state.tab == 'gce' ? 'ui-state-active active': '' } onClick={this.onClick} ><a data-cloud="gce" href="gce">Google Compute Engine</a></li>
                    </ul>
                    <div className="rt-sm-2"></div>
                    <div className="rt-sm-8">
                            <div className="tabContent clearfix">
                                    <table className='tableRT'>
                                        <thead>
                                            <tr>
                                                    <th>Location</th>
                                                    <th colSpan="4">Latency</th>
                                            </tr>
                                            <tr>
                                                    <th></th>
                                                    <th>Last</th>
                                                    <th>Min</th>
                                                    <th>Max</th>
                                                    <th>Avg</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pingNodes}
                                        </tbody>
                                    </table>
                            </div>
                    </div>
                    <div className="rt-sm-2"></div>
                </div>
    }
});


React.renderComponent(
    <PingList nodes={nodes} />,
    document.getElementById("tab")
);

jQuery(document).ready(function () {

    var i = 0;

    function ping() {
        var a = function (i) {
            var node = nodes[i];

            node.active = true;

            var startTime = new Date();

            jQuery.get(node.url, {}, function(data) {
                node.error = null;
                var endTime = new Date();
                var n = (endTime - startTime);
                console.debug( node.url, endTime, startTime, n);
                
                node.min = (node.min?Math.min(node.min, n):n)
                node.max = (node.max?Math.max(node.max, n):n)
                node.average = (node.average?((node.average + n) / 2): n)
                node.time.push(n);
            }).fail(function(error) {
                console.debug(error);
                node.error = error.statusText + "(" + error.status+ ")";
            }).always(function() {
                node.active = false;
            });
        }

        a(i)

        React.renderComponent(
            <PingList nodes={nodes} />,
            document.getElementById("tab")
        );

       i = (i+1)%nodes.length;

       // setTimeout(ping, 400);
    }

    // setTimeout(ping, 400);
});
