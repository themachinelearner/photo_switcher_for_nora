import React from 'react'

const imageBoxStyle={
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
};

class ImageHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentImage: '',
            nextImage: ''
        };
    }

    switchImage() {
        if (this.state.nextImage !== '') {
            this.setState ({
                currentImage: this.state.nextImage
            });
            this.fetchNextImage();
        }
    }

    fetchNextImage() { //consolidate this into one function that passes in the key to the object the image URL will be assigned to
        fetch('http://localhost:10000/image')
        .then(res => {
            return res.blob();
        })
        .then(resBlob => {
            this.setState({
                nextImage: URL.createObjectURL(resBlob)
            });
        })
    }

    componentDidMount() {
        fetch('http://localhost:10000/image')
        .then(res => {
            return res.blob();
        })
        .then(resBlob => {
            this.setState({
                currentImage: URL.createObjectURL(resBlob)
            });
        })
    }

    render() {
        return(
            <div> {/*Need to implmenet this outer div always having focus and onkeydown triggering switch image*/}
                <img src={this.state.currentImage} alt='something for Nora' style={imageBoxStyle} />
            </div>
        );
    }
}

export default ImageHolder;