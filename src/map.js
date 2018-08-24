/* this version is before trying to call the update method from map. This version updates the state but the markers are not refreshed in the map */
import React, { Component } from 'react';
import { render } from 'react-dom';
import InfoWindowD from './InfoWindowD'

const styles = {
  width: '100%', height: '100%', position: 'absolute',
}



class Map extends Component {

  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyDyeZwrmykBXkG_FkJY6kPthSpdidMpFiM`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }

  }



  render() {
    return (
      <div state= {this.state} style={styles} id={this.props.id} />
    );
  }
}

export default Map
//based on http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/
