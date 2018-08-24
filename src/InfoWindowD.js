import React from 'react';
import App from './App';
import Info from './Info'

const styles = {
    position: 'inherit', backgroundColor: 'white',
}

function InfoWindowD(props) {


  const { markers, infoWindow, filterMarkers, initialMarkers, ejecutar, map, newValue, updateShowMarkers, showMarkers } = props;

  props.markers.map((myMarker) => {
    if(myMarker.type === props.showMarkers) {
      console.log('inside ' + myMarker.name)
    }
    console.log('with map ' + myMarker.name)
  })
  return (
    <div style={styles}>
      <div>
        <Info newValue={props.newValue} />{props.showMarkers}
        <div />
        <div className="content">
        <h3>Attractions type</h3>
          <select defaultValue="all" onChange={(event)=>{props.UpdateShowMarkers(event.target.value), props.ejecutar(); }} >
          <option value="all">All</option>
          <option value="deleteall">deleteall</option>
            { props.markers.map((place) => {
              return <option value={place.type}>{place.type}</option>
            })
            }
          </select>
        </div>
      </div>
    </div>
  );
}

export default InfoWindowD;
