import React from 'react'
import resolveExif from 'exif-normalizer-blob';

const outerDivStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%'
};

const imageBoxStyle={
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxHeight: '75vh',
    maxWidth: '75vw',
    display: 'block'
};

class ImageHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentImage: '',
            nextImage: '',
            containerBackgroundColor: '#FFFFFF'
        };
    }

    switchImage() {
        if (this.state.nextImage !== "") {
            let currentImageObjectURL = this.state.currentImage;
            this.setState ({
                currentImage: this.state.nextImage
            });
            this.shuffleBackgroundColor();
            URL.revokeObjectURL(currentImageObjectURL);
            this.fetchNextImage();
        }
    }

    fetchNextImage() {
        fetch('http://localhost:10000/image')
        .then(res => {
            return res.blob();
        })
        .then(resBlob => {
            let newImageObjectUrl = URL.createObjectURL(resBlob);
            resolveExif(newImageObjectUrl)
            .then(orientedImageUrl => {
                URL.revokeObjectURL(this.state.nextImage);
                this.setState({
                    nextImage: orientedImageUrl
                });
            })
        })
    }

    componentDidMount() {
        fetch('http://localhost:10000/image')
        .then(res => {
            return res.blob();
        })
        .then(resBlob => {
            let newImageObjectUrl = URL.createObjectURL(resBlob);
            resolveExif(newImageObjectUrl)
            .then(orientedImage => {
                this.setState({
                    currentImage: orientedImage
                });
            })
        })
        this.fetchNextImage();
        document.addEventListener('keyup', this.switchImage.bind(this));
    }

    generateBackgroundColor() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    shuffleBackgroundColor() {
        this.setState({
            containerBackgroundColor: this.generateBackgroundColor()
        });
    }

    render() {
        return(
            <div style={Object.assign({}, outerDivStyle, {backgroundColor: this.state.containerBackgroundColor})}>
                <img onClick={this.switchImage.bind(this)} src={this.state.currentImage} alt='something for Nora' style={imageBoxStyle} />
            </div>
        );
    }
}

export default ImageHolder;