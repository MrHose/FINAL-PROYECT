import { Component } from 'react'
import { Container, Spinner, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import PlacesService from '../../../service/places.service'
import MapContainer from './../../shared/map/Map'
import './PlacesDetails.css'

class PlacesDetails extends Component {
    constructor() {
        super()
        this.state = {
            place: undefined
        }
        this.placesService = new PlacesService()
    }
    componentDidMount() {
      this.loadPlace()
    }
  
  loadPlace() {
    const { place_id } = this.props.match.params;

    this.placesService
      .getOnePlace(place_id)
      .then((response) => this.setState({ place: response.data }))
      .catch((err) => console.log(err));
    }
  
    render() {
        const { place } = this.state

        return (
          <Container>
            {!this.state.place ? (
              <Spinner animation="border" className="spinner" />
            ) : (
                <>
                  <br></br>
                  <Link className="btn btn-outline-light" to={`/${place.city}/restaurantes`}>Volver</Link>
                  <br></br>
                  <br></br>
                <Row className="justify-content-between">
                  <Col lg={4}>
                    <img
                      src={place.image}
                      alt={place.name}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col lg={6}>
                    <h3>{place.name}</h3>
                    <p>{place.cost}</p>
                    <p>{place.description}</p>
                    <p>{place.url}</p>
                    <p>
                      {place.address} {place.city}
                      </p>
                  </Col>
                </Row>
                <br></br>
                  <Row>
                    <MapContainer {...this.props} />
                </Row>
              </>
            )}
          </Container>
        );
    }
}

export default PlacesDetails
