import React, { Component } from 'react';
import './Gallery.css';

import LightBox from "./../modals/lightbox/LightBox";

export default class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalDisplay: false,
            isLoaded: false,
            photos: [],
            photo: {}
        }
    }

    componentDidMount() {
        fetch("https://picsum.photos/v2/list")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    photos: data
                });
            }
            )
    }

    toggleModal = (photo) => {
        this.setState({ 
            isModalDisplay: !this.state.isModalDisplay,
            photo: photo
        });

    };

    render() {

        const { isModalDisplay, photos, isLoaded } = this.state;

        return (
            <div className="Gallery" >
                { !isLoaded && "Yükleniyor..." }
                { photos.map( photo =>
                    <div key={photo.id} onClick={ () => this.toggleModal (photo) } className="photo" >
                        <img src={photo.download_url } alt="" />  {/* buralara alt koymadan once asiri kasiyor ve yavas yukleniyordu. Yani daha dogrusu artik yukleniyor yazisi cikiyor, yuklenme bitince ekran geliyor  */}
                        <p>{photo.author}</p>
                    </div>
                )}
                {
                    isModalDisplay  ? (
                        <LightBox  className="modal" >
                            <img style={{width:"600px" }} src={this.state.photo.download_url } alt="" /> {/* buralara alt koymadan once asiri kasiyor ve yavas yukleniyordu. Yani daha dogrusu artik yukleniyor yazisi cikiyor, yuklenme bitince ekran geliyor */}
                            <p>{this.state.photo.author}</p>
                            <button className="close" onClick={this.toggleModal} >X</button>
                        </LightBox>
                    ) : null
                }
            </div>
        );
    }
}