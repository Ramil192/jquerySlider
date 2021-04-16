import InputLeft from "./InputLeft"
import InputRight from "./InputRight"
import Track from "./Track"
import Range from "./Range"
import ThumbLeft from "./ThumbLeft"
import ThumbRight from "./ThumbRight"
import TextLeft from "./TextLeft"
import TextRight from "./TextRight"
import Scale from "./Scale"

export default class View {

  constructor(target) {
    this.target = target
  }

  init() {
    const inputLeft = new InputLeft();
    const inputRight = new InputRight();
    const track = new Track()
    const range = new Range()
    const thumbLeft = new ThumbLeft()
    const thumbRight = new ThumbRight()
    const textLeft = new TextLeft()
    const textRight = new TextRight()
    const scale = new Scale()

    this.target.css({
      'position': 'relative',
      'transform-origin': 'bottom left',
    });
    this.target.append('<div class="multi-range-slider"></div>');
    $('.multi-range-slider').append(inputLeft.init());
    $('.multi-range-slider').append(inputRight.init());
    $('.multi-range-slider').append('<div class="slider"></div>');
    $('.slider').append(track.init());
    $('.slider').append(range.init());
    $('.slider').append(thumbLeft.init());
    $('.slider').append(thumbRight.init());
    $('.slider').append(textLeft.init());
    $('.slider').append(textRight.init());
    $('.slider').append(scale.init());
  }
}
