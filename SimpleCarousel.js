
 /**
  * BenedictCarousel
  * ================
  * @fileDescription A simple carousel example.
  * @author Benedict Chen <TheBenedictChen@gmail.com>
  */

class BenedictCarousel {
    constructor(imageUrls) {
        if (!Array.isArray(imageUrls)) {
            throw new TypeError('Must provide images');
        }

        /**
         * Primary body of the compnent.
         * @type {Element}
         */
        this.body = document.createElement('div');

        /**
         * List of image URLS to load.
         * @type {Array.<String>}
         */
        this.imageUrls = imageUrls || [];

        /**
         * Element that contains the images directly as the internal slider.
         * @private {Element}
         */
        this.imageContainer_ = document.createElement('div');

        /**
         * Viewport that hides the rest of the images and only shows one image.
         * @private {Element}
         */
        this.viewPort_ = document.createElement('div');

        /**
         * Total width of a given image.
         * @private {Number}
         */
        this.IMAGE_WIDTH_ = 200;

        /**
         * Total height of a given image.
         * @private {Number}
         */
        this.IMAGE_HEIGHT_ = 200;

        this.body.style = `width: ${this.IMAGE_WIDTH_}px;`;
        this.viewPort_.style = `position: relative;  overflow: hidden;`;

        const imageStyle = [
            `width: ${this.IMAGE_WIDTH_}px`,
            `height: ${this.IMAGE_HEIGHT_}px`,
        ].join(';');

        this.images = this.imageUrls.map((url) => {
            const img = document.createElement('img');
            img.src = url;
            img.style = imageStyle;
            this.imageContainer_.appendChild(img);
            return img;
        });

        this.imageContainer_.style = [
            imageStyle,
            `width: ${this.IMAGE_WIDTH_ * this.images.length}px`,
            'position: relative',
            `height: ${this.IMAGE_HEIGHT_}px`,
            'transition: all 300ms',
        ].join(';');

        this.viewPort_.style = [
            `width: ${this.IMAGE_WIDTH_}px`,
            `height: ${this.IMAGE_HEIGHT_}px`,
            'position: relative',
            'overflow: hidden',
        ].join(';');

        this.viewPort_.appendChild(this.imageContainer_);
        this.viewPort_.classList.add('viewport');
        this.body.appendChild(this.viewPort_);

        /**
         * Current slide index.
         * @type {Number}
         */
        this.currentIndex_ = 0;

        /**
         * Button that will push carousel left.
         * @private {Element}
         */
        this.leftButton_ = document.createElement('button');
        this.leftButton_.textContent = '<';

        /**
         * Button that will push carousel right.
         * @private {Element}
         */
        this.rightButton_ = document.createElement('button');
        this.rightButton_.textContent = '>';

        this.body.appendChild(this.leftButton_);
        this.body.appendChild(this.rightButton_);

        this.enterDocument();
    }

    /**
     * Moves carousel left.
     */
    goLeft() {
        console.log('Right action');
        if (this.currentIndex_ > 0) {
            this.currentIndex_--;
        }
        console.log(this.currentIndex_);
        this.updatePosition();
    }

    /**
     * Moves carousel right.
     */
    goRight() {
        console.log('Left action');
        if (this.currentIndex_ < this.images.length - 1) {
            this.currentIndex_++
        }
        console.log(this.currentIndex_);
        this.updatePosition();
    }

    /**
     * Updates the current position of the carousel based on the index.
     */
    updatePosition() {
        console.log('update position');
        const xValue = this.IMAGE_WIDTH_ * this.currentIndex_;
        this.imageContainer_.style.left = -xValue;
    }

    enterDocument() {
        this.leftButton_.addEventListener('click', this.goLeft.bind(this));
        this.rightButton_.addEventListener('click', this.goRight.bind(this));
    }

    exitDocument() {
        this.leftButton_.removeEventListener('click', this.goLeft.bind(this));
        this.rightButton_.removeEventListener('click', this.goRight.bind(this));
    }

    dispose() {
        this.exitDocument();
    }

    /**
     * Attaches the component to the target.
     * @param {Element} targetNode - Target node to attach to.
     */
    render(targetNode) {
        if (!targetNode) {
          throw new TypeError('Target node is required');
        }
        targetNode.appendChild(this.body);
    }
}



window.addEventListener('DOMContentLoaded', () => {
    const rootNode = document.createElement('div');
    document.body.appendChild(rootNode);
    new BenedictCarousel([
        'https://dummyimage.com/200/ff0000',
        'https://dummyimage.com/200/00ff00',
        'https://dummyimage.com/200/0000ff',
    ]).render(rootNode);
});
