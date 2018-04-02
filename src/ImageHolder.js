import React from 'react'

const outerDivStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%'
};

const imageBoxStyle={
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    maxWidth: '80vw',
    maxHeight: '80vh'
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
            URL.revokeObjectURL(currentImageObjectURL);
            this.fetchNextImage();
            this.shuffleBackgroundColor();
        }
    }

    fetchNextImage() { //consolidate this into one function that passes in the key to the object the image URL will be assigned to
        fetch('http://localhost:10000/image')
        .then(res => {
            return res.blob();
        })
        .then(resBlob => {
            let currentImageObjectURL = this.state.nextImage;
            this.setState({
                nextImage: URL.createObjectURL(resBlob)
            });
            URL.revokeObjectURL(currentImageObjectURL);
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
        this.fetchNextImage();
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
            <div style={Object.assign({}, outerDivStyle, {backgroundColor: this.state.containerBackgroundColor})} onClick={this.switchImage.bind(this)}>
                <img onClick={this.switchImage.bind(this)} src={this.state.currentImage} alt='something for Nora' style={imageBoxStyle} />
            </div>
        );
    }
}

export default ImageHolder;