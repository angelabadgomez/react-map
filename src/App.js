/* this version is before trying to call the update method from map. This version updates the state but the markers are not refreshed in the map */
import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Map from './map';
import Test from './test';
import InfoWindowD from './InfoWindowD'

class App extends Component {
  constructor() {
    super();
  //  this.child = React.createRef();
  }
  state= {
      markers:
          [ {
            name: 'Стадион «Нижний Новгород»',
            lat: 56.337498,
            lng: 43.963386,
            venueId: '555eed18498e3451c8bf5765',
            type:'Sport'},
           {
            name: 'Большая Покровская улица',
            lat: 56.317676,
            lng: 43.995474,
            venueId: '4bd322019854d13ae2f1fc4d',
            type:'Entertaiment'},
           {
            name: 'Нижегородский Кремль',
            lat: 56.328499,
            lng: 44.004681,
            venueId: '4d90af651716a143265167f7' ,
            type: 'Historical'},
           {
            name: 'Зоопарк «Лимпопо»',
            lat: 56.334550,
            lng: 43.854127,
            venueId: '4ca71ea5931bb60ccec999e2',
            type: 'Park'},
           {
            name: 'Теннис Парк',
            lat: 56.292484,
            lng: 43.974676,
            venueId: '54a6a2a6498ee573efdc4234',
            type: 'Cafe'}
        ],
        showMarkers: 'Sport'
  }

//update showMarkers state
  updateShowMarkers = (placeType) => {

    console.log('updating the state showMarkers with value: ' + placeType)
  //  this.child.current.filterr(); this doesnt work
    this.setState({showMarkers: placeType})
  }

  ejecutar = () => {
    console.log('ejecutando')
  //  marker.setMap(null);
}

  render() {
    return (
      <div>
        <InfoWindowD markers={this.state.markers} UpdateShowMarkers={this.updateShowMarkers} showMarkers={this.state.showMarkers} filterMarkers={this.filterMarkers} ejecutar={this.ejecutar} />
<Test />

        <Map
        //ref={this.child}
          id="CenterNN"
          options={{
            center: { lat: 56.327114, lng: 44.005632 },
            zoom: 13
          }}


          onMapLoad={map => {
            var markerDetails = this.state.markers;
            for(var i = 0; i < markerDetails.length; i++ ) {
              //console.log('loop ' + i)

              var contentString = '<div>'+
                  '<p>Information is loading</p>'+
                  '</div>';

              var infoWindow = new window.google.maps.InfoWindow({
                content: contentString
              });

            var position = new window.google.maps.LatLng(markerDetails[i].lat, markerDetails[i].lng);
console.log('a: ' + this.state.showMarkers + ' b: '+markerDetails[i].type)

            if( this.state.showMarkers === markerDetails[i].type ) {
            var marker = new window.google.maps.Marker({
              position: position,
            //  map: map, //set the markers in the map. below it was replaced
              title: markerDetails[i].name
            });

            // add markers to the map
            console.log('setting marker ' + markerDetails[i].type)
              marker.setMap(map);
          //  }
            console.log('continue the loop with ' + markerDetails[i].type)
            // else if(this.state.showMarkers === 'deleteall') {
            //   marker.setMap(null);
            // }


            //to remove markers from map use the next line
            //marker.setMap(null);
            var e;
            var filterMarkers = (e) => {
              console.log('filtering markers')
            //  marker.setMap(null);
            }
            var filterr = () => {
              console.log('filtering markers')
            }

            var venueInfo;
            var attractionTitle;
                  //  This request is not premium and is almost not limited to make tests per day
                    var foursquareVenue = (venueCode) => {
                      fetch(`https://api.foursquare.com/v2/venues/${venueCode}/likes?client_id=RT5Y42P5OSTXAOTGCERRNVLQCUYGF2SBX0SSHJJJBJ5LPXRP&client_secret=15KS1PLQ5OV1NZ2HDGKDAF1SD34LAYGXWWIGH1CXL4C2XQGJ&v=20180818`)
                           .then((result) =>
                              result.json()
                           )
                           .then(parsedJSON =>
                                 (this.setState({attractions: parsedJSON.response}))
                            )
                            .then( ()=>
                              infoWindow.setContent(`<div><h2>${attractionTitle}</h2>
                                 Likes: ${getAttractionLikes()}<br>
                                 </div>`)
                               )
                           .catch((error) =>
                               console.log('There was a problem:' + error)
                           );
                    }

                    /*
                    // This request is premium and it is limited to 50 request per day. To test no premium requests try uncommenting the var foursquareVenue variable from above
                    var foursquareVenue = (venueCode) => {
                      fetch(`https://api.foursquare.com/v2/venues/${venueCode}?client_id=RT5Y42P5OSTXAOTGCERRNVLQCUYGF2SBX0SSHJJJBJ5LPXRP&client_secret=15KS1PLQ5OV1NZ2HDGKDAF1SD34LAYGXWWIGH1CXL4C2XQGJ&v=20180818`)
                           .then((result) =>
                              result.json()
                           )
                           .then(parsedJSON =>
                                 (this.setState({attractions: parsedJSON.response}))
                            )
                            .then( ()=>
                              infoWindow.setContent(`<div><h2>${attractionTitle}</h2>
                                 <p>Address: ${getAttractionAddress()}<br>
                                 <strong>Rating:</strong> ${getAttractionRating()}   <strong>Attraction type: </strong>${getAttractionType()}</p>
                                 <p>${getVenueDescription()}</p>
                                 <p><span>Information provided by: <a target="_blank" href="http://foursquare.com">Foursquare</a></span></p></div>`)
                               )
                           .catch((error) =>
                               console.log('There was a problem getting the information from the server. Details: ' + error)
                           );
                    }
                    */

                    //this function can access the parent state
                    var getVenueDescription = () => {
                       if(!this.state.attractions.venue.description) {
                          return ('Description is not available for this place')
                       }
                       else{
                         return ( this.state.attractions.venue.description)
                       }
                    }
                    var getAttractionType = () => {
                      return ( this.state.attractions.venue.categories[0].name )
                    }
                    var getAttractionRating = () => {
                      return ( this.state.attractions.venue.rating )
                    }
                    var getAttractionAddress = () => {
                      return ( this.state.attractions.venue.location.address )
                    }
                    var getAttractionLikes = () => {
                      return ( this.state.attractions.likes.count )
                    }

                    // Allow each marker to have an info window
                    window.google.maps.event.addListener(marker, 'click', (function(marker, i, ) {

                        return function() {
                           attractionTitle= markerDetails[i].name;
                          var uniCode= markerDetails[i].venueId;
                          //ejecutar la funcion foursquareVenue y pasarle una variable clave para buscar el venue necesitado
                          {foursquareVenue(markerDetails[i].venueId, attractionTitle)}

                           infoWindow.open(map, marker)

                        }
                    })(marker, i));

            }
          } // ends if from line 110
          }
        }
        />
      </div>
    );
  }



}

export default App;
